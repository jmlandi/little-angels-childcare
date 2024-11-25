import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function Philosophy() {
    return (
        <>
            <SubPageTitle title="Philosophy"/>
            <main className="my-5 w-full flex flex-col items-center justify-center gap-10">
                <div className="max-w-[800px] flex justify-start items-center flex-col gap-10 px-10">
                    <h2 className="text-4xl font-fredoka font-semibold text-baby-blue">Play Based Philosophy — Playing to Learn/Learning to Play</h2>
                    <q>There&apos;s a lot happening during playtime. Little ones are lifting, dropping, looking, pouring, bouncing, hiding, building, knocking down, and more.
    Children are more than busy when they&apos;re playing. When your children play with you, they are also learning that they are loved and important and that they are fun to be around</q>                
                    <Image
                        src="/philosophy-1.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p>Our play-based childhood program teaches children to think creatively so they may succeed in our complex and ever-changing world. Purposeful play is developmentally appropriate and a significant element of any early childhood program.</p>
                    <p>Our program emphasizes the importance of play in a child&apos;s intellectual, social, emotional, and physical development. Play is a way of learning for children. During a typical day, structured and unstructured periods will enable children to learn at their own rate.</p>
                    <Image
                        src="/philosophy-2.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p>We believe in the importance of Outdoors and Physical Activities for babies, and toddlers, and will encourage and motivate your child to Play and be active at Little Angels.</p>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>Physical activities promotes healthy growth and development.</li>
                        <li>It helps build a healthier body composition, stronger bones and muscles.</li>
                        <li>It improves the child&apos;s cardiovascular fitness. </li>
                        <li>It helps in the development of better motor skills and in concentration and thinking skills.</li>
                        <li>reduces children&apos;s risk of getting heart disease, cancer and type-2 diabetes later in life.​</li>
                    </ul>
                    <Image
                        src="/philosophy-3.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Kids from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <p className="w-full">Physical activity also boosts children&apos;s wellbeing. For example, active children are more likely to:</p>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>be confident and feel like they belong</li>
                        <li>be relaxed and sleep well</li>
                        <li>concentrate better at school</li>
                        <li>get along with others and make friends easily</li>
                        <li>share, take turns and cooperate.</li>
                    </ul> 
                </div>
            </main>
        </>
    );
}