import { NextApiRequest, NextApiResponse } from "next";
import { ContactRepositoryImpl } from "@infrastructure/repositories/ContactRepositoryImpl";
import { CreateContactUseCase } from "@application/useCases/CreateContactUseCase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { phone, email, message } = req.body;

        const contactRepository = new ContactRepositoryImpl();
        const createContactUseCase = new CreateContactUseCase(contactRepository);

        try {
            const contact = await createContactUseCase.execute({ phone, email, message });
            res.status(201).json({ contact });
        } catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}