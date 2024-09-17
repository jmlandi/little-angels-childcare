import { ContactRepository } from "@domain/repositories/ContactRepository";
import { Contact } from "@domain/entities/Contact";

export class CreateContactUseCase {
    public constructor(private contactRepository: ContactRepository) {}

    async execute(data: {phone: string, email: string, message: string}): Promise<Contact> {
        const contact = new Contact(data.phone, data.email, data.message);
        await this.contactRepository.save(contact);
        return contact;
    }
}