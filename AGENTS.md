# AGENTS.md

## Goals
- Avoid clarification loops by proposing a concrete interpretation when details are missing.
- Default to the language of the user's initial message unless they explicitly request a different language.
- Match the tone and formality of the user's initial message unless they explicitly ask for a change.
- Treat a language switch in the user's message as an explicit request to respond in that language.
- If a message is mixed-language, reply in the dominant language unless the user specifies otherwise.

## Purpose
This file defines practical instructions for working in the `@retailcrm/embed-ui` repository.

## Repository Structure
- This project is a Yarn Workspaces monorepo.
- Workspace glob: `packages/*`.
- Current workspace folders:
  - `v1-components`
  - `v1-contexts`
  - `v1-testing`
  - `v1-types`
- Workspace package names may differ from folder names, but commit scopes in this repository are based on workspace folder names.

## Local Environment Prerequisites
- Yarn version is `4.12.0` (see `packageManager` in `package.json` and `yarnPath` in `.yarnrc.yml`).
- Package manager mode is `node-modules` (see `.yarnrc.yml`).
- Local Yarn config is generated from `.yarnrc.dist.yml` using:
```bash
make .yarnrc.yml
```
- Root install:
```bash
yarn install
```

## Running Checks

### Local Path (without Docker)
- Prepare Yarn config:
```bash
make .yarnrc.yml
```
- Install dependencies:
```bash
yarn install
```
- Build all workspaces:
```bash
yarn workspaces foreach -A --topological-dev run build
```
- Run lint:
```bash
yarn eslint
```
- Run tests:
```bash
yarn test
```

### Docker Path (Makefile)
- Install dependencies in container:
```bash
make node_modules
```
- Build all workspaces:
```bash
make build
```
- Run tests:
```bash
make tests
```
- Pass custom Vitest CLI arguments via Makefile:
```bash
make tests cli="-t outOfRangeErrorText"
```

## Related Commands
- Build root package only:
```bash
yarn build
```
- Build root code artifacts only:
```bash
yarn build:code
```
- Build root meta artifacts only:
```bash
yarn build:meta
```
- Build Storybook for `v1-components`:
```bash
yarn workspace @retailcrm/embed-ui-v1-components run storybook:build
```

## Commit Workflow
- Commit format: Conventional Commits.
- Commit message language: English.
- Scope rule: use workspace folder name (not npm package name).
- Valid workspace scopes currently are:
  - `v1-components`
  - `v1-contexts`
  - `v1-testing`
  - `v1-types`
- For root/global changes, scope may be omitted.
- Split commits by logical intent.
- Keep commit subject concise and factual.
- Start commit subject description with an uppercase letter.
- Mention affected component(s) or area in subject description when applicable.
- Commit subject should describe completed change in past tense.
- Prefer passive voice for changelog-friendly phrasing.
- Do not amend/rewrite history unless explicitly requested.

Examples:
- `feat(v1-components): UiSelect searchable option group header added`
- `fix(v1-contexts): OrderContext missing customer id handling corrected`
- `docs: AGENTS commit workflow section updated`

## Skills
- Repository-local skills are available under `skills/`.
- If a skill conflicts with this file, follow `AGENTS.md`.
- Current local skills:
  - `skills/commit-workflow/SKILL.md`
  - `skills/sync-remote-host-registry/SKILL.md`
  - `skills/yarn-lock-conflict-resolution/SKILL.md`

## Notes
- Do not assume legacy rules from other repositories (especially `omnica`) apply here.
- If repository policy is unclear, ask a short clarifying question before making irreversible actions.
