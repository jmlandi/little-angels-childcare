import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function Weekend() {
    return (
        <>
            <SubPageTitle title="Weekend" />
            <main className="w-full flex md:flex-row flex-col items-center justify-center gap-15">
                <Image src="/weekend.JPEG" alt="Weekend Drop-In" width={100} height={100} sizes="%" className="w-1/3 min-w-[330px] rounded-xl" />
                <div className="m-5 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold mx-5 text-center">Sunday Fundays are from <br></br>10:00 a.m. to 5:00 p.m.</p>
                    <hr className="w-1/3 m-5"/>
                    <p className="text-xl mx-5 text-center">What we offer:</p>
                    <ul className="bg-baby-blue text-white p-5 rounded-xl list-disc list-inside m-5 text-center">
                        <li>Bounce houses</li>
                        <li>Arts & Crafts activities</li>
                        <li>Outdoor Games & Activities</li>
                        <li>Two homemade, vegan and Healthy Meals</li>
                        <li>themes that change every month</li>
                        <li>FUN GUARANTEED!</li>
                    </ul>
                    <p className="text-xl mx-5 text-center">Drop-in price: $150.00</p>  
                </div>
            </main>
        </>
    );
}