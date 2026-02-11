---
name: yarn-lock-conflict-resolution
description: Use this skill when resolving merge/rebase conflicts in yarn.lock. It standardizes taking yarn.lock from the target branch, reconciling it with yarn install, and reusing a successful resolution across repeated conflict rounds.
---

# Yarn.lock Conflict Resolution

## When To Use
Use this skill when:
- `yarn.lock` has merge/rebase conflicts;
- conflict resolution should be repeatable and low-risk;
- the same conflict appears in multiple rounds of one rebase/merge sequence.

## Source Of Truth Policy
- Rebase: take `yarn.lock` from the branch you rebase onto.
- Merge: take `yarn.lock` from `HEAD` (current target branch).
- After taking baseline, run `yarn install` to reconcile lock metadata with current manifests.

## Required Rules
- Do not manually resolve conflict markers inside `yarn.lock`.
- Replace `yarn.lock` completely from the selected baseline.
- Reuse previous successful resolution for repeated rounds in the same sequence.
- If dependency updates were intentional in the rebased commit, replay dependency commands after conflict resolution.

## Workflow
1. Ensure conflict exists:
```bash
git status --short
```
2. (Optional) Ensure Yarn config exists:
```bash
make .yarnrc.yml
```
3. Resolve first conflict round for rebase:
```bash
ONTO=$(cat .git/rebase-merge/onto 2>/dev/null || cat .git/rebase-apply/onto)
git show "$ONTO:yarn.lock" > yarn.lock
yarn install
git add yarn.lock
cp yarn.lock .git/yarn-lock-resolution-base
```
4. Resolve first conflict round for merge:
```bash
git show "HEAD:yarn.lock" > yarn.lock
yarn install
git add yarn.lock
cp yarn.lock .git/yarn-lock-resolution-base
```
5. Resolve repeated rounds in the same sequence:
```bash
cp .git/yarn-lock-resolution-base yarn.lock
yarn install
git add yarn.lock
cp yarn.lock .git/yarn-lock-resolution-base
```
6. Continue operation:
```bash
git rebase --continue
# or
git merge --continue
```
7. Cleanup after finish:
```bash
rm -f .git/yarn-lock-resolution-base
```
8. If dependency updates must be replayed, run original dependency command and commit lockfile update with an English Conventional Commit message, for example:
```bash
yarn up <packages>
git add yarn.lock
git commit -m "chore: refresh yarn.lock"
```

## Validation
- `git status --short` has no unresolved conflicts for `yarn.lock`.
- `yarn.lock` is staged before `--continue`.
- Resolution follows source-of-truth policy above.
