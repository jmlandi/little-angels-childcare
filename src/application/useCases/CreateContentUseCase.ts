import { Content } from "@domain/entities/Content";
import { ContentRepository } from "@domain/repositories/ContentRepository";

export class CreateContentUseCase{
    public constructor(private contentRepository: ContentRepository) {}

    async execute(data: {pageName: string, content: object}): Promise<Content> {
        const content = new Content(data.pageName, data.content);
        await this.contentRepository.createContent(content);
        return content;
    }
}