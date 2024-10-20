import SubPageTitle from "./components/SubPageTitle";

export default function Closures() {
    return (
        <>
            <SubPageTitle title="Closures"/>
            <main className="w-full flex flex-col items-center justify-center p-5">
                <div className="flex flex-col items-center justify-center gap-8 max-w-[800px] my-8">
                    <p className="text-center text-3xl text-baby-blue font-fredoka font-semibold mb-10">
                        We are a daycare that is open 5 days a week. We are closed on the weekends and on the following holidays
                    </p>
                    <h2 className="text-lg font-bold">School Closures 2024:</h2>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>January 1, January 2, 2024 - New Years</li>
                        <li>February 19, 2024 - Presidents Day</li>
                        <li>March 8, 2024 - Administrative closure</li>
                        <li>March 25 to March 29, 2024 - Spring Break closure</li>
                        <li>April 11, April 12, 2024 - Administrative closure</li>
                        <li>May 27, 2024 - Memorial Day</li>
                        <li>July 4 – July 5, 2024 - Independence Day</li>
                        <li>September 2, 2024 - Labor Day</li>
                        <li>September 9, September 10, 2024 - Administrative closure</li>
                        <li>November 28, November 29, 2024 - Thanksgiving Weekend</li>
                        <li>December 23 – January 7, 2025 (Returning on January 8th, 2025) - Winter Break</li>
                    </ul>
                    <h2 className="text-lg font-bold">School Closures 2025:</h2>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>January 1 - 7, 2025 - New Years</li>
                        <li>February 17, 2025 - Presidents Day</li>
                        <li>May 26, 2025 - Memorial Day</li>
                        <li>June 19 – 20, 2025 – Juneteenth / Administration closure</li>
                        <li>June 23 – 27, 2025 – Summer Break</li>
                        <li>July 4, 2025 - Independence Day</li>
                        <li>September 1, 2025 - Labor Day</li>
                        <li>November 27, November 28, 2024 - Thanksgiving Weekend</li>
                        <li>December 22 – January 2, 2025 (Returning on January 5th, 2026) - Winter Break</li>
                    </ul>
                    <p className="font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">
                        <span className="font-bold">Obs.:</span> Little Angels may experience unscheduled closures if we consider attendance of children or staff to be unsafe. For instance, power outage, icy roads, inclement weather, etc.
                    </p>
                </div>
            </main>
        </>
    );
}
