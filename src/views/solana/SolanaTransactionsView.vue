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
          <h1 class="text-xl font-bold text-white">Solana Transaction Structure</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">📦 What is a Solana Transaction?</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            A <strong class="text-blue-400">Transaction</strong> is a signed data structure that contains instructions 
            for the Solana runtime to execute. It's the fundamental unit of state change on Solana.
          </p>
          
          <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <strong class="text-blue-400 text-base">Key Insight</strong>
                <p class="text-gray-300 mt-2 text-sm">
                  Unlike EVM where each transaction executes <em>one</em> function call, 
                  Solana transactions can contain <em>multiple</em> instructions to different programs, 
                  all executed atomically!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- EVM vs Solana -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">⚖️ EVM vs Solana Transactions</h3>
        </div>
        <div class="card-body">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- EVM Transaction -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded">EVM Transaction</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                <pre class="text-xs"><code class="text-gray-300">{
  <span class="text-purple-400">"from"</span>: <span class="text-green-400">"0x742d..."</span>,
  <span class="text-purple-400">"to"</span>: <span class="text-green-400">"0x1234..."</span>,         <span class="text-gray-500">// Contract address</span>
  <span class="text-purple-400">"value"</span>: <span class="text-yellow-400">"0"</span>,              <span class="text-gray-500">// ETH to send</span>
  <span class="text-purple-400">"data"</span>: <span class="text-green-400">"0xa9059cbb..."</span>,  <span class="text-gray-500">// Function call</span>
  <span class="text-purple-400">"gas"</span>: <span class="text-yellow-400">21000</span>,
  <span class="text-purple-400">"gasPrice"</span>: <span class="text-green-400">"20 gwei"</span>,
  <span class="text-purple-400">"nonce"</span>: <span class="text-yellow-400">42</span>,
  <span class="text-purple-400">"signature"</span>: { <span class="text-yellow-400">v, r, s</span> }
}</code></pre>
              </div>
              <div class="space-y-2 text-xs text-gray-300">
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5">▸</span>
                  <span>One function call per transaction</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5">▸</span>
                  <span>Sender pays all gas fees</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5">▸</span>
                  <span>Nonce prevents replay attacks</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5">▸</span>
                  <span>Gas price set by sender</span>
                </div>
              </div>
            </div>

            <!-- Solana Transaction -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded">Solana Transaction</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                <pre class="text-xs"><code class="text-gray-300">{
  <span class="text-purple-400">"signatures"</span>: [<span class="text-green-400">"sig1", "sig2"</span>], <span class="text-gray-500">// Multiple signers!</span>
  <span class="text-purple-400">"message"</span>: {
    <span class="text-purple-400">"header"</span>: { ... },
    <span class="text-purple-400">"accountKeys"</span>: [        <span class="text-gray-500">// All accounts</span>
      <span class="text-green-400">"signer1"</span>, <span class="text-green-400">"program1"</span>, <span class="text-green-400">"account1"</span>, ...
    ],
    <span class="text-purple-400">"recentBlockhash"</span>: <span class="text-green-400">"..."</span>,
    <span class="text-purple-400">"instructions"</span>: [       <span class="text-gray-500">// Multiple calls!</span>
      { <span class="text-purple-400">programIdIndex</span>, <span class="text-purple-400">accounts</span>, <span class="text-purple-400">data</span> },
      { <span class="text-purple-400">programIdIndex</span>, <span class="text-purple-400">accounts</span>, <span class="text-purple-400">data</span> },
    ]
  }
}</code></pre>
              </div>
              <div class="space-y-2 text-xs text-gray-300">
                <div class="flex items-start gap-2">
                  <span class="text-purple-400 mt-0.5">▸</span>
                  <span>Multiple instructions per transaction</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-purple-400 mt-0.5">▸</span>
                  <span>Fixed fee (~0.000005 SOL/signature)</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-purple-400 mt-0.5">▸</span>
                  <span>Blockhash prevents replay (no nonce!)</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-purple-400 mt-0.5">▸</span>
                  <span>Multiple signers supported natively</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Anatomy -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔬 Transaction Anatomy</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-6">A Solana transaction has two main parts:</p>

          <!-- Part 1: Signatures -->
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded">1. Signatures</span>
              <span class="text-xs text-gray-500">Array of Ed25519 signatures</span>
            </div>
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm"><code class="text-gray-300"><span class="text-purple-400">signatures</span>: [
  <span class="text-green-400">"5j7s8f..."</span>,  <span class="text-gray-500">// First signer (fee payer)</span>
  <span class="text-green-400">"3k8d9s..."</span>,  <span class="text-gray-500">// Second signer (if needed)</span>
]</code></pre>
            </div>
            <div class="mt-3 text-sm text-gray-300 space-y-1">
              <p>• Each signature is 64 bytes (Ed25519)</p>
              <p>• First signer is always the <strong class="text-green-400">fee payer</strong></p>
              <p>• More signatures = higher transaction fee</p>
            </div>
          </div>

          <!-- Part 2: Message -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded">2. Message</span>
              <span class="text-xs text-gray-500">The actual transaction content</span>
            </div>
            
            <div class="space-y-4">
              <!-- Header -->
              <div class="border-l-4 border-purple-500 pl-4">
                <h4 class="font-semibold text-purple-400 mb-2">Header</h4>
                <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                  <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">header</span>: {
  <span class="text-purple-400">numRequiredSignatures</span>: <span class="text-yellow-400">2</span>,      <span class="text-gray-500">// Total signers needed</span>
  <span class="text-purple-400">numReadonlySignedAccounts</span>: <span class="text-yellow-400">0</span>,  <span class="text-gray-500">// Read-only signers</span>
  <span class="text-purple-400">numReadonlyUnsignedAccounts</span>: <span class="text-yellow-400">3</span> <span class="text-gray-500">// Read-only non-signers</span>
}</code></pre>
                </div>
              </div>

              <!-- Account Keys -->
              <div class="border-l-4 border-blue-500 pl-4">
                <h4 class="font-semibold text-blue-400 mb-2">Account Keys</h4>
                <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                  <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">accountKeys</span>: [
  <span class="text-green-400">"7xj8..."</span>,  <span class="text-gray-500">// [0] Fee payer (signer, writable)</span>
  <span class="text-green-400">"9kd3..."</span>,  <span class="text-gray-500">// [1] Another signer</span>
  <span class="text-green-400">"4f7a..."</span>,  <span class="text-gray-500">// [2] Program ID</span>
  <span class="text-green-400">"8s9d..."</span>,  <span class="text-gray-500">// [3] Data account (writable)</span>
  <span class="text-green-400">"2h5k..."</span>,  <span class="text-gray-500">// [4] Read-only account</span>
]

<span class="text-gray-500">// Order matters!</span>
<span class="text-gray-500">// 1. Signers (writable) → [0, 1]</span>
<span class="text-gray-500">// 2. Signers (readonly) → none</span>
<span class="text-gray-500">// 3. Non-signers (writable) → [3]</span>
<span class="text-gray-500">// 4. Non-signers (readonly) → [2, 4]</span></code></pre>
                </div>
              </div>

              <!-- Recent Blockhash -->
              <div class="border-l-4 border-green-500 pl-4">
                <h4 class="font-semibold text-green-400 mb-2">Recent Blockhash</h4>
                <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                  <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">recentBlockhash</span>: <span class="text-green-400">"4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ..."</span>

<span class="text-gray-500">// Acts as transaction ID and replay protection</span>
<span class="text-gray-500">// Valid for ~150 slots (~60 seconds)</span>
<span class="text-gray-500">// If too old → transaction rejected!</span></code></pre>
                </div>
              </div>

              <!-- Instructions -->
              <div class="border-l-4 border-yellow-500 pl-4">
                <h4 class="font-semibold text-yellow-400 mb-2">Instructions</h4>
                <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                  <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">instructions</span>: [
  {
    <span class="text-purple-400">programIdIndex</span>: <span class="text-yellow-400">2</span>,           <span class="text-gray-500">// accountKeys[2]</span>
    <span class="text-purple-400">accounts</span>: [<span class="text-yellow-400">0, 3, 4</span>],          <span class="text-gray-500">// Which accounts to use</span>
    <span class="text-purple-400">data</span>: <span class="text-green-400">"0x01ff3a..."</span>            <span class="text-gray-500">// Instruction data (bytes)</span>
  },
  {
    <span class="text-purple-400">programIdIndex</span>: <span class="text-yellow-400">2</span>,
    <span class="text-purple-400">accounts</span>: [<span class="text-yellow-400">1, 3</span>],
    <span class="text-purple-400">data</span>: <span class="text-green-400">"0x02aa9b..."</span>
  }
]

<span class="text-gray-500">// All instructions execute in order</span>
<span class="text-gray-500">// If ANY fails → entire transaction reverts!</span></code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Real Example -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">💼 Real Example: Otmoic Swap Transaction</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Let's see what a real transaction looks like when someone locks tokens in Otmoic's escrow:
          </p>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-gray-500">// User wants to lock 100 USDC in escrow</span>
<span class="text-gray-500">// This creates a transaction with 3 instructions:</span>

<span class="text-blue-400">Transaction</span> {
  signatures: [
    <span class="text-green-400">"user_signature"</span>  <span class="text-gray-500">// User signs & pays fee</span>
  ],
  
  message: {
    header: {
      numRequiredSignatures: <span class="text-yellow-400">1</span>,
      numReadonlySignedAccounts: <span class="text-yellow-400">0</span>,
      numReadonlyUnsignedAccounts: <span class="text-yellow-400">5</span>
    },
    
    accountKeys: [
      user,                    <span class="text-gray-500">// [0] Signer, fee payer</span>
      user_usdc_account,       <span class="text-gray-500">// [1] Writable (debit USDC)</span>
      escrow_pda,              <span class="text-gray-500">// [2] Writable (new account)</span>
      escrow_usdc_account,     <span class="text-gray-500">// [3] Writable (credit USDC)</span>
      obridge_program,         <span class="text-gray-500">// [4] Otmoic program</span>
      token_program,           <span class="text-gray-500">// [5] Token program (for CPI)</span>
      system_program,          <span class="text-gray-500">// [6] System program</span>
      rent_sysvar,             <span class="text-gray-500">// [7] Rent calculation</span>
    ],
    
    recentBlockhash: <span class="text-green-400">"Hs7d9..."</span>,
    
    instructions: [
      <span class="text-gray-500">// Instruction 1: Create escrow PDA account</span>
      {
        programIdIndex: <span class="text-yellow-400">6</span>,  <span class="text-gray-500">// System Program</span>
        accounts: [<span class="text-yellow-400">0, 2</span>],
        data: <span class="text-green-400">"create_account..."</span>
      },
      
      <span class="text-gray-500">// Instruction 2: Transfer USDC to escrow</span>
      {
        programIdIndex: <span class="text-yellow-400">5</span>,  <span class="text-gray-500">// Token Program</span>
        accounts: [<span class="text-yellow-400">1, 3, 0</span>],  <span class="text-gray-500">// from, to, authority</span>
        data: <span class="text-green-400">"transfer(100_000000)..."</span>
      },
      
      <span class="text-gray-500">// Instruction 3: Initialize escrow data</span>
      {
        programIdIndex: <span class="text-yellow-400">4</span>,  <span class="text-gray-500">// Otmoic Program</span>
        accounts: [<span class="text-yellow-400">0, 2, 3, ...</span>],
        data: <span class="text-green-400">"lock_instruction_data..."</span>
      }
    ]
  }
}

<span class="text-gray-500">// All 3 instructions execute atomically!</span>
<span class="text-gray-500">// If ANY fails → nothing happens (transaction reverts)</span></code></pre>
          </div>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-blue-400 mb-2">Instruction 1</h5>
              <p class="text-gray-300 text-xs">Create the escrow PDA account on-chain</p>
            </div>
            <div class="bg-green-500/10 border border-green-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-green-400 mb-2">Instruction 2</h5>
              <p class="text-gray-300 text-xs">Transfer USDC from user to escrow</p>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-purple-400 mb-2">Instruction 3</h5>
              <p class="text-gray-300 text-xs">Initialize escrow data (hash, recipient, etc.)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Lifecycle -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔄 Transaction Lifecycle</h3>
        </div>
        <div class="card-body">
          <div class="relative">
            <!-- Timeline -->
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
            
            <div class="space-y-6 relative">
              <!-- Step 1 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold z-10">
                  1
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-blue-400 mb-1">Client Builds Transaction</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Wallet/dApp constructs the message with instructions and accounts
                  </p>
                  <div class="bg-gray-900 rounded p-2 text-xs font-mono">
                    <code class="text-gray-400">const tx = new Transaction().add(instruction1, instruction2);</code>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold z-10">
                  2
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-purple-400 mb-1">Fetch Recent Blockhash</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Get a fresh blockhash from an RPC node (valid for ~60 seconds)
                  </p>
                  <div class="bg-gray-900 rounded p-2 text-xs font-mono">
                    <code class="text-gray-400">tx.recentBlockhash = await connection.getLatestBlockhash();</code>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold z-10">
                  3
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-yellow-400 mb-1">Sign Transaction</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    All required signers sign the serialized message
                  </p>
                  <div class="bg-gray-900 rounded p-2 text-xs font-mono">
                    <code class="text-gray-400">tx.sign(feePayer, otherSigner1, otherSigner2);</code>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold z-10">
                  4
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-orange-400 mb-1">Send to RPC Node</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Submit the signed transaction to the network
                  </p>
                  <div class="bg-gray-900 rounded p-2 text-xs font-mono">
                    <code class="text-gray-400">const signature = await connection.sendRawTransaction(tx.serialize());</code>
                  </div>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold z-10">
                  5
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-red-400 mb-1">Validation</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Validators check signatures, blockhash, and account ownership
                  </p>
                  <ul class="text-xs text-gray-400 space-y-1">
                    <li>• Verify all signatures are valid</li>
                    <li>• Check blockhash is recent</li>
                    <li>• Ensure no account conflicts</li>
                  </ul>
                </div>
              </div>

              <!-- Step 6 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold z-10">
                  6
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-pink-400 mb-1">Execution</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Runtime executes each instruction in order
                  </p>
                  <ul class="text-xs text-gray-400 space-y-1">
                    <li>• Programs process instructions sequentially</li>
                    <li>• If any fails → entire transaction reverts</li>
                    <li>• Compute units are consumed</li>
                  </ul>
                </div>
              </div>

              <!-- Step 7 -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold z-10">
                  7
                </div>
                <div class="flex-1 pt-2">
                  <h4 class="font-semibold text-green-400 mb-1">Finalization</h4>
                  <p class="text-sm text-gray-300 mb-2">
                    Transaction is included in a block and confirmed
                  </p>
                  <div class="bg-gray-900 rounded p-2 text-xs font-mono">
                    <code class="text-gray-400">await connection.confirmTransaction(signature, 'confirmed');</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Fees -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">💰 Transaction Fees</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Base Fee -->
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Base Transaction Fee
              </h4>
              <div class="space-y-3">
                <div>
                  <div class="text-3xl font-bold text-white">0.000005 SOL</div>
                  <div class="text-xs text-gray-400 mt-1">per signature (~$0.0005 USD)</div>
                </div>
                <div class="bg-gray-900 rounded p-3 text-xs">
                  <code class="text-gray-300">
                    <span class="text-gray-500">// Example</span><br/>
                    1 signer = 5,000 lamports<br/>
                    2 signers = 10,000 lamports<br/>
                    3 signers = 15,000 lamports
                  </code>
                </div>
                <p class="text-xs text-gray-400">
                  ✓ Fixed & predictable<br/>
                  ✓ No gas wars<br/>
                  ✓ Half burned, half to validator
                </p>
              </div>
            </div>

            <!-- Priority Fees -->
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Priority Fees (Optional)
              </h4>
              <div class="space-y-3">
                <div>
                  <div class="text-3xl font-bold text-white">Variable</div>
                  <div class="text-xs text-gray-400 mt-1">Set by user, paid to validator</div>
                </div>
                <div class="bg-gray-900 rounded p-3 text-xs">
                  <code class="text-gray-300">
                    <span class="text-gray-500">// Add priority fee</span><br/>
                    tx.add(<br/>
                    &nbsp;&nbsp;ComputeBudgetProgram<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;.setComputeUnitPrice({<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;microLamports: 1000<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;})<br/>
                    );
                  </code>
                </div>
                <p class="text-xs text-gray-400">
                  ✓ Speed up inclusion<br/>
                  ✓ Useful during congestion<br/>
                  ✓ Goes 100% to validator
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded">
            <strong class="text-green-400">EVM Comparison:</strong>
            <span class="text-gray-300 text-sm ml-2">
              EVM gas can be $50-$200 during congestion. Solana base fee stays at ~$0.0005 regardless of network load!
            </span>
          </div>
        </div>
      </div>

      <!-- Building Transactions with Anchor -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔨 Building Transactions with Anchor</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Anchor simplifies transaction building with its TypeScript client:
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Manual Way -->
            <div>
              <h4 class="font-semibold text-gray-400 mb-3 text-sm">❌ Manual Way (Tedious)</h4>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Build instruction manually</span>
<span class="text-blue-400">const</span> instruction = <span class="text-blue-400">new</span> TransactionInstruction({
  keys: [
    { pubkey: user, isSigner: <span class="text-blue-400">true</span>, isWritable: <span class="text-blue-400">true</span> },
    { pubkey: escrow, isSigner: <span class="text-blue-400">false</span>, isWritable: <span class="text-blue-400">true</span> },
    { pubkey: program, isSigner: <span class="text-blue-400">false</span>, isWritable: <span class="text-blue-400">false</span> },
  ],
  programId,
  data: Buffer.from([<span class="text-yellow-400">0x01, ...</span>]), <span class="text-gray-500">// Serialize manually!</span>
});

<span class="text-blue-400">const</span> tx = <span class="text-blue-400">new</span> Transaction().add(instruction);
tx.recentBlockhash = <span class="text-blue-400">await</span> connection.getLatestBlockhash();
tx.sign(wallet);
<span class="text-blue-400">await</span> connection.sendRawTransaction(tx.serialize());</code></pre>
              </div>
            </div>

            <!-- Anchor Way -->
            <div>
              <h4 class="font-semibold text-green-400 mb-3 text-sm">✅ Anchor Way (Clean)</h4>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Anchor handles everything!</span>
<span class="text-blue-400">const</span> tx = <span class="text-blue-400">await</span> program.methods
  .lock(amount, hash, recipient)
  .accounts({
    user: wallet.publicKey,
    escrow: escrowPda,
    systemProgram: SystemProgram.programId,
  })
  .rpc(); <span class="text-gray-500">// Automatically builds, signs, sends!</span>

<span class="text-gray-500">// Or build without sending</span>
<span class="text-blue-400">const</span> txBuilder = program.methods.lock(...)
  .accounts({...});

<span class="text-blue-400">const</span> transaction = <span class="text-blue-400">await</span> txBuilder.transaction();
<span class="text-gray-500">// Now you have full Transaction object</span></code></pre>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded text-sm text-gray-300">
            <strong class="text-purple-400">Pro Tip:</strong> Use <code class="bg-gray-800 px-1 rounded">.transaction()</code> 
            to get the Transaction object, then add more instructions before sending!
          </div>
        </div>
      </div>

      <!-- Common Patterns -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🎯 Common Transaction Patterns</h3>
        </div>
        <div class="card-body">
          <div class="space-y-6">
            <!-- Pattern 1 -->
            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-blue-400 mb-2">1. Batch Multiple Operations</h4>
              <p class="text-sm text-gray-300 mb-3">
                Combine multiple actions into a single atomic transaction
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Create account + transfer + initialize (all atomic!)</span>
<span class="text-blue-400">const</span> tx = <span class="text-blue-400">new</span> Transaction()
  .add(createAccountIx)
  .add(transferTokensIx)
  .add(initializeEscrowIx);</code></pre>
              </div>
            </div>

            <!-- Pattern 2 -->
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-green-400 mb-2">2. Multi-Signature Transactions</h4>
              <p class="text-sm text-gray-300 mb-3">
                Require multiple parties to sign (e.g., multi-sig wallet)
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Collect signatures from multiple wallets</span>
tx.sign(feePayer);
tx.partialSign(signer1, signer2, signer3);</code></pre>
              </div>
            </div>

            <!-- Pattern 3 -->
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="font-semibold text-purple-400 mb-2">3. Versioned Transactions (v0)</h4>
              <p class="text-sm text-gray-300 mb-3">
                New format supporting address lookup tables for more accounts
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Use v0 transactions for complex operations</span>
<span class="text-blue-400">const</span> messageV0 = <span class="text-blue-400">new</span> TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash,
  instructions,
}).compileToV0Message(addressLookupTables);</code></pre>
              </div>
            </div>

            <!-- Pattern 4 -->
            <div class="border-l-4 border-yellow-500 pl-4">
              <h4 class="font-semibold text-yellow-400 mb-2">4. Durable Nonces (Alternative to Blockhash)</h4>
              <p class="text-sm text-gray-300 mb-3">
                Use a stored nonce instead of blockhash for offline/scheduled transactions
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Transaction never expires!</span>
tx.recentBlockhash = nonceAccount.nonce;
tx.add(NonceProgram.advance(nonceAccount, authority));</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indexing Solana Data -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔍 Indexing Solana Data: Fetching Transactions</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-6">
            Learn how to fetch and index all transactions for a specific address using <code class="bg-gray-800 px-2 py-1 rounded text-cyan-400">getSignaturesForAddress</code>. 
            This is the foundation for building explorers, analytics, or indexing services like Otmoic Pay Indexer.
          </p>

          <!-- Core Method -->
          <div class="border-l-4 border-cyan-500 pl-4 mb-6">
            <h4 class="font-semibold text-cyan-400 mb-3">Core API: getSignaturesForAddress</h4>
            <p class="text-sm text-gray-300 mb-4">
              The most efficient way to index transactions is to fetch signatures first (lightweight), 
              then get full transaction details only for the ones you need.
            </p>
            
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre class="text-sm"><code class="text-gray-300"><span class="text-blue-400">import</span> { Connection, PublicKey } <span class="text-blue-400">from</span> <span class="text-green-400">'@solana/web3.js'</span>;

<span class="text-gray-500">// Initialize connection</span>
<span class="text-blue-400">const</span> connection = <span class="text-blue-400">new</span> Connection(
  <span class="text-green-400">'https://api.mainnet-beta.solana.com'</span>,
  <span class="text-green-400">'confirmed'</span>
);

<span class="text-gray-500">// Fetch all transaction signatures for an address</span>
<span class="text-blue-400">async function</span> <span class="text-yellow-400">fetchAllSignatures</span>(address: <span class="text-blue-400">string</span>) {
  <span class="text-blue-400">const</span> pubkey = <span class="text-blue-400">new</span> PublicKey(address);
  <span class="text-blue-400">const</span> allSignatures: <span class="text-blue-400">any</span>[] = [];
  <span class="text-blue-400">let</span> before: <span class="text-blue-400">string</span> | <span class="text-blue-400">undefined</span>;

  <span class="text-blue-400">while</span> (<span class="text-blue-400">true</span>) {
    <span class="text-gray-500">// Fetch up to 1000 signatures per call (max limit)</span>
    <span class="text-blue-400">const</span> signatures = <span class="text-blue-400">await</span> connection.<span class="text-yellow-400">getSignaturesForAddress</span>(
      pubkey,
      { 
        before,           <span class="text-gray-500">// Cursor for pagination</span>
        limit: <span class="text-yellow-400">1000</span>       <span class="text-gray-500">// Max 1000 per request</span>
      }
    );

    <span class="text-blue-400">if</span> (signatures.length === <span class="text-yellow-400">0</span>) <span class="text-blue-400">break</span>;

    allSignatures.push(...signatures);
    
    <span class="text-gray-500">// Use last signature as cursor for next batch</span>
    before = signatures[signatures.length - <span class="text-yellow-400">1</span>].signature;

    console.log(<span class="text-green-400">`Fetched </span><span class="text-yellow-400">${allSignatures.length}</span><span class="text-green-400"> signatures...`</span>);

    <span class="text-gray-500">// Optional: break after certain amount for testing</span>
    <span class="text-blue-400">if</span> (allSignatures.length >= <span class="text-yellow-400">10000</span>) <span class="text-blue-400">break</span>;
  }

  <span class="text-blue-400">return</span> allSignatures;
}

<span class="text-gray-500">// Each signature object contains:</span>
<span class="text-gray-500">// {</span>
<span class="text-gray-500">//   signature: string,     // Transaction signature</span>
<span class="text-gray-500">//   slot: number,          // Block slot number</span>
<span class="text-gray-500">//   blockTime: number,     // Unix timestamp</span>
<span class="text-gray-500">//   err: object | null,    // Error if failed</span>
<span class="text-gray-500">//   memo: string | null    // Optional memo</span>
<span class="text-gray-500">// }</span>

<span class="text-gray-500">// Step 2: Fetch full transaction details (when needed)</span>
<span class="text-blue-400">async function</span> <span class="text-yellow-400">fetchTransactionDetails</span>(signatures: <span class="text-blue-400">string</span>[]) {
  <span class="text-gray-500">// Process in chunks to avoid rate limits</span>
  <span class="text-blue-400">const</span> CHUNK_SIZE = <span class="text-yellow-400">50</span>;
  <span class="text-blue-400">const</span> transactions = [];

  <span class="text-blue-400">for</span> (<span class="text-blue-400">let</span> i = <span class="text-yellow-400">0</span>; i < signatures.length; i += CHUNK_SIZE) {
    <span class="text-blue-400">const</span> chunk = signatures.slice(i, i + CHUNK_SIZE);
    
    <span class="text-gray-500">// Fetch in parallel for better performance</span>
    <span class="text-blue-400">const</span> txs = <span class="text-blue-400">await</span> Promise.all(
      chunk.map(sig => 
        connection.<span class="text-yellow-400">getTransaction</span>(sig, {
          maxSupportedTransactionVersion: <span class="text-yellow-400">0</span>,  <span class="text-gray-500">// Support v0 txs</span>
          commitment: <span class="text-green-400">'confirmed'</span>
        })
      )
    );

    transactions.push(...txs.filter(<span class="text-blue-400">tx</span> => tx !== <span class="text-blue-400">null</span>));
    
    console.log(<span class="text-green-400">`Processed </span><span class="text-yellow-400">${transactions.length}</span><span class="text-green-400">/</span><span class="text-yellow-400">${signatures.length}</span><span class="text-green-400"> transactions`</span>);
    
    <span class="text-gray-500">// Small delay to respect rate limits</span>
    <span class="text-blue-400">await</span> <span class="text-blue-400">new</span> Promise(resolve => setTimeout(resolve, <span class="text-yellow-400">100</span>));
  }

  <span class="text-blue-400">return</span> transactions;
}

<span class="text-gray-500">// Usage example</span>
<span class="text-blue-400">const</span> walletAddress = <span class="text-green-400">'YourWalletAddressHere...'</span>;
<span class="text-blue-400">const</span> sigs = <span class="text-blue-400">await</span> fetchAllSignatures(walletAddress);
<span class="text-blue-400">const</span> txs = <span class="text-blue-400">await</span> fetchTransactionDetails(sigs.map(<span class="text-blue-400">s</span> => s.signature));</code></pre>
            </div>
          </div>

          <!-- Best Practices -->
          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h5 class="font-semibold text-blue-400 mb-3">💡 Best Practices for Production Indexers</h5>
            <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5 shrink-0">✓</span>
                  <span><strong>Pagination:</strong> Use <code class="bg-gray-800 px-1 rounded text-xs">before</code> cursor for efficient pagination</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5 shrink-0">✓</span>
                  <span><strong>Rate Limiting:</strong> Respect RPC limits (~40 req/10s for public nodes)</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5 shrink-0">✓</span>
                  <span><strong>Chunking:</strong> Process signatures in batches of 50-100</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-400 mt-0.5 shrink-0">✓</span>
                  <span><strong>Caching:</strong> Store last processed signature to resume indexing</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5 shrink-0">▸</span>
                  <span><strong>Private RPC:</strong> Use Helius, QuickNode for production</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5 shrink-0">▸</span>
                  <span><strong>Error Handling:</strong> Retry with exponential backoff</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5 shrink-0">▸</span>
                  <span><strong>Parallel Processing:</strong> Use Promise.all() for batches</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-400 mt-0.5 shrink-0">▸</span>
                  <span><strong>Database:</strong> Store indexed data (PostgreSQL, MongoDB)</span>
                </div>
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
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-semibold text-green-400">What Makes Solana Transactions Special</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Multiple instructions</strong> in one transaction</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Fixed fees</strong> (~$0.0005) no matter what</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Blockhash-based</strong> replay protection (no nonce!)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Native multi-sig</strong> support</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>All-or-nothing</strong> atomic execution</span>
                </li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-yellow-400">Best Practices</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">▸</span>
                  <span>Always get fresh blockhash before signing</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">▸</span>
                  <span>Use Anchor's client for easier development</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">▸</span>
                  <span>Batch related operations for atomicity</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">▸</span>
                  <span>Add priority fees during congestion</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">▸</span>
                  <span>Use versioned transactions for complex flows</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
            <strong class="text-blue-400">Remember:</strong>
            <span class="text-gray-300 text-sm ml-2">
              Transactions are the fundamental building blocks of Solana. Understanding their structure 
              is essential for effective program development!
            </span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">🚀 Continue Learning</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link 
            to="/solana/account-model"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-blue-400 mb-2">← Account Model</h4>
            <p class="text-sm text-gray-300">Understand accounts referenced in transactions</p>
          </router-link>
          
          <router-link 
            to="/solana/cpi"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-purple-400 mb-2">→ Cross-Program Calls</h4>
            <p class="text-sm text-gray-300">Learn how programs interact</p>
          </router-link>
          
          <router-link 
            to="/solana/evm-comparison"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-green-400 mb-2">→ Full Comparison</h4>
            <p class="text-sm text-gray-300">See all EVM vs Solana differences</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No interactive functionality needed
</script>
