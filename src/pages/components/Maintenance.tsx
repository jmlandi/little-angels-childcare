import Image from "next/image"
import { useRef } from "react"
import { useIsVisible } from "../../interfaces/hooks/useIsVisible";

export default function Maintenance() {

    const componentRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(componentRef);

    return (
        <>
            <main
            ref={componentRef}
            className={`
            transition-opacity ease-in duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}
            p-5 w-screen min-h-screen flex flex-col gap-3 text-center items-center justify-center`}
            >
                <Image
                className="mt-10"
                src="/angel-1.png"
                width={230}
                height={230}
                alt="Little angel above a cute cloud"
                />
                <h2 className="mb-3 animate-pulse font-schoolbell text-5xl text-baby-blue">This page is temporarily unavailable</h2>
                <p>We&apos;re working hard to make improvements to our website, but you can still reach us through our official channels or the form below. Thanks for your patience!</p>
            </main>
        </>
    )
}