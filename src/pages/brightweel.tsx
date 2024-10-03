import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function BrightWeel() {
    return (
        <>
            <SubPageTitle title="BrightWeel"/>
            <main className="m-5 w-full flex flex-col items-center justify-center gap-10">
                <Image src="/brightweel.png" width={300} height={300} alt="Brightwheel App example"/>                
                <p className="max-w-[800px]">
                    Brightwheel is an awesome app that we use at Little Angels daycare. You will love it! It gives parents real-time feed of their kids activities through the day. With Brightwheel parents can see real-time pictures and videos of their kids, receive daily notes of their kids schedule as: when they are napping, eating, playing, or have a diaper change, updates and notes of how their kids are doing/improving in their development growth, receive notes when they are running low on supplies at the daycare, it is an easy way for parents and staff to communicate through the day, and more!
                </p>        
            </main>
        </>
    );
}