import { NextApiRequest, NextApiResponse } from "next";
import { ContentRepositoryImpl } from "@infrastructure/repositories/ContentRepositoryImpl";
import { CreateContentUseCase } from "@application/useCases/CreateContentUseCase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        
        const contentRepository = new ContentRepositoryImpl();
        const createContentUseCase = new CreateContentUseCase(contentRepository);
        const { pageName, content } = req.body;

        try {
            await createContentUseCase.execute({ pageName, content });
            res.status(200).json({ createdContent: pageName });
        } catch (e) {
            res.status(500).json({ error: `Something went wrong. Details: ${e}` });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}