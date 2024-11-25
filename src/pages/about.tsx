import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";
import Head from "next/head";

export const metadata = {
  title: "About Us | Little Angels Childcare",
  description: "Learn about Little Angels Childcare's mission, philosophy, environment, and team. We provide bilingual education and foster emotional, social, and creative growth.",
  keywords: "childcare, bilingual education, child development, early education, Little Angels",
};

export default function About() {
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
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">Our Mission</h2>
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            We believe that children thrive in an environment which values their own uniqueness, while providing support and opportunities to grow emotionally, socially and creatively. By building on each child&apos;s strengths, interests and curiosities, we guide each child to explore the world around them as well as develop new abilities and form close relationships.
                        </p>
                        <p className="text-base text-justify">
                            We are bilingual, and will teach your child a second language. Research shows that learning a second language boosts problem-solving, critical-thinking, and listening skills, in addition to improving memory, concentration, and the ability to multitask. Children proficient in other languages also show signs of enhanced creativity and mental flexibility.
                        </p>
                    </div>
                    <Image src="/mission-1.png" alt="Our Mission" width={300} height={300} />
                </div>
            </div>

            {/* Our Philosophy */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">Our Philosophy</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <Image src="/mission-2.png" alt="Our Mission" width={300} height={300} />
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            We believe that children thrive in an environment which values their own uniqueness, while providing support and opportunities to grow emotionally, socially and creatively. By building on each child&apos;s strengths, interests and curiosities, we guide each child to explore the world around them as well as develop new abilities and form close relationships.
            We understand that each child is unique and deserves an environment that fosters their individual growth. Our programs are designed to inspire creativity, encourage curiosity, and build a strong foundation for lifelong learning. We emphasize the importance of social, emotional, and cognitive development, ensuring that your child is well-prepared for their next steps in education and life.                    </p>
                    </div>
                </div>
            </div>

            {/* Our Environment */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">Our Environment</h2>
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            At Little Angels, we are more than just a childcare center; we are a community. We value the relationships we build with families and believe in open communication and collaboration. We are dedicated to providing a high-quality, caring, and inclusive environment where every child feels valued and supported.
                        </p>
                    </div>
                    <Image src="/mission-3.png" alt="Our Mission" width={300} height={300} />
                </div>
            </div>

            {/* Our Team */}
            <div className="flex flex-col items-center justify-center gap-5 mt-16 mb-16">
                <h2 className="text-5xl text-baby-blue font-fredoka font-semibold">Our Team</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Image src="/mission-4.png" alt="Our Mission" width={300} height={300} />
                        <p className="text-xl font-schoolbell text-baby-yellow">Mariana Ricci</p>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[80%] md:max-w-[50%]">
                        <p className="text-base text-justify">
                            Mariana, originally from Brazil and now a U.S. citizen, has been living in the U.S. for over 12 years. With 18+ years of experience working with children, her journey began at 15, caring for her younger relatives. After discovering her passion for child development, she worked at a daycare in Brazil for two years before moving to the U.S. through an Au Pair program, where she worked as a full-time nanny. After completing the program, Mariana pursued college and continued working with children of all ages, from newborns to teenagers. She is deeply passionate about supporting children&apos;s growth and development.
                        </p>
                        <p className="text-base text-justify">
                            In her free time, Mariana enjoys running, surfing, hiking, rollerblading, painting, gardening, cooking, traveling, and exploring new places.
                        </p>
                    </div>
                </div>
            </div>
            </div>

        </main>
      </>
    );
}