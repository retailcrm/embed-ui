---
name: commit-workflow
description: Use this skill when creating commits in this repository. It standardizes commit splitting, Conventional Commit type/scope selection, and English commit messages with workspace-folder scopes.
---

# Commit Workflow

## When To Use
Use this skill when the user asks to:
- create one or more commits;
- split changes into multiple commits;
- choose commit message types/scopes;
- validate commit format before committing.

## Source Of Truth
- `AGENTS.md`
- root `package.json` (`workspaces: ["packages/*"]`)
- actual workspace folders under `packages/`

## Required Rules
- Commit format: Conventional Commits.
- Commit message language: English.
- Allowed types: `feat`, `fix`, `build`, `ci`, `perf`, `docs`, `refactor`, `style`, `test`, `chore`.
- Scope rule for workspace changes: use workspace folder name (not npm package name).
  - Current workspace scopes:
    - `v1-components`
    - `v1-contexts`
    - `v1-testing`
    - `v1-types`
- For root/global repository changes, scope may be omitted.
- Split commits by logical intent.
- If one change affects multiple workspaces, split by workspace unless user explicitly asks to combine.
- Keep subject concise and factual.
- Start subject description with an uppercase letter.
- Mention affected component(s) or area in subject description when applicable.
- Subject should describe completed change in past tense.
- Prefer passive voice for changelog-friendly phrasing.
- Do not amend/rewrite history unless explicitly requested.

## Workflow
1. Inspect pending changes:
```bash
git status --short
git diff
```
2. Map changed files to workspace folders (`packages/<workspace>/...`) or root/global files.
3. Group changes into commit batches by logical intent and workspace boundary.
4. Choose commit header:
```text
<type>(<workspace-scope>): <short english summary>
```
or for global changes:
```text
<type>: <short english summary>
```
5. Stage only files for the current batch:
```bash
git add <files>
```
6. Create commit (non-interactive):
```bash
git commit -m "<type>(<scope>): <summary>"
```
7. Verify result:
```bash
git show --name-status --oneline -n 1
```

## Practical Patterns
- Workspace feature:
`feat(v1-components): UiSelect searchable select option groups added`
- Workspace fix:
`fix(v1-contexts): OrderContext missing order id handling corrected`
- Global docs update:
`docs: AGENTS repository agent instructions updated`
- Root tooling/config change:
`chore: Root yarn workspace build flow updated`
