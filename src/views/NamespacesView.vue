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
          <h1 class="text-xl font-bold text-white">EVM Storage Layout Deep Dive</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">Understanding EVM Storage Layout</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            The EVM provides <strong class="text-white">2^256 storage slots</strong>, each holding 32 bytes.
            Different data types occupy storage in different ways. Let's visualize how this works.
          </p>
          <div class="grid md:grid-cols-4 gap-3">
            <div class="bg-gray-800 rounded p-3 text-center">
              <div class="text-2xl font-bold text-white mb-1">32</div>
              <div class="text-xs text-gray-400">Bytes per slot</div>
            </div>
            <div class="bg-gray-800 rounded p-3 text-center">
              <div class="text-2xl font-bold text-white mb-1">2^256</div>
              <div class="text-xs text-gray-400">Total slots</div>
            </div>
            <div class="bg-gray-800 rounded p-3 text-center">
              <div class="text-2xl font-bold text-white mb-1">0, 1, 2...</div>
              <div class="text-xs text-gray-400">Sequential slots</div>
            </div>
            <div class="bg-gray-800 rounded p-3 text-center">
              <div class="text-2xl font-bold text-white mb-1">keccak256</div>
              <div class="text-xs text-gray-400">Dynamic data</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Storage Layout Visualization -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left: Storage Grid -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Types Deep Dive -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-bold text-white">Basic Types Storage</h3>
            </div>
            <div class="card-body">
              <div class="space-y-4">
                <!-- Address -->
                <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <div class="text-sm font-bold text-blue-400 mb-1">address owner</div>
                      <div class="text-xs text-gray-400">20 bytes, right-aligned in 32-byte slot</div>
                    </div>
                    <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">Slot 0</div>
                  </div>
                  <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                    <span class="text-gray-600">0x000000000000000000000000</span><span class="text-blue-400">742d35Cc6634C0532925a3b8</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    ← 12 zero bytes (padding) | 20 bytes address →
                  </div>
                </div>

                <!-- uint256 -->
                <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <div class="text-sm font-bold text-blue-400 mb-1">uint256 totalSupply</div>
                      <div class="text-xs text-gray-400">32 bytes, full slot</div>
                    </div>
                    <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">Slot 1</div>
                  </div>
                  <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                    <span class="text-blue-400">0x00000000000000000000000000000000000000000000000000000000000f4240</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    Value: 1,000,000 (0x0f4240)
                  </div>
                </div>

                <!-- bool -->
                <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <div class="text-sm font-bold text-blue-400 mb-1">bool paused</div>
                      <div class="text-xs text-gray-400">1 byte stored as uint8 (0 or 1)</div>
                    </div>
                    <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">Slot 2</div>
                  </div>
                  <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                    <span class="text-gray-600">0x0000000000000000000000000000000000000000000000000000000000000001</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    0x01 = true, 0x00 = false (right-aligned)
                  </div>
                </div>

                <!-- string (short) -->
                <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <div class="text-sm font-bold text-blue-400 mb-1">string name = "TNAME"</div>
                      <div class="text-xs text-gray-400">Short string (≤31 bytes), stored in 1 slot</div>
                    </div>
                    <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">Slot 3</div>
                  </div>
                  <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2 mb-2">
                    <span class="text-blue-400">0x544e414d45000000000000000000000000000000000000000000000000000</span><span class="text-green-400">0a</span>
                  </div>
                  <div class="text-xs text-gray-400 space-y-1">
                    <div>• Data: <span class="text-blue-400">0x544e414d45</span> = "TNAME" (5 bytes, left-aligned)</div>
                    <div>• Last byte: <span class="text-green-400">0x0a</span> = length * 2 = 5 * 2 = 10</div>
                  </div>
                </div>

                <!-- string (long) -->
                <div class="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <div class="text-sm font-bold text-blue-400 mb-1">string description (50 bytes)</div>
                      <div class="text-xs text-gray-400">Long string (&gt;31 bytes), multi-slot</div>
                    </div>
                    <div class="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono text-blue-400">Slot 4</div>
                  </div>
                  <div class="space-y-2">
                    <div>
                      <div class="text-xs text-gray-500 mb-1">Base Slot (stores length * 2 + 1):</div>
                      <div class="font-mono text-xs text-gray-300 break-all bg-gray-900 rounded p-2">
                        0x000000000000000000000000000000000000000000000000000000000000<span class="text-green-400">0065</span>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">0x65 = 101 = 50 * 2 + 1</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 mb-1">Actual Data (at keccak256(4)):</div>
                      <div class="font-mono text-xs text-blue-400 bg-gray-900 rounded p-2">
                        keccak256(4) + 0: [first 32 bytes]<br>
                        keccak256(4) + 1: [remaining 18 bytes]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Storage Grid -->
          <div class="card">
            <div class="card-header flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Storage Layout Grid</h3>
              <div class="text-xs text-gray-400">Each cell = 1 slot (32 bytes)</div>
            </div>
            <div class="card-body">
              <!-- Legend -->
              <div class="flex flex-wrap gap-3 mb-6 pb-4 border-b border-gray-700">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  <span class="text-xs text-gray-400">Direct Variables</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span class="text-xs text-gray-400">Mapping Base</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-green-500 rounded"></div>
                  <span class="text-xs text-gray-400">Array Length</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-purple-500 rounded"></div>
                  <span class="text-xs text-gray-400">ERC-7201 Namespace</span>
                </div>
              </div>

              <!-- Storage Grid: Slots 0-15 -->
              <div class="mb-8">
                <h4 class="text-sm font-semibold text-white mb-3">Direct Storage (Slots 0-15)</h4>
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="slot in directSlots"
                    :key="slot.slot"
                    class="storage-cell"
                    :class="slot.type"
                    @mouseenter="hoveredSlot = slot"
                    @mouseleave="hoveredSlot = null"
                  >
                    <div class="text-xs font-mono text-gray-500 mb-1">Slot {{ slot.slot }}</div>
                    <div class="text-xs font-semibold text-white truncate">{{ slot.label }}</div>
                    <div class="text-xs text-gray-400 truncate">{{ slot.typeLabel }}</div>
                  </div>
                </div>
              </div>

              <!-- Dynamic Data Section -->
              <div class="mb-8">
                <h4 class="text-sm font-semibold text-white mb-3">Dynamic Data (keccak256 results)</h4>
                <div class="bg-gray-800 rounded-lg p-4">
                  <div class="space-y-3">
                    <!-- Mapping Example -->
                    <div class="border-l-4 border-yellow-500 pl-4">
                      <div class="text-sm font-semibold text-yellow-400 mb-2">Mapping Storage</div>
                      <div class="code-block text-xs mb-2">
                        <code class="text-gray-300">mapping(uint256 => User) users; // slot 5</code>
                      </div>
                      <div class="text-xs text-gray-400 mb-2">
                        Location of <code class="text-yellow-400">users[123]</code>:
                      </div>
                      <div class="code-block text-xs">
                        <code class="text-yellow-400">keccak256(abi.encode(123, 5))</code>
                      </div>
                      <div class="mt-2 text-xs text-gray-500">
                        → Result: 0xa82c...f3d1
                      </div>
                    </div>

                    <!-- Array Example -->
                    <div class="border-l-4 border-green-500 pl-4">
                      <div class="text-sm font-semibold text-green-400 mb-2">Array Storage</div>
                      <div class="code-block text-xs mb-2">
                        <code class="text-gray-300">uint256[] items; // slot 10</code>
                      </div>
                      <div class="text-xs text-gray-400 mb-2">
                        Length stored at slot 10, elements at:
                      </div>
                      <div class="code-block text-xs">
                        <code class="text-green-400">keccak256(abi.encode(10)) + index</code>
                      </div>
                      <div class="mt-2 text-xs text-gray-500">
                        → items[0]: 0x295e...9f12
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ERC-7201 Namespaces -->
              <div>
                <h4 class="text-sm font-semibold text-white mb-3">ERC-7201 Namespaced Storage (High Entropy Slots)</h4>
                <div class="space-y-3">
                  <div
                    v-for="ns in namespaces"
                    :key="ns.name"
                    class="storage-cell namespace-cell"
                    :style="{ borderColor: ns.color, backgroundColor: ns.color + '10' }"
                    @mouseenter="hoveredNamespace = ns"
                    @mouseleave="hoveredNamespace = null"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="text-sm font-semibold text-white mb-1">{{ ns.name }}</div>
                        <div class="code-block text-xs mb-2">
                          <code :style="{ color: ns.color }">{{ ns.namespace }}</code>
                        </div>
                        <div class="font-mono text-xs mb-2" :style="{ color: ns.color }">
                          {{ formatSlot(ns.slot) }}
                        </div>
                        <div class="text-xs text-gray-400">
                          Variables: {{ ns.variables.join(', ') }}
                        </div>
                      </div>
                      <div class="ml-3">
                        <div 
                          class="px-3 py-1 rounded-full text-xs font-bold"
                          :style="{ backgroundColor: ns.color + '30', color: ns.color }"
                        >
                          ...{{ ns.slot.slice(-4) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info Panel -->
        <div class="space-y-6">
          <!-- Hovered Slot Info -->
          <div v-if="hoveredSlot" class="card">
            <div class="card-header">
              <h3 class="text-lg font-bold text-white">Slot {{ hoveredSlot.slot }} Details</h3>
            </div>
            <div class="card-body">
              <div class="space-y-3">
                <div>
                  <div class="text-xs text-gray-500 mb-1">Variable</div>
                  <div class="text-white font-semibold">{{ hoveredSlot.label }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Type</div>
                  <div class="code-block text-xs">
                    <code>{{ hoveredSlot.solidityType }}</code>
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Storage Address</div>
                  <div class="font-mono text-xs text-gray-300">
                    {{ formatSlotAddress(hoveredSlot.slot) }}
                  </div>
                </div>
                <div v-if="hoveredSlot.description">
                  <div class="text-xs text-gray-500 mb-1">Description</div>
                  <div class="text-sm text-gray-400">{{ hoveredSlot.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hovered Namespace Info -->
          <div v-if="hoveredNamespace" class="card">
            <div class="card-header">
              <h3 class="text-lg font-bold text-white">{{ hoveredNamespace.name }}</h3>
            </div>
            <div class="card-body">
              <div class="space-y-3">
                <div>
                  <div class="text-xs text-gray-500 mb-1">Namespace String</div>
                  <div class="code-block text-xs">
                    <code :style="{ color: hoveredNamespace.color }">
                      {{ hoveredNamespace.namespace }}
                    </code>
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Storage Slot</div>
                  <div class="font-mono text-xs break-all" :style="{ color: hoveredNamespace.color }">
                    {{ hoveredNamespace.slot }}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Purpose</div>
                  <div class="text-sm text-gray-400">{{ hoveredNamespace.purpose }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Last Byte</div>
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-lg font-bold" :style="{ color: hoveredNamespace.color }">
                      {{ hoveredNamespace.slot.slice(-2) }}
                    </span>
                    <span class="text-xs text-gray-500">(Always 00)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Default Info -->
          <div v-if="!hoveredSlot && !hoveredNamespace" class="card">
            <div class="card-header">
              <h3 class="text-lg font-bold text-white">Storage Layout Rules</h3>
            </div>
            <div class="card-body space-y-4">
              <!-- Basic Types -->
              <div>
                <div class="font-semibold text-blue-400 mb-2">📦 Basic Types</div>
                <div class="space-y-2 text-xs">
                  <div class="bg-gray-800 rounded p-2">
                    <div class="font-mono text-blue-300 mb-1">address (20 bytes)</div>
                    <div class="text-gray-400">Stored in 1 slot, right-aligned (padded with 12 zero bytes)</div>
                  </div>
                  <div class="bg-gray-800 rounded p-2">
                    <div class="font-mono text-blue-300 mb-1">uint256 / int256 (32 bytes)</div>
                    <div class="text-gray-400">Exactly 1 slot, stores full 256-bit value</div>
                  </div>
                  <div class="bg-gray-800 rounded p-2">
                    <div class="font-mono text-blue-300 mb-1">bool (1 byte)</div>
                    <div class="text-gray-400">Stored in 1 slot as uint8 (0 or 1), right-aligned</div>
                  </div>
                  <div class="bg-gray-800 rounded p-2">
                    <div class="font-mono text-blue-300 mb-1">string</div>
                    <div class="text-gray-400">
                      <strong>Short (≤31 bytes)</strong>: 1 slot, data + length*2<br>
                      <strong>Long (&gt;31 bytes)</strong>: Base slot (length*2+1) + keccak256(slot) for data
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mappings -->
              <div>
                <div class="font-semibold text-yellow-400 mb-2">🗺️ Mappings</div>
                <div class="text-sm text-gray-400">
                  Base slot is empty. Actual value location:
                  <div class="code-block text-xs mt-1">
                    <code class="text-yellow-400">keccak256(abi.encode(key, slot))</code>
                  </div>
                </div>
              </div>

              <!-- Dynamic Arrays -->
              <div>
                <div class="font-semibold text-green-400 mb-2">📚 Dynamic Arrays</div>
                <div class="text-sm text-gray-400">
                  Base slot stores length. Elements at:
                  <div class="code-block text-xs mt-1">
                    <code class="text-green-400">keccak256(abi.encode(slot)) + index</code>
                  </div>
                </div>
              </div>

              <!-- ERC-7201 Namespaces -->
              <div>
                <div class="font-semibold text-purple-400 mb-2">🔮 ERC-7201 Namespaces</div>
                <div class="text-sm text-gray-400">
                  High-entropy slots via double hashing, ending in 00:
                  <div class="code-block text-xs mt-1">
                    <code class="text-purple-400">keccak256(keccak256(namespace) - 1) & ~0xff</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Storage Size Info -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-lg font-bold text-white">Storage Statistics</h3>
            </div>
            <div class="card-body space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Total Slots</span>
                <span class="text-sm font-mono text-white">2^256</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Bytes per Slot</span>
                <span class="text-sm font-mono text-white">32</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Typical Variables</span>
                <span class="text-sm font-mono text-white">&lt; 100 slots</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Namespace Slots</span>
                <span class="text-sm font-mono text-white">{{ namespaces.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { calculateERC7201Slot } from '../utils/evm'

interface StorageSlot {
  slot: number
  label: string
  type: string
  typeLabel: string
  solidityType: string
  description?: string
}

interface Namespace {
  name: string
  namespace: string
  slot: string
  color: string
  variables: string[]
  purpose: string
}

const hoveredSlot = ref<StorageSlot | null>(null)
const hoveredNamespace = ref<Namespace | null>(null)

// Direct storage slots 0-15 with example variables
const directSlots: StorageSlot[] = [
  { slot: 0, label: 'owner', type: 'variable', typeLabel: 'address', solidityType: 'address', description: 'Contract owner address' },
  { slot: 1, label: 'totalSupply', type: 'variable', typeLabel: 'uint256', solidityType: 'uint256', description: 'Total token supply' },
  { slot: 2, label: 'paused', type: 'variable', typeLabel: 'bool', solidityType: 'bool', description: 'Pause state flag' },
  { slot: 3, label: 'name', type: 'variable', typeLabel: 'string', solidityType: 'string', description: 'Contract name' },
  { slot: 4, label: 'symbol', type: 'variable', typeLabel: 'string', solidityType: 'string', description: 'Token symbol' },
  { slot: 5, label: 'balances', type: 'mapping', typeLabel: 'mapping', solidityType: 'mapping(address => uint256)', description: 'Mapping base slot (empty)' },
  { slot: 6, label: 'allowances', type: 'mapping', typeLabel: 'mapping', solidityType: 'mapping(address => mapping(address => uint256))', description: 'Nested mapping base' },
  { slot: 7, label: 'roles', type: 'mapping', typeLabel: 'mapping', solidityType: 'mapping(bytes32 => RoleData)', description: 'Access control roles' },
  { slot: 8, label: 'config', type: 'variable', typeLabel: 'struct', solidityType: 'Config', description: 'Configuration struct' },
  { slot: 9, label: 'fee', type: 'variable', typeLabel: 'uint256', solidityType: 'uint256', description: 'Transaction fee' },
  { slot: 10, label: 'items', type: 'array', typeLabel: 'array', solidityType: 'uint256[]', description: 'Dynamic array length' },
  { slot: 11, label: 'addresses', type: 'array', typeLabel: 'array', solidityType: 'address[]', description: 'Address list length' },
  { slot: 12, label: 'initialized', type: 'variable', typeLabel: 'uint8', solidityType: 'uint8', description: 'Initialization flag' },
  { slot: 13, label: 'version', type: 'variable', typeLabel: 'uint256', solidityType: 'uint256', description: 'Contract version' },
  { slot: 14, label: 'metadata', type: 'mapping', typeLabel: 'mapping', solidityType: 'mapping(uint256 => string)', description: 'Token metadata' },
  { slot: 15, label: '...', type: 'empty', typeLabel: 'unused', solidityType: '-', description: 'Unused slot' },
]

// ERC-7201 Namespaces - All using purple theme
const namespaces: Namespace[] = [
  {
    name: 'TerminusDID Storage',
    namespace: 'terminus.TerminusDID',
    slot: calculateERC7201Slot('terminus.TerminusDID'),
    color: '#a855f7',
    variables: ['metadata', 'taggers', 'operator'],
    purpose: 'Domain registration and management layer'
  },
  {
    name: 'TagRegistry Storage',
    namespace: 'terminus.TagRegistry',
    slot: calculateERC7201Slot('terminus.TagRegistry'),
    color: '#9333ea',
    variables: ['types', 'tags', 'fieldNames', 'tagNames'],
    purpose: 'Tag system for extensible domain metadata'
  },
  {
    name: 'ERC721 Storage',
    namespace: 'terminus.ERC721',
    slot: calculateERC7201Slot('terminus.ERC721'),
    color: '#7c3aed',
    variables: ['_name', '_symbol', '_tokenIds', '_tokens', '_tokenIdsByOwner'],
    purpose: 'NFT ownership and enumeration'
  }
]

const formatSlot = (slot: string): string => {
  if (slot.length <= 12) return slot
  return `${slot.slice(0, 10)}...${slot.slice(-8)}`
}

const formatSlotAddress = (slot: number): string => {
  return `0x${slot.toString(16).padStart(64, '0')}`
}
</script>

<style scoped>
.storage-cell {
  background-color: rgb(31 41 55);
  border: 1px solid rgb(55 65 81);
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.storage-cell:hover {
  background-color: rgb(55 65 81);
  border-color: rgb(75 85 99);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.storage-cell.variable {
  border-left: 4px solid rgb(59 130 246);
}

.storage-cell.mapping {
  border-left: 4px solid rgb(234 179 8);
}

.storage-cell.array {
  border-left: 4px solid rgb(34 197 94);
}

.storage-cell.empty {
  opacity: 0.3;
}

.namespace-cell {
  border-left-width: 4px;
  padding: 1rem;
}

.namespace-cell:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>
