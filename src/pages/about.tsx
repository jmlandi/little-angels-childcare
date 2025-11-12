import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps } from 'next';
import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

export const metadata = {
  title: "About Us | Little Angels Childcare",
  description: "Learn about Little Angels Childcare's mission, philosophy, environment, and team. We provide bilingual education and foster emotional, social, and creative growth.",
  keywords: "childcare, bilingual education, child development, early education, Little Angels",
};

interface AboutProps {
  content: Record<string, string>;
}

export default function About({ content }: AboutProps) {
    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
        </Head>
        <SubPageTitle title="about us" />
        <main className="flex flex-col items-center justify-center">
            <div className="max-w-[900px]">

            {/* Our Mission */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">
                  {content.mission_title || 'Our Mission'}
                </h2>
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            {content.mission_paragraph1}
                        </p>
                        <p className="text-base text-justify">
                            {content.mission_paragraph2}
                        </p>
                    </div>
                    <Image src="/mission-1.png" alt="Our Mission" width={300} height={300} />
                </div>
            </div>

            {/* Our Philosophy */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">
                  {content.philosophy_title || 'Our Philosophy'}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <Image src="/mission-2.png" alt="Our Philosophy" width={300} height={300} />
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            {content.philosophy_paragraph}
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Environment */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">
                  {content.environment_title || 'Our Environment'}
                </h2>
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            {content.environment_paragraph}
                        </p>
                    </div>
                    <Image src="/mission-3.png" alt="Our Environment" width={300} height={300} />
                </div>
            </div>

            {/* Our Team */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16 mb-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">
                  {content.team_title || 'Our Team'}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Image src="/mission-4.png" alt="Our Team" width={300} height={300} />
                        <p className="text-xl font-schoolbell text-baby-yellow">
                          {content.team_name || 'Mariana Ricci'}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            {content.team_bio_paragraph1}
                        </p>
                        <p className="text-base text-justify">
                            {content.team_bio_paragraph2}
                        </p>
                    </div>
                </div>
            </div>
                        </div>

        </main>
      </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const content = await GetContentUseCase.getContentBySection('about');
    
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error fetching about content:', error);
    // Return empty content object on error
    return {
      props: {
        content: {},
      },
    };
  }
};
