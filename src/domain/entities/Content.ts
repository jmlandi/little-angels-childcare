export class Content {
    public constructor (
        private pageName: string,
        private content: object,
    ) {}

    public getPageName(): string {
        return this.pageName;
    }
    
    public getContent(): object {
        return this.content;
    }
}