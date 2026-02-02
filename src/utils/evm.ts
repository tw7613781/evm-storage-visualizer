import { keccak256, toUtf8Bytes, zeroPadValue, toBeHex } from 'ethers'

/**
 * Calculate ERC-7201 storage slot
 * Formula: keccak256(abi.encode(uint256(keccak256(namespace)) - 1)) & ~bytes32(uint256(0xff))
 */
export function calculateERC7201Slot(namespace: string): string {
  // Step 1: Hash namespace
  const namespaceHash = keccak256(toUtf8Bytes(namespace))
  
  // Step 2: Convert to BigInt and subtract 1
  const hashValue = BigInt(namespaceHash)
  const subtracted = hashValue - 1n
  
  // Step 3: Encode as bytes32 and hash again
  const encoded = zeroPadValue(toBeHex(subtracted), 32)
  const secondHash = keccak256(encoded)
  
  // Step 4: Clear lowest 8 bits
  const result = BigInt(secondHash) & ~BigInt(0xff)
  
  return zeroPadValue(toBeHex(result), 32)
}

/**
 * Calculate storage slot for mapping(key => value)
 * slot = keccak256(abi.encode(key, baseSlot))
 */
export function calculateMappingSlot(key: string, baseSlot: string): string {
  // For string keys, encode as bytes32
  let encodedKey: string
  if (key.startsWith('0x')) {
    encodedKey = zeroPadValue(key, 32)
  } else {
    encodedKey = zeroPadValue(keccak256(toUtf8Bytes(key)), 32)
  }
  
  const encodedSlot = zeroPadValue(baseSlot, 32)
  const concatenated = encodedKey + encodedSlot.slice(2) // Remove '0x' from second part
  
  return keccak256(concatenated)
}

/**
 * Calculate storage slot for dynamic array
 * slot = keccak256(baseSlot)
 */
export function calculateArraySlot(baseSlot: string): string {
  return keccak256(zeroPadValue(baseSlot, 32))
}

/**
 * Get steps for ERC-7201 calculation (for visualization)
 */
export function getERC7201CalculationSteps(namespace: string) {
  const step1Hash = keccak256(toUtf8Bytes(namespace))
  const step2Value = BigInt(step1Hash) - 1n
  const step3Encoded = zeroPadValue(toBeHex(step2Value), 32)
  const step4Hash = keccak256(step3Encoded)
  const step5Result = BigInt(step4Hash) & ~BigInt(0xff)
  
  return [
    {
      title: 'Step 1: Hash Namespace',
      code: `keccak256("${namespace}")`,
      result: step1Hash,
      description: 'First, we hash the namespace string using keccak256'
    },
    {
      title: 'Step 2: Subtract 1',
      code: `uint256(${step1Hash}) - 1`,
      result: `0x${step2Value.toString(16).padStart(64, '0')}`,
      description: 'Convert hash to uint256 and subtract 1'
    },
    {
      title: 'Step 3: Encode as bytes32',
      code: `abi.encode(${step2Value})`,
      result: step3Encoded,
      description: 'Encode the result as a bytes32 value'
    },
    {
      title: 'Step 4: Hash Again',
      code: `keccak256(${step3Encoded})`,
      result: step4Hash,
      description: 'Hash the encoded value again'
    },
    {
      title: 'Step 5: Clear Lowest 8 Bits',
      code: `${step4Hash} & ~bytes32(uint256(0xff))`,
      result: zeroPadValue(toBeHex(step5Result), 32),
      description: 'Clear the lowest 8 bits to avoid collision with standard slots'
    }
  ]
}

/**
 * Format hex string for display
 */
export function formatHex(hex: string, length: number = 8): string {
  if (!hex.startsWith('0x')) {
    hex = '0x' + hex
  }
  
  if (hex.length <= length + 2) {
    return hex
  }
  
  return `${hex.slice(0, length + 2)}...${hex.slice(-6)}`
}

/**
 * Parse Solidity type to human readable
 */
export function parseSolidityType(abiType: string): string {
  const typeMap: Record<string, string> = {
    '0x00': 'int',
    '0x01': 'uint',
    '0x02': 'bool',
    '0x03': 'string',
    '0x04': 'array',
    '0x05': 'fixedArray',
    '0x06': 'tuple',
    '0x07': 'address',
    '0x08': 'fixedBytes',
    '0x09': 'bytes',
  }
  
  // This is a simplified version
  // Real implementation would need to parse the full ABI type encoding
  return typeMap[abiType] || 'unknown'
}
