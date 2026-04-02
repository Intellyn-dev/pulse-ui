import { spawn } from 'child_process';
import path from 'path';

export interface SearchResult {
  products: Array<{ id: number; name: string; relevance: number }>;
  explanation: string;
}

export async function aiSearch(query: string): Promise<SearchResult> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../scripts/agent_runner.py');
    const proc = spawn('python3', [scriptPath, query], {
      env: { ...process.env },
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    proc.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`Agent runner failed (exit ${code}): ${stderr}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error(`Invalid JSON from agent runner: ${stdout}`));
      }
    });
  });
}
