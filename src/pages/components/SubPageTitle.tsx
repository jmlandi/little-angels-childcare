import Image from 'next/image';

interface SubPageTitleProps {
    title: string;
}

export default function SubPageTitle({ title }: SubPageTitleProps) {
    return (
        <div className="relative flex items-end justify-center rounded-3xl overflow-hidden h-[50vh] md:h-[80vh] drop-shadow-sm mb-10">
            <Image
                src="/bg-cloud-blue.jpg"
                alt="Cloud background"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
            <h2 className="text-center z-10 p-4 text-6xl text-white mb-32 md:mb-44">{title}</h2>
        </div>
    );
}