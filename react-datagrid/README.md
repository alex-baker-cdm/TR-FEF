# React DataGrid

Modern React-based data grid to replace jQuery DataTables in the FEFDataGrid project.

## Overview

This project provides a modern, type-safe foundation for building data grid components using React, TypeScript, and TanStack Table v8. It replaces the legacy jQuery DataTables 1.9.4 and AngularJS 1.x implementation with a contemporary tech stack.

## Technology Stack

### Core Framework
- **React 18.2** - Modern React with concurrent features
- **TypeScript 5.2** - Type-safe JavaScript with strict mode enabled
- **Vite 5.0** - Fast build tooling with HMR (Hot Module Replacement)

### Table Library
- **TanStack Table v8** - Headless table library (see evaluation below)
- **TanStack Virtual v3** - Virtual scrolling for large datasets
- **TanStack Query v5** - Server state management and data fetching

### Code Quality
- **ESLint 8.53** - Linting with TypeScript rules
- **Prettier 3.1** - Code formatting
- **TypeScript Strict Mode** - Maximum type safety

## Getting Started

### Prerequisites

**IMPORTANT:** Node.js 18+ is **required** for this project. The project uses modern JavaScript features and dependencies (TypeScript 5.2, Vite 5.0) that are not compatible with older Node versions.

- **Node.js 18+** (recommended: Node.js 20 LTS)
- npm 9+ or yarn 1.22+

To check your Node version:
```bash
node --version
```

If you need to upgrade Node.js, visit [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
react-datagrid/
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # Vite type definitions
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # TypeScript config for build tools
├── vite.config.ts        # Vite configuration
├── .eslintrc.cjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
└── README.md             # This file
```

## Table Library Evaluation

### Selected: TanStack Table v8

**Rationale:**
TanStack Table v8 (formerly React Table) was selected as the recommended table library for the following reasons:

1. **Headless Architecture** - Provides table logic without prescribing UI, allowing complete control over styling and markup to match existing design systems
2. **TypeScript First** - Built with TypeScript from the ground up with excellent type inference and safety
3. **Modern & Maintained** - Actively developed with regular updates and strong community support
4. **Feature Complete** - Built-in support for:
   - Sorting (single and multi-column)
   - Filtering (column and global)
   - Pagination (client and server-side)
   - Row selection
   - Column ordering and resizing
   - Grouping and aggregation
   - Virtualization (via @tanstack/react-virtual)
5. **Performance** - Lightweight core (~15KB gzipped) with optional features
6. **Flexibility** - Works with any data fetching library or state management solution
7. **Migration Path** - Clear upgrade path from legacy DataTables features

### Alternative Options Considered

#### AG Grid React
**Pros:**
- Enterprise-grade features out of the box
- Excellent performance with large datasets
- Rich ecosystem of plugins
- Built-in cell editing and validation

**Cons:**
- Large bundle size (~200KB+ gzipped)
- Commercial license required for advanced features ($999+/developer)
- Steeper learning curve
- Less flexibility in customization
- Opinionated styling that may conflict with existing designs

**Verdict:** Rejected due to licensing costs and bundle size concerns for this use case.

#### React Table v7 (Legacy)
**Pros:**
- Mature and well-documented
- Large community and examples
- Proven in production

**Cons:**
- No longer actively maintained (superseded by TanStack Table v8)
- Missing modern React features (hooks improvements)
- TypeScript support is less robust
- No future updates or bug fixes

**Verdict:** Rejected in favor of its successor, TanStack Table v8.

#### Material-UI DataGrid / Ant Design Table
**Pros:**
- Complete UI components with styling
- Part of larger component libraries
- Good documentation

**Cons:**
- Tightly coupled to specific design systems
- Harder to customize for existing brand guidelines
- Larger bundle sizes due to full component libraries
- May require adopting entire design system

**Verdict:** Rejected due to design system coupling and customization limitations.

#### Custom Implementation
**Pros:**
- Complete control over every aspect
- No external dependencies
- Minimal bundle size

**Cons:**
- Significant development time required
- Need to implement all features from scratch (sorting, filtering, pagination, etc.)
- Ongoing maintenance burden
- Likely to reinvent existing solutions
- Higher risk of bugs and edge cases

**Verdict:** Rejected as not cost-effective given mature solutions available.

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | Core React library |
| react-dom | ^18.2.0 | React DOM rendering |
| @tanstack/react-table | ^8.10.7 | Headless table library |
| @tanstack/react-virtual | ^3.0.0 | Virtual scrolling for performance |
| @tanstack/react-query | ^5.8.4 | Server state management |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.2.2 | TypeScript compiler |
| vite | ^5.0.0 | Build tool and dev server |
| @vitejs/plugin-react | ^4.2.0 | Vite React plugin |
| eslint | ^8.53.0 | Code linting |
| @typescript-eslint/parser | ^6.10.0 | TypeScript ESLint parser |
| @typescript-eslint/eslint-plugin | ^6.10.0 | TypeScript ESLint rules |
| eslint-plugin-react-hooks | ^4.6.0 | React Hooks linting |
| eslint-plugin-react-refresh | ^0.4.4 | React Fast Refresh linting |
| prettier | ^3.1.0 | Code formatting |
| @types/react | ^18.2.37 | React type definitions |
| @types/react-dom | ^18.2.15 | React DOM type definitions |

## TypeScript Configuration

This project uses TypeScript in **strict mode** with additional safety checks:

- `strict: true` - Enable all strict type checking options
- `noUnusedLocals: true` - Report errors on unused local variables
- `noUnusedParameters: true` - Report errors on unused parameters
- `noFallthroughCasesInSwitch: true` - Report errors for fallthrough cases in switch
- `noImplicitReturns: true` - Report error when not all code paths return a value
- `noUncheckedIndexedAccess: true` - Add undefined to index signature results
- `noImplicitOverride: true` - Ensure overriding members are marked with override
- `exactOptionalPropertyTypes: true` - Interpret optional properties strictly
- `noPropertyAccessFromIndexSignature: true` - Require indexed access for dynamic properties

These settings provide maximum type safety and help catch potential bugs at compile time.

## Code Quality Standards

### ESLint Rules
- TypeScript recommended rules enabled
- React Hooks rules enforced
- No unused variables (except those prefixed with `_`)
- No explicit `any` types allowed
- React Fast Refresh compatibility checks

### Prettier Configuration
- No semicolons
- Single quotes
- 2-space indentation
- ES5 trailing commas
- 100 character line width
- Arrow function parentheses always included

## Migration from Legacy FEFDataGrid

### Current Legacy Stack
- jQuery 1.8.3
- jQuery DataTables 1.9.4
- AngularJS 1.x
- ColReorderWithResize plugin (broken)

### Migration Benefits
1. **Modern React** - Component-based architecture with hooks
2. **Type Safety** - TypeScript catches errors at compile time
3. **Better Performance** - Virtual scrolling for large datasets
4. **Maintainability** - Active ecosystem and community support
5. **Developer Experience** - Hot module replacement, better debugging
6. **Bundle Size** - Tree-shaking and code splitting capabilities
7. **Testing** - Modern testing tools and practices

### Feature Parity Checklist

The following features from the legacy DataTables implementation need to be replicated:

- [ ] Dynamic column generation from service data
- [ ] Server-side sorting
- [ ] Row click/double-click events
- [ ] Header click events
- [ ] Simple edit features (row editing)
- [ ] Isolated component scope
- [ ] Multiple instances on same page
- [ ] Column visibility settings
- [ ] Column reordering (to replace broken ColReorderWithResize)
- [ ] Pagination (client and server-side)
- [ ] Row selection
- [ ] Context menu support

## Next Steps

1. **Implement Basic Table Component** - Create a reusable table component using TanStack Table
2. **Add Data Fetching** - Integrate TanStack Query for server-side data
3. **Implement Sorting** - Add single and multi-column sorting
4. **Add Filtering** - Implement column and global filtering
5. **Pagination** - Add client and server-side pagination
6. **Column Features** - Implement resizing, reordering, and visibility controls
7. **Row Selection** - Add checkbox selection with multi-select support
8. **Virtualization** - Integrate virtual scrolling for large datasets
9. **Edit Mode** - Implement inline row editing
10. **Testing** - Add unit and integration tests
11. **Documentation** - Create component API documentation and usage examples
12. **Migration Guide** - Document step-by-step migration from legacy implementation

## Resources

- [TanStack Table Documentation](https://tanstack.com/table/v8)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Virtual Documentation](https://tanstack.com/virtual/v3)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)

## License

MIT

## Author

Thomson Reuters
