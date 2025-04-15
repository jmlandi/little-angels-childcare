import { NextApiRequest, NextApiResponse } from "next";
import { ContentRepositoryImpl } from "@infrastructure/repositories/ContentRepositoryImpl";
import { GetContentByPageNameUseCase } from "@application/useCases/GetContentByPageNameUseCase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const contentRepository = new ContentRepositoryImpl();
    const getContentByPageNameUseCase = new GetContentByPageNameUseCase(contentRepository);

    // Extrair `pageName` dos query parameters
    const { pageName } = req.query;

    if (!pageName || typeof pageName !== "string") {
      return res.status(400).json({ error: "The 'pageName' query parameter is required and must be a string." });
    }

    try {
      // Executar a lógica de obtenção do conteúdo
      const content = await getContentByPageNameUseCase.execute(pageName);

      if (!content) {
        return res.status(404).json({ error: `Content for pageName '${pageName}' not found.` });
      }

      // Retornar o conteúdo
      res.status(200).json({
        pageName: content.getPageName(),
        content: content.getContent(),
      });
    } catch (e) {
      res.status(500).json({ error: `Something went wrong. Details: ${e}` });
    }
  } else {
    // Método não permitido
    res.status(405).json({ error: "Method not allowed" });
  }
}