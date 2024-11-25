import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function Weekend() {
    return (
        <>
            <SubPageTitle title="Weekend Childcare" />
            <div className="w-full h-full flex justify-center items-center">
                <main className="w-full flex flex-col items-center justify-center gap-16 px-5 max-w-[900px]">
                    <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                        <h3 className="font-fredoka font-semibold text-5xl text-baby-blue">Sunday is Funday!</h3>
                        <p className="text-lg">Join us for our monthly <strong>Sunday Funday</strong> drop-in.</p>
                        <p className="text-lg mt-[-16px]">From 10:00 a.m. to 5:00 p.m.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                        <Image
                            src="/weekend.JPEG"
                            alt="Weekend Drop-In"
                            width={100}
                            height={100}
                            sizes="%"
                            className="w-full sm:w-1/2 sm:h-[300px] border-4 border-baby-blue rounded-3xl"
                        />
                        <Image
                            src="/banner-2.png"
                            alt="Weekend Drop-In"
                            width={100}
                            height={100}
                            sizes="%"
                            className="w-full sm:w-1/2 sm:h-[300px] border-4 border-baby-blue rounded-3xl"
                        />
                    </div>
                    <div className="m-5 flex gap-4 flex-col items-center justify-center w-full">
                        <p className="text-2xl text-center font-fredoka font-semibold text-baby-blue">What we offer</p>
                        <ul className="bg-baby-blue text-white p-5 rounded-xl list-disc list-inside m-5 text-center w-full">
                            <li className="text-lg">Bounce houses</li>
                            <li className="text-lg">Arts & Crafts activities</li>
                            <li className="text-lg">Outdoor Games & Activities</li>
                            <li className="text-lg">Two homemade, vegan and healthy meals</li>
                            <li className="text-lg">themes that change every month</li>
                            <li className="text-lg">FUN GUARANTEED!</li>
                        </ul>
                        <p className="text-lg text-center p-5 border-2 border-baby-blue rounded-3xl w-full">Drop-in price: $150.00</p>  
                    </div>
                </main>
            </div>
        </>
    );
}