import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";
import { GetServerSideProps } from 'next';
import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

interface PhilosophyProps {
  content: Record<string, string>;
}

export default function Philosophy({ content }: PhilosophyProps) {
    const benefitsList = content.benefits_list ? content.benefits_list.split('|') : [];
    const wellbeingList = content.wellbeing_list ? content.wellbeing_list.split('|') : [];

    return (
        <>
            <SubPageTitle title="Philosophy"/>
            <main className="my-5 w-full flex flex-col items-center justify-center gap-10">
                <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">
                    <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">
                        {content.main_title || 'Play Based Philosophy — Playing to Learn/Learning to Play'}
                    </h2>
                    <q>{content.main_quote}</q>                
                    <Image
                        src="/philosophy-1.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p>{content.paragraph1}</p>
                    <p>{content.paragraph2}</p>
                    <Image
                        src="/philosophy-2.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p>{content.paragraph3}</p>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        {benefitsList.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <Image
                        src="/philosophy-3.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p className="w-full">{content.paragraph4}</p>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        {wellbeingList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul> 
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const content = await GetContentUseCase.getContentBySection('philosophy');
    
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error fetching philosophy content:', error);
    return {
      props: {
        content: {},
      },
    };
  }
};
