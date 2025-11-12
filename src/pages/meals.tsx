import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";
import { GetServerSideProps } from 'next';
import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

interface MealsProps {
  content: Record<string, string>;
}

export default function Meals({ content }: MealsProps) {
    return (
        <>
            <SubPageTitle title="Meals"/>
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-start justify-center gap-10 m-10 max-w-[900px]">
                    <p className="text-4xl font-fredoka font-semibold text-baby-blue">
                        {content.main_title || 'Here at Little Angels we know the importance of nutrition, especially for children.'}
                    </p>
                    <p>{content.intro_paragraph}</p>
                    <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">
                        <Image
                            src="/fruits.jpg"
                            width={0} height={0} sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            alt="Image of meals from Little Angels Childcare"
                            className="border-solid border-8 rounded-xl border-baby-blue sm:max-w-1/3"
                            />
                        <div className="flex flex-col gap-5 h-full items-start justify-center min-w-2/3">
                            <div className="w-full">
                                <h4 className="font-bold text-xl text-baby-blue">
                                    {content.breakfast_title || 'Breakfast consist of:'}
                                </h4>
                                <p>{content.breakfast_description}</p>
                            </div>
                            <div className="w-full">
                                <h4 className="font-bold text-xl text-baby-blue">
                                    {content.lunch_title || 'Lunch'} <span className="text-black">may vary, but it always consist of:</span>
                                </h4>
                                <p>{content.lunch_description}</p>
                            </div>
                            <div className="w-full">
                                <h4 className="font-bold text-xl text-baby-blue">
                                    {content.snack_title || 'Snack consist of:'}
                                </h4>
                                <p>{content.snack_description}</p>
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
    const content = await GetContentUseCase.getContentBySection('meals');
    
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error fetching meals content:', error);
    return {
      props: {
        content: {},
      },
    };
  }
};
