import { Content } from "@domain/entities/Content";

export interface ContentRepository {
    findByPageName(pageName: string): Promise<Content | null>;
    createContent(content: Content): Promise<void>;
    updateContent(content: Content): Promise<void>;
}