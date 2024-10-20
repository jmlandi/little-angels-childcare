import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  parentFirstName: string;
  parentLastName: string;
  childFirstName: string;
  childLastName: string;
  childDateOfBirth: string;
  secondChildFirstName: string;
  secondChildLastName: string;
  secondChildDateOfBirth: string;
  streetAddress1: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  phoneType: string;
  email: string;
  comments: string;
  careDate: string;
  interestReason: string;
  referralSource: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    parentFirstName: '',
    parentLastName: '',
    childFirstName: '',
    childLastName: '',
    childDateOfBirth: '',
    secondChildFirstName: '',
    secondChildLastName: '',
    secondChildDateOfBirth: '',
    streetAddress1: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    phoneType: '',
    email: '',
    comments: '',
    careDate: '',
    interestReason: '',
    referralSource: '',
  });

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firstInputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `
      Phone: ${formData.phone} (${formData.phoneType})
      Parent Name: ${formData.parentFirstName} ${formData.parentLastName}
      Child Name: ${formData.childFirstName} ${formData.childLastName}
      Child Date of Birth: ${formData.childDateOfBirth}
      Additional Child Name: ${formData.secondChildFirstName} ${formData.secondChildLastName}
      Additional Child Date of Birth: ${formData.secondChildDateOfBirth}
      Address: ${formData.streetAddress1}, ${formData.city}, ${formData.state}, ${formData.zipCode}
      Care Date: ${formData.careDate}
      Referral Source: ${formData.referralSource}
      Interest Reason: ${formData.interestReason}
      Comments: ${formData.comments}
    `;

    try {
      await axios.post('/api/contacts', {
        name: `${formData.parentFirstName} ${formData.parentLastName}`,
        email: formData.email,
        message: message,
      });
      onClose();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-md w-full my-8 mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-baby-blue hover:text-black"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-fredoka font-semibold text-baby-blue mb-4">Childcare Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Parent&apos;s information:</h3>
          <div className="mb-4">
            <label htmlFor="parentFirstName" className="block text-sm font-medium text-black">Parent&apos;s First Name*</label>
            <input
              type="text"
              id="parentFirstName"
              name="parentFirstName"
              ref={firstInputRef}
              value={formData.parentFirstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="parentLastName" className="block text-sm font-medium text-black">Parent&apos;s Last Name*</label>
            <input
              type="text"
              id="parentLastName"
              name="parentLastName"
              value={formData.parentLastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          
          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Child&apos;s information:</h3>
          <div className="mb-4">
            <label htmlFor="childFirstName" className="block text-sm font-medium text-black">Child&apos;s First Name*</label>
            <input
              type="text"
              id="childFirstName"
              name="childFirstName"
              value={formData.childFirstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="childLastName" className="block text-sm font-medium text-black">Child&apos;s Last Name*</label>
            <input
              type="text"
              id="childLastName"
              name="childLastName"
              value={formData.childLastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="childDateOfBirth" className="block text-sm font-medium text-black">Child&apos;s Date of Birth (M/D/YYYY)</label>
            <input
              type="date"
              id="childDateOfBirth"
              name="childDateOfBirth"
              value={formData.childDateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          
          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Address:</h3>
          <div className="mb-4">
            <label htmlFor="streetAddress1" className="block text-sm font-medium text-black">Street Address 1*</label>
            <input
              type="text"
              id="streetAddress1"
              name="streetAddress1"
              value={formData.streetAddress1}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-black">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-black">State*</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-sm font-medium text-black">Zip Code*</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          
          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Additional children:</h3>
          <div className="mb-4">
            <label htmlFor="secondChildFirstName" className="block text-sm font-medium text-black">Second Child&apos;s First Name</label>
            <input
              type="text"
              id="secondChildFirstName"
              name="secondChildFirstName"
              value={formData.secondChildFirstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secondChildLastName" className="block text-sm font-medium text-black">Second Child&apos;s Last Name</label>
            <input
              type="text"
              id="secondChildLastName"
              name="secondChildLastName"
              value={formData.secondChildLastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secondChildDateOfBirth" className="block text-sm font-medium text-black">Second Child&apos;s Date of Birth (M/D/YYYY)</label>
            <input
              type="date"
              id="secondChildDateOfBirth"
              name="secondChildDateOfBirth"
              value={formData.secondChildDateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          
          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Contact Information:</h3>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-black">Phone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneType" className="block text-sm font-medium text-black">Phone Type</label>
            <select
              id="phoneType"
              name="phoneType"
              value={formData.phoneType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            >
              <option value="">Select Type</option>
              <option value="Primary Phone">Primary Phone</option>
              <option value="Work Phone">Work Phone</option>
              <option value="Mobile Phone">Mobile Phone</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>

          <h3 className="mt-8 mb-3 text-lg font-semibold font-fredoka">Comments:</h3>
          <div className="mb-4">
            <label htmlFor="referralSource" className="block text-sm font-medium text-black">How did you hear about us?</label>
            <input
              type="text"
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="careDate" className="block text-sm font-medium text-black">Date from which care is required</label>
            <input
              type="date"
              id="careDate"
              name="careDate"
              value={formData.careDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interestReason" className="block text-sm font-medium text-black">Why are you interested to enroll your child at Little Angels?</label>
            <textarea
              id="interestReason"
              name="interestReason"
              value={formData.interestReason}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-black bg-baby-cyan rounded-md hover:bg-baby-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-baby-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-baby-blue rounded-md hover:bg-baby-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-baby-blue"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
