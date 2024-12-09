import { ContentRepository } from "@domain/repositories/ContentRepository";
import { Content } from "@domain/entities/Content";
import { pool } from "@infrastructure/database/PostgresClient";

export class ContentRepositoryImpl implements ContentRepository {

    async findByPageName(pageName: string): Promise<Content | null> {
        const { rows } = await pool.query(
            "SELECT * FROM pages_content WHERE page_name = $1", [pageName]
        )
        if (rows.length === 0) return null;
        const contentRecord = rows[0];
        return new Content(
            contentRecord.page_name,
            contentRecord.content,
        )
    }

    async createContent(content: Content): Promise<void> {
        await pool.query(
            "INSERT INTO pages_content (page_name, content) VALUES ($1, $2)",
            [content.getPageName(), content.getContent()]
        )
    }

    async updateContent(content: Content): Promise<void> {
        await pool.query(
            "UPDATE pages_content SET content = $1 WHERE page_name = $2",
            [content.getContent(), content.getPageName()]
        )
    }

}