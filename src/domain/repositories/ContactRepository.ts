import { Contact } from "../entities/Contact";

export interface ContactRepository {
    findById(id: string): Promise<Contact | null>;
    findByEmail(email: string): Promise<Contact[] | null>;
    save(contact: Contact): Promise<void>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Contact[]>;
}