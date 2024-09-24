import { ContactRepository } from "@domain/repositories/ContactRepository";
import { Contact } from "@domain/entities/Contact";
import { pool } from "@infrastructure/database/PostgresClient";

export class ContactRepositoryImpl implements ContactRepository {
    
    async save(contact: Contact): Promise<void> {
        await pool.query(
            "INSERT INTO contacts (id, name, email, message, created_at) VALUES ($1, $2, $3, $4, $5)",
            [contact.getId(), contact.getName(), contact.getEmail(), contact.getMessage(), contact.getCreatedAt()]
        );
    }

    async getAll(): Promise<Contact[]> {
        const { rows } = await pool.query("SELECT * FROM contacts");
        return rows.map((row) => new Contact(row.name, row.email, row.message, row.id, row.created_at));
    }

    async delete(id: string): Promise<void> {
        await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    }
    
    async findById(id: string): Promise<Contact | null> {
        const { rows } = await pool.query("SELECT * FROM contacts WHERE id = $1", [id]);
        if (rows.length === 0) return null;
        const contactRecord = rows[0];
        return new Contact(
            contactRecord.name,
            contactRecord.email,
            contactRecord.message,
            contactRecord.id,
            contactRecord.createdAt,
        );
    }

    async findByEmail(email: string): Promise<Contact[] | null> {
        const { rows } = await pool.query("SELECT * FROM contacts WHERE email = $1", [email]);
        if (rows.length === 0) return null;
        let contactList: Contact[] = [];
        for (let i = 0; i < rows.length; i++) {
            contactList.push(rows[i]);
        }
        return contactList;
    }

    async findByName(name: string): Promise<Contact[] | null> {
        const { rows } = await pool.query("SELECT * FROM contacts WHERE email = $1", [name]);
        if (rows.length === 0) return null;
        let contactList: Contact[] = [];
        for (let i = 0; i < rows.length; i++) {
            contactList.push(rows[i]);
        }
        return contactList;
    }
}