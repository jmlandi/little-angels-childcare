export class Image {
    public constructor(
      private id: string,
      private url: string,
    ) {}
  
    public getId(): string {
        return this.id;
    }

    public getUrl(): string {
        return this.url;
    }

  }
  