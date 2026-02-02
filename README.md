# EVM Storage & Memory Visualizer

> Interactive visualization tool for understanding EVM storage layout and memory operations, based on the did-contracts project.

## 🎯 Project Overview

This project is an educational visualization tool that demonstrates:

- **ERC-7201 Namespaced Storage Pattern**: How did-contracts uses namespaced storage to avoid slot collisions
- **UUPS Upgradeable Pattern**: The Universal Upgradeable Proxy Standard implementation
- **Tag.Group Data Structure**: The efficient dual-structure (array + mapping) design with O(1) operations
- **Assembly Memory Operations**: Low-level EVM memory manipulation in DomainUtils and ABI libraries
- **ABI.Var Storage Mechanism**: Dynamic type system for storing arbitrary Solidity types

## 🚀 Features

### Phase 1: Core Infrastructure (Current)
- ✅ Project setup with Vue 3 + TypeScript
- ✅ Routing and state management
- ✅ Basic UI framework

### Phase 2: Storage Layout Visualization
- [ ] ERC-7201 storage slot calculator with animation
- [ ] Multi-namespace storage visualization
- [ ] Interactive storage slot explorer

### Phase 3: Tag.Group Interactive Demo
- [ ] Dual-structure visualization (map + list)
- [ ] Add/Remove/Get operations with animations
- [ ] Swap-and-Pop deletion demonstration

### Phase 4: Memory Operations
- [ ] Memory layout viewer (0x00-0x100+)
- [ ] Assembly code step-by-step execution
- [ ] DomainUtils.Slice operations demo

### Phase 5: Advanced Features
- [ ] Live code editor with syntax highlighting
- [ ] Multiple scenario presets
- [ ] Export/Share functionality

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API) + TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **Animations**: GSAP
- **Styling**: Tailwind CSS
- **Code Highlighting**: Shiki
- **Blockchain Utils**: ethers.js (for keccak256, ABI encoding)
- **Build Tool**: Vite

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
evm-storage-visualizer/
├── src/
│   ├── components/           # Reusable components
│   │   ├── storage/         # Storage visualization components
│   │   ├── memory/          # Memory visualization components
│   │   ├── animations/      # Animation components
│   │   └── ui/              # UI components
│   ├── views/               # Page components
│   │   ├── HomeView.vue
│   │   ├── StorageView.vue
│   │   ├── TagGroupView.vue
│   │   └── MemoryView.vue
│   ├── stores/              # Pinia stores
│   │   ├── storage.ts
│   │   ├── memory.ts
│   │   └── simulation.ts
│   ├── utils/               # Utility functions
│   │   ├── evm.ts           # EVM-related calculations
│   │   ├── contracts.ts     # Contract data structures
│   │   └── animations.ts    # Animation helpers
│   └── types/               # TypeScript types
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 📚 Based on did-contracts

This visualization tool is inspired by the [did-contracts](https://github.com/beclab/did-contracts) project, which demonstrates:

- Advanced Solidity storage optimization techniques
- Assembly-level memory operations
- Production-grade upgradeable contract patterns
- Type-safe dynamic data structures

## 🎓 Educational Value

Perfect for demonstrating in interviews:
- Deep understanding of EVM storage and memory
- Ability to explain complex concepts visually
- Full-stack development skills
- Attention to detail and code quality

## 📝 License

MIT

## 🤝 Contributing

This is a personal portfolio project. Suggestions and improvements are welcome!

---

**Built with ❤️ to showcase EVM mastery**
