import Image from "next/image";
import { useState, FormEvent, useRef } from "react";
import { useIsVisible } from "../../interfaces/hooks/useIsVisible";

export default function Contact() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const handleResponse = (response: string, isError: boolean = false) => {
        setResponse(response);
        setIsError(isError);

        setTimeout(() => {
            setResponse("");
        }, 5000);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.status === 201) {
                setName("");
                setEmail("");
                setMessage("");
                handleResponse("Message sent! We'll answer you as soon as possible");
            } else {
                setName("");
                setEmail("");
                setMessage("");
                handleResponse(
                    "Something went wrong! Please send us an email at littleangelspdx@gmail.com",
                    true
                );
            }
        } catch (error) {
            console.error("Failed to send form:", error);
            handleResponse("An unexpected error occurred. Please try again later.", true);
        }
    };

    const componentRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(componentRef);

    return (
        <section
        ref={componentRef}
        className={`
        transition-opacity ease-in duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}
        w-full flex justify-center items-center mb-0`}
        >
            <form
                onSubmit={handleSubmit}
                id="contact"
                className="w-3/4 sm:w-2/3 h-2/3 p-10 mt-10 rounded-t-3xl bg-cloud-white drop-shadow-md flex flex-col items-center justify-start gap-5"
            >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-10">
                    <Image
                        src="/angel-2.png"
                        width={30}
                        height={30}
                        alt="Cute angel with blond hair"
                    />
                    <h3 className="text-xl sm:text-3xl font-bold text-baby-blue">send a message!</h3>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-3 items-stretch justify-stretch">
                    <input
                        className="p-2 rounded-xl w-full sm:w-1/2 bg-baby-blue placeholder-white"
                        placeholder="Your name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="p-2 rounded-xl w-full sm:w-1/2 bg-baby-blue placeholder-white"
                        placeholder="Your best e-mail"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <textarea
                    className="p-2 rounded-xl w-full bg-baby-blue placeholder-white"
                    placeholder="Write your message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                    className="transition duration-150 ease-out hover:ease-in hover:bg-white hover:text-baby-yellow p-2 rounded-xl w-full bg-baby-yellow text-white text-xl font-extrabold"
                    type="submit"
                >
                    Submit
                </button>

            </form>
            {/* Notification section */}
            {response && (
                <div
                    className={`fixed z-50 top-0 p-5 m-3 rounded-xl ${
                        isError ? "bg-baby-yellow text-white" : "bg-baby-cyan text-black"
                    }`}
                >
                    {response}
                </div>
            )}
        </section>
    );
}
