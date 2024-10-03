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

const ContactsPage: React.FC<ContactsPageProps> = ({ contacts: initialContacts }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contacts, setContacts] = useState(initialContacts);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate this against a secure backend
    if (password === 'LittleAngelsAdmin123#') {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error refreshing contacts:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-baby-blue text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Authentication</h1>
        <form onSubmit={handlePasswordSubmit} className="max-w-sm w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded text-black"
          />
          <div className="flex justify-center">
            <button type="submit" className="bg-white text-baby-blue p-2 rounded">
              Submit
            </button>
          </div>
          {errorMessage && <p className="text-red-300 mt-2 text-center">{errorMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-auto bg-baby-blue text-white">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="w-full flex justify-between mb-4">
          <button onClick={handleLogout} className="bg-white text-baby-blue p-2 rounded">
            Logout
          </button>
          <button onClick={handleRefresh} className="bg-white text-baby-blue p-2 rounded">
            Refresh
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Contacts</h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white text-baby-blue">
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
      </div>
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
