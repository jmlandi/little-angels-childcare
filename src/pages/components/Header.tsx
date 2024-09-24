import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarClock, Facebook, Instagram, Mail, MapPin, Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full fixed rounded-b-2xl bg-white drop-shadow-md z-40">
      {/* Contact Info Bar (visible only on larger screens) */}
      <div className="hidden sm:flex items-center justify-center w-full gap-5 bg-baby-blue px-3 py-2">
        <Link href={"tel:+15038933013"} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <Phone
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">+1 (503) 896-3013</p>
          </div>
        </Link>
        <Link href={"https://maps.app.goo.gl/LWTXm6AN9pYf4MKYA"} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <MapPin
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">
              11640 NE Knott St, Portland-OR, 97220
            </p>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <CalendarClock
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">Monday to Friday, 8am to 5pm</p>
          </div>
        </Link>
        <Link href={"mailto:littleangelspdx@gmail.com"} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <Mail
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">littleangelspdx@gmail.com</p>
          </div>
        </Link>
        <Link href={"https://www.instagram.com/littleangelspdx"} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <Instagram
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">@littleangelspdx</p>
          </div>
        </Link>
        <Link href={"https://www.facebook.com/littleangelspdx"} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <Facebook
              size={18}
              strokeWidth={2}
              color="#81CAEA"
              className="rounded-full bg-white p-0.5"
            />
            <p className="text-xs font-thin text-white mt-1">littleangelspdx</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex p-3 w-full justify-between items-center md:flex-col md:gap-3">
      <Image src="/logo.svg" width={95} height={95} alt="Little Angels" />

        {/* Hamburger Button for Mobile */}
        <button
          className="sm:hidden flex items-center p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={36} strokeWidth={2} className="text-baby-blue" />
          ) : (
            <Menu size={36} strokeWidth={2} className="text-baby-blue" />
          )}
        </button>

        {/* Menu for larger screens */}
        <ul className="hidden sm:flex justify-center items-center gap-4">
          <li>
            <Link
              href="/"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              about us
            </Link>
          </li>
          <li>
            <Link
              href="/testimonials"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              testimonials
            </Link>
          </li>
          <li>
            <Link
              href="/enrollments"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              enrollments
            </Link>
          </li>
          <li>
            <Link
              href="/weekend"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              weekend
            </Link>
          </li>
          <li>
            <Link
              href="/brightweel"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              brightweel
            </Link>
          </li>
          <li>
            <Link
              href="/school-closures"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              school closures
            </Link>
          </li>
          <li>
            <Link
              href="/meals"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              meals
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              gallery
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
            >
              contact us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu (visible when open) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden bg-white w-full flex flex-col items-center`}
      >
        <ul className="flex flex-col gap-4 p-4 w-full">
          <li className="w-full">
            <Link
              href="/"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              home
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/about"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              about us
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/testimonials"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              testimonials
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/enrollments"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              enrollments
            </Link>
          </li> 
          <li className="w-full">
            <Link
              href="/weekend"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              weekend
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/brightweel"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              brightweel
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/scholl-closures"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              school closures
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/meals"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              meals
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/gallery"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              gallery
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#contact"
              className="block text-center transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
            >
              contact us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
