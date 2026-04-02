#!/usr/bin/env python3
"""AI-powered product search agent using agentcore."""

import sys
import json
import agentcore


def search_products(query: str) -> list:
    """Search products via catalog API."""
    import urllib.request
    catalog_url = "http://localhost:3000/api/v1/products"
    with urllib.request.urlopen(f"{catalog_url}?q={query}") as r:
        return json.loads(r.read())


agentcore.register_tool("search_products", "Search the product catalog", search_products)


def run_search(query: str) -> dict:
    tool = agentcore.get_tool("search_products")
    results = tool.fn(query)
    return {
        "products": [{"id": p.get("id"), "name": p.get("name"), "relevance": 1.0}
                     for p in results[:5]],
        "explanation": f"Found {len(results)} products matching '{query}'",
    }


if __name__ == "__main__":
    query = sys.argv[1] if len(sys.argv) > 1 else ""
    result = run_search(query)
    print(json.dumps(result))
