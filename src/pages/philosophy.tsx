import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";

import Image from "next/image";

import { GetServerSideProps } from 'next';import Image from "next/image";import Image from "next/image";

import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

import { GetServerSideProps } from 'next';

interface PhilosophyProps {

  content: Record<string, string>;import { GetContentUseCase } from '@application/useCases/GetContentUseCase';export default function Philosophy() {

}

    return (

export default function Philosophy({ content }: PhilosophyProps) {

    const benefitsList = content.benefits_list ? content.benefits_list.split('|') : [];interface PhilosophyProps {        <>

    const wellbeingList = content.wellbeing_list ? content.wellbeing_list.split('|') : [];

  content: Record<string, string>;            <SubPageTitle title="Philosophy"/>

    return (

        <>}            <main className="my-5 w-full flex flex-col items-center justify-center gap-10">

            <SubPageTitle title="Philosophy"/>

            <main className="my-5 w-full flex flex-col items-center justify-center gap-10">                <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">

                <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">

                    <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">export default function Philosophy({ content }: PhilosophyProps) {                    <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">Play Based Philosophy — Playing to Learn/Learning to Play</h2>

                        {content.main_title || 'Play Based Philosophy — Playing to Learn/Learning to Play'}

                    </h2>    // Parse pipe-separated lists                    <q>There&apos;s a lot happening during playtime. Little ones are lifting, dropping, looking, pouring, bouncing, hiding, building, knocking down, and more.

                    <q>{content.main_quote}</q>                

                    <Image    const benefitsList = content.benefits_list ? content.benefits_list.split('|') : [];    Children are more than busy when they&apos;re playing. When your children play with you, they are also learning that they are loved and important and that they are fun to be around</q>                

                        src="/philosophy-1.JPEG"

                        width={0} height={0} sizes="100vw"    const wellbeingList = content.wellbeing_list ? content.wellbeing_list.split('|') : [];                    <Image

                        style={{ width: '100%', height: 'auto' }}

                        alt="kids from Little Angels Childcare"                        src="/philosophy-1.JPEG"

                        className="border-solid border-8 rounded-xl border-baby-blue"

                    />    return (                        width={0} height={0} sizes="100vw"

                    <p>{content.paragraph1}</p>

                    <p>{content.paragraph2}</p>        <>                        style={{ width: '100%', height: 'auto' }}

                    <Image

                        src="/philosophy-2.JPEG"            <SubPageTitle title="Philosophy"/>                        alt="kids from Little Angels Childcare"

                        width={0} height={0} sizes="100vw"

                        style={{ width: '100%', height: 'auto' }}            <main className="my-5 w-full flex flex-col items-center justify-center gap-10">                        className="border-solid border-8 rounded-xl border-baby-blue"

                        alt="Kids from Little Angels Childcare"

                        className="border-solid border-8 rounded-xl border-baby-blue"                <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">                    />

                    />

                    <p>{content.paragraph3}</p>                    <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">                    <p>Our play-based childhood program teaches children to think creatively so they may succeed in our complex and ever-changing world. Purposeful play is developmentally appropriate and a significant element of any early childhood program.</p>

                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">

                        {benefitsList.map((benefit, index) => (                        {content.main_title || 'Play Based Philosophy — Playing to Learn/Learning to Play'}                    <p>Our program emphasizes the importance of play in a child&apos;s intellectual, social, emotional, and physical development. Play is a way of learning for children. During a typical day, structured and unstructured periods will enable children to learn at their own rate.</p>

                            <li key={index}>{benefit}</li>

                        ))}                    </h2>                    <Image

                    </ul>

                    <Image                    <q>{content.main_quote}</q>                                        src="/philosophy-2.JPEG"

                        src="/philosophy-3.JPEG"

                        width={0} height={0} sizes="100vw"                    <Image                        width={0} height={0} sizes="100vw"

                        style={{ width: '100%', height: 'auto' }}

                        alt="Kids from Little Angels Childcare"                        src="/philosophy-1.JPEG"                        style={{ width: '100%', height: 'auto' }}

                        className="border-solid border-8 rounded-xl border-baby-blue"

                    />                        width={0} height={0} sizes="100vw"                        alt="Kids from Little Angels Childcare"

                    <p className="w-full">{content.paragraph4}</p>

                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">                        style={{ width: '100%', height: 'auto' }}                        className="border-solid border-8 rounded-xl border-baby-blue"

                        {wellbeingList.map((item, index) => (

                            <li key={index}>{item}</li>                        alt="kids from Little Angels Childcare"                    />

                        ))}

                    </ul>                         className="border-solid border-8 rounded-xl border-baby-blue"                    <p>We believe in the importance of Outdoors and Physical Activities for babies, and toddlers, and will encourage and motivate your child to Play and be active at Little Angels.</p>

                </div>

            </main>                    />                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">

        </>

    );                    <p>{content.paragraph1}</p>                        <li>Physical activities promotes healthy growth and development.</li>

}

                    <p>{content.paragraph2}</p>                        <li>It helps build a healthier body composition, stronger bones and muscles.</li>

export const getServerSideProps: GetServerSideProps = async () => {

  try {                    <Image                        <li>It improves the child&apos;s cardiovascular fitness. </li>

    const content = await GetContentUseCase.getContentBySection('philosophy');

                            src="/philosophy-2.JPEG"                        <li>It helps in the development of better motor skills and in concentration and thinking skills.</li>

    return {

      props: {                        width={0} height={0} sizes="100vw"                        <li>reduces children&apos;s risk of getting heart disease, cancer and type-2 diabetes later in life.​</li>

        content,

      },                        style={{ width: '100%', height: 'auto' }}                    </ul>

    };

  } catch (error) {                        alt="Kids from Little Angels Childcare"                    <Image

    console.error('Error fetching philosophy content:', error);

    return {                        className="border-solid border-8 rounded-xl border-baby-blue"                        src="/philosophy-3.JPEG"

      props: {

        content: {},                    />                        width={0} height={0} sizes="100vw"

      },

    };                    <p>{content.paragraph3}</p>                        style={{ width: '100%', height: 'auto' }}

  }

};                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">                        alt="Kids from Little Angels Childcare"


                        {benefitsList.map((benefit, index) => (                        className="border-solid border-8 rounded-xl border-baby-blue"

                            <li key={index}>{benefit}</li>                    />

                        ))}                    <p className="w-full">Physical activity also boosts children&apos;s wellbeing. For example, active children are more likely to:</p>

                    </ul>                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">

                    <Image                        <li>be confident and feel like they belong</li>

                        src="/philosophy-3.JPEG"                        <li>be relaxed and sleep well</li>

                        width={0} height={0} sizes="100vw"                        <li>concentrate better at school</li>

                        style={{ width: '100%', height: 'auto' }}                        <li>get along with others and make friends easily</li>

                        alt="Kids from Little Angels Childcare"                        <li>share, take turns and cooperate.</li>

                        className="border-solid border-8 rounded-xl border-baby-blue"                    </ul> 

                    />                </div>

                    <p className="w-full">{content.paragraph4}</p>            </main>

                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">        </>

                        {wellbeingList.map((item, index) => (    );

                            <li key={index}>{item}</li>}
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
