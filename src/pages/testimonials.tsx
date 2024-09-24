import React, { useState, useEffect } from 'react';
import SubPageTitle from './components/SubPageTitle';

interface Testimonial {
  text: string;
  author: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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
        setTestimonials([{
          text: "We're currently experiencing technical difficulties. Please check back later for our customer testimonials.",
          author: "Little Angels Team"
        }]);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
        <SubPageTitle title="Testimonials" />
        <main className='flex flex-col items-center justify-center min-h-screen py-10'>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
            {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center justify-center px-5 py-10 text-center bg-baby-cyan rounded-xl w-[360px] h-[420px]">
                <div className="flex flex-col items-center justify-center gap-5 h-[300px]">
                    <p className="text-sm font-thin text-baby-blue">{testimonial.text}</p>
                </div>
                <hr className="w-full h-[1px] bg-baby-blue border-0 rounded md:my-5"></hr>
                <p className="text-xl text-baby-blue">{testimonial.author}</p>
                </div>
            ))}
            </div>
        </div>
        </main>
    </>
  );
}