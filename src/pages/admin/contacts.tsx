import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface ContactsPageProps {
  contacts: Contact[];
}

const ContactsPage: React.FC<ContactsPageProps> = ({ contacts }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate this against a secure backend
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Authentication</h1>
        <form onSubmit={handlePasswordSubmit} className="max-w-sm">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="border p-2">{contact.name}</td>
              <td className="border p-2">{contact.email}</td>
              <td className="border p-2">{contact.message}</td>
              <td className="border p-2">{new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/contacts');
    const contacts = response.data.contacts;
    return { props: { contacts } };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return { props: { contacts: [] } };
  }
};

export default ContactsPage;
