import type { TargetName } from '@/common/targets'

export type RunIdentity = { id: string; }
export type RunConfig = RunIdentity & { target: TargetName; }
