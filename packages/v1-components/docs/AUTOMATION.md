# Documentation Automation Plan

This document describes which parts of the AI-friendly `v1-components` docs can be generated
automatically, which parts are good candidates for semi-automation, and which parts should
still be maintained manually.

The goal is not to generate the entire documentation set blindly. The goal is to:

- pull factual API and source-of-truth data automatically;
- reduce manual duplication across public types and Storybook;
- leave humans and AI agents with the semantic and UX-focused parts only.

## Good Sources Of Truth

- `src/remote.ts`
  the list of public exports for `remote`.
- `src/common/components/*.ts`
  props, methods, enums, helper types, and event lists.
- `dist/remote.d.ts`
  the final public type surface of the package.
- `storybook/stories/*.mdx`
  usage guidance, scenarios, explanatory text, and examples.
- `storybook/stories/*.stories.ts` and `*.example.vue`
  real combinations of props and slots.
- `src/host/components/**/*.vue`
  the actual rendered shape and state behavior.
- `src/host/components/**/*.less`
  layout behavior, state classes, and geometry clues.

## Recommended Split

## Safe To Automate

These data points are safe to extract with minimal risk:

- the list of public components and helpers;
- whether a component has a Storybook story, mdx file, or example;
- prop, method, enum, and event names;
- source file paths;
- basic links between a profile, a story, and its type definitions.

## Semi-Automatic

These sections can be scaffolded automatically, but should still be reviewed by a human:

- the slot list from SFCs and Storybook;
- root classes and state classes;
- a draft of important states based on templates and CSS;
- important interaction hooks such as `click`, `blur`, `update:value`, and `update:expanded`;
- a short section skeleton for a new component profile.

## Manual Only

These sections should not be generated without editorial judgment:

- when the component is the best choice;
- when the component should not be used;
- composition patterns and anti-patterns;
- the boundary between the public contract and implementation detail;
- geometry explained in UX terms rather than raw CSS terms.

## Practical Pipeline

A good pipeline for this documentation looks like this:

1. Build a machine-readable catalog from `src/remote.ts` and `src/common/components/*.ts`.
2. For every exported component, find its story, mdx, and example files.
3. Build a draft profile skeleton:
   - import
   - props / emits / methods
   - source references
   - detected slots
4. Fill in manually:
   - use cases
   - layout semantics
   - behavior notes
   - anti-patterns
5. Re-run it whenever the public catalog changes so new exports do not get lost.

## Suggested Outputs

In the future, it makes sense to maintain these artifacts automatically:

- an updatable catalog file for docs;
- a coverage report showing which components already have an AI profile and which do not;
- warnings for drift:
  - a component is exported but missing from the catalog;
  - a story exists but there is no profile;
  - props or events changed and the profile has not been updated in a while.

## Guardrails

- Do not generate "when to use" guidance from the component name alone.
- Do not declare `.ui-v1-*` classes to be public API automatically.
- Do not make accessibility claims without checking templates and Storybook.
- Do not dump entire `.d.ts` files into markdown without editing; agents need curated signal, not raw output.

## Current Direction

At the current stage, the most useful mix is:

- hand-written profiles for the most frequently used components;
- an automatic catalog and coverage map;
- semi-automatic updates for profile skeleton sections when the public API changes.
