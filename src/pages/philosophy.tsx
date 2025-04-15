import { useEffect, useState } from "react";
import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";
import axios from "axios";

interface PhilosophyContent {
  header: string;
  paragraph_1: string;
  image_1: string;
  paragraph_2: string;
  paragraph_3: string;
  image_2: string;
  paragraph_4: string;
  list_1: string;
  image_3: string;
  paragraph_5: string;
  list_2: string;
}

export default function Philosophy() {
  const [content, setContent] = useState<PhilosophyContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      console.log("[Philosophy] Starting to fetch content...");
      setLoading(true);

      try {
        console.log("[Philosophy] Sending request to API...");
        const response = await axios.get("/api/content/read", {
          params: { pageName: "philosophy" },
        });

        console.log("[Philosophy] API response received:", response.data);

        // Validate response content
        if (!response.data || !response.data.content) {
          throw new Error("[Philosophy] Invalid content format from API.");
        }

        setContent(response.data.content);
        console.log("[Philosophy] Content successfully set:", response.data.content);
        setError(null);
      } catch (err) {
        console.error("[Philosophy] Error fetching content:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        console.log("[Philosophy] Fetching content process completed.");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    console.log("[Philosophy] Loading state: displaying loader...");
    return <p>Loading content...</p>;
  }

  if (error) {
    console.error("[Philosophy] Error state: displaying error message.");
    return <p className="text-red-500">{error}</p>;
  }

  if (!content) {
    console.warn("[Philosophy] No content found: displaying fallback message.");
    return <p>No content available.</p>;
  }

  console.log("[Philosophy] Rendering content:", content);

  return (
    <>
      <SubPageTitle title="Philosophy" />
      <main className="my-5 w-full flex flex-col items-center justify-center gap-10">
        <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">
          <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">
            {content.header}
          </h2>
          <q>{content.paragraph_1}</q>
          <Image
            src={content.image_1}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="Kids from Little Angels Childcare"
            className="border-solid border-8 rounded-xl border-baby-blue"
            unoptimized
          />
          <p>{content.paragraph_2}</p>
          <p>{content.paragraph_3}</p>
          <Image
            src={content.image_2}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="Kids from Little Angels Childcare"
            className="border-solid border-8 rounded-xl border-baby-blue"
            unoptimized
          />
          <p>{content.paragraph_4}</p>
          <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
            {content.list_1.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Image
            src={content.image_3}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="Kids from Little Angels Childcare"
            className="border-solid border-8 rounded-xl border-baby-blue"
            unoptimized
          />
          <p className="w-full">{content.paragraph_5}</p>
          <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
            {content.list_2.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}