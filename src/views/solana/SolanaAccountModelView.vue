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
          <h1 class="text-xl font-bold text-white">Solana Account Model</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">Understanding Solana's Account Model</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            Solana uses a fundamentally different approach to storing state compared to EVM chains. 
            Instead of storing state inside smart contracts, Solana stores all state in <strong class="text-purple-400">accounts</strong>.
          </p>
          <p class="text-gray-300">
            Programs (Solana's term for smart contracts) are <strong class="text-purple-400">stateless</strong> - 
            they only contain executable code. All data is stored in separate accounts that programs can read from and write to.
          </p>
        </div>
      </div>

      <!-- Key Concept: Everything is an Account -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔑 Key Concept: Everything is an Account</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-cyan-400 mb-2">System Accounts</h4>
              <p class="text-sm text-gray-300">User wallet accounts that hold SOL and pay transaction fees</p>
              <div class="mt-2 text-xs text-gray-400">
                👤 Your wallet address
              </div>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-purple-400 mb-2">Programs</h4>
              <p class="text-sm text-gray-300">Executable code stored in accounts marked as <code class="text-xs bg-gray-800 px-1 py-0.5 rounded">executable: true</code></p>
              <div class="mt-2 text-xs text-gray-400">
                📦 Smart contracts
              </div>
            </div>
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-blue-400 mb-2">Data Accounts</h4>
              <p class="text-sm text-gray-300">Store program state, owned by programs</p>
              <div class="mt-2 text-xs text-gray-400">
                💾 Program storage
              </div>
            </div>
            <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-green-400 mb-2">Token Accounts</h4>
              <p class="text-sm text-gray-300">Special accounts for holding SPL tokens</p>
              <div class="mt-2 text-xs text-gray-400">
                🪙 USDC, USDT, etc.
              </div>
            </div>
          </div>
          
          <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-sm">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-gray-300">
                <strong class="text-cyan-400">For Users:</strong> When you create a wallet (Phantom, Solflare, etc.), 
                you get a <strong>System Account</strong> that holds SOL. To hold SPL tokens (like USDC), 
                you need to create separate <strong>Token Accounts</strong> - one for each token type.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Structure -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Left: Account Fields -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Account Structure</h3>
          </div>
          <div class="card-body space-y-4">
            <div v-for="field in accountFields" :key="field.name" class="border-l-4 pl-4" :class="field.borderColor">
              <div class="flex items-start justify-between mb-1">
                <h4 class="font-semibold text-white">{{ field.name }}</h4>
                <span class="text-xs text-gray-500 font-mono">{{ field.size }}</span>
              </div>
              <p class="text-sm text-gray-400 mb-2">{{ field.description }}</p>
              <code class="text-xs bg-gray-800 px-2 py-1 rounded block overflow-x-auto">{{ field.example }}</code>
            </div>
          </div>
        </div>

        <!-- Right: Visual Representation -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Otmoic Escrow Account Example</h3>
          </div>
          <div class="card-body">
            <p class="text-sm text-gray-400 mb-4">
              From the atomic swap bridge contract, showing how real-world state is stored:
            </p>
            
            <div class="space-y-3">
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Address</div>
                <code class="text-xs text-purple-400 break-all">{{ exampleAccount.address }}</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Owner (Program)</div>
                <code class="text-xs text-blue-400 break-all">{{ exampleAccount.owner }}</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-2">Lamports (Balance)</div>
                <div class="flex items-baseline gap-2">
                  <code class="text-xl text-green-400">{{ (exampleAccount.lamports / 1_000_000_000).toFixed(4) }}</code>
                  <span class="text-sm text-gray-400">SOL</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ exampleAccount.lamports.toLocaleString() }} lamports</div>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Data Size</div>
                <code class="text-xs text-white">{{ exampleAccount.dataSize }} bytes</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Executable</div>
                <code class="text-xs" :class="exampleAccount.executable ? 'text-yellow-400' : 'text-gray-400'">
                  {{ exampleAccount.executable }}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Owner vs Authority -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔐 Owner vs Authority: How Do You Control Your Accounts?</h3>
        </div>
        <div class="card-body">
          <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong class="text-yellow-400 text-base">Common Confusion:</strong>
                <p class="text-gray-300 mt-1">
                  "If the <code class="text-xs bg-gray-800 px-1 py-0.5 rounded">owner</code> is System Program or Token Program, 
                  how do I control my account?"
                </p>
              </div>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-6 mb-6">
            <!-- Owner -->
            <div class="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-5">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h4 class="text-lg font-bold text-purple-400">Owner (Program)</h4>
              </div>
              <div class="space-y-2 text-sm text-gray-300">
                <p><strong>What it is:</strong> Which program can modify the account's <code class="text-xs bg-gray-800 px-1 rounded">data</code> field</p>
                <p><strong>Purpose:</strong> Controls data write permissions</p>
                <p><strong>Example:</strong></p>
                <ul class="ml-4 space-y-1 text-xs">
                  <li>• System Program owns System Accounts</li>
                  <li>• Token Program owns Token Accounts</li>
                  <li>• Otmoic Program owns Escrow Accounts</li>
                </ul>
              </div>
            </div>

            <!-- Authority -->
            <div class="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg p-5">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <h4 class="text-lg font-bold text-cyan-400">Authority (You)</h4>
              </div>
              <div class="space-y-2 text-sm text-gray-300">
                <p><strong>What it is:</strong> Who has the <strong>private key</strong> to authorize operations</p>
                <p><strong>Purpose:</strong> Controls usage permissions</p>
                <p><strong>Example:</strong></p>
                <ul class="ml-4 space-y-1 text-xs">
                  <li>• Your private key → your System Account</li>
                  <li>• Token Account.data.owner = your address</li>
                  <li>• You sign → Program executes</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- How it works -->
          <div class="bg-gray-900 rounded-lg p-5 mb-6">
            <h4 class="font-semibold text-white mb-4">🔄 How Control Works: Transfer 100 USDC Example</h4>
            
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                <div class="flex-1">
                  <div class="font-semibold text-cyan-400 mb-1">You Sign Transaction</div>
                  <div class="text-sm text-gray-300">
                    Use your <strong>private key</strong> to sign: "Transfer 100 USDC from my Token Account to friend's account"
                  </div>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded block mt-2">
                    wallet.signTransaction({ from: "your_token_account", to: "friend_token_account", amount: 100 })
                  </code>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
                <div class="flex-1">
                  <div class="font-semibold text-purple-400 mb-1">Solana Validates</div>
                  <div class="text-sm text-gray-300 space-y-1">
                    <div>✓ Check signature (signed by your private key?)</div>
                    <div>✓ Check <code class="text-xs bg-gray-800 px-1 rounded">token_account.data.owner</code> == your address?</div>
                    <div>✓ Verification passed → Allow Token Program to execute</div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">3</div>
                <div class="flex-1">
                  <div class="font-semibold text-green-400 mb-1">Token Program Executes</div>
                  <div class="text-sm text-gray-300">
                    Token Program (as the <code class="text-xs bg-gray-800 px-1 rounded">owner</code>) modifies account data:
                  </div>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded block mt-2 text-gray-300">
                    your_token_account.data.amount -= 100_000000<br>
                    friend_token_account.data.amount += 100_000000
                  </code>
                </div>
              </div>

              <!-- Important Note -->
              <div class="flex gap-4 mt-4 pt-4 border-t border-gray-700">
                <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div class="text-sm">
                  <strong class="text-red-400">Without your signature:</strong> 
                  <span class="text-gray-300"> Transaction is rejected. No one can move your tokens!</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison with Bank Account -->
          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h5 class="font-semibold text-blue-400 mb-3">🏦 Real-World Analogy</h5>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-semibold text-gray-300 mb-2">Bank Account:</div>
                <ul class="text-gray-400 space-y-1">
                  <li>• <strong>Bank</strong> = manages the account system</li>
                  <li>• <strong>You</strong> = account holder with ID card</li>
                  <li>• You show ID → Bank allows withdrawal</li>
                  <li>• No ID = Bank refuses</li>
                </ul>
              </div>
              <div>
                <div class="font-semibold text-gray-300 mb-2">Solana Account:</div>
                <ul class="text-gray-400 space-y-1">
                  <li>• <strong>Program (owner)</strong> = manages account rules</li>
                  <li>• <strong>You (authority)</strong> = holder with private key</li>
                  <li>• You sign → Program executes</li>
                  <li>• No signature = Program refuses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Account Example -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">👤 User Account Structure</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            As a regular user, here's what accounts you typically own:
          </p>
          
          <div class="bg-gray-900 rounded-lg p-6 mb-4">
            <div class="space-y-4">
              <!-- System Account -->
              <div class="border-l-4 border-cyan-500 pl-4">
                <div class="flex items-center gap-2 mb-2">
                  <h4 class="font-semibold text-cyan-400">Your Wallet (System Account)</h4>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded">7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU</code>
                </div>
                <div class="text-sm text-gray-300 space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">•</span>
                    <span>Owner: <code class="text-xs bg-gray-800 px-1 rounded">System Program (1111...1111)</code> <span class="text-xs text-purple-400">(can modify)</span></span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">•</span>
                    <span>Authority: <strong class="text-cyan-400">Your private key</strong> <span class="text-xs text-cyan-400">(you control)</span></span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">•</span>
                    <span>Holds: <strong class="text-green-400">2.5 SOL</strong> (native token)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500">•</span>
                    <span>Use: Send SOL, pay transaction fees, sign transactions</span>
                  </div>
                </div>
              </div>

              <!-- Token Accounts -->
              <div class="border-l-4 border-green-500 pl-4">
                <h4 class="font-semibold text-green-400 mb-2">Your Token Accounts</h4>
                <div class="space-y-3 text-sm text-gray-300">
                  <div class="bg-gray-800 rounded p-3">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono text-xs text-gray-500">Ab3kF9q...</span>
                      <span class="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">USDC Account</span>
                    </div>
                    <div class="text-xs text-gray-400 space-y-1">
                      <div>Owner: <code class="bg-gray-900 px-1 rounded">Token Program</code> <span class="text-purple-400">(can modify data)</span></div>
                      <div>Authority: <code class="bg-gray-900 px-1 rounded">data.owner = Your address</code> <span class="text-cyan-400">(you control)</span></div>
                      <div>Balance: <strong class="text-green-400">1,000 USDC</strong></div>
                    </div>
                  </div>
                  <div class="bg-gray-800 rounded p-3">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono text-xs text-gray-500">Cd5mN2p...</span>
                      <span class="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">USDT Account</span>
                    </div>
                    <div class="text-xs text-gray-400 space-y-1">
                      <div>Owner: <code class="bg-gray-900 px-1 rounded">Token Program</code></div>
                      <div>Authority: <code class="bg-gray-900 px-1 rounded">data.owner = Your address</code></div>
                      <div>Balance: <strong class="text-green-400">500 USDT</strong></div>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400 pl-3">
                    <span class="text-gray-500">💡</span> Each SPL token requires a separate Token Account
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-blue-400 mb-2">🔹 EVM Approach</h5>
              <div class="text-gray-300 space-y-1">
                <div>• One address holds ETH + all ERC20s</div>
                <div>• Token balances in contract mappings</div>
                <div>• Example: <code class="text-xs bg-gray-800 px-1 rounded">0x1234...5678</code></div>
              </div>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-purple-400 mb-2">🔹 Solana Approach</h5>
              <div class="text-gray-300 space-y-1">
                <div>• System Account holds only SOL</div>
                <div>• Each token needs its own account</div>
                <div>• More accounts, but enables parallelism</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Example from Otmoic -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📝 Real Code: Otmoic Escrow Account</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            This is the actual account structure from the Otmoic atomic swap bridge:
          </p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-purple-400">#[account]</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">Escrow</span> {
    <span class="text-gray-500">/// Sender address</span>
    <span class="text-blue-400">pub</span> from: <span class="text-green-400">Pubkey</span>,              <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Receiver address</span>
    <span class="text-blue-400">pub</span> to: <span class="text-green-400">Pubkey</span>,                <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Token program ID</span>
    <span class="text-blue-400">pub</span> token_program: <span class="text-green-400">Pubkey</span>,     <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Token mint address</span>
    <span class="text-blue-400">pub</span> mint: <span class="text-green-400">Pubkey</span>,              <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Source token account</span>
    <span class="text-blue-400">pub</span> source: <span class="text-green-400">Pubkey</span>,            <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Escrow token account</span>
    <span class="text-blue-400">pub</span> escrow_ata: <span class="text-green-400">Pubkey</span>,        <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// SOL amount locked</span>
    <span class="text-blue-400">pub</span> sol_amount: <span class="text-green-400">u64</span>,           <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// Token amount locked</span>
    <span class="text-blue-400">pub</span> token_amount: <span class="text-green-400">u64</span>,         <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// SOL fee</span>
    <span class="text-blue-400">pub</span> sol_fee: <span class="text-green-400">u64</span>,              <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// Token fee</span>
    <span class="text-blue-400">pub</span> token_fee: <span class="text-green-400">u64</span>,            <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// HTLC lock data</span>
    <span class="text-blue-400">pub</span> lock: <span class="text-yellow-400">Lock</span>,               <span class="text-gray-500">// nested struct</span>
    <span class="text-gray-500">/// Direction flag</span>
    <span class="text-blue-400">pub</span> is_out: <span class="text-green-400">bool</span>,             <span class="text-gray-500">// 1 byte</span>
}

<span class="text-gray-500">// Total size: 8 (discriminator) + 257 bytes = 265 bytes</span></code></pre>
          </div>
          
          <div class="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm text-gray-300">
                <strong class="text-blue-400">Why separate accounts?</strong> This design allows Solana to process transactions in parallel. 
                Multiple escrows can be created/confirmed simultaneously because each has its own account, 
                unlike EVM where all state is in one contract storage.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Takeaways -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">💡 Key Takeaways</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <h4 class="font-semibold text-purple-400">Solana Benefits</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Parallel Processing:</strong> Independent accounts can be modified simultaneously</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Clear Ownership:</strong> Each account has a clear owner program</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Rent Efficiency:</strong> Pay for storage based on account size</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>No Conflicts:</strong> Transactions touching different accounts don't conflict</span>
                </li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-blue-400">Developer Considerations</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Account Discovery:</strong> Need to know all account addresses upfront</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Rent Costs:</strong> Accounts must maintain minimum balance for rent</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Size Limits:</strong> Account data has maximum size (10MB)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Different Mental Model:</strong> Requires thinking in terms of accounts, not storage slots</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">🚀 Next Steps</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link 
            to="/solana/pda-seeds"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-purple-400 mb-2">→ PDA & Seeds</h4>
            <p class="text-sm text-gray-300">Learn how to deterministically derive account addresses</p>
          </router-link>
          
          <router-link 
            to="/solana/anchor-structures"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-blue-400 mb-2">→ Anchor Framework</h4>
            <p class="text-sm text-gray-300">Understand Anchor's account validation and macros</p>
          </router-link>
          
          <router-link 
            to="/solana/evm-comparison"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-green-400 mb-2">→ Full Comparison</h4>
            <p class="text-sm text-gray-300">Side-by-side code comparison with EVM contracts</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accountFields = ref([
  {
    name: 'address',
    size: '32 bytes',
    description: 'Unique identifier (public key) for this account',
    example: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
    borderColor: 'border-purple-500'
  },
  {
    name: 'owner',
    size: '32 bytes',
    description: 'Program ID that owns this account and can modify its data',
    example: '11111111111111111111111111111111 (System Program)',
    borderColor: 'border-blue-500'
  },
  {
    name: 'lamports',
    size: '8 bytes',
    description: 'Balance in lamports (1 SOL = 1,000,000,000 lamports), used for rent',
    example: '2039280 (≈ 0.00203928 SOL)',
    borderColor: 'border-green-500'
  },
  {
    name: 'data',
    size: 'variable',
    description: 'Raw bytes storing the account state, structure defined by owner program',
    example: '[0x01, 0x02, 0x03, ...] (serialized struct)',
    borderColor: 'border-yellow-500'
  },
  {
    name: 'executable',
    size: '1 byte',
    description: 'Whether this account contains executable program code',
    example: 'false (for data accounts), true (for programs)',
    borderColor: 'border-red-500'
  }
])

const exampleAccount = ref({
  address: '8uaB9H5DpKC9sNZT7YLr3vXkxYqH7F4eMkFp9z2Wc3Tr',
  owner: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
  lamports: 2039280,
  dataSize: 265,
  executable: false
})
</script>
