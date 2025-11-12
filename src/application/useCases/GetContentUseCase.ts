import { pool } from '@infrastructure/database/PostgresClient';

export interface SiteContent {
  id: number;
  section: string;
  key: string;
  value: string;
  updated_at: string;
}

export class GetContentUseCase {
  /**
   * Get all content for a specific section
   */
  static async getContentBySection(section: string): Promise<Record<string, string>> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT key, value FROM site_content WHERE section = $1',
        [section]
      );
      
      // Convert array of {key, value} to object with key-value pairs
      const content: Record<string, string> = {};
      result.rows.forEach((row) => {
        content[row.key] = row.value;
      });
      
      return content;
    } finally {
      client.release();
    }
  }

  /**
   * Get specific content by section and key
   */
  static async getContent(section: string, key: string): Promise<string | null> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT value FROM site_content WHERE section = $1 AND key = $2',
        [section, key]
      );
      
      return result.rows.length > 0 ? result.rows[0].value : null;
    } finally {
      client.release();
    }
  }

  /**
   * Get all content for multiple sections
   */
  static async getContentBySections(sections: string[]): Promise<Record<string, Record<string, string>>> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT section, key, value FROM site_content WHERE section = ANY($1)',
        [sections]
      );
      
      // Group by section, then convert to key-value pairs
      const content: Record<string, Record<string, string>> = {};
      result.rows.forEach((row) => {
        if (!content[row.section]) {
          content[row.section] = {};
        }
        content[row.section][row.key] = row.value;
      });
      
      return content;
    } finally {
      client.release();
    }
  }
}
