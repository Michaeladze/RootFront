export function currentBrunch(all?: boolean): string;
export function currentRepoLink(pr?: boolean): string | {
    project: string;
    repo: string;
};
