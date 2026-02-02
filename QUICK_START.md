# Quick Start Guide

## Phase 1 Installation & Verification

### Step 1: Install Dependencies
```bash
cd /Users/tang/code/olares-family/evm-storage-visualizer
npm install
```

This will install:
- Vue 3 framework
- TypeScript tooling
- Tailwind CSS
- GSAP (animations)
- Shiki (code highlighting)
- ethers.js (EVM utilities)

### Step 2: Verify Installation
```bash
# Check if everything compiles
npm run type-check

# Start development server
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Test EVM Utilities (Optional)
```bash
# Run the test file to verify ERC-7201 calculations
npx tsx src/test-evm-utils.ts
```

You should see:
```
🧪 Testing ERC-7201 Storage Slot Calculator

Namespace: terminus.TerminusDID
Expected:  0x4666f7c9ed2861482dc7def82e62cce78d7520c45f1fbe5cf48442a77f54bb00
Calculated: 0x4666f7c9ed2861482dc7def82e62cce78d7520c45f1fbe5cf48442a77f54bb00
✓ PASS

[... more tests ...]

✅ All tests complete!
```

### Step 4: View in Browser
Open http://localhost:5173/ - you'll see the Vue default welcome page (this is expected for Phase 1).

## Git Setup (Optional)

If you want to version control this project:

```bash
cd /Users/tang/code/olares-family/evm-storage-visualizer

# Initialize git
git init

# Add all files
git add -A

# First commit
git commit -m "Phase 1: Project initialization

- Setup Vue 3 + TypeScript + Vite
- Add Tailwind CSS with custom EVM theme
- Create type definitions for storage/memory structures
- Implement ERC-7201 calculator utilities
- Add documentation and README"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/evm-storage-visualizer.git

# Push to remote
git push -u origin main
```

## Project Structure Overview

```
evm-storage-visualizer/
├── src/
│   ├── types/evm.ts          # TypeScript definitions
│   ├── utils/evm.ts          # EVM calculation functions
│   ├── assets/main.css       # Custom Tailwind styles
│   └── test-evm-utils.ts     # Test file
├── tailwind.config.js        # Tailwind configuration
├── package.json              # Dependencies
├── README.md                 # Full documentation
├── PHASE_1_COMPLETE.md       # Phase 1 summary
└── QUICK_START.md           # This file
```

## Troubleshooting

### Issue: `npm install` fails
**Solution**: Make sure you have Node.js >= 20.19.0 or >= 22.12.0
```bash
node --version
```

### Issue: Port 5173 is already in use
**Solution**: Kill the process or use a different port
```bash
npm run dev -- --port 3000
```

### Issue: TypeScript errors
**Solution**: Ensure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```

## What's Next?

Once Phase 1 is verified, I will continue with **Phase 2**:
- Update main app layout
- Create home page with navigation
- Build ERC-7201 storage slot calculator with visualization
- Add animated step-by-step breakdown

**Ready to proceed?** Let me know after you've completed the verification steps! 🚀
