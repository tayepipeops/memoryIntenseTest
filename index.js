// index.js
console.log("Starting controlled memory + CPU stress test (≈1 CPU, 1 GB RAM)...");

const os = require("os");

// === Configuration ===
const TARGET_MEMORY_MB = 1024; // Total memory target (~1 GB)
const MEMORY_CHUNK_SIZE_MB = 25; // Allocate 25 MB per chunk
const ALLOCATION_INTERVAL_MS = 1000; // Allocate every 1 second
const CPU_LOAD_INTENSITY = 0.9; // 0–1 fraction of each second spent busy
const CPU_WORKERS = 1; // Use only one core

// === Memory Load ===
const chunks = [];
let total = 0;

function allocateMemory() {
  if (total >= TARGET_MEMORY_MB) {
    console.log("Reached 1 GB memory target. Holding steady...");
    return;
  }

  const size = MEMORY_CHUNK_SIZE_MB * 1024 * 1024;
  const chunk = Buffer.alloc(size, "x"); // allocate memory
  chunks.push(chunk);
  total += MEMORY_CHUNK_SIZE_MB;

  console.log(`Allocated ${total} MB so far`);

  setTimeout(allocateMemory, ALLOCATION_INTERVAL_MS);
}

// === CPU Load ===
function burnCPU() {
  const start = Date.now();
  const busyTime = 1000 * CPU_LOAD_INTENSITY; // ms per second to stay busy

  // Busy loop for busyTime milliseconds each second
  while (Date.now() - start < busyTime) {
    Math.sqrt(Math.random() * Math.random());
  }

  // Idle for the rest of the second
  const idleTime = 1000 - busyTime;
  setTimeout(burnCPU, idleTime);
}

// Start one CPU-burning loop
console.log("Starting CPU stress (≈1 core)...");
setImmediate(burnCPU);

// Start memory allocation
allocateMemory();

// === Monitor usage ===
setInterval(() => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const rss = process.memoryUsage().rss / 1024 / 1024;
  console.log(
    `Monitor → Heap: ${used.toFixed(2)} MB | RSS: ${rss.toFixed(
      2
    )} MB | CPU: ~${CPU_WORKERS} core`
  );
}, 2000);
