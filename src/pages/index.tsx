import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useIsVisible } from '../interfaces/hooks/useIsVisible';
import Link from 'next/link';
import Head from 'next/head';
import ModalForm from './components/ModalForm';

export default function Home() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [
    'banner-1.png',
    'banner-2.png',
    'banner-3.png'
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  interface Testimonial {
    text: string;
    author: string;
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialRef = useRef(null);
  const isVisible = useIsVisible(testimonialRef);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Set a default testimonial in case of error
        setTestimonials([{
          text: "We&apos;re currently experiencing technical difficulties. Please check back later for our customer testimonials.",
          author: "Little Angels Team"
        }]);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && testimonials.length > 0) {
      interval = setInterval(() => {
        changeTestimonial((currentTestimonial + 1) % testimonials.length);
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [currentTestimonial, isVisible, testimonials]);

  const changeTestimonial = (newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const ourMissionRef = useRef(null);
  const ourMissionIsVisible = useIsVisible(ourMissionRef);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Little Angels Childcare - Bilingual Childcare Services</title>
        <meta name="description" content="Little Angels Childcare offers bilingual childcare services. We provide a safe, nurturing environment for children to explore, create, and learn." />
        <meta name="keywords" content="childcare, bilingual, education, early learning, preschool" />
        <meta property="og:title" content="Little Angels Childcare - Bilingual Childcare Services" />
        <meta property="og:description" content="Discover our bilingual childcare services at Little Angels. We foster exploration, creativity, and learning in a nurturing environment." />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content="https://littleangelspdx.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Banner */}
      <main
        className="flex flex-col items-center justify-start min-h-screen gap-5 bg-cover bg-center transition-all duration-1000 ease-in-out z-10"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="flex flex-col items-center justify-center gap-5 bg-baby-cyan rounded-xl py-10 px-16 md:px-44 mt-24 md:mt-44 opacity-95">
          <h2 className="text-baby-blue text-2xl md:text-4xl font-bold text-center">Welcome to your<br></br>bilingual childcare!</h2>
          <button 
            onClick={handleOpenModal}
            className="bg-baby-blue rounded-xl md:text-xl font-schoolbell text-white px-10 py-3 hover:bg-white hover:text-baby-blue transition-all duration-200"
          >
            SCHEDULE A TOUR
          </button>
        </div>
      </main>

      <ModalForm isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Core Values */}
      <section className="flex flex-col items-center justify-start gap-5 p-10 min-h-screen rounded-t-3xl bg-white z-20 mt-[-60px]">
        <div className="flex flex-col items-center justify-start rounded-t-3xl bg-white">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-baby-yellow text-2xl font-schoolbell">why choose us</p>
            <Image className="animate-bounce" src="/angel-1.png" alt="why choose us" width={50} height={50} />
          </div>
          <h2 className="text-baby-blue text-3xl md:text-5xl font-bold text-center">Our Core Values</h2>
        </div>
        <div className="flex flex-col items-center justify-start gap-5">
          <div className="flex flex-col md:flex-row items-center justify-start gap-10">
            <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-baby-cyan border-2 border-baby-blue p-5 h-[480px] w-[270px]">
              <Image src="/core-value-1.png" alt="why choose us" width={160} height={160} />
              <h3 className="text-white text-2xl font-bold text-center bg-baby-yellow rounded-xl py-2 px-7">explore</h3>
              <p className="text-baby-blue text-center text-sm">
                We ensure a safe and secure environment for your child to grow and learn.At Little Angels, we encourage curiosity and discovery, providing children with a safe and nurturing environment to explore the world around them. Through play and guided activities, we inspire a sense of wonder and adventure in every child.
              </p>
            </div>
            <div className="flex flex-col items-center justify-start gap-5 rounded-xl bg-baby-cyan border-2 border-baby-blue p-5 h-[480px] w-[270px]">
              <Image src="/core-value-2.png" alt="why choose us" width={160} height={160} />
              <h3 className="text-white text-2xl font-bold text-center bg-baby-blue rounded-xl py-2 px-7">create</h3>
              <p className="text-baby-blue text-center text-sm">
                Creativity is at the heart of everything we do. We provide opportunities for children to express themselves through art, music, and imaginative play, nurturing their creative talents and helping them to think outside the box.
              </p>
            </div>
            <div className="flex flex-col items-center justify-start gap-5 rounded-xl bg-baby-cyan border-2 border-baby-blue p-5 h-[480px] w-[270px]">
              <Image src="/core-value-3.png" alt="why choose us" width={160} height={160} />
              <h3 className="text-white text-2xl font-bold text-center bg-baby-yellow rounded-xl py-2 px-7">learn</h3>
              <p className="text-baby-blue text-center text-sm">
              We believe in fostering a love of learning from an early age. Our tailored educational programs are designed to ignite intellectual curiosity and promote lifelong learning, empowering children with the knowledge and skills they need to succeed.
              </p>
            </div>
          </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 bg-baby-cyan border-2 border-baby-blue rounded-xl px-2 py-2">
              <h3 className="text-baby-blue max-w-[255px] md:max-w-full text-xl md:text-2xl mt-[5px] text-center">Little Angels Childcare was made for you!</h3>
              <Link href="#contact">
                <button className="bg-baby-yellow rounded-xl md:text-xl text-white px-16 md:px-20 py-3 transition-all duration-200 hover:bg-white hover:text-baby-blue">send a message</button>
              </Link>
            </div>
        </div>
      </section>

      {/*Testimonials*/}
      <section ref={testimonialRef} className="flex flex-col items-center justify-center gap-5 p-16 min-h-[90vh] rounded-3xl bg-baby-blue z-20">
        <div className="flex flex-row items-center justify-center gap-2">
          <h2 className="text-white text-4xl font-bold">Testimonials</h2>
          <Image className="animate-bounce" src="/angel-3.png" alt="why choose us" width={40} height={40} />
        </div>
        {/*Testimonials Carousel*/}
        <div className="flex flex-row items-center justify-center gap-4 mt-16">
          <div className="flex flex-row items-center justify-center">
            {/*Testimonial*/}
            {testimonials.length > 0 && (
              <div className={`flex flex-col items-center justify-center px-5 py-10 text-center w-[360px] h-[420px] bg-white rounded-xl transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col items-center justify-center gap-5 h-[300px]">
                  <p className="text-sm font-thin text-baby-blue">{testimonials[currentTestimonial].text}</p>
                </div>
                <hr className="w-full h-[1px] bg-baby-blue border-0 rounded md:my-5"></hr>
                <p className="text-xl text-baby-blue">{testimonials[currentTestimonial].author}</p>
              </div>
            )}
            {/*Hidden on mobile, visible on larger screens*/}
            {testimonials.length > 1 && (
              <div className={`hidden md:flex flex-col items-center justify-center px-5 py-10 text-center w-[360px] h-[420px] bg-white rounded-xl ml-16 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col items-center justify-center gap-5 h-[300px]">
                  <p className="text-sm font-thin text-baby-blue">{testimonials[(currentTestimonial + 1) % testimonials.length].text}</p>
                </div>
                <hr className="w-full h-[1px] bg-baby-blue border-0 rounded md:my-5"></hr>
                <p className="text-xl text-baby-blue">{testimonials[(currentTestimonial + 1) % testimonials.length].author}</p>
              </div>
            )}
          </div>
        </div>
        <Link href="/testimonials">
          <button className="bg-white rounded-xl md:text-xl text-baby-blue px-16 md:px-20 py-3 transition-all duration-200 hover:bg-baby-yellow hover:text-white mt-10">
            read more
          </button>
        </Link>
      </section>

      {/*Our Misson*/}
      <section
        ref={ourMissionRef}
        className={`flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-24 min-h-screen rounded-3xl bg-white z-20
        transition-opacity ease-in duration-1000 ${ourMissionIsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-start justify-center gap-5 md:max-w-[50%]">
          <h2 className="text-baby-blue text-5xl font-bold text-center"><span className="text-baby-yellow">Our</span> Mission</h2>
          <p className="text-justify">
           We believe that children thrive in an <span className="font-bold">environment which values their own uniqueness</span>, while providing support and opportunities to grow emotionally, socially and creatively. By building on each child&apos;s strengths, interests and curiosities, we guide each child to explore the world around them as well as develop new abilities and form close relationships.
          </p>
          <p className="text-justify">
            <span className="font-bold">We are bilingual, and will teach your child a second language.</span> Research shows that learning a second language boosts problem-solving, critical-thinking, and listening skills, in addition to improving memory, concentration, and the ability to multitask. Children proficient in other languages also show signs of enhanced creativity and mental flexibility.
          </p>
          
        <Link href="/about">
          <button className="bg-baby-yellow rounded-xl md:text-xl text-white px-16 md:px-20 py-3 transition-all duration-200 hover:bg-baby-blue hover:text-white mt-10">
            read more
          </button>
        </Link>
        </div>
        <Image src="/our-mission.png" alt="our mission" width={380} height={380} />
      </section>
      
    </>
  );
}