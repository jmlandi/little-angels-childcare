import Link from 'next/link';
import Image from 'next/image';
import { CalendarClock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Header() {
    return (
    <header className='fixed w-full rounded-b-2xl bg-white drop-shadow-md'>
      <div className='invisible absolute sm:visible sm:flex items-center justify-center w-full gap-5 bg-baby-blue px-3 py-2'>    
        <Link href={"tel:+15038933013"} target='_blank'>
          <div className='flex items-center justify-center gap-2'>
            <Phone size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>+1 (503) 896-3013</p>
          </div>
        </Link>
        <Link href={"https://maps.app.goo.gl/LWTXm6AN9pYf4MKYA"} target='_blank'>
          <div className='flex items-center justify-center gap-2'>
            <MapPin size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>11640 NE Knott St, Portland-OR, 97220</p>
          </div>
        </Link>
        <Link href={"/"}>
          <div className='flex items-center justify-center gap-2'>
            <CalendarClock size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>Monday to Friday, 8am to 5pm</p>
          </div>
        </Link>
        <Link href={"mailto:littleangelspdx@gmail.com"} target='_blank'>
          <div className='flex items-center justify-center gap-2'>
            <Mail size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>littleangelspdx@gmail.com</p>
          </div>
        </Link>
        <Link href={"https://www.instagram.com/littleangelspdx"} target='_blank'>
          <div className='flex items-center justify-center gap-2'>
            <Instagram size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>@littleangelspdx</p>
          </div>
        </Link>
        <Link href={"https://www.facebook.com/littleangelspdx"} target='_blank'>
          <div className='flex items-center justify-center gap-2'>
            <Facebook size={18} strokeWidth={2} color='#81CAEA' className='rounded-full bg-white p-0.5'/>
            <p className='text-xs font-thin text-white mt-1'>littleangelspdx</p>
          </div>
        </Link>
        
      </div>
      <nav className='flex p-3 gap-4 w-full justify-center items-center sm:flex-col'>
        <Image
          src="/logo.svg"
          width={95}
          height={95}
          alt="Little Angels"
        />
        <ul className='invisible absolute sm:visible sm:flex justify-center items-center bg-cyan-50'>
          <li className='px-3'>
            <Link href="/" className='transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white'>
              home
            </Link>
          </li>
          <li className='px-3'>
            <Link href="/contact/" className='transition duration-150 ease-out hover:ease-in px-2 py-1 text-xl rounded-md text-baby-blue hover:bg-baby-blue hover:text-white'>
              contact
            </Link>
          </li>
        </ul>
      </nav>
      </header>
    )
}