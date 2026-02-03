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
          <h1 class="text-xl font-bold text-white">Anchor Framework Deep Dive</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">⚓ What is Anchor?</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            <strong class="text-purple-400">Anchor</strong> is the most popular framework for building Solana programs. 
            It provides a high-level abstraction over native Solana development, making it easier, safer, and more productive.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-red-400 mb-2">❌ Native Solana (Hard)</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Manual account deserialization</li>
                <li>• Verbose validation code</li>
                <li>• Easy to make security mistakes</li>
                <li>• Lots of boilerplate</li>
              </ul>
            </div>
            <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-green-400 mb-2">✅ Anchor (Easy)</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Automatic (de)serialization</li>
                <li>• Declarative account validation</li>
                <li>• Built-in security checks</li>
                <li>• Clean, readable code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison: Native vs Anchor -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔄 Native vs Anchor: Side by Side</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">Let's see how the same functionality looks in native Solana vs Anchor:</p>
          
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Native Solana -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">Native Solana</span>
                <span class="text-sm text-gray-400">~100 lines</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-blue-400">use</span> solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
};

<span class="text-blue-400">entrypoint!</span>(process_instruction);

<span class="text-blue-400">fn</span> <span class="text-yellow-400">process_instruction</span>(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    <span class="text-gray-500">// Parse accounts manually</span>
    <span class="text-blue-400">let</span> accounts_iter = &<span class="text-blue-400">mut</span> accounts.iter();
    <span class="text-blue-400">let</span> payer = next_account_info(accounts_iter)?;
    <span class="text-blue-400">let</span> escrow = next_account_info(accounts_iter)?;
    
    <span class="text-gray-500">// Verify signer</span>
    <span class="text-blue-400">if</span> !payer.is_signer {
        <span class="text-blue-400">return</span> Err(ProgramError::MissingRequiredSignature);
    }
    
    <span class="text-gray-500">// Verify owner</span>
    <span class="text-blue-400">if</span> escrow.owner != program_id {
        <span class="text-blue-400">return</span> Err(ProgramError::IncorrectProgramId);
    }
    
    <span class="text-gray-500">// Deserialize account data</span>
    <span class="text-blue-400">let mut</span> escrow_data = Escrow::try_from_slice(
        &escrow.data.borrow()
    )?;
    
    <span class="text-gray-500">// Business logic...</span>
    escrow_data.amount = 100;
    
    <span class="text-gray-500">// Serialize back</span>
    escrow_data.serialize(&<span class="text-blue-400">mut</span> *escrow.data.borrow_mut())?;
    
    Ok(())
}</code></pre>
              </div>
            </div>

            <!-- Anchor -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">Anchor</span>
                <span class="text-sm text-gray-400">~20 lines</span>
              </div>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-blue-400">use</span> anchor_lang::prelude::*;

<span class="text-purple-400">#[program]</span>
<span class="text-blue-400">pub mod</span> my_program {
    <span class="text-blue-400">use super</span>::*;
    
    <span class="text-blue-400">pub fn</span> <span class="text-yellow-400">update_escrow</span>(
        ctx: Context&lt;UpdateEscrow&gt;,
    ) -> Result&lt;()&gt; {
        <span class="text-gray-500">// All validation done automatically!</span>
        <span class="text-gray-500">// Accounts parsed & deserialized</span>
        
        <span class="text-blue-400">let</span> escrow = &<span class="text-blue-400">mut</span> ctx.accounts.escrow;
        escrow.amount = 100;
        
        <span class="text-blue-400">Ok</span>(())
    }
}

<span class="text-purple-400">#[derive(Accounts)]</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">UpdateEscrow</span>&lt;'info&gt; {
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> payer: Signer&lt;'info&gt;,
    
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> escrow: Account&lt;'info, Escrow&gt;,
}</code></pre>
              </div>
            </div>
          </div>

          <div class="mt-4 bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-gray-300">
            <strong class="text-green-400">80% Less Code!</strong> Anchor automatically handles account validation, 
            deserialization, ownership checks, and more through declarative macros.
          </div>
        </div>
      </div>

      <!-- Core Concepts -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🎯 Anchor Core Concepts</h3>
        </div>
        <div class="card-body">
          <div class="space-y-6">
            <!-- #[program] -->
            <div class="border-l-4 border-purple-500 pl-4">
              <h4 class="text-lg font-semibold text-purple-400 mb-2">#[program] - Your Program Module</h4>
              <p class="text-sm text-gray-300 mb-3">
                Marks the module containing your program's instruction handlers (like functions in a smart contract).
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">#[program]</span>
<span class="text-blue-400">pub mod</span> obridge {
    <span class="text-blue-400">use super</span>::*;
    
    <span class="text-gray-500">// Each function = one instruction</span>
    <span class="text-blue-400">pub fn</span> <span class="text-yellow-400">prepare</span>(ctx: Context&lt;Prepare&gt;, amount: u64) -> Result&lt;()&gt; { ... }
    <span class="text-blue-400">pub fn</span> <span class="text-yellow-400">confirm</span>(ctx: Context&lt;Confirm&gt;, preimage: [u8; 32]) -> Result&lt;()&gt; { ... }
    <span class="text-blue-400">pub fn</span> <span class="text-yellow-400">refund</span>(ctx: Context&lt;Refund&gt;) -> Result&lt;()&gt; { ... }
}</code></pre>
              </div>
            </div>

            <!-- #[derive(Accounts)] -->
            <div class="border-l-4 border-blue-500 pl-4">
              <div class="flex items-center gap-2 mb-2">
                <h4 class="text-lg font-semibold text-blue-400">#[derive(Accounts)] - Account Validation</h4>
                <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">← Constraints used here!</span>
              </div>
              <p class="text-sm text-gray-300 mb-3">
                Defines which accounts an instruction needs and automatically validates them.
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">#[derive(Accounts)]</span>
<span class="text-purple-400">#[instruction(uuid: [u8; 32])]</span>  <span class="text-gray-500">← Can access instruction params</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">Prepare</span>&lt;'info&gt; {
    <span class="text-purple-400">#[account(mut)]</span>  <span class="text-gray-500">← Must be mutable</span> <span class="text-green-400">← CONSTRAINT</span>
    <span class="text-blue-400">pub</span> payer: Signer&lt;'info&gt;,  <span class="text-gray-500">← Must sign transaction</span>
    
    <span class="text-purple-400">#[account(
        init,  </span><span class="text-gray-500">← Create new account</span><span class="text-green-400"> ← CONSTRAINT</span><span class="text-purple-400">
        payer = payer,  </span><span class="text-gray-500">← Who pays rent</span><span class="text-green-400"> ← CONSTRAINT</span><span class="text-purple-400">
        space = 8 + std::mem::size_of::&lt;Escrow&gt;(),  </span><span class="text-gray-500">← Account size</span><span class="text-green-400"> ← CONSTRAINT</span><span class="text-purple-400">
        seeds = [&uuid],  </span><span class="text-gray-500">← PDA seeds</span><span class="text-green-400"> ← CONSTRAINT</span><span class="text-purple-400">
        bump  </span><span class="text-gray-500">← Auto-find bump</span><span class="text-green-400"> ← CONSTRAINT</span><span class="text-purple-400">
    )]</span>
    <span class="text-blue-400">pub</span> escrow: Account&lt;'info, Escrow&gt;,
}</code></pre>
              </div>
            </div>

            <!-- #[account] -->
            <div class="border-l-4 border-green-500 pl-4">
              <div class="flex items-center gap-2 mb-2">
                <h4 class="text-lg font-semibold text-green-400">#[account] - Data Structures</h4>
                <span class="px-2 py-1 bg-gray-700 text-gray-400 text-xs font-bold rounded">No constraints here</span>
              </div>
              <p class="text-sm text-gray-300 mb-3">
                Defines the data structure stored in an account. Anchor handles serialization automatically.
              </p>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">#[account]</span>  <span class="text-gray-500">← Makes it an Anchor account</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">Escrow</span> {
    <span class="text-blue-400">pub</span> from: Pubkey,        <span class="text-gray-500">// 32 bytes - just field definition</span>
    <span class="text-blue-400">pub</span> to: Pubkey,          <span class="text-gray-500">// 32 bytes - just field definition</span>
    <span class="text-blue-400">pub</span> sol_amount: u64,    <span class="text-gray-500">// 8 bytes - just field definition</span>
    <span class="text-blue-400">pub</span> token_amount: u64,  <span class="text-gray-500">// 8 bytes - just field definition</span>
    <span class="text-blue-400">pub</span> lock: Lock,         <span class="text-gray-500">// nested struct</span>
    <span class="text-blue-400">pub</span> is_out: bool,       <span class="text-gray-500">// 1 byte</span>
}
<span class="text-gray-500">// Total: 8 (discriminator) + field sizes</span>
<span class="text-gray-500">// ⚠️ No constraints like #[account(mut)], init, seeds, etc.</span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Constraints -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🛡️ Account Constraints (Security Magic)</h3>
        </div>
        <div class="card-body">
          <div class="bg-blue-500/10 border-2 border-blue-500/50 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong class="text-blue-400 text-base">⚠️ Important: Where Constraints Are Used</strong>
                <p class="text-gray-300 mt-2 text-sm">
                  Constraints are used in <code class="text-xs bg-blue-900/50 px-2 py-1 rounded text-blue-300">#[derive(Accounts)]</code> 
                  structs, <strong class="text-blue-400">NOT</strong> in 
                  <code class="text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">#[account]</code> data structures!
                </p>
                <div class="mt-3 grid md:grid-cols-2 gap-3 text-xs">
                  <div class="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <div class="text-green-400 font-semibold mb-1">✓ Constraints go here:</div>
                    <code class="text-green-300">#[derive(Accounts)]</code>
                    <div class="text-gray-400 mt-1">Validates accounts passed to instruction</div>
                  </div>
                  <div class="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <div class="text-red-400 font-semibold mb-1">✗ No constraints here:</div>
                    <code class="text-red-300">#[account]</code>
                    <div class="text-gray-400 mt-1">Only defines data structure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p class="text-gray-400 mb-4">
            Anchor's constraint system is where the real magic happens. These declarative constraints provide automatic security checks:
          </p>

          <div class="space-y-3">
            <div v-for="constraint in constraints" :key="constraint.name" 
                 class="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <div class="flex items-start justify-between mb-2">
                <code class="text-sm font-semibold" :class="constraint.color">{{ constraint.name }}</code>
                <span class="text-xs text-gray-500 px-2 py-1 bg-gray-900 rounded">{{ constraint.category }}</span>
              </div>
              <p class="text-sm text-gray-300 mb-2">{{ constraint.description }}</p>
              <div class="bg-gray-900 rounded p-2 text-xs font-mono overflow-x-auto">
                <span class="text-gray-500">{{ constraint.example }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm text-gray-300">
            <strong class="text-purple-400">Why This Matters:</strong> Without Anchor, you'd need to write 20-30 lines 
            of manual validation code for each of these checks. Anchor does it all automatically!
          </div>
        </div>
      </div>

      <!-- Real Code from Otmoic -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📝 Real Example: Otmoic Confirm Function</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Let's analyze a real function from the Otmoic atomic swap bridge:
          </p>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-purple-400">#[derive(Accounts)]</span>
<span class="text-purple-400">#[instruction(uuid: [u8; 32], preimage: [u8; 32], is_out: bool)]</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">Confirm</span>&lt;'info&gt; {
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> payer: Signer&lt;'info&gt;,
    
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> from: SystemAccount&lt;'info&gt;,
    
    <span class="text-gray-500">/// CHECK: value recipient</span>
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> to: UncheckedAccount&lt;'info&gt;,
    
    <span class="text-purple-400">#[account(
        mut,
        seeds=[&uuid],
        bump,
        has_one = from @ Errors::AccountMismatch,  </span><span class="text-gray-500">← Verify escrow.from == from</span>
        <span class="text-purple-400">has_one = to @ Errors::AccountMismatch,    </span><span class="text-gray-500">← Verify escrow.to == to</span>
        <span class="text-purple-400">constraint = escrow.is_out == is_out @ Errors::InvalidDirection,</span>
    <span class="text-purple-400">)]</span>
    <span class="text-blue-400">pub</span> escrow: Account&lt;'info, Escrow&gt;,
    
    <span class="text-purple-400">#[account(seeds = [ADMIN_SETTINGS_SEED], bump, has_one = fee_recepient)]</span>
    <span class="text-blue-400">pub</span> admin_settings: Account&lt;'info, AdminSettings&gt;,
    
    <span class="text-gray-500">/// CHECK: fee recipient</span>
    <span class="text-purple-400">#[account(mut)]</span>
    <span class="text-blue-400">pub</span> fee_recepient: UncheckedAccount&lt;'info&gt;,
    
    <span class="text-blue-400">pub</span> system_program: Program&lt;'info, System&gt;,
    <span class="text-blue-400">pub</span> token_program: Option&lt;Program&lt;'info, Token&gt;&gt;,
}</code></pre>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-blue-400 mb-2">✅ Automatic Checks</h5>
              <ul class="text-gray-300 space-y-1 text-xs">
                <li>• <code class="bg-gray-800 px-1 rounded">payer</code> must sign transaction</li>
                <li>• <code class="bg-gray-800 px-1 rounded">escrow</code> PDA derived from uuid</li>
                <li>• <code class="bg-gray-800 px-1 rounded">escrow.from</code> must equal <code class="bg-gray-800 px-1 rounded">from</code> account</li>
                <li>• <code class="bg-gray-800 px-1 rounded">escrow.to</code> must equal <code class="bg-gray-800 px-1 rounded">to</code> account</li>
                <li>• <code class="bg-gray-800 px-1 rounded">escrow.is_out</code> must match parameter</li>
                <li>• <code class="bg-gray-800 px-1 rounded">admin_settings</code> is valid PDA</li>
                <li>• <code class="bg-gray-800 px-1 rounded">admin_settings.fee_recepient</code> matches account</li>
              </ul>
            </div>
            <div class="bg-red-500/10 border border-red-500/30 rounded p-3 text-sm">
              <h5 class="font-semibold text-red-400 mb-2">❌ Without Anchor (Manual)</h5>
              <ul class="text-gray-300 space-y-1 text-xs">
                <li>• Parse all accounts from array</li>
                <li>• Check <code class="bg-gray-800 px-1 rounded">is_signer</code> for payer</li>
                <li>• Deserialize escrow account</li>
                <li>• Manually verify escrow.from</li>
                <li>• Manually verify escrow.to</li>
                <li>• Check is_out direction</li>
                <li>• Calculate and verify PDA</li>
                <li>• Deserialize admin_settings</li>
                <li>• Verify fee recipient</li>
                <li>• ~50+ lines of validation code!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Types -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📦 Anchor Account Types</h3>
        </div>
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="text-left py-3 px-4 text-gray-400">Type</th>
                  <th class="text-left py-3 px-4 text-gray-400">Purpose</th>
                  <th class="text-left py-3 px-4 text-gray-400">Checks</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="type in accountTypes" :key="type.name" class="border-b border-gray-800">
                  <td class="py-3 px-4">
                    <code class="text-xs bg-gray-800 px-2 py-1 rounded" :class="type.color">{{ type.name }}</code>
                  </td>
                  <td class="py-3 px-4 text-gray-300">{{ type.purpose }}</td>
                  <td class="py-3 px-4 text-gray-400 text-xs">{{ type.checks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Error Handling -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">⚠️ Error Handling</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            Anchor provides a clean way to define and use custom errors:
          </p>

          <div class="grid lg:grid-cols-2 gap-6">
            <div>
              <h5 class="text-sm font-semibold text-purple-400 mb-2">Define Errors</h5>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-purple-400">#[error_code]</span>
<span class="text-blue-400">pub enum</span> <span class="text-yellow-400">Errors</span> {
    <span class="text-purple-400">#[msg("account mismatch")]</span>
    AccountMismatch,
    
    <span class="text-purple-400">#[msg("invalid amount")]</span>
    InvalidAmount,
    
    <span class="text-purple-400">#[msg("deadline exceeded")]</span>
    DeadlineExceeded,
    
    <span class="text-purple-400">#[msg("preimage mismatch")]</span>
    PreimageMismatch,
}</code></pre>
              </div>
            </div>

            <div>
              <h5 class="text-sm font-semibold text-green-400 mb-2">Use Errors</h5>
              <div class="bg-gray-900 rounded p-3 text-xs font-mono overflow-x-auto">
                <pre class="text-xs"><code class="text-gray-300"><span class="text-gray-500">// In constraints</span>
<span class="text-purple-400">#[account(
    has_one = from @ Errors::AccountMismatch,
)]</span>

<span class="text-gray-500">// In function body</span>
<span class="text-blue-400">require!</span>(
    amount > 0,
    Errors::InvalidAmount
);

<span class="text-blue-400">require!</span>(
    timestamp <= timelock,
    Errors::DeadlineExceeded
);</code></pre>
              </div>
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-300">
            Errors automatically include:
            <ul class="ml-4 mt-2 space-y-1 text-xs text-gray-400">
              <li>• Custom error message</li>
              <li>• Error code (for indexing)</li>
              <li>• Source file and line number</li>
            </ul>
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
              <h4 class="font-semibold text-green-400">Why Use Anchor?</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>80% less code</strong> compared to native Solana</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Automatic security checks</strong> prevent common bugs</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Type-safe</strong> account deserialization</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Industry standard</strong> - used by most Solana projects</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Great tooling</strong> - CLI, IDL generation, testing</span>
                </li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-yellow-400">When NOT to Use Anchor?</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Maximum performance</strong> - native is slightly faster</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Compute budget limits</strong> - very tight budgets</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Learning exercise</strong> - want to understand internals</span>
                </li>
              </ul>
              <div class="text-xs text-gray-400 mt-4 p-3 bg-gray-800 rounded">
                💡 <strong>Recommendation:</strong> Start with Anchor. Only drop to native if you have a specific reason.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">🚀 Next Steps</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link 
            to="/solana/account-model"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-cyan-400 mb-2">← Account Model</h4>
            <p class="text-sm text-gray-300">Understand Solana's account architecture</p>
          </router-link>
          
          <router-link 
            to="/solana/pda-seeds"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-purple-400 mb-2">← PDA & Seeds</h4>
            <p class="text-sm text-gray-300">Learn about Program Derived Addresses</p>
          </router-link>
          
          <router-link 
            to="/solana/evm-comparison"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-green-400 mb-2">→ EVM Comparison</h4>
            <p class="text-sm text-gray-300">See how it differs from Ethereum</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const constraints = ref([
  {
    name: 'mut',
    category: 'Mutability',
    color: 'text-yellow-400',
    description: 'Account data can be modified',
    example: '#[account(mut)] pub escrow: Account<\'info, Escrow>'
  },
  {
    name: 'init',
    category: 'Lifecycle',
    color: 'text-green-400',
    description: 'Create a new account',
    example: '#[account(init, payer = payer, space = 265)]'
  },
  {
    name: 'seeds / bump',
    category: 'PDA',
    color: 'text-purple-400',
    description: 'Verify or derive Program Derived Address',
    example: '#[account(seeds = [b"settings"], bump)]'
  },
  {
    name: 'has_one',
    category: 'Validation',
    color: 'text-blue-400',
    description: 'Verify account field matches another account',
    example: '#[account(has_one = from @ Errors::AccountMismatch)]'
  },
  {
    name: 'constraint',
    category: 'Validation',
    color: 'text-cyan-400',
    description: 'Custom validation expression',
    example: '#[account(constraint = amount > 0 @ Errors::InvalidAmount)]'
  },
  {
    name: 'close',
    category: 'Lifecycle',
    color: 'text-red-400',
    description: 'Close account and return rent',
    example: '#[account(close = receiver)]'
  },
])

const accountTypes = ref([
  {
    name: 'Signer<\'info>',
    color: 'text-cyan-400',
    purpose: 'Must sign the transaction',
    checks: 'is_signer = true'
  },
  {
    name: 'Account<\'info, T>',
    color: 'text-purple-400',
    purpose: 'Deserialized account of type T',
    checks: 'owner, discriminator, deserialization'
  },
  {
    name: 'SystemAccount<\'info>',
    color: 'text-blue-400',
    purpose: 'System-owned account',
    checks: 'owner = System Program'
  },
  {
    name: 'UncheckedAccount<\'info>',
    color: 'text-yellow-400',
    purpose: 'No automatic validation',
    checks: 'None (use with /// CHECK: comment)'
  },
  {
    name: 'Program<\'info, T>',
    color: 'text-green-400',
    purpose: 'Reference to a program',
    checks: 'executable = true'
  },
  {
    name: 'AccountLoader<\'info, T>',
    color: 'text-pink-400',
    purpose: 'Zero-copy account (large data)',
    checks: 'owner, discriminator'
  },
])
</script>
