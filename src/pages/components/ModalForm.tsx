import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  parentName: string;
  email: string;
  childName: string;
  childDateOfBirth: string;
  additionalChildName: string;
  additionalChildDateOfBirth: string;
  address: string;
  phone: string;
  observation: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childDateOfBirth: '',
    additionalChildName: '',
    additionalChildDateOfBirth: '',
    address: '',
    observation: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const message = `
      Phone: ${formData.phone}
      Child Name: ${formData.childName}
      Child Date of Birth: ${formData.childDateOfBirth}
      Additional Child Name: ${formData.additionalChildName}
      Additional Child Date of Birth: ${formData.additionalChildDateOfBirth}
      Address: ${formData.address}
      Observation: ${formData.observation}
    `;

    try {
      await axios.post('/api/contacts', {
        name: formData.parentName,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
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
        <h2 className="text-2xl font-schoolbell text-baby-blue mb-4">Childcare Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="parentName" className="block text-sm font-medium text-black">Parent&apos;s Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
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
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-black">Phone</label>
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
            <label htmlFor="childName" className="block text-sm font-medium text-black">Child&apos;s Name</label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="childDateOfBirth" className="block text-sm font-medium text-black">Child&apos;s Date of Birth</label>
            <input
              type="date"
              id="childDateOfBirth"
              name="childDateOfBirth"
              value={formData.childDateOfBirth}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="additionalChildName" className="block text-sm font-medium text-black">Additional Child&apos;s Name (Optional)</label>
            <input
              type="text"
              id="additionalChildName"
              name="additionalChildName"
              value={formData.additionalChildName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="additionalChildDateOfBirth" className="block text-sm font-medium text-black">Additional Child&apos;s Date of Birth (Optional)</label>
            <input
              type="date"
              id="additionalChildDateOfBirth"
              name="additionalChildDateOfBirth"
              value={formData.additionalChildDateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-baby-blue shadow-sm focus:border-baby-yellow focus:ring focus:ring-baby-yellow focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="observation" className="block text-sm font-medium text-black">Observation</label>
            <textarea
              id="observation"
              name="observation"
              value={formData.observation}
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
