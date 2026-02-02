<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-white font-semibold">Back to Home</span>
          </router-link>
          <h1 class="text-xl font-bold text-white">EVM Memory Basics</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Memory Structure -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">🧠 Understanding EVM Memory</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400">
            EVM memory is a byte-addressable, expandable array used for temporary data during execution.
            Unlike storage (persistent), memory is <strong class="text-white">cleared after each transaction</strong>.
          </p>

          <!-- Memory Regions -->
          <div class="grid md:grid-cols-4 gap-3">
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
              <div class="text-xl font-bold text-yellow-400 mb-1">0x00-0x3f</div>
              <div class="text-xs text-gray-400 mb-2">64 bytes</div>
              <div class="text-sm text-white font-semibold mb-1">Scratch Space</div>
              <div class="text-xs text-gray-400">Temporary work area for hashing</div>
            </div>
            
            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3">
              <div class="text-xl font-bold text-purple-400 mb-1">0x40-0x5f</div>
              <div class="text-xs text-gray-400 mb-2">32 bytes</div>
              <div class="text-sm text-white font-semibold mb-1">Free Mem Pointer</div>
              <div class="text-xs text-gray-400">Points to next free location</div>
            </div>
            
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3">
              <div class="text-xl font-bold text-blue-400 mb-1">0x60-0x7f</div>
              <div class="text-xs text-gray-400 mb-2">32 bytes</div>
              <div class="text-sm text-white font-semibold mb-1">Zero Slot</div>
              <div class="text-xs text-gray-400">Always zero (rarely used)</div>
            </div>
            
            <div class="bg-green-500/10 border border-green-500/30 rounded p-3">
              <div class="text-xl font-bold text-green-400 mb-1">0x80+</div>
              <div class="text-xs text-gray-400 mb-2">∞ bytes</div>
              <div class="text-sm text-white font-semibold mb-1">Free Memory</div>
              <div class="text-xs text-gray-400">Your data starts here</div>
            </div>
          </div>

          <!-- Memory Management -->
          <div class="bg-gray-800/50 rounded p-4 border-l-4 border-purple-500">
            <div class="text-sm font-semibold text-purple-400 mb-2">💡 Memory Management</div>
            <div class="text-xs text-gray-400 space-y-1">
              <div>• Free Memory Pointer (0x40) is <strong class="text-white">critical</strong> for memory allocation</div>
              <div>• Solidity initializes it to 0x80 at contract start</div>
              <div>• Every allocation must update this pointer to prevent overwrites</div>
              <div>• Memory expands in 32-byte words (gas cost increases quadratically)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Basic Types in Memory -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">📦 Basic Types in Memory</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400 mb-4">
            All types in memory are stored in 32-byte (256-bit) slots, even if the actual data is smaller.
          </p>

          <!-- uint256 -->
          <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-sm font-bold text-blue-400 mb-1">uint256 / int256</div>
                <div class="text-xs text-gray-400">Full 32-byte word</div>
              </div>
              <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">32 bytes</div>
            </div>
            <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2 mb-2">
              0x<span class="text-blue-400">00000000000000000000000000000000000000000000000000000000000003e8</span>
            </div>
            <div class="text-xs text-gray-400">
              Value: 1000 (0x3e8), right-aligned in 32 bytes
            </div>
          </div>

          <!-- address -->
          <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-green-400">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-sm font-bold text-green-400 mb-1">address</div>
                <div class="text-xs text-gray-400">20 bytes, right-aligned</div>
              </div>
              <div class="px-2 py-1 bg-green-500/20 rounded text-xs font-mono text-green-400">32 bytes</div>
            </div>
            <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2 mb-2">
              0x<span class="text-gray-600">000000000000000000000000</span><span class="text-green-400">742d35Cc6634C0532925a3b844E9e5fc</span>
            </div>
            <div class="text-xs text-gray-400">
              12 zero bytes + 20 bytes address
            </div>
          </div>

          <!-- bool -->
          <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-400">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-sm font-bold text-yellow-400 mb-1">bool</div>
                <div class="text-xs text-gray-400">Stored as 0x01 or 0x00</div>
              </div>
              <div class="px-2 py-1 bg-yellow-500/20 rounded text-xs font-mono text-yellow-400">32 bytes</div>
            </div>
            <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2 mb-2">
              0x<span class="text-gray-600">0000000000000000000000000000000000000000000000000000000000000001</span>
            </div>
            <div class="text-xs text-gray-400">
              true = 0x01, false = 0x00
            </div>
          </div>

          <!-- string -->
          <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-400">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-sm font-bold text-purple-400 mb-1">string / bytes</div>
                <div class="text-xs text-gray-400">Length + data (dynamic)</div>
              </div>
              <div class="px-2 py-1 bg-purple-500/20 rounded text-xs font-mono text-purple-400">64+ bytes</div>
            </div>
            <div class="space-y-2">
              <div>
                <div class="text-xs text-gray-500 mb-1">Slot 1: Length</div>
                <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                  0x<span class="text-purple-400">0000000000000000000000000000000000000000000000000000000000000005</span>
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">Slot 2+: Data (left-aligned)</div>
                <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                  0x<span class="text-purple-400">48656c6c6f</span><span class="text-gray-600">000000000000000000000000000000000000000000000000000000</span>
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2">
              "Hello" = 0x48656c6c6f (5 bytes)
            </div>
          </div>

          <!-- struct/array -->
          <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-red-400">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-sm font-bold text-red-400 mb-1">struct / array (memory)</div>
                <div class="text-xs text-gray-400">Pointer to memory location</div>
              </div>
              <div class="px-2 py-1 bg-red-500/20 rounded text-xs font-mono text-red-400">32 bytes ptr</div>
            </div>
            <div class="text-xs text-gray-400 mb-2">
              Complex types store a pointer (32 bytes) pointing to their actual data location
            </div>
            <div class="bg-gray-900 rounded p-2">
              <div class="font-mono text-xs text-gray-300 space-y-1">
                <div><span class="text-gray-500">// uint256[] memory arr</span></div>
                <div>0x80: <span class="text-red-400">0x...c0</span> <span class="text-gray-500">// pointer to 0xc0</span></div>
                <div>0xc0: <span class="text-white">0x...03</span> <span class="text-gray-500">// length = 3</span></div>
                <div>0xe0: <span class="text-white">0x...0a</span> <span class="text-gray-500">// arr[0] = 10</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assembly Functions -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">⚡ Common Assembly Memory Operations</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Assembly provides low-level opcodes for direct memory and data manipulation. Here are the most common ones used in DomainUtils.
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- Memory Operations -->
            <div class="col-span-2 mb-2">
              <h3 class="text-lg font-semibold text-white mb-3">📝 Memory Read/Write</h3>
            </div>

            <!-- mstore -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-blue-400 mb-2">mstore(pos, val)</div>
              <div class="text-xs text-gray-400 mb-3">Store 32-byte value at memory position</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    mstore(0x80, 0x48656c6c6f)
    // memory[0x80] = 0x00...48656c6c6f
}</code></pre>
              </div>
            </div>

            <!-- mload -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-green-400 mb-2">mload(pos)</div>
              <div class="text-xs text-gray-400 mb-3">Load 32-byte value from memory position</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    let val := mload(0x80)
    // val = memory[0x80]
}</code></pre>
              </div>
            </div>

            <!-- mstore8 -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-yellow-400 mb-2">mstore8(pos, val)</div>
              <div class="text-xs text-gray-400 mb-3">Store single byte at memory position</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    mstore8(0x80, 0xff)
    // memory[0x80] = 0xff (only 1 byte)
}</code></pre>
              </div>
            </div>

            <!-- calldatacopy -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-purple-400 mb-2">calldatacopy(t, f, s)</div>
              <div class="text-xs text-gray-400 mb-3">Copy s bytes from calldata[f] to memory[t]</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    calldatacopy(0x80, 0, 32)
    // Copy first 32 bytes of calldata
}</code></pre>
              </div>
            </div>

            <!-- Arithmetic Operations -->
            <div class="col-span-2 mt-4 mb-2">
              <h3 class="text-lg font-semibold text-white mb-3">🔢 Arithmetic & Comparison</h3>
            </div>

            <!-- add/sub -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-red-400 mb-2">add / sub / mul / div</div>
              <div class="text-xs text-gray-400 mb-3">Basic arithmetic operations</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    let ptr := mload(0x40)
    let next := add(ptr, 0x20)  // ptr + 32
    let prev := sub(ptr, 0x20)  // ptr - 32
    mstore(0x40, next)
}</code></pre>
              </div>
            </div>

            <!-- lt/gt/eq -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-orange-400 mb-2">lt / gt / eq</div>
              <div class="text-xs text-gray-400 mb-3">Less than, greater than, equal comparison</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    if lt(a, b) { }  // if a < b
    if gt(a, b) { }  // if a > b
    if eq(a, b) { }  // if a == b
}</code></pre>
              </div>
            </div>

            <!-- Bitwise Operations -->
            <div class="col-span-2 mt-4 mb-2">
              <h3 class="text-lg font-semibold text-white mb-3">🔀 Bitwise Operations</h3>
            </div>

            <!-- shl/shr -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-pink-400 mb-2">shl / shr</div>
              <div class="text-xs text-gray-400 mb-3">Bit shifting (left/right)</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    let shifted := shl(128, ptr)
    // Shift left by 128 bits
    // Example: 0x12 → 0x120000...
    
    let len := shr(128, value)
    // Shift right by 128 bits
    // Example: 0x...12 → 0x12
}</code></pre>
              </div>
            </div>

            <!-- and -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-cyan-400 mb-2">and</div>
              <div class="text-xs text-gray-400 mb-3">Bitwise AND operation</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    // Extract lower 128 bits
    let mask := shr(128, not(0))  // 0x0...0fff...fff
    let lower := and(value, mask)
    
    // Clear last byte
    let cleared := and(value, not(0xff))
}</code></pre>
              </div>
            </div>

            <!-- or -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-teal-400 mb-2">or</div>
              <div class="text-xs text-gray-400 mb-3">Bitwise OR operation</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    // Pack pointer and length into Slice
    let ptr := 0xa0
    let len := 5
    let slice := or(len, shl(128, ptr))
    // Result: 0x...a0...005
}</code></pre>
              </div>
            </div>

            <!-- not -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="text-sm font-bold text-indigo-400 mb-2">not</div>
              <div class="text-xs text-gray-400 mb-3">Bitwise NOT (invert all bits)</div>
              <div class="bg-gray-900 rounded p-2">
                <pre class="text-xs font-mono text-gray-300"><code>assembly {
    let allOnes := not(0)
    // = 0xffff...ffff (all bits set)
    
    let mask := not(0xff)
    // = 0xffff...ff00 (clear last byte)
}</code></pre>
              </div>
            </div>

            <!-- Hashing -->
            <div class="col-span-2 mt-4 mb-2">
              <h3 class="text-lg font-semibold text-white mb-3">🔐 Hashing & Special</h3>
            </div>

            <!-- keccak256 -->
            <div class="bg-gray-800 rounded-lg p-4 col-span-2">
              <div class="text-sm font-bold text-purple-400 mb-2">keccak256(offset, length)</div>
              <div class="text-xs text-gray-400 mb-3">
                Compute keccak256 hash directly from memory (different from Solidity's keccak256!)
              </div>
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <div class="text-xs text-gray-500 mb-2">Assembly version:</div>
                  <div class="bg-gray-900 rounded p-2">
                    <pre class="text-xs font-mono text-gray-300"><code>assembly {
    // Hash 5 bytes starting at 0xa0
    let hash := keccak256(0xa0, 5)
    
    // Parameters:
    // 1. offset: memory address
    // 2. length: bytes to hash
}</code></pre>
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-2">Solidity equivalent:</div>
                  <div class="bg-gray-900 rounded p-2">
                    <pre class="text-xs font-mono text-gray-300"><code>// Solidity handles memory automatically
bytes32 hash = keccak256(bytes(str));

// Assembly gives you control
assembly {
    let ptr := add(str, 32)
    let len := mload(str)
    hash := keccak256(ptr, len)
}</code></pre>
                  </div>
                </div>
              </div>
              <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
                <div class="text-xs text-blue-400 font-semibold mb-1">💡 Use Case: Zero-Copy Hashing</div>
                <div class="text-xs text-gray-400">
                  From DomainUtils: hash a string slice without converting back to string
                </div>
                <div class="bg-gray-900 rounded p-2 mt-2">
                  <pre class="text-xs font-mono text-gray-300"><code>function tokenId(Slice self) returns (bytes32) {
    assembly {
        $ := keccak256(
            shr(128, self),              // Extract pointer
            and(self, shr(128, not(0)))  // Extract length
        )
    }
    // No memory allocation, no data copying!
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Memory Safety Note -->
          <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-4 mt-6">
            <div class="text-sm font-bold text-yellow-400 mb-2">⚠️ Memory Safety</div>
            <div class="text-xs text-gray-400 space-y-1">
              <div>• Always update free memory pointer (0x40) after allocation</div>
              <div>• Use <code class="text-yellow-400">assembly ("memory-safe")</code> annotation when possible</div>
              <div>• Never write to 0x40-0x5f directly (it's the free memory pointer!)</div>
              <div>• Remember: memory is byte-addressable, but ops work on 32-byte words</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Step -->
      <div class="card">
        <div class="card-body text-center py-8">
          <div class="text-2xl mb-4">🚀</div>
          <h3 class="text-xl font-bold text-white mb-3">Ready for Advanced Optimization?</h3>
          <p class="text-gray-400 mb-6">
            Now that you understand memory basics, see how DomainUtils uses assembly to optimize string operations
          </p>
          <router-link to="/memory/domainutils" class="btn btn-primary">
            View DomainUtils Case Study →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Memory basics view - no interactive state needed
</script>
