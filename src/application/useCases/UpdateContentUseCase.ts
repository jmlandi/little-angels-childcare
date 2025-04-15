import { Content } from "@domain/entities/Content";
import { ContentRepository } from "@domain/repositories/ContentRepository";

export class UpdateContentUseCase {
    public constructor (private contentRepository: ContentRepository) {}

    async execute(content: Content): Promise<void> {
        await this.contentRepository.updateContent(content)
    }
}