import { ContactRepository } from "@domain/repositories/ContactRepository";
import { Contact } from "@domain/entities/Contact";

export class GetAllContactsUseCase {
    public constructor(private contactRepository: ContactRepository) {}

    async execute(): Promise<Contact[]> {
        return await this.contactRepository.getAll();
    }
}
