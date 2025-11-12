import Contact from "./components/Contact";import Contact from "./components/Contact";import Contact from "./components/Contact";

import SubPageTitle from "./components/SubPageTitle";

import { GetServerSideProps } from 'next';import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";

import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

import { GetServerSideProps } from 'next';

interface TuitionProps {

  content: Record<string, string>;import { GetContentUseCase } from '@application/useCases/GetContentUseCase';export default function Tuition() {

}

    return (

export default function Tuition({ content }: TuitionProps) {

    return (interface TuitionProps {        <>

        <>

            <SubPageTitle title="Tuition Price"></SubPageTitle>  content: Record<string, string>;            <SubPageTitle title="Tuition Price"></SubPageTitle>

            <main className="w-full flex flex-col items-center justify-center p-5">

                <div className="w-full flex flex-col items-center justify-center max-w-[800px] gap-5">}            <main className="w-full flex flex-col items-center justify-center p-5">

                    <h2 className="text-3xl text-baby-blue font-fredoka font-semibold my-10">

                        Tuition is the value paid on the 1st day of every month                <div className="w-full flex flex-col items-center justify-center max-w-[800px] gap-5">

                    </h2>

                    export default function Tuition({ content }: TuitionProps) {                    <h2 className="text-3xl text-baby-blue font-fredoka font-semibold my-10">

                    <h3 className="text-2xl font-bold">{content.rates_title || '2026 Tuition Rates:'}</h3>

                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">    return (                        Tuition is the value paid on the 1st day of every month

                        <li className="text-xl">{content.rate_5_days || '5 days a week: $2050 monthly'}</li>

                        <li className="text-xl">{content.rate_3_days || '3 days a week: $1700 monthly'}</li>        <>                    </h2>

                        <li className="text-xl">{content.rate_2_days || '2 days a week: $1500 monthly'}</li>

                    </ul>            <SubPageTitle title="Tuition Price"></SubPageTitle>                    

                    

                    <p className="w-full font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">            <main className="w-full flex flex-col items-center justify-center p-5">                    <h3 className="text-2xl font-bold">2026 Tuition Rates:</h3>

                        <span className="font-bold">Obs.: </span> 

                        A non-refundable $200 enrollment fee per child is required at the time of enrollment.                <div className="w-full flex flex-col items-center justify-center max-w-[800px] gap-5">                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">

                    </p>

                    <h2 className="text-3xl text-baby-blue font-fredoka font-semibold my-10">                        <li className="text-xl">5 days a week: $2050 monthly</li>

                </div>

            </main>                        {content.title || 'Tuition'}                        <li className="text-xl">3 days a week: $1700 monthly</li>

        </>

    )                    </h2>                        <li className="text-xl">2 days a week: $1500 monthly</li>

}

                                        </ul>

export const getServerSideProps: GetServerSideProps = async () => {

  try {                    <h3 className="text-2xl font-bold">{content.rates_title || '2026 Tuition Rates:'}</h3>                    

    const content = await GetContentUseCase.getContentBySection('tuition');

                        <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">                    <p className="w-full font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">

    return {

      props: {                        <li className="text-xl">{content.rate_5_days || '5 days a week: $2050 monthly'}</li>                        <span className="font-bold">Obs.: </span> 

        content,

      },                        <li className="text-xl">{content.rate_3_days || '3 days a week: $1700 monthly'}</li>                        A non-refundable $200 enrollment fee per child is required at the time of enrollment.

    };

  } catch (error) {                        <li className="text-xl">{content.rate_2_days || '2 days a week: $1500 monthly'}</li>                    </p>

    console.error('Error fetching tuition content:', error);

    return {                    </ul>

      props: {

        content: {},                                    </div>

      },

    };                    <p className="w-full font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">            </main>

  }

};                        <span className="font-bold">Obs.: </span>         </>


                        A non-refundable $200 enrollment fee per child is required at the time of enrollment.    )

                    </p>}


                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const content = await GetContentUseCase.getContentBySection('tuition');
    
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error fetching tuition content:', error);
    return {
      props: {
        content: {},
      },
    };
  }
};
