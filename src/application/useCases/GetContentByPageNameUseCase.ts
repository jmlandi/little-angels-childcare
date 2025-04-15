import { Content } from "@domain/entities/Content";
import { ContentRepository } from "@domain/repositories/ContentRepository";

export class GetContentByPageNameUseCase {
    public constructor (private contentRepository: ContentRepository) {}

    async execute(pageName: string): Promise<Content | null> {
        const content = await this.contentRepository.findByPageName(pageName)
        return content
    }
}