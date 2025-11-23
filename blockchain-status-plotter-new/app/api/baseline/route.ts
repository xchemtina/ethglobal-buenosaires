import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';

type BaselineMethod = 'asls' | 'arpls' | 'flatfit';

export async function POST(request: NextRequest) {
  try {
    const { times, signals, method = 'flatfit' } = await request.json();

    if (!times || !signals || !Array.isArray(times) || !Array.isArray(signals)) {
      return NextResponse.json(
        { error: 'Invalid request: times and signals arrays required' },
        { status: 400 }
      );
    }

    if (times.length !== signals.length) {
      return NextResponse.json(
        { error: 'times and signals arrays must have same length' },
        { status: 400 }
      );
    }

    // Call Python baseline correction script
    const result = await runBaselineCorrection(times, signals, method as BaselineMethod);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Baseline correction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to apply baseline correction' },
      { status: 500 }
    );
  }
}

function runBaselineCorrection(
  times: number[],
  signals: number[],
  method: BaselineMethod
): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonPath = join(process.cwd(), '../packages/experiments/python/baseline_correction.py');
    
    // Spawn Python process
    const python = spawn('python3', [pythonPath, method]);
    
    let outputData = '';
    let errorData = '';

    // Send data to Python via stdin
    python.stdin.write(JSON.stringify({ times, signals }));
    python.stdin.end();

    // Collect output
    python.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${errorData}`));
        return;
      }

      try {
        const result = JSON.parse(outputData);
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${outputData}`));
      }
    });

    python.on('error', (err) => {
      reject(new Error(`Failed to spawn Python process: ${err.message}`));
    });
  });
}
