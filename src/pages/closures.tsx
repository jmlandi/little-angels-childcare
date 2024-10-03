import SubPageTitle from "./components/SubPageTitle";

export default function Closures() {
    return (
        <>
            <SubPageTitle title="Closures"/>
            <main className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-16 max-w-[600px] my-16">
                    <p>
                        We are a daycare that is open 52 weeks a year, 5 days a week. We are closed on the weekends and on the following holidays:
                    </p>
                    <ul className="list-disc list-inside bg-baby-blue text-white p-5 rounded-md w-full">
                        <li className="text-lg">New Years Day</li>
                        <li className="text-lg">Presidents Day</li>
                        <li className="text-lg">Memorial Day</li>
                        <li className="text-lg">Independence Day</li>
                        <li className="text-lg">Labor Day</li>
                        <li className="text-lg">Thanksgiving Weekend</li>
                        <li className="text-lg">Christmas Day</li>
                        <li className="text-lg">Winter Break</li>
                    </ul>
                    <p className="text-sm font-light">
                        Little Angels may experience unscheduled closures if we consider attendance of children or staff to be unsafe. For instance, power outage, icy roads, inclement weather, etc.
                    </p>
                </div>
            </main>
        </>
    );
}