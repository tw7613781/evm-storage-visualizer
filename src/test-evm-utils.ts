/**
 * Test file for EVM utility functions
 * Run this after npm install to verify everything works
 */

import { calculateERC7201Slot, getERC7201CalculationSteps } from './utils/evm'

// Test data from did-contracts
const testCases = [
  {
    namespace: 'terminus.TerminusDID',
    expectedSlot: '0x4666f7c9ed2861482dc7def82e62cce78d7520c45f1fbe5cf48442a77f54bb00'
  },
  {
    namespace: 'terminus.TagRegistry',
    expectedSlot: '0xc8ba1573a83064b637069eac29a25dd52440bc4f98f399766e0040c151cb1f00'
  },
  {
    namespace: 'terminus.ERC721',
    expectedSlot: '0x04cc3b1160dff1f611a48ab325b162d9ef138626f346e30f670e6c29c03db600'
  }
]

console.log('🧪 Testing ERC-7201 Storage Slot Calculator\n')

testCases.forEach(({ namespace, expectedSlot }) => {
  const calculatedSlot = calculateERC7201Slot(namespace)
  const match = calculatedSlot.toLowerCase() === expectedSlot.toLowerCase()
  
  console.log(`Namespace: ${namespace}`)
  console.log(`Expected:  ${expectedSlot}`)
  console.log(`Calculated: ${calculatedSlot}`)
  console.log(`✓ ${match ? 'PASS' : 'FAIL'}\n`)
  
  if (!match) {
    console.error('❌ Mismatch detected!')
  }
})

// Test calculation steps
console.log('📊 Testing Step-by-Step Calculation\n')
const steps = getERC7201CalculationSteps('terminus.TerminusDID')
steps.forEach((step, index) => {
  console.log(`${index + 1}. ${step.title}`)
  console.log(`   Code: ${step.code}`)
  console.log(`   Result: ${step.result}`)
  console.log(`   ${step.description}\n`)
})

console.log('✅ All tests complete!')
