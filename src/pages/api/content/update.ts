import { NextApiRequest, NextApiResponse } from "next";
import { ContentRepositoryImpl } from "@infrastructure/repositories/ContentRepositoryImpl";
import { UpdateContentUseCase } from "@application/useCases/UpdateContentUseCase";
import { Content } from "@domain/entities/Content";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        
        const contentRepository = new ContentRepositoryImpl();
        const updateContentUseCase = new UpdateContentUseCase(contentRepository);
        const { pageName, content } = req.body;
        const contentToUpdate = new Content(pageName, content);

        try {
            await updateContentUseCase.execute(contentToUpdate)
            res.status(200).json({ updatedContent: contentToUpdate.getPageName() });
        } catch (e) {
            res.status(500).json({ error: `Something went wrong. Details: ${e}` });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}