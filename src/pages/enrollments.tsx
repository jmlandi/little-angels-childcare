import SubPageTitle from "./components/SubPageTitle";
import ModalForm from "./components/ModalForm";
import { useState } from "react";
import { GetServerSideProps } from 'next';
import { GetContentUseCase } from '@application/useCases/GetContentUseCase';

interface EnrollmentsProps {
    content: Record<string, string>;
}

export default function Enrollments({ content }: EnrollmentsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main>
            <SubPageTitle title="Enrollments" />

            <div className="flex flex-col items-center justify-center gap-10 m-10 mb-20">
                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">
                    {content.request_title || 'Request an Enrollment'}
                </h2>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    {content.request_description || 'We understand that each child is unique and deserves an environment that fosters their individual growth. Our programs are designed to inspire creativity, encourage curiosity, and build a strong foundation for lifelong learning. We emphasize the importance of social, emotional, and cognitive development, ensuring that your child is well-prepared for their next steps in education and life.'}
                </p>
                <button onClick={openModal} className="bg-baby-blue hover:bg-white text-white transition-all border-2 border-solid border-white hover:border-baby-blue hover:text-baby-blue px-6 py-3 rounded-md font-fredoka font-semibold">
                    {content.button_text || 'Schedule a tour'}
                </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">
                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">
                    {content.offer_title || 'Offer'}
                </h2>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    Enrollment offers are typically made when a spot becomes available for the days you have requested or similar days that we have available. Families not receiving an enrollment offer will secure a position on the waitlist. Immediate openings do come up and offers are made to families on the waitlist on a first to sign up, first to be served base.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 m-5 mb-20">
                <h2 className="text-4xl font-fredoka font-semibold text-baby-blue text-center">Fee</h2>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    When you make the decision to enroll your child at Little Angels you are required to pay a $200.00, non-refundable registration fee per child and a two (2) weeks security deposit equal to two (2) weeks of tuition. These fees must be paid in full prior to your child&apos;s starting otherwise care may be delayed until payment is paid in full. If there are multiple children enrolling, each child requires their own registration fee and two (2) weeks security deposit. (This will allow us to secure a spot for your child.)
                </p>
                <p className="text-sm text-black text-justify max-w-[600px]">
                    <span className="font-bold">Note</span> - The registration fee is an annual fee and will be due each year on the anniversary of your child&apos;s start date.
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
