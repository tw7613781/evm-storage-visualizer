/**
 * EVM Storage and Memory Types
 */

// Storage Slot representation
export interface StorageSlot {
  address: string; // Hex address like "0x4666f7c9..."
  namespace: string; // e.g., "terminus.TerminusDID"
  data: string | Record<string, any>;
  description: string;
}

// ERC-7201 Namespace
export interface StorageNamespace {
  name: string;
  slot: string;
  description: string;
  variables: StorageVariable[];
}

export interface StorageVariable {
  name: string;
  type: string;
  slot: string;
  value?: any;
}

// Tag.Group structures
export interface TagEntry {
  name: string;
  value: any;
  index: number;
}

export interface TagGroup {
  list: string[]; // EntryRef array (slot addresses)
  map: Map<string, TagEntry>;
}

// Memory representation
export interface MemorySlot {
  address: string; // Hex address like "0x00", "0x20", etc.
  value: string; // Hex value
  label?: string; // e.g., "scratch space", "free memory pointer"
  isActive?: boolean;
}

export interface MemoryLayout {
  slots: MemorySlot[];
  freeMemoryPointer: string;
  scratchSpace: { start: string; end: string };
}

// Assembly operation
export interface AssemblyOperation {
  opcode: string; // e.g., "mstore", "mload", "sstore", "sload"
  params: string[];
  description: string;
  memoryBefore?: MemoryLayout;
  memoryAfter?: MemoryLayout;
  storageBefore?: StorageSlot[];
  storageAfter?: StorageSlot[];
}

// Simulation step
export interface SimulationStep {
  id: number;
  title: string;
  code: string;
  language: 'solidity' | 'typescript';
  description: string;
  operation?: AssemblyOperation;
  highlight?: {
    storage?: string[]; // slot addresses to highlight
    memory?: string[]; // memory addresses to highlight
  };
}

// Scenario (predefined simulation)
export interface Scenario {
  id: string;
  title: string;
  category: 'storage' | 'memory' | 'tag-group' | 'erc7201' | 'uups';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: SimulationStep[];
  initialState: {
    storage?: StorageSlot[];
    memory?: MemoryLayout;
    tagGroup?: TagGroup;
  };
}

// Animation state
export interface AnimationState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number; // 0.5x, 1x, 2x
}

// Code highlight
export interface CodeHighlight {
  language: string;
  code: string;
  highlightedLines?: number[];
}
