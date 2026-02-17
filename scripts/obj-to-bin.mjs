import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const objPath = resolve(__dirname, '../public/assets/mountain.obj');
const binPath = resolve(__dirname, '../public/assets/mountain.bin');

const text = readFileSync(objPath, 'utf-8');
const positions = [];

for (const line of text.split('\n')) {
  if (line.startsWith('v ')) {
    const parts = line.trim().split(/\s+/);
    positions.push(+parts[1], +parts[2], +parts[3]);
  }
}

const buf = new Float32Array(positions);
writeFileSync(binPath, Buffer.from(buf.buffer));

console.log(`Wrote ${buf.length / 3} vertices (${buf.byteLength} bytes) to mountain.bin`);
