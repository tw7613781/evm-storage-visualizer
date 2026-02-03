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
          <h1 class="text-xl font-bold text-white">Cross-Program Invocation (CPI)</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">🔗 What is Cross-Program Invocation?</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            <strong class="text-purple-400">Cross-Program Invocation (CPI)</strong> is Solana's mechanism for one program 
            to call instructions in another program. It's similar to external contract calls in EVM, but with some key differences.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-blue-400 mb-2">Common Use Cases</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Transfer tokens (call Token Program)</li>
                <li>• Transfer SOL (call System Program)</li>
                <li>• Create accounts (call System Program)</li>
                <li>• Call your own programs</li>
                <li>• Composability with DeFi protocols</li>
              </ul>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-purple-400 mb-2">Key Features</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Atomic execution (all or nothing)</li>
                <li>• Caller's privileges can be passed</li>
                <li>• Deterministic and composable</li>
                <li>• Maximum depth: 4 levels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- EVM vs Solana CPI -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔄 EVM vs Solana: Calling Other Contracts/Programs</h3>
        </div>
        <div class="card-body">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- EVM -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">EVM (Solidity)</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Call another contract</span>
<span class="text-blue-400">interface</span> <span class="text-yellow-400">IERC20</span> {
    <span class="text-blue-400">function</span> <span class="text-yellow-400">transfer</span>(
        <span class="text-green-400">address</span> to,
        <span class="text-green-400">uint256</span> amount
    ) <span class="text-blue-400">external returns</span> (<span class="text-green-400">bool</span>);
}

<span class="text-gray-500">// In your contract</span>
<span class="text-blue-400">function</span> <span class="text-yellow-400">sendTokens</span>(<span class="text-green-400">address</span> token) <span class="text-blue-400">external</span> {
    IERC20(token).<span class="text-yellow-400">transfer</span>(recipient, 100);
}</code></pre>
              </div>
              <ul class="text-xs text-gray-300 space-y-1">
                <li>• Direct contract calls via interface</li>
                <li>• Contract address needed</li>
                <li>• Implicit context (msg.sender changes)</li>
              </ul>
            </div>

            <!-- Solana -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">Solana (Anchor)</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Import the program to call</span>
<span class="text-blue-400">use</span> anchor_spl::token;

<span class="text-gray-500">// Call Token Program</span>
<span class="text-blue-400">pub fn</span> <span class="text-yellow-400">send_tokens</span>(ctx: Context&lt;SendTokens&gt;) -> Result&lt;()&gt; {
    token::<span class="text-yellow-400">transfer</span>(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer { ... }
        ),
        100
    )?;
    <span class="text-blue-400">Ok</span>(())
}</code></pre>
              </div>
              <ul class="text-xs text-gray-300 space-y-1">
                <li>• Explicit CpiContext creation</li>
                <li>• All accounts must be passed</li>
                <li>• Clear privilege delegation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CPI Anatomy -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔍 Anatomy of a CPI Call</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">Every CPI call has three main components:</p>
          
          <div class="space-y-4">
            <!-- Component 1 -->
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="font-semibold text-purple-400 mb-2">1. The Target Program</h4>
              <p class="text-sm text-gray-300 mb-2">Which program you're calling</p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300">ctx.accounts.<span class="text-purple-400">token_program</span>.to_account_info()  <span class="text-gray-500">// Token Program</span>
ctx.accounts.<span class="text-purple-400">system_program</span>.to_account_info() <span class="text-gray-500">// System Program</span></code></pre>
              </div>
            </div>

            <!-- Component 2 -->
            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-blue-400 mb-2">2. The Accounts</h4>
              <p class="text-sm text-gray-300 mb-2">Which accounts the called program needs</p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300">token::Transfer {
    from: ctx.accounts.<span class="text-blue-400">source</span>.to_account_info(),
    to: ctx.accounts.<span class="text-blue-400">destination</span>.to_account_info(),
    authority: ctx.accounts.<span class="text-blue-400">signer</span>.to_account_info(),
}</code></pre>
              </div>
            </div>

            <!-- Component 3 -->
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-green-400 mb-2">3. The Data/Parameters</h4>
              <p class="text-sm text-gray-300 mb-2">Instruction-specific parameters</p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-green-400">amount</span>  <span class="text-gray-500">// How many tokens to transfer</span></code></pre>
              </div>
            </div>
          </div>

          <div class="mt-4 bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm text-gray-300">
            <strong class="text-purple-400">CpiContext</strong> wraps all these together and handles the low-level details!
          </div>
        </div>
      </div>

      <!-- Real Example from Otmoic -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📝 Real Example: Token Transfer in Otmoic</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Let's see how Otmoic uses CPI to transfer tokens when confirming a swap:
          </p>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-gray-500">// From Otmoic's confirm function</span>
<span class="text-blue-400">if</span> escrow.token_amount > 0 {
    <span class="text-gray-500">// 1. Transfer fee to fee recipient</span>
    <span class="text-yellow-400">handle_token_transfer</span>(
        ctx.accounts.token_program.as_ref().unwrap(),
        &ctx.accounts.escrow_ata.as_ref().unwrap().to_account_info(),
        &ctx.accounts.fee_destination.as_ref().unwrap().to_account_info(),
        &escrow.to_account_info(),
        escrow.token_fee,
        Some(seeds),  <span class="text-gray-500">← Sign as PDA!</span>
    )?;

    <span class="text-gray-500">// 2. Transfer remaining to recipient</span>
    <span class="text-yellow-400">handle_token_transfer</span>(
        ctx.accounts.token_program.as_ref().unwrap(),
        &ctx.accounts.escrow_ata.as_ref().unwrap().to_account_info(),
        &ctx.accounts.destination.as_ref().unwrap().to_account_info(),
        &escrow.to_account_info(),
        escrow.token_amount - escrow.token_fee,
        Some(seeds),  <span class="text-gray-500">← Sign as PDA!</span>
    )?;
}

<span class="text-gray-500">// The helper function implementation</span>
<span class="text-blue-400">pub fn</span> <span class="text-yellow-400">handle_token_transfer</span>&lt;'info&gt;(
    token_program: &Program&lt;'info, Token&gt;,
    from: &AccountInfo&lt;'info&gt;,
    to: &AccountInfo&lt;'info&gt;,
    authority: &AccountInfo&lt;'info&gt;,
    amount: u64,
    seeds: Option&lt;&[&[&[u8]]]&gt;,
) -> Result&lt;()&gt; {
    <span class="text-blue-400">let</span> transfer_ctx = CpiContext::new(
        token_program.to_account_info(),
        token::Transfer {
            from: from.to_account_info(),
            to: to.to_account_info(),
            authority: authority.to_account_info(),
        },
    );

    <span class="text-blue-400">if let</span> Some(seeds) = seeds {
        <span class="text-gray-500">// Sign with PDA (for escrow releasing tokens)</span>
        token::transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                transfer_ctx.accounts,
                seeds,
            ),
            amount,
        )
    } <span class="text-blue-400">else</span> {
        <span class="text-gray-500">// Sign with regular signer</span>
        token::transfer(transfer_ctx, amount)
    }
}</code></pre>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-blue-400 mb-2">What's Happening?</h5>
              <ul class="text-gray-300 space-y-1 text-xs">
                <li>• Calling Token Program's <code class="bg-gray-800 px-1 rounded">transfer</code></li>
                <li>• Transferring from escrow to recipients</li>
                <li>• Escrow PDA acts as authority (no private key!)</li>
                <li>• Two CPI calls: one for fee, one for amount</li>
              </ul>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-purple-400 mb-2">Key Technique</h5>
              <ul class="text-gray-300 space-y-1 text-xs">
                <li>• <code class="bg-gray-800 px-1 rounded">CpiContext::new_with_signer</code></li>
                <li>• Passes PDA seeds to "sign" as escrow</li>
                <li>• Token Program verifies the PDA derivation</li>
                <li>• This is how PDAs can own & control assets!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CPI with PDA Signing -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔑 CPI with PDA Signing</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            One of the most powerful features: PDAs can "sign" for CPI calls without a private key!
          </p>

          <div class="space-y-4">
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-gray-300">
                  <strong class="text-yellow-400">The Problem:</strong> PDAs don't have private keys, so they can't sign transactions normally.
                  But they often need to act as authorities (e.g., escrow releasing tokens).
                </div>
              </div>
            </div>

            <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-gray-300">
                  <strong class="text-green-400">The Solution:</strong> Pass the PDA's seeds to <code class="bg-gray-800 px-1 rounded">CpiContext::new_with_signer</code>.
                  The called program can verify the PDA derivation, effectively "signing" for it.
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-gray-500">// Step 1: Define your PDA seeds</span>
<span class="text-blue-400">let</span> uuid = b"my_escrow_id";
<span class="text-blue-400">let</span> bump = 254;
<span class="text-blue-400">let</span> seeds: &[&[&[u8]]] = &[&[
    uuid,
    &[bump],
]];

<span class="text-gray-500">// Step 2: Use new_with_signer instead of new</span>
token::transfer(
    CpiContext::<span class="text-yellow-400">new_with_signer</span>(
        token_program.to_account_info(),
        token::Transfer {
            from: escrow_token_account.to_account_info(),
            to: recipient.to_account_info(),
            authority: <span class="text-purple-400">escrow_pda</span>.to_account_info(),  <span class="text-gray-500">← PDA as authority</span>
        },
        <span class="text-green-400">seeds</span>,  <span class="text-gray-500">← Pass the seeds!</span>
    ),
    amount,
)?;</code></pre>
          </div>

          <div class="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-gray-300">
            <strong class="text-purple-400">Under the Hood:</strong> Solana runtime re-derives the PDA using the seeds,
            verifies it matches the authority account, and allows the CPI to proceed.
          </div>
        </div>
      </div>

      <!-- Common CPI Examples -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📚 Common CPI Examples</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- System Program -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-blue-400 mb-3">Transfer SOL (System Program)</h4>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-blue-400">use</span> anchor_lang::system_program;

system_program::<span class="text-yellow-400">transfer</span>(
    CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        system_program::Transfer {
            from: ctx.accounts.sender.to_account_info(),
            to: ctx.accounts.receiver.to_account_info(),
        },
    ),
    lamports,
)?;</code></pre>
              </div>
            </div>

            <!-- Token Program -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-green-400 mb-3">Transfer Tokens (Token Program)</h4>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-blue-400">use</span> anchor_spl::token;

token::<span class="text-yellow-400">transfer</span>(
    CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token::Transfer {
            from: ctx.accounts.source.to_account_info(),
            to: ctx.accounts.dest.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        },
    ),
    amount,
)?;</code></pre>
              </div>
            </div>

            <!-- Close Account -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-red-400 mb-3">Close Token Account</h4>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300">token::<span class="text-yellow-400">close_account</span>(
    CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.token_account.to_account_info(),
            destination: ctx.accounts.rent_receiver.to_account_info(),
            authority: escrow_pda.to_account_info(),
        },
        seeds,
    ),
)?;</code></pre>
              </div>
            </div>

            <!-- Associated Token -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-purple-400 mb-3">Create Associated Token Account</h4>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-blue-400">use</span> anchor_spl::associated_token;

associated_token::<span class="text-yellow-400">create</span>(
    CpiContext::new(
        ctx.accounts.associated_token_program.to_account_info(),
        associated_token::Create {
            payer: ctx.accounts.payer.to_account_info(),
            associated_token: ctx.accounts.ata.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            // ...
        },
    ),
)?;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CPI Depth Limit -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">⚠️ CPI Depth Limit</h3>
        </div>
        <div class="card-body">
          <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong class="text-red-400 text-base">Important Limitation</strong>
                <p class="text-gray-300 mt-2 text-sm">
                  Solana has a maximum CPI depth of <strong>4 levels</strong>. This means a program can call another program,
                  which can call another, up to 4 times total.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-900 rounded-lg p-4 text-sm">
            <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// Valid: Depth = 3</span>
Your Program
  └─ calls Token Program (depth 1)
       └─ calls System Program (depth 2)
            └─ calls Another Program (depth 3) ✓

<span class="text-gray-500">// Invalid: Depth > 4</span>
Your Program
  └─ Program A (depth 1)
       └─ Program B (depth 2)
            └─ Program C (depth 3)
                 └─ Program D (depth 4)
                      └─ Program E (depth 5) ✗ <span class="text-red-400">EXCEEDS LIMIT!</span></code></pre>
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
              <h4 class="font-semibold text-green-400">CPI Best Practices</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span>Always use <code class="text-xs bg-gray-800 px-1 rounded">CpiContext</code> for type safety</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span>Use <code class="text-xs bg-gray-800 px-1 rounded">new_with_signer</code> for PDA authorities</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span>Pass all required accounts explicitly</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span>Check CPI depth if doing complex composability</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span>Use helper functions for reusable CPI patterns</span>
                </li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-yellow-400">Common Pitfalls</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span>Forgetting to pass all required accounts</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span>Using wrong seeds for PDA signing</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span>Exceeding the 4-depth limit</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span>Not handling CPI errors properly</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span>Forgetting to include program in <code class="text-xs bg-gray-800 px-1 rounded">Accounts</code> struct</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
            <strong class="text-blue-400">Remember:</strong>
            <span class="text-gray-300 text-sm ml-2">
              CPI is what makes Solana composable. Master it to build powerful, interoperable programs!
            </span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">🚀 Next Steps</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link 
            to="/solana/anchor-structures"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-purple-400 mb-2">← Anchor Framework</h4>
            <p class="text-sm text-gray-300">Learn Anchor's powerful abstractions</p>
          </router-link>
          
          <router-link 
            to="/solana/pda-seeds"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-cyan-400 mb-2">← PDA & Seeds</h4>
            <p class="text-sm text-gray-300">Understand PDAs for CPI signing</p>
          </router-link>
          
          <router-link 
            to="/solana/evm-comparison"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-green-400 mb-2">→ Full Comparison</h4>
            <p class="text-sm text-gray-300">See complete EVM vs Solana differences</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
