import SubPageTitle from "./components/SubPageTitle";
import Image from "next/image";

export default function Gallery() {
    return (
        <>        
            <SubPageTitle title="Gallery"/>
            <main className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
                    <Image
                    src="/gallery/gallery-1.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-2.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-3.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-4.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-5.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-6.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-7.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-8.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-9.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-10.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-11.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                    <Image
                    src="/gallery/gallery-12.png"
                    width={350}
                    height={350}
                    alt="Image of a child"
                    />
                </div>
                
            </main>
        </>
    );
}