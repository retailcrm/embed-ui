declare module 'conventional-recommended-bump' {
  export * from 'conventional-recommended-bump/dist'
}

declare module 'conventional-changelog' {
  import type { Readable } from 'stream'

  function start (
    options: object,
    context: object,
    gitRawCommitsOpts: object
  ): Readable

  export default start
}

declare module 'conventional-changelog-conventionalcommits' {
  import type { BumperRecommendation } from 'conventional-recommended-bump'
  import type { Commit } from 'conventional-commits-parser'

  export type CommitType = {
    type: string;
    section?: string;
    hidden?: boolean;
  }

  // noinspection JSUnusedGlobalSymbols
  export declare const DEFAULT_COMMIT_TYPES: CommitType[]

  function createPreset (config: {
    types?: CommitType[]
    issueUrlFormat?: string;
    commitUrlFormat?: string;
    compareUrlFormat?: string;
    userUrlFormat?: string;
    issuePrefixes?: string[];
    ignoreCommits?: boolean;
    preMajor?: boolean;
  } & Record<string, unknown>): Promise<{
    commits: {
      ignore: boolean;
      merges: boolean;
    },
    parser: {
      headerPattern: RegExp;
      breakingHeaderPattern;
      headerCorrespondence: string[];
      noteKeywords: string[],
      revertPattern: RegExp;
      revertCorrespondence: string[];
      issuePrefixes: string[];
    };
    writer: unknown; // @TODO
    whatBump (commits: Commit[]): Promise<BumperRecommendation>,
  }>

  // noinspection JSUnusedGlobalSymbols
  export default createPreset
}
