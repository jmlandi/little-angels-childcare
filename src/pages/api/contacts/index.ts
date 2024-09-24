import { NextApiRequest, NextApiResponse } from "next";
import { ContactRepositoryImpl } from "@infrastructure/repositories/ContactRepositoryImpl";
import { CreateContactUseCase } from "@application/useCases/CreateContactUseCase";
import { GetAllContactsUseCase } from "@application/useCases/GetAllContactsUseCase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contactRepository = new ContactRepositoryImpl();

    if (req.method === "GET") {
        const getAllContactsUseCase = new GetAllContactsUseCase(contactRepository);

        try {
            const contacts = await getAllContactsUseCase.execute();
            res.status(200).json({ contacts });
        } catch (error) {
            res.status(500).json({ error: "Error fetching contacts" });
        }
    } else if (req.method === "POST") {
        const { name, email, message } = req.body;
        const createContactUseCase = new CreateContactUseCase(contactRepository);

        try {
            const contact = await createContactUseCase.execute({ name, email, message });
            res.status(201).json({ contact });
        } catch (error) {
            res.status(500).json({ error: "Error creating contact" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}