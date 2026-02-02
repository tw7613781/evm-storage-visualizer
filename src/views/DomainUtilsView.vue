<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/memory/basics" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-white font-semibold">Back to Memory Basics</span>
          </router-link>
          <h1 class="text-xl font-bold text-white">DomainUtils: Assembly Optimization Case Study</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <!-- Step 1: The Requirements -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">📋 Step 1: What Does DomainUtils Need to Do?</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400">
            The <code class="text-purple-400">did-contracts</code> project implements a hierarchical domain name system similar to DNS.
            Domains like <code class="text-purple-400">"alice.bob.charlie.did"</code> require frequent parsing and validation.
          </p>

          <!-- Core Requirements -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-4">
              <div class="text-sm font-bold text-blue-400 mb-3">🔍 Parsing Operations (High Frequency)</div>
              <div class="text-xs text-gray-300 space-y-2">
                <div><strong>Split domain into levels:</strong></div>
                <div class="pl-3">• "alice.bob.did" → ["alice", "bob", "did"]</div>
                
                <div class="mt-2"><strong>Extract label:</strong></div>
                <div class="pl-3">• "alice.bob.did" → "alice"</div>
                
                <div class="mt-2"><strong>Get parent domain:</strong></div>
                <div class="pl-3">• "alice.bob.did" → "bob.did"</div>
                
                <div class="mt-2"><strong>Iterate all levels:</strong></div>
                <div class="pl-3">• Used for validation, permission checks</div>
              </div>
            </div>

            <div class="bg-green-500/10 border border-green-500/30 rounded p-4">
              <div class="text-sm font-bold text-green-400 mb-3">⚡ Performance Requirements</div>
              <div class="text-xs text-gray-300 space-y-2">
                <div><strong>Called on every transaction:</strong></div>
                <div class="pl-3">• Domain registration</div>
                <div class="pl-3">• Domain transfer</div>
                <div class="pl-3">• Metadata updates</div>
                <div class="pl-3">• Permission checks</div>
                
                <div class="mt-2 text-yellow-400">
                  💰 <strong>Gas efficiency is critical</strong> - users pay for every operation
                </div>
              </div>
            </div>
          </div>

          <!-- Real-World Usage Example -->
          <div class="bg-gray-800/50 rounded p-4 border-l-4 border-purple-500">
            <div class="text-sm font-bold text-purple-400 mb-2">Real Example from did-contracts</div>
            <pre class="text-xs font-mono text-gray-300 overflow-x-auto"><code>function register(string memory domain) public {
    // Need to:
    // 1. Validate each level of the domain
    // 2. Check ownership of parent domain
    // 3. Generate token ID from domain hash
    // 4. Store domain metadata
    
    // For "alice.bob.did":
    // - Split into ["alice", "bob", "did"]
    // - Validate "alice" is valid label
    // - Check caller owns "bob.did"
    // - Hash "alice.bob.did" for token ID
    
    // This happens THOUSANDS of times per day!
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Step 2: Why Solidity's Built-in String Sucks -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">❌ Step 2: Why Solidity's Built-in String is Inadequate</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400">
            Solidity has <strong class="text-white">no built-in string manipulation functions</strong>. Let's see what happens when you try to split a domain.
          </p>

          <!-- The Problem -->
          <div class="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div class="text-sm font-bold text-red-400 mb-3">🐌 Pure Solidity Implementation (Hypothetical)</div>
            
            <pre class="text-xs font-mono text-gray-300 bg-gray-900 rounded p-3 mb-3"><code>function splitDomain(string memory domain) 
    returns (string memory label, string memory parent) 
{
    bytes memory domainBytes = bytes(domain);
    
    // 1. Find '.' position - O(n) loop
    uint dotPos = 0;
    for (uint i = 0; i < domainBytes.length; i++) {
        if (domainBytes[i] == '.') {
            dotPos = i;
            break;
        }
    }
    
    // 2. Allocate NEW memory for label
    bytes memory labelBytes = new bytes(dotPos);
    
    // 3. Copy bytes one by one - O(n) copy
    for (uint i = 0; i < dotPos; i++) {
        labelBytes[i] = domainBytes[i];
    }
    
    // 4. Allocate NEW memory for parent
    uint parentLen = domainBytes.length - dotPos - 1;
    bytes memory parentBytes = new bytes(parentLen);
    
    // 5. Copy bytes again - another O(n) copy
    for (uint i = 0; i < parentLen; i++) {
        parentBytes[i] = domainBytes[dotPos + 1 + i];
    }
    
    label = string(labelBytes);
    parent = string(parentBytes);
}</code></pre>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-900 rounded p-3">
                <div class="text-xs text-red-400 font-semibold mb-2">💸 Gas Cost Breakdown</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• Find '.' position: ~50 gas</div>
                  <div>• Allocate label memory: ~100 gas</div>
                  <div>• Copy label bytes: ~100 gas</div>
                  <div>• Allocate parent memory: ~100 gas</div>
                  <div>• Copy parent bytes: ~150 gas</div>
                  <div class="border-t border-red-500/30 mt-2 pt-2">
                    <strong>Total per split: ~500 gas</strong>
                  </div>
                </div>
              </div>

              <div class="bg-gray-900 rounded p-3">
                <div class="text-xs text-red-400 font-semibold mb-2">📊 For "alice.bob.charlie.did"</div>
                <div class="text-xs text-gray-300 space-y-2">
                  <div>Need 3 splits to get all levels:</div>
                  <div>• Split 1: "alice" + "bob.charlie.did"</div>
                  <div>• Split 2: "bob" + "charlie.did"</div>
                  <div>• Split 3: "charlie" + "did"</div>
                  <div class="border-t border-red-500/30 mt-2 pt-2">
                    <strong class="text-red-400">3 × 500 gas = ~1,500 gas</strong>
                  </div>
                  <div class="text-red-400">+ 256 bytes memory allocated</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Why It's Bad -->
          <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
            <div class="text-sm font-bold text-yellow-400 mb-2">⚠️ Fundamental Problems</div>
            <div class="text-xs text-gray-400 space-y-2">
              <div>1. <strong class="text-white">Every substring creates a new copy</strong> - massive memory waste</div>
              <div>2. <strong class="text-white">No way to reference part of a string</strong> - Solidity has no "string slice" concept</div>
              <div>3. <strong class="text-white">Byte-by-byte loops are expensive</strong> - gas costs add up quickly</div>
              <div>4. <strong class="text-white">Memory allocation overhead</strong> - each allocation expands memory, increasing gas cost quadratically</div>
              <div>5. <strong class="text-white">Called thousands of times</strong> - small inefficiencies compound into huge costs</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Why Assembly is the Answer -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">✅ Step 3: Why Assembly Solves This Perfectly</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400">
            Assembly gives us the low-level control needed to implement <strong class="text-white">zero-copy string operations</strong>.
          </p>

          <!-- Assembly Advantages -->
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-green-500/10 border border-green-500/30 rounded p-4">
              <div class="text-sm font-bold text-green-400 mb-2">🎯 Direct Memory Access</div>
              <div class="text-xs text-gray-400">
                Assembly lets us read memory at any address and manipulate pointers directly - impossible in pure Solidity
              </div>
            </div>

            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-4">
              <div class="text-sm font-bold text-blue-400 mb-2">📦 Pack Data Structures</div>
              <div class="text-xs text-gray-400">
                We can pack pointer + length into a single uint256 using bit shifting - creating a "string view"
              </div>
            </div>

            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-4">
              <div class="text-sm font-bold text-purple-400 mb-2">🚀 Zero-Copy Operations</div>
              <div class="text-xs text-gray-400">
                Multiple "slices" can reference different parts of the same memory buffer - no copying needed!
              </div>
            </div>
          </div>

          <!-- The Key Insight -->
          <div class="bg-purple-500/10 border border-purple-500/30 rounded p-4">
            <div class="text-sm font-bold text-purple-400 mb-3">💡 The Key Insight: Slice = Pointer + Length</div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <div class="text-xs text-gray-400 mb-2">String in memory:</div>
                <div class="bg-gray-900 rounded p-2 font-mono text-xs mb-2">
                  <div><span class="text-gray-500">0x80:</span> <span class="text-white">0x0d</span> <span class="text-gray-500">// length = 13</span></div>
                  <div><span class="text-gray-500">0xa0:</span> <span class="text-white">"alice.bob.did"</span></div>
                </div>
                <div class="text-xs text-gray-400">
                  The actual string data sits in memory. We don't need to copy it!
                </div>
              </div>

              <div>
                <div class="text-xs text-gray-400 mb-2">Create multiple views:</div>
                <div class="bg-gray-900 rounded p-2 font-mono text-xs space-y-1">
                  <div class="text-green-400">// "alice" - pointer=0xa0, length=5</div>
                  <div class="text-blue-400">// "bob" - pointer=0xa6, length=3</div>
                  <div class="text-yellow-400">// "did" - pointer=0xaa, length=3</div>
                </div>
                <div class="text-xs text-gray-400 mt-2">
                  All pointing to the <strong class="text-white">same memory</strong>!
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="text-left text-gray-400 pb-3">Aspect</th>
                  <th class="text-center text-red-400 pb-3">Pure Solidity</th>
                  <th class="text-center text-green-400 pb-3">Assembly + Slice</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr class="border-b border-gray-800">
                  <td class="py-3">Split "alice.bob.did"</td>
                  <td class="text-center text-red-400">~1,500 gas</td>
                  <td class="text-center text-green-400">~350 gas</td>
                </tr>
                <tr class="border-b border-gray-800">
                  <td class="py-3">Memory allocated</td>
                  <td class="text-center text-red-400">256 bytes</td>
                  <td class="text-center text-green-400">0 bytes</td>
                </tr>
                <tr class="border-b border-gray-800">
                  <td class="py-3">Data copies</td>
                  <td class="text-center text-red-400">3 full copies</td>
                  <td class="text-center text-green-400">0 copies</td>
                </tr>
                <tr>
                  <td class="py-3">Can reference substrings?</td>
                  <td class="text-center text-red-400">❌ No</td>
                  <td class="text-center text-green-400">✅ Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- The Solution: Slice -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">✨ The Solution: DomainUtils.Slice</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400">
            Instead of copying strings, DomainUtils uses a clever <code class="text-purple-400">Slice</code> type that packs a memory pointer and length into a single uint256.
          </p>

          <!-- Slice Structure -->
          <div class="grid md:grid-cols-2 gap-4">
            <!-- Traditional String -->
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div class="text-sm font-bold text-yellow-400 mb-3">❌ Traditional String</div>
              <div class="bg-gray-900 rounded p-3 font-mono text-xs mb-3">
                <div class="text-gray-500">// string memory str</div>
                <div class="text-yellow-400">0x80: 0x05 (length)</div>
                <div class="text-yellow-400">0xa0: "Hello" (data)</div>
              </div>
              <div class="text-xs text-gray-400 space-y-1">
                <div>• Takes 64+ bytes</div>
                <div>• Requires 2 memory reads</div>
                <div>• Copying allocates new memory</div>
                <div>• Passing means passing pointer</div>
              </div>
            </div>

            <!-- Slice -->
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div class="text-sm font-bold text-purple-400 mb-3">✅ DomainUtils.Slice</div>
              <div class="bg-gray-900 rounded p-3 font-mono text-xs mb-3">
                <div class="text-gray-500">// type Slice is uint256</div>
                <div class="text-purple-400">High 128 bits: Pointer (0xa0)</div>
                <div class="text-purple-400">Low 128 bits: Length (5)</div>
              </div>
              <div class="text-xs text-gray-400 space-y-1">
                <div>• Only 32 bytes (one uint256)</div>
                <div>• Single value to pass around</div>
                <div>• No data copying needed</div>
                <div>• Direct memory reference</div>
              </div>
            </div>
          </div>

          <!-- Type Definition -->
          <div class="bg-gray-800/50 rounded p-4 border-l-4 border-purple-500">
            <div class="text-sm font-bold text-purple-400 mb-2">Slice Type Definition</div>
            <pre class="text-xs font-mono text-gray-300 overflow-x-auto"><code>type Slice is uint256;

// Pack pointer + length into one uint256
function asSlice(string memory self) internal pure returns (Slice $) {
    assembly {
        let l := mload(self)          // Load length
        let p := add(32, self)         // Pointer to data
        $ := or(l, shl(128, p))        // Pack: high 128 = ptr, low 128 = len
    }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Key Operations -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">🔧 Key Operations with Zero-Copy</h2>
        </div>
        <div class="card-body space-y-6">
          
          <!-- Create Slice -->
          <div>
            <div class="text-lg font-bold text-white mb-3">1. Create Slice (Zero Allocation)</div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-800 rounded p-4">
                <div class="text-sm text-gray-400 mb-2">Original string in memory:</div>
                <div class="bg-gray-900 rounded p-2 font-mono text-xs space-y-1">
                  <div><span class="text-gray-500">0x80:</span> <span class="text-white">0x...05</span> <span class="text-gray-500">// length</span></div>
                  <div><span class="text-gray-500">0xa0:</span> <span class="text-white">0x616c696365...</span> <span class="text-gray-500">// "alice"</span></div>
                </div>
              </div>
              <div class="bg-gray-800 rounded p-4">
                <div class="text-sm text-gray-400 mb-2">After <code>domain.asSlice()</code>:</div>
                <div class="bg-gray-900 rounded p-2 font-mono text-xs">
                  <div class="text-purple-400">Slice = 0x000000a0...000005</div>
                  <div class="text-gray-500 mt-2">// Just packed pointer + length</div>
                  <div class="text-gray-500">// No memory allocated!</div>
                  <div class="text-green-400 mt-2">Cost: ~50 gas</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Split Domain -->
          <div>
            <div class="text-lg font-bold text-white mb-3">2. Split Domain (Zero Copying)</div>
            <div class="bg-gray-800 rounded p-4">
              <div class="text-sm text-gray-400 mb-3">Parse "alice.bob.did" into parts:</div>
              <pre class="text-xs font-mono text-gray-300 bg-gray-900 rounded p-3 mb-3"><code>function cut(Slice self) returns (Slice label, Slice parent, bool hasParent) {
    assembly {
        label := self
        let p := shr(128, self)  // Extract pointer
        let e := add(p, and(self, shr(128, not(0))))  // end = ptr + len
        
        for {} lt(p, e) { p := add(1, p) } {
            if eq(shr(248, mload(p)), 0x2e) {  // Found '.'
                let b := shr(128, self)
                label := or(sub(p, b), shl(128, b))  // Slice before '.'
                p := add(1, p)
                parent := or(sub(e, p), shl(128, p))  // Slice after '.'
                break
            }
        }
    }
}</code></pre>
              <div class="grid md:grid-cols-3 gap-3">
                <div class="bg-gray-900 rounded p-2">
                  <div class="text-xs text-purple-400 font-semibold mb-1">label</div>
                  <div class="font-mono text-xs text-white">ptr=0xa0, len=5</div>
                  <div class="text-xs text-gray-500">"alice"</div>
                </div>
                <div class="bg-gray-900 rounded p-2">
                  <div class="text-xs text-purple-400 font-semibold mb-1">parent</div>
                  <div class="font-mono text-xs text-white">ptr=0xa6, len=7</div>
                  <div class="text-xs text-gray-500">"bob.did"</div>
                </div>
                <div class="bg-green-500/20 rounded p-2">
                  <div class="text-xs text-green-400 font-semibold">Benefit</div>
                  <div class="text-xs text-white">Zero copy!</div>
                  <div class="text-xs text-gray-400">~200 gas</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hash from Slice -->
          <div>
            <div class="text-lg font-bold text-white mb-3">3. Hash Directly from Slice</div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-800 rounded p-4">
                <div class="text-sm text-gray-400 mb-2">Traditional way:</div>
                <pre class="text-xs font-mono text-gray-300 bg-gray-900 rounded p-2"><code>// Must convert back to string
string memory str = sliceToString(slice);
uint256 hash = uint256(
    keccak256(bytes(str))
);
// Extra allocation + copy!</code></pre>
              </div>
              <div class="bg-gray-800 rounded p-4">
                <div class="text-sm text-gray-400 mb-2">DomainUtils way:</div>
                <pre class="text-xs font-mono text-purple-300 bg-gray-900 rounded p-2"><code>// Hash directly from memory
function tokenId(Slice self) {
    assembly {
        $ := keccak256(
            shr(128, self),  // ptr
            and(self, shr(128, not(0)))  // len
        )
    }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Comparison -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">📊 Performance Comparison</h2>
        </div>
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="text-left text-gray-400 pb-3">Operation</th>
                  <th class="text-right text-red-400 pb-3">Traditional</th>
                  <th class="text-right text-green-400 pb-3">DomainUtils</th>
                  <th class="text-right text-purple-400 pb-3">Improvement</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr class="border-b border-gray-800">
                  <td class="py-3">Create substring</td>
                  <td class="text-right text-red-400">~220 gas</td>
                  <td class="text-right text-green-400">~50 gas</td>
                  <td class="text-right text-purple-400 font-bold">4.4x faster</td>
                </tr>
                <tr class="border-b border-gray-800">
                  <td class="py-3">Split "alice.bob.did" (3 parts)</td>
                  <td class="text-right text-red-400">~660 gas</td>
                  <td class="text-right text-green-400">~150 gas</td>
                  <td class="text-right text-purple-400 font-bold">4.4x faster</td>
                </tr>
                <tr class="border-b border-gray-800">
                  <td class="py-3">Parse 5-level domain</td>
                  <td class="text-right text-red-400">~1,100 gas</td>
                  <td class="text-right text-green-400">~250 gas</td>
                  <td class="text-right text-purple-400 font-bold">4.4x faster</td>
                </tr>
                <tr>
                  <td class="py-3">Memory allocated</td>
                  <td class="text-right text-red-400">256+ bytes</td>
                  <td class="text-right text-green-400">0 bytes</td>
                  <td class="text-right text-purple-400 font-bold">100% saved</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 bg-green-500/10 border border-green-500/30 rounded p-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400 mb-2">~77% Gas Savings</div>
              <div class="text-sm text-gray-400">Across all domain parsing operations</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Design Brilliance -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">💎 Design Brilliance</h2>
        </div>
        <div class="card-body space-y-4">
          <p class="text-gray-400 mb-4">
            What makes DomainUtils.Slice elegant and powerful:
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-4">
              <div class="text-sm font-bold text-purple-400 mb-2">🎯 Zero-Copy Semantics</div>
              <div class="text-xs text-gray-400">
                Multiple Slices can reference different parts of the <strong class="text-white">same memory buffer</strong>.
                No data duplication, ever.
              </div>
            </div>

            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-4">
              <div class="text-sm font-bold text-blue-400 mb-2">📦 Compact Representation</div>
              <div class="text-xs text-gray-400">
                Single uint256 contains everything needed. Easy to pass around, store in arrays, or use in mappings.
              </div>
            </div>

            <div class="bg-green-500/10 border border-green-500/30 rounded p-4">
              <div class="text-sm font-bold text-green-400 mb-2">⚡ Direct Operations</div>
              <div class="text-xs text-gray-400">
                Hash, compare, or manipulate strings without converting back to standard format. Maximum efficiency.
              </div>
            </div>

            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
              <div class="text-sm font-bold text-yellow-400 mb-2">🔒 Type Safety</div>
              <div class="text-xs text-gray-400">
                <code>type Slice is uint256</code> provides compile-time type safety while remaining a primitive under the hood.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- When to Use Assembly -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">🎓 Key Takeaways</h2>
        </div>
        <div class="card-body space-y-4">
          <div class="bg-green-500/10 border border-green-500/30 rounded p-4">
            <div class="text-sm font-bold text-green-400 mb-2">✅ When to Use Assembly</div>
            <div class="text-xs text-gray-400 space-y-1">
              <div>• Performance-critical code called frequently (like domain parsing)</div>
              <div>• Heavy string/bytes manipulation without built-in Solidity support</div>
              <div>• Need direct memory access for zero-copy operations</div>
              <div>• Working with custom packed data structures</div>
            </div>
          </div>

          <div class="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div class="text-sm font-bold text-red-400 mb-2">❌ When to Avoid Assembly</div>
            <div class="text-xs text-gray-400 space-y-1">
              <div>• Simple business logic (harder to audit, more prone to bugs)</div>
              <div>• When Solidity built-ins work fine and gas isn't critical</div>
              <div>• Complex algorithms (readability and security matter more)</div>
              <div>• Team lacks assembly expertise for code reviews</div>
            </div>
          </div>

          <div class="bg-purple-500/10 border border-purple-500/30 rounded p-4 text-center">
            <div class="text-sm font-bold text-purple-400 mb-2">💡 DomainUtils Lesson</div>
            <div class="text-xs text-gray-400">
              Assembly enables <strong class="text-white">fundamentally different</strong> approaches to problems.
              The Slice design wouldn't be possible in pure Solidity, unlocking <strong class="text-green-400">4x+ performance gains</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// DomainUtils case study - static educational content
</script>
