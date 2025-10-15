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
                    <h2 className="text-lg font-bold">School Closures 2025:</h2>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>January 1 - 7, 2025 - New Years</li>
                        <li>February 17, 2025 - Presidents Day</li>
                        <li>May 26, 2025 - Memorial Day</li>
                        <li>June 19 – 20, 2025 – Juneteenth / Administration closure</li>
                        <li>June 23 – 27, 2025 – Summer Break</li>
                        <li>July 4, 2025 - Independence Day</li>
                        <li>September 1, 2025 - Labor Day</li>
                        <li>November 27, November 28, 2025 - Thanksgiving Weekend</li>
                        <li>December 22 – January 2, 2026 (Returning on January 5th, 2026) - Winter Break</li>
                    </ul>
                    <h2 className="text-lg font-bold">School Closures 2026:</h2>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li>January 1 and January 2, 2026 - New Years (Returning January 5th, 2026)</li>
                        <li>February 16, 2026 - Presidents Day</li>
                        <li>March 2, 2026 – Staff Meeting/Administrative Day</li>
                        <li>May 25, 2026 - Memorial Day</li>
                        <li>June 19, 2026 – Juneteenth</li>
                        <li>June 22 – 26, 2026 – Summer Break</li>
                        <li>September 7, 2026 - Labor Day</li>
                        <li>November 26, November 27, 2026 - Thanksgiving Weekend</li>
                        <li>December 21 – January 1, 2027 (Returning January 4th, 2027) - Winter Break</li>
                    </ul>
                    <p className="font-light p-5 border-2 border-baby-blue rounded-3xl mb-10">
                        <span className="font-bold">Obs.:</span> Little Angels may experience unscheduled closures if we consider attendance of children or staff to be unsafe. For instance, power outage, icy roads, inclement weather, etc.
                    </p>
                </div>
            </main>
        </>
    );
}
