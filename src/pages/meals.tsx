import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function Meals() {
    return (
        <>
            <SubPageTitle title="Meals"/>
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-start justify-center gap-10 m-10 max-w-[900px]">
                    <p className="text-4xl font-fredoka font-semibold text-baby-blue">Here at Little Angels we know the importance of nutrition, especially for children.</p>
                    <p>We are happy, and excited to offer homemade, nutritious, and healthy meals. All of our ingredients are certified organic, and as a bonus, during the summer our veggies and greens are grown in our Little Angels garden, and hand picked by the kids.</p>
                    <Image
                        src="/meal.JPEG"
                        width={0} height={0} sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        alt="Image of meals from Little Angels Childcare"
                        className="border-solid border-8 rounded-xl border-baby-blue"
                    />
                    <div>
                        <h4 className="font-bold text-xl text-baby-blue">Breakfast consist of:</h4>
                        <p>Fruits, cereal, milk, bread or muffins.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-baby-blue">Lunch consist of:</h4>
                        <p>A vegan option, served with rice, vegetables and potatoes.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-baby-blue">Snack consist of:</h4>
                        <p>A variety of fruits, veggies, and crackers.</p>
                    </div>
                </div>
            </main>
        </>
    );
}