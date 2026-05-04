---
name: local-ci-simulation
description: Simulate GitHub Actions CI locally for this repository by mapping workflow jobs to terminal commands, running phases step-by-step, isolating failing stages, and reporting exact root causes with fix suggestions. Use when CI is red, when validating a fix before push, or when user asks for phased local CI verification. Always propose full simulation first and run it only after explicit user confirmation because it is resource-intensive.
---

# Local Ci Simulation

## Core Policy
- Offer full local CI simulation before running it.
- Start full simulation only after explicit user confirmation.
- Prefer lightweight targeted checks first when user has not requested full run.
- Preserve command order from workflow files and report exact failing phase.

## Workflow
1. Inspect `.github/workflows/tests.yml` and `.github/workflows/release.yml`.
2. Build a phase list that mirrors CI jobs and step order.
3. Ask whether to run:
   - focused mode: failing phase only;
   - full mode: all heavy phases sequentially.
4. Run selected phases and stop at first failing command unless user asks to continue.
5. Distinguish non-fatal warnings from fatal errors.
6. Report:
   - failing phase name;
   - command;
   - key error lines;
   - minimal fix;
   - post-fix recheck commands.

## Repo Command Map
Use these commands as default simulation phases for this repository:

```bash
make .yarnrc.yml
yarn install
yarn workspaces foreach -A --topological-dev run build
yarn eslint
yarn test
yarn test:coverage
yarn vitest run -c packages/v1-contexts/vitest.config.ts --typecheck.only --typecheck.checker tsc --typecheck.tsconfig packages/v1-contexts/tsconfig.json
yarn workspace @retailcrm/embed-ui-v1-components run storybook:build
```

## Practical Notes
- Re-run the exact failing command after applying a fix.
- Run dependent follow-up checks for confidence (`eslint`, `test`, relevant build/storybook step).
- Mention when output is truncated and provide the most diagnostic lines.
