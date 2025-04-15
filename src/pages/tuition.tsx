import Contact from "./components/Contact";
import SubPageTitle from "./components/SubPageTitle";

export default function Tuition() {
    return (
        <>
            <SubPageTitle title="Tuition Price"></SubPageTitle>
            <main className="w-full flex flex-col items-center justify-center p-5">
                <div className="w-full flex flex-col items-center justify-center max-w-[800px] gap-5">
                    <h2 className="text-3xl text-baby-blue font-fredoka font-semibold my-10">
                        Tuition is the value paid on the 1st day of every month
                    </h2>
                    
                    {/* <h3 className="text-lg font-bold">2024 Tuition Rates:</h3>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>5 days a week: $1800 monthly</li>
                        <li>4 days a week: $1650 monthly</li>
                        <li>3 days a week: $1550 monthly</li>
                        <li>2 days a week: $1450 monthly</li>
                    </ul> */}
                    
                    
                    <h3 className="text-2xl font-bold">2025 Tuition Rates:</h3>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li className="text-xl">5 days a week: $1950 monthly</li>
                        {/* <li className="text-xl">4 days a week: $1650 monthly</li> */}
                        <li className="text-xl">3 days a week: $1650 monthly</li>
                        <li className="text-xl">2 days a week: $1450 monthly</li>
                    </ul>
                    
                    <p className="w-full font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">
                        <span className="font-bold">Obs.: </span> 
                        A non-refundable $200 enrollment fee per child is required at the time of enrollment.
                    </p>

                </div>
            </main>
        </>
    )
}
