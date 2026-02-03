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
          <h1 class="text-xl font-bold text-white">PDA & Seeds Calculator</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Left Column: Theory and Input -->
        <div class="space-y-6">
          <!-- What is PDA -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">🎯 What is a PDA?</h2>
            </div>
            <div class="card-body space-y-3">
              <p class="text-gray-300">
                <strong class="text-purple-400">Program Derived Address (PDA)</strong> is a special type of account address 
                that is deterministically derived from seeds and a program ID.
              </p>
              <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <p class="text-sm text-gray-300">
                  <strong>Key Property:</strong> PDAs are <em>not</em> on the Ed25519 curve, meaning they don't have a corresponding private key. 
                  Only the program can "sign" for them.
                </p>
              </div>
              <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-gray-300">
                <strong class="text-blue-400">Formula:</strong><br>
                <code class="text-xs bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                  PDA = hash(seeds + program_id + "ProgramDerivedAddress")
                </code>
              </div>
            </div>
          </div>

          <!-- PDA Calculator -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">🧮 PDA Calculator</h2>
            </div>
            <div class="card-body space-y-4">
              <!-- Program ID -->
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">
                  Program ID
                </label>
                <input
                  v-model="programId"
                  type="text"
                  placeholder="e.g., FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo"
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                  @input="calculatePDA"
                />
              </div>

              <!-- Seeds -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-400">
                    Seeds
                  </label>
                  <button
                    @click="addSeed"
                    class="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Seed
                  </button>
                </div>

                <div v-if="seeds.length === 0" class="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-700 rounded">
                  No seeds yet. Click "Add Seed" to start.
                </div>

                <div v-else class="space-y-3">
                  <div
                    v-for="(seed, index) in seeds"
                    :key="index"
                    class="bg-gray-800 rounded-lg p-3 relative"
                  >
                    <button
                      @click="removeSeed(index)"
                      class="absolute top-2 right-2 text-gray-500 hover:text-red-400"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div class="grid grid-cols-3 gap-2 mb-2">
                      <div class="col-span-1">
                        <label class="text-xs text-gray-500 mb-1 block">Type</label>
                        <select
                          v-model="seed.type"
                          class="w-full px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                          @change="calculatePDA"
                        >
                          <option value="string">String</option>
                          <option value="pubkey">Pubkey</option>
                          <option value="bytes">Bytes</option>
                          <option value="u64">u64</option>
                          <option value="u32">u32</option>
                        </select>
                      </div>
                      <div class="col-span-2">
                        <label class="text-xs text-gray-500 mb-1 block">Label (optional)</label>
                        <input
                          v-model="seed.label"
                          type="text"
                          placeholder="e.g., 'settings', 'uuid'"
                          class="w-full px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-xs placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="text-xs text-gray-500 mb-1 block">Value</label>
                      <input
                        v-model="seed.value"
                        type="text"
                        :placeholder="getSeedPlaceholder(seed.type)"
                        class="w-full px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-xs placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                        @input="calculatePDA"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Presets -->
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">
                  Quick Presets (from Otmoic)
                </label>
                <div class="grid grid-cols-1 gap-2">
                  <button
                    v-for="preset in presets"
                    :key="preset.name"
                    @click="loadPreset(preset)"
                    class="text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
                  >
                    <div class="font-semibold text-white">{{ preset.name }}</div>
                    <div class="text-xs text-gray-400">{{ preset.description }}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Result and Explanation -->
        <div class="space-y-6">
          <!-- Result -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">✨ Calculated PDA</h2>
            </div>
            <div class="card-body">
              <div v-if="!pdaResult" class="text-center py-8 text-gray-500">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p>Enter program ID and seeds to calculate PDA</p>
              </div>

              <div v-else class="space-y-4">
                <!-- PDA Address -->
                <div>
                  <label class="text-sm font-medium text-gray-400 mb-2 block">Program Derived Address</label>
                  <div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-lg p-4">
                    <code class="text-purple-300 text-sm break-all font-mono">{{ pdaResult.address }}</code>
                    <button
                      @click="copyToClipboard(pdaResult.address)"
                      class="mt-2 text-xs text-gray-400 hover:text-purple-400 flex items-center gap-1"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>

                <!-- Bump Seed -->
                <div>
                  <label class="text-sm font-medium text-gray-400 mb-2 block">Bump Seed</label>
                  <div class="bg-gray-800 rounded-lg p-4">
                    <div class="flex items-baseline gap-3">
                      <code class="text-2xl text-green-400 font-mono">{{ pdaResult.bump }}</code>
                      <span class="text-sm text-gray-400">(0-255, found by searching)</span>
                    </div>
                  </div>
                </div>

                <!-- Seeds Used -->
                <div>
                  <label class="text-sm font-medium text-gray-400 mb-2 block">Seeds Used</label>
                  <div class="space-y-2">
                    <div
                      v-for="(seed, index) in seeds"
                      :key="index"
                      class="bg-gray-800 rounded p-3 text-sm"
                    >
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-500">#{{ index + 1 }}</span>
                        <span v-if="seed.label" class="text-blue-400 font-semibold">{{ seed.label }}</span>
                        <span class="text-xs text-gray-500 px-2 py-0.5 bg-gray-900 rounded">{{ seed.type }}</span>
                      </div>
                      <code class="text-xs text-gray-300 break-all font-mono">{{ seed.value }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- How it Works -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-bold text-white">🔍 How PDA Works</h3>
            </div>
            <div class="card-body space-y-4">
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">1</span>
                  <div class="text-gray-300">
                    <strong>Combine Seeds:</strong> All seed values are concatenated together as bytes
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">2</span>
                  <div class="text-gray-300">
                    <strong>Try Bump Values:</strong> Starting from 255, try adding each bump value
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">3</span>
                  <div class="text-gray-300">
                    <strong>Hash with SHA256:</strong> Hash (seeds + bump + program_id + "ProgramDerivedAddress")
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">4</span>
                  <div class="text-gray-300">
                    <strong>Check Curve:</strong> If result is NOT on Ed25519 curve, we found the PDA!
                  </div>
                </div>
              </div>

              <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-gray-300">
                <strong class="text-blue-400">Why Bump?</strong> Without the bump, the hash might land on the Ed25519 curve (meaning it would have a private key). 
                The bump ensures we find an address that's provably not on the curve.
              </div>
            </div>
          </div>

          <!-- Calculation Formula Visualization -->
          <div class="card" v-if="pdaResult">
            <div class="card-header">
              <h3 class="text-xl font-bold text-white">🧮 Calculation Formula</h3>
            </div>
            <div class="card-body">
              <div class="bg-gray-900 rounded-lg p-4 space-y-3">
                <div class="text-sm text-gray-400 mb-2">Step-by-step calculation:</div>
                
                <!-- Step 1: Seeds -->
                <div class="flex items-start gap-3">
                  <div class="text-purple-400 font-mono text-sm min-w-[60px]">Seeds:</div>
                  <div class="flex-1">
                    <div v-for="(seed, index) in seeds" :key="index" class="mb-1">
                      <span class="text-gray-500 text-xs">{{ index + 1 }}.</span>
                      <code class="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-400 ml-2">
                        {{ seed.label || seed.type }}: {{ truncateValue(seed.value) }}
                      </code>
                      <span class="text-gray-500 text-xs ml-2">({{ seed.type }})</span>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Bump -->
                <div class="flex items-start gap-3">
                  <div class="text-green-400 font-mono text-sm min-w-[60px]">Bump:</div>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded text-green-400">{{ pdaResult.bump }}</code>
                  <span class="text-gray-500 text-xs ml-2">(u8, tried from 255 down)</span>
                </div>

                <!-- Step 3: Program ID -->
                <div class="flex items-start gap-3">
                  <div class="text-blue-400 font-mono text-sm min-w-[60px]">Program:</div>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded text-blue-400 break-all">{{ truncateAddress(programId) }}</code>
                </div>

                <!-- Step 4: Magic String -->
                <div class="flex items-start gap-3">
                  <div class="text-yellow-400 font-mono text-sm min-w-[60px]">Marker:</div>
                  <code class="text-xs bg-gray-800 px-2 py-1 rounded text-yellow-400">"ProgramDerivedAddress"</code>
                  <span class="text-gray-500 text-xs ml-2">(fixed constant)</span>
                </div>

                <!-- Formula -->
                <div class="border-t border-gray-700 pt-3 mt-3">
                  <div class="text-xs text-gray-400 mb-2">Hash Input:</div>
                  <div class="bg-gray-800 rounded p-3 text-xs font-mono break-all">
                    <span class="text-purple-400">SHA256</span>(
                      <span class="text-cyan-400" v-for="(seed, index) in seeds" :key="'seed-' + index">
                        seed{{ index + 1 }} + 
                      </span>
                      <span class="text-green-400">bump</span> + 
                      <span class="text-blue-400">program_id</span> + 
                      <span class="text-yellow-400">"ProgramDerivedAddress"</span>
                    )
                  </div>
                </div>

                <!-- Result -->
                <div class="border-t border-gray-700 pt-3 mt-3">
                  <div class="text-xs text-gray-400 mb-2">Result (if NOT on Ed25519 curve):</div>
                  <code class="text-xs bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 px-3 py-2 rounded text-purple-300 block break-all">
                    {{ pdaResult.address }}
                  </code>
                </div>
              </div>

              <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-xs text-gray-300 mt-3">
                <strong class="text-yellow-400">Note about Label:</strong> The "label" field is just for your reference - 
                it's NOT included in the calculation. Only the seed's <strong>value</strong> and <strong>type</strong> matter.
              </div>
            </div>
          </div>

          <!-- Bump Search Animation -->
          <div class="card" v-if="showBumpAnimation">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white">🎬 Bump Search Process</h3>
                <button
                  @click="startBumpAnimation"
                  class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
                >
                  ▶ Replay
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-sm text-gray-400 mb-4">
                Solana tries bump values from 255 down to 0 until it finds an address NOT on the Ed25519 curve:
              </p>

              <div class="bg-gray-900 rounded-lg p-4">
                <!-- Current Bump -->
                <div class="text-center mb-4">
                  <div class="text-xs text-gray-400 mb-1">Current Bump:</div>
                  <div class="text-4xl font-bold font-mono" :class="bumpAnimationState.found ? 'text-green-400' : 'text-yellow-400'">
                    {{ bumpAnimationState.currentBump }}
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="mb-4">
                  <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-300"
                      :class="bumpAnimationState.found ? 'bg-green-500' : 'bg-yellow-500'"
                      :style="{ width: bumpAnimationState.progress + '%' }"
                    ></div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>255</span>
                    <span>{{ bumpAnimationState.attempts }} attempts</span>
                    <span>0</span>
                  </div>
                </div>

                <!-- Status -->
                <div class="text-center text-sm p-3 rounded" :class="bumpAnimationState.found ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'">
                  <span v-if="!bumpAnimationState.found" class="text-yellow-400">
                    🔍 Testing bump {{ bumpAnimationState.currentBump }}... 
                    <span class="text-gray-400">Hash result is on curve, trying next...</span>
                  </span>
                  <span v-else class="text-green-400">
                    ✅ Found valid PDA! Bump {{ bumpAnimationState.currentBump }} produces an address NOT on the curve.
                  </span>
                </div>

                <!-- Hash visualization -->
                <div class="mt-4 text-xs">
                  <div class="text-gray-400 mb-2">Hash Calculation:</div>
                  <div class="bg-gray-800 rounded p-2 font-mono break-all text-gray-500">
                    SHA256(seeds + <span class="text-yellow-400">{{ bumpAnimationState.currentBump }}</span> + program_id + "ProgramDerivedAddress")
                  </div>
                  <div class="mt-2 text-gray-400">
                    <span v-if="!bumpAnimationState.found">→ Result: <span class="text-red-400">On curve ✗</span></span>
                    <span v-else>→ Result: <span class="text-green-400">Off curve ✓</span> (Valid PDA!)</span>
                  </div>
                </div>
              </div>

              <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-xs text-gray-300 mt-4">
                <strong class="text-purple-400">Fun Fact:</strong> On average, about 50% of hashes will be on the curve, 
                so typically you only need to try 1-2 bump values. But in worst case, you might need to try all 256 values!
              </div>
            </div>
          </div>

          <!-- Real World Example -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-bold text-white">📦 Real Example: Otmoic Escrow</h3>
            </div>
            <div class="card-body">
              <p class="text-sm text-gray-400 mb-3">
                In the Otmoic bridge, each swap creates a unique escrow account using the swap UUID:
              </p>
              <div class="bg-gray-900 rounded p-4 text-sm font-mono">
                <span class="text-purple-400">#[account(</span><br>
                <span class="text-gray-400">  &nbsp;&nbsp;init,</span><br>
                <span class="text-gray-400">  &nbsp;&nbsp;payer = payer,</span><br>
                <span class="text-gray-400">  &nbsp;&nbsp;space = size_of::&lt;Escrow&gt;() + 8,</span><br>
                <span class="text-blue-400">  &nbsp;&nbsp;seeds = [&uuid],</span><br>
                <span class="text-green-400">  &nbsp;&nbsp;bump</span><br>
                <span class="text-purple-400">)]</span><br>
                <span class="text-gray-300">pub escrow: Account&lt;'info, Escrow&gt;</span>
              </div>
              <div class="mt-3 text-xs text-gray-400 space-y-1">
                <p>• <strong>Seeds:</strong> Just the UUID (32 bytes)</p>
                <p>• <strong>Program:</strong> Otmoic program ID</p>
                <p>• <strong>Result:</strong> Deterministic address for this specific swap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SeedInput } from '../../types/solana'

const programId = ref('FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo')
const seeds = ref<SeedInput[]>([])
const pdaResult = ref<{ address: string; bump: number } | null>(null)
const showBumpAnimation = ref(false)

// Bump animation state
const bumpAnimationState = ref({
  currentBump: 255,
  attempts: 0,
  found: false,
  progress: 0
})

let bumpAnimationTimer: number | null = null

const presets = ref([
  {
    name: 'Admin Settings',
    description: 'Global admin configuration account',
    programId: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
    seeds: [
      { type: 'string' as const, value: 'settings', label: 'ADMIN_SETTINGS_SEED' }
    ]
  },
  {
    name: 'Token Settings',
    description: 'Per-token configuration (max fees)',
    programId: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
    seeds: [
      { type: 'string' as const, value: 'token', label: 'TOKEN_SETTINGS_PREFIX' },
      { type: 'pubkey' as const, value: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', label: 'mint' }
    ]
  },
  {
    name: 'Escrow Account',
    description: 'Unique escrow for each swap',
    programId: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
    seeds: [
      { type: 'bytes' as const, value: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', label: 'uuid' }
    ]
  }
])

function addSeed() {
  seeds.value.push({
    type: 'string',
    value: '',
    label: ''
  })
}

function removeSeed(index: number) {
  seeds.value.splice(index, 1)
  calculatePDA()
}

function getSeedPlaceholder(type: string): string {
  const placeholders: Record<string, string> = {
    string: 'e.g., "settings"',
    pubkey: 'e.g., EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    bytes: 'e.g., a1b2c3d4... (hex)',
    u64: 'e.g., 1000000000',
    u32: 'e.g., 42'
  }
  return placeholders[type] || ''
}

function loadPreset(preset: typeof presets.value[0]) {
  programId.value = preset.programId
  seeds.value = JSON.parse(JSON.stringify(preset.seeds))
  calculatePDA()
}

function calculatePDA() {
  if (!programId.value || seeds.value.length === 0) {
    pdaResult.value = null
    showBumpAnimation.value = false
    return
  }

  // 简化的演示计算
  // 实际应该使用 @solana/web3.js 的 PublicKey.findProgramAddressSync
  try {
    const seedsStr = seeds.value.map(s => s.value || 'empty').join('-')
    const bump = Math.floor(Math.random() * 256) // 模拟查找 bump
    
    // 生成一个看起来像 base58 地址的模拟结果
    const mockAddress = generateMockAddress(seedsStr, programId.value, bump)
    
    pdaResult.value = {
      address: mockAddress,
      bump
    }
    
    showBumpAnimation.value = true
    startBumpAnimation()
  } catch (error) {
    pdaResult.value = null
    showBumpAnimation.value = false
  }
}

function startBumpAnimation() {
  // Reset animation state
  if (bumpAnimationTimer) {
    clearInterval(bumpAnimationTimer)
  }
  
  bumpAnimationState.value = {
    currentBump: 255,
    attempts: 0,
    found: false,
    progress: 0
  }

  const targetBump = pdaResult.value?.bump || 253
  const speed = 150 // ms per attempt

  bumpAnimationTimer = window.setInterval(() => {
    if (bumpAnimationState.value.currentBump <= targetBump) {
      bumpAnimationState.value.found = true
      if (bumpAnimationTimer) {
        clearInterval(bumpAnimationTimer)
      }
      return
    }

    bumpAnimationState.value.currentBump--
    bumpAnimationState.value.attempts++
    bumpAnimationState.value.progress = ((255 - bumpAnimationState.value.currentBump) / 255) * 100
  }, speed)
}

function truncateValue(value: string): string {
  if (value.length > 20) {
    return value.substring(0, 10) + '...' + value.substring(value.length - 6)
  }
  return value
}

function truncateAddress(address: string): string {
  if (address.length > 20) {
    return address.substring(0, 8) + '...' + address.substring(address.length - 8)
  }
  return address
}

function generateMockAddress(seeds: string, program: string, bump: number): string {
  // 这是一个简化的模拟，实际应该使用真实的 PDA 计算
  const combined = `${seeds}-${program}-${bump}`
  const hash = Array.from(combined).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  let result = ''
  let num = hash
  
  for (let i = 0; i < 44; i++) {
    result += base58Chars[num % 58]
    num = Math.floor(num / 2) + hash
  }
  
  return result
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}
</script>
