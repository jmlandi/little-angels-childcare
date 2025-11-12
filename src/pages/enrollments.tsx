import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";import SubPageTitle from "./components/SubPageTitle";

import ModalForm from "./components/ModalForm";

import { useState } from "react";import ModalForm from "./components/ModalForm";import ModalForm from "./components/ModalForm";

import { GetServerSideProps } from 'next';

import { GetContentUseCase } from '@application/useCases/GetContentUseCase';import { useState } from "react";import { useState } from "react";



interface EnrollmentsProps {import { GetServerSideProps } from 'next';

    content: Record<string, string>;

}import { GetContentUseCase } from '@application/useCases/GetContentUseCase';export default function Enrollments() {



export default function Enrollments({ content }: EnrollmentsProps) {    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

interface EnrollmentsProps {

    const openModal = () => {

        setIsModalOpen(true);    content: Record<string, string>;    const openModal = () => {

    };

}        setIsModalOpen(true);

    const closeModal = () => {

        setIsModalOpen(false);    };

    };

export default function Enrollments({ content }: EnrollmentsProps) {

    return (

        <main>    const [isModalOpen, setIsModalOpen] = useState(false);    const closeModal = () => {

            <SubPageTitle title="Enrollments" />

        setIsModalOpen(false);

            <div className="flex flex-col items-center justify-center gap-10 m-10 mb-20">

                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">    const openModal = () => {    };

                    {content.request_title || 'Request an Enrollment'}

                </h2>        setIsModalOpen(true);

                <p className="text-sm text-black text-justify max-w-[600px]">

                    {content.request_description}    };    return (

                </p>

                <button onClick={openModal} className="bg-baby-blue hover:bg-white text-white transition-all border-2 border-solid border-white hover:border-baby-blue hover:text-baby-blue px-6 py-3 rounded-md font-fredoka font-semibold">        <main>

                    {content.button_text || 'Schedule a tour'}

                </button>    const closeModal = () => {            <SubPageTitle title="Enrollments" />

            </div>

        setIsModalOpen(false);

            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">

                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">    };            <div className="flex flex-col items-center justify-center gap-10 m-10 mb-20">

                    {content.offer_title || 'Offer'}

                </h2>                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Request an Enrollment</h2>

                <p className="text-sm text-black text-justify max-w-[600px]">

                    Enrollment offers are typically made when a spot becomes available for the days you have requested or similar days that we have available. Families not receiving an enrollment offer will secure a position on the waitlist. Immediate openings do come up and offers are made to families on the waitlist on a first to sign up, first to be served base.    return (                <p className="text-sm text-black text-justify max-w-[600px]">We understand that each child is unique and deserves an environment that fosters their individual growth. Our programs are designed to inspire creativity, encourage curiosity, and build a strong foundation for lifelong learning. We emphasize the importance of social, emotional, and cognitive development, ensuring that your child is well-prepared for their next steps in education and life.</p>

                </p>

            </div>        <main>                <button onClick={openModal} className="bg-baby-blue hover:bg-white text-white transition-all border-2 border-solid border-white hover:border-baby-blue hover:text-baby-blue px-6 py-3 rounded-md font-fredoka font-semibold">Schedule a tour</button>



            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">            <SubPageTitle title="Enrollments" />            </div>

                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Fee</h2>

                <p className="text-sm text-black text-justify max-w-[600px]">

                    When you make the decision to enroll your child at Little Angels you are required to pay a $200.00, non-refundable registration fee per child and a two (2) weeks security deposit equal to two (2) weeks of tuition. These fees must be paid in full prior to your child&apos;s starting otherwise care may be delayed until payment is paid in full. If there are multiple children enrolling, each child requires their own registration fee and two (2) weeks security deposit. (This will allow us to secure a spot for your child.)

                </p>            <div className="flex flex-col items-center justify-center gap-10 m-10 mb-20">            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">

                <p className="text-sm text-black text-justify max-w-[600px]">

                    <span className="font-bold">Note</span> - The registration fee is an annual fee and will be due each year on the anniversary of your child&apos;s start date.                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Offer</h2>

                </p>

            </div>                    {content.request_title || 'Request an Enrollment'}                <p className="text-sm text-black text-justify max-w-[600px]">



            <ModalForm isOpen={isModalOpen} onClose={closeModal} />                </h2>                    Enrollment offers are typically made when a spot becomes available for the days you have requested or similar days that we have available. Families not receiving an enrollment offer will secure a position on the waitlist. Immediate openings do come up and offers are made to families on the waitlist on a first to sign up, first to be served base.

        </main>

    );                <p className="text-sm text-black text-justify max-w-[600px]">                </p>

}

                    {content.request_description}            </div>

export const getServerSideProps: GetServerSideProps = async () => {

  try {                </p>

    const content = await GetContentUseCase.getContentBySection('enrollments');

                    <button onClick={openModal} className="bg-baby-blue hover:bg-white text-white transition-all border-2 border-solid border-white hover:border-baby-blue hover:text-baby-blue px-6 py-3 rounded-md font-fredoka font-semibold">            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">

    return {

      props: {                    {content.button_text || 'Schedule a tour'}                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Fee</h2>

        content,

      },                </button>                <p className="text-sm text-black text-justify max-w-[600px]">

    };

  } catch (error) {            </div>                    When you make the decision to enroll your child at Little Angels you are required to pay a $200.00, non-refundable registration fee per child and a two (2) weeks security deposit equal to two (2) weeks of tuition. These fees must be paid in full prior to your child’s starting otherwise care may be delayed until payment is paid in full. If there are multiple children enrolling, each child requires their own registration fee and two (2) weeks security deposit. (This will allow us to secure a spot for your child.)

    console.error('Error fetching enrollments content:', error);

    return {                </p>

      props: {

        content: {},            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">                <p className="text-sm text-black text-justify max-w-[600px]">

      },

    };                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">                    <span className="font-bold">Note</span> - The registration fee is an annual fee and will be due each year on the anniversary of your child’s start date.

  }

};                    {content.offer_title || 'Offer'}                </p>


                </h2>            </div>

                <p className="text-sm text-black text-justify max-w-[600px]">

                    Enrollment offers are typically made when a spot becomes available for the days you have requested or similar days that we have available. Families not receiving an enrollment offer will secure a position on the waitlist. Immediate openings do come up and offers are made to families on the waitlist on a first to sign up, first to be served base.            <ModalForm isOpen={isModalOpen} onClose={closeModal} />

                </p>        </main>

            </div>    );

}
            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">
                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Fee</h2>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    When you make the decision to enroll your child at Little Angels you are required to pay a $200.00, non-refundable registration fee per child and a two (2) weeks security deposit equal to two (2) weeks of tuition. These fees must be paid in full prior to your child's starting otherwise care may be delayed until payment is paid in full. If there are multiple children enrolling, each child requires their own registration fee and two (2) weeks security deposit. (This will allow us to secure a spot for your child.)
                </p>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    <span className="font-bold">Note</span> - The registration fee is an annual fee and will be due each year on the anniversary of your child's start date.
                </p>
            </div>

            <ModalForm isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const content = await GetContentUseCase.getContentBySection('enrollments');
    
    return {
      props: {
        content,
      },
    };
  } catch (error) {
    console.error('Error fetching enrollments content:', error);
    return {
      props: {
        content: {},
      },
    };
  }
};
