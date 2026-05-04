---
name: sync-remote-host-registry
description: Use this skill when updating remote-to-host component registries (for example createRoot component lists) to keep them aligned with the actual render graph instead of naive host export parity.
---

# Sync Remote Host Registry

## When To Use
Use this skill when:
- updating `createRoot(..., { components: [...] })` lists;
- updating Storybook provider/receiver setups for remote rendering;
- checking whether a host component should be added to or removed from a remote render registry.

## Source Of Truth
- `src/index.ts` (`createRoot` in root package)
- `packages/v1-components/src/host.ts`
- `packages/v1-components/src/remote.ts`
- `packages/v1-components/src/remote/components/**/*`
- `packages/v1-components/storybook/endpoint.ts`
- `packages/v1-components/storybook/stories/UiSelect.stories.ts`
- `packages/v1-components/storybook/stories/UiSelect.remote.ts`

## Core Model
- `host.ts` is the catalog of available host implementations.
- `remote.ts` is the public remote API surface.
- Registries like `createRoot(...components)` must include host components that are schema-reachable from remote rendering flow.
- Non-1:1 mapping is valid:
  - one remote component may render through multiple host primitives;
  - host-only components can exist and must not be added if remote flow never emits them.

## Practical Rules
- Do not assume parity with `host.ts`.
- Include a host component if remote rendering can emit its schema in this runtime path.
- Exclude host-only components that are not emitted by remote instructions in this runtime path.
- For Storybook remote stories, provider can stay minimal and story-specific.
- For product/runtime `src/index.ts`, registry should cover all host schemas used by runtime remote render graph.

## Workflow
1. Inspect current registry and target area:
```bash
nl -ba src/index.ts | sed -n '68,120p'
```
2. Inspect host export catalog:
```bash
nl -ba packages/v1-components/src/host.ts | sed -n '1,120p'
```
3. Inspect remote public surface:
```bash
nl -ba packages/v1-components/src/remote.ts | sed -n '1,120p'
```
4. Inspect composite remote components (especially non-1:1 cases) and their internal parts.
5. Update registry by render-graph reachability, not by export parity.
6. Validate:
```bash
yarn eslint src/index.ts
```

## Review Checklist
- Every newly added registry item is justified by remote render flow.
- Removed items are proven host-only for this runtime path.
- Composite components (like select) are checked through their internal remote parts.
- Storybook-specific minimal providers are not blindly copied into runtime and vice versa.
