import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";

import Image from "next/image";

import { GetServerSideProps } from 'next';import Image from "next/image";import Image from "next/image";

import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

import { GetServerSideProps } from 'next';

interface MealsProps {

  content: Record<string, string>;import { GetContentUseCase } from '@application/useCases/GetContentUseCase';export default function Meals() {

}

    return (

export default function Meals({ content }: MealsProps) {

    return (interface MealsProps {        <>

        <>

            <SubPageTitle title="Meals"/>  content: Record<string, string>;            <SubPageTitle title="Meals"/>

            <main className="flex flex-col items-center justify-center">

                <div className="flex flex-col items-start justify-center gap-10 m-10 max-w-[900px]">}            <main className="flex flex-col items-center justify-center">

                    <p className="text-4xl font-fredoka font-semibold text-baby-blue">

                        {content.main_title || 'Here at Little Angels we know the importance of nutrition, especially for children.'}                <div className="flex flex-col items-start justify-center gap-10 m-10 max-w-[900px]">

                    </p>

                    <p>{content.intro_paragraph}</p>export default function Meals({ content }: MealsProps) {                    <p className="text-4xl font-fredoka font-semibold text-baby-blue">Here at Little Angels we know the importance of nutrition, especially for children.</p>

                    <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">

                        <Image    return (                    <p>We are happy, and excited to offer homemade, nutritious, and healthy meals. All of our ingredients are certified organic, and as a bonus, during the summer our veggies and greens are grown in our Little Angels garden, and hand picked by the kids.</p>

                            src="/fruits.jpg"

                            width={0} height={0} sizes="100vw"        <>                    <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">

                            style={{ width: '100%', height: 'auto' }}

                            alt="Image of meals from Little Angels Childcare"            <SubPageTitle title="Meals"/>                        <Image

                            className="border-solid border-8 rounded-xl border-baby-blue sm:max-w-1/3"

                            />            <main className="flex flex-col items-center justify-center">                            src="/fruits.jpg"

                        <div className="flex flex-col gap-5 h-full items-start justify-center min-w-2/3">

                            <div className="w-full">                <div className="flex flex-col items-start justify-center gap-10 m-10 max-w-[900px]">                            width={0} height={0} sizes="100vw"

                                <h4 className="font-bold text-xl text-baby-blue">

                                    {content.breakfast_title || 'Breakfast consist of:'}                    <p className="text-4xl font-fredoka font-semibold text-baby-blue">                            style={{ width: '100%', height: 'auto' }}

                                </h4>

                                <p>{content.breakfast_description}</p>                        {content.main_title || 'Here at Little Angels we know the importance of nutrition, especially for children.'}                            alt="Image of meals from Little Angels Childcare"

                            </div>

                            <div className="w-full">                    </p>                            className="border-solid border-8 rounded-xl border-baby-blue sm:max-w-1/3"

                                <h4 className="font-bold text-xl text-baby-blue">

                                    {content.lunch_title || 'Lunch'} <span className="text-black">may vary, but it always consist of:</span>                    <p>{content.intro_paragraph}</p>                            />

                                </h4>

                                <p>{content.lunch_description}</p>                    <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">                        <div className="flex flex-col gap-5 h-full items-start justify-center min-w-2/3">

                            </div>

                            <div className="w-full">                        <Image                            <div className="w-full">

                                <h4 className="font-bold text-xl text-baby-blue">

                                    {content.snack_title || 'Snack consist of:'}                            src="/fruits.jpg"                                <h4 className="font-bold text-xl text-baby-blue">Breakfast consist of:</h4>

                                </h4>

                                <p>{content.snack_description}</p>                            width={0} height={0} sizes="100vw"                                <p>Fruits, cereal, milk, bread or muffins.</p>

                            </div>

                        </div>                            style={{ width: '100%', height: 'auto' }}                            </div>

                    </div>

                </div>                            alt="Image of meals from Little Angels Childcare"                            <div className="w-full">

            </main>

        </>                            className="border-solid border-8 rounded-xl border-baby-blue sm:max-w-1/3"                                <h4 className="font-bold text-xl text-baby-blue">Lunch <span className="text-black">may vary, but it always consist of:</span></h4>

    );

}                            />                                <p>A variety of veggies, rice, and a vegetarian option for protein. Some options you would see on our lunch menu would be: zucchini, broccolis, potato, green beans, corn, peas, chick peas, pinto beans, black beans, carrots...</p>



export const getServerSideProps: GetServerSideProps = async () => {                        <div className="flex flex-col gap-5 h-full items-start justify-center min-w-2/3">                            </div>

  try {

    const content = await GetContentUseCase.getContentBySection('meals');                            <div className="w-full">                            <div className="w-full">

    

    return {                                <h4 className="font-bold text-xl text-baby-blue">                                <h4 className="font-bold text-xl text-baby-blue">Snack consist of:</h4>

      props: {

        content,                                    {content.breakfast_title || 'Breakfast consist of:'}                                <p>A variety of fruits, and/or veggies, and crackers</p>

      },

    };                                </h4>                            </div>

  } catch (error) {

    console.error('Error fetching meals content:', error);                                <p>{content.breakfast_description}</p>                        </div>

    return {

      props: {                            </div>                    </div>

        content: {},

      },                            <div className="w-full">                </div>

    };

  }                                <h4 className="font-bold text-xl text-baby-blue">            </main>

};

                                    {content.lunch_title} <span className="text-black">may vary, but it always consist of:</span>        </>

                                </h4>    );

                                <p>{content.lunch_description}</p>}
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
