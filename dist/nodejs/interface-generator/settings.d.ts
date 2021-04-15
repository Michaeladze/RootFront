export namespace settings {
    const currentDate: Date;
    const formatDate: string;
    const NEW_LINE: string;
    const dirRecent: string;
    const dirArchive: string;
    const verbose: boolean;
    const regexpSwaggerClean: RegExp;
    const interfaceFileName: string;
    const stringForWriteComment: string;
    namespace requestOption {
        const method: string;
        const url: string;
        const strictSSL: boolean;
        const headers: {
            Accept: string;
            "Content-Type": string;
            Authorization: string;
        };
    }
}
