import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col gap-3 text-center items-center justify-center">
      <Image
        className="px-"
        src="/angel-1.png"
        width={230}
        height={230}
        alt="Little angel above a cute cloud"
      />
      <h2 className=" animate-pulse font-schoolbell text-5xl text-baby-blue">We are under maintence!</h2>
      <p>But don&apos;t worry, you may reach using an official channel.</p>
    </main>
  );
} 