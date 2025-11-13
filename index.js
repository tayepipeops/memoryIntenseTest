// index.js
console.log("Starting memory hog...");

const MEMORY_CHUNK_SIZE_MB = 50; // Size of each chunk in MB
const ALLOCATION_INTERVAL_MS = 500; // Time between allocations
const MAX_MEMORY_MB = 4000; // Stop after this much (approx)

const chunks = [];
let total = 0;

function allocateMemory() {
  const size = MEMORY_CHUNK_SIZE_MB * 1024 * 1024; // bytes
  const chunk = Buffer.alloc(size, "a");
  chunks.push(chunk);
  total += MEMORY_CHUNK_SIZE_MB;

  console.log(`Allocated ${total} MB so far`);

  if (total >= MAX_MEMORY_MB) {
    console.log("Reached max memory limit, holding...");
    return;
  }

  setTimeout(allocateMemory, ALLOCATION_INTERVAL_MS);
}

allocateMemory();

// Keep process alive
setInterval(() => {
  console.log(
    `Still running... Memory used: ${(
      process.memoryUsage().heapUsed /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}, 2000);
