import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { readCookie, verifyToken } from '@infrastructure/auth';
import { Edit2, Save, X } from 'lucide-react';

interface SiteContent {
  id: number;
  section: string;
  key: string;
  value: string;
  updated_at: string;
}

const ContentPage: React.FC = () => {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');


  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data.content || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  const startEdit = (item: SiteContent) => {
    setEditingId(item.id);
    setEditValue(item.value);
  };

  const saveEdit = async (item: SiteContent) => {
    setLoading(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: item.section,
          key: item.key,
          value: editValue,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        setEditValue('');
        fetchContent();
      } else {
        const error = await res.json();
        alert(error.error || 'Update failed');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };



  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

  return (
    <div className="w-screen h-screen overflow-auto bg-baby-blue text-white">
      <div className="container mx-auto p-4 flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="bg-white text-baby-blue p-2 rounded"
              style={{ backgroundColor: '#ffffff', color: '#81CAEA' }}
            >
              Logout
            </button>
            <button
              onClick={() => router.push('/admin/contacts')}
              className="bg-white text-baby-blue p-2 rounded"
              style={{ backgroundColor: '#ffffff', color: '#81CAEA' }}
            >
              Contacts
            </button>
            <button
              onClick={() => router.push('/admin/images')}
              className="bg-white text-baby-blue p-2 rounded"
              style={{ backgroundColor: '#ffffff', color: '#81CAEA' }}
            >
              Images
            </button>
            <button
              onClick={() => router.push('/admin/reviews')}
              className="bg-white text-baby-blue p-2 rounded"
              style={{ backgroundColor: '#ffffff', color: '#81CAEA' }}
            >
              Reviews
            </button>
          </div>


        </div>

        <h1 className="text-2xl font-bold text-center">Edit Website Content</h1>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(groupedContent).map(([section, items]) => (
            <div key={section} className="bg-white rounded-lg p-4 text-baby-blue">
              <h2 className="text-xl font-semibold mb-4 capitalize text-center bg-baby-blue text-white p-2 rounded">
                {section}
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm bg-gray-100 px-2 py-1 rounded">
                          {item.key}
                        </span>
                        <span className="text-xs text-gray-500">
                          Updated: {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {editingId === item.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(item)}
                              className="bg-green-500 text-white p-1 rounded text-xs flex items-center gap-1"
                              disabled={loading}
                              style={{ backgroundColor: '#10b981', color: '#ffffff' }}
                            >
                              <Save size={12} />
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 text-white p-1 rounded text-xs flex items-center gap-1"
                              style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                            >
                              <X size={12} />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(item)}
                              className="bg-blue-500 text-white p-1 rounded text-xs flex items-center gap-1"
                              style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                            >
                              <Edit2 size={12} />
                              Edit
                            </button>

                          </>
                        )}
                      </div>
                    </div>
                    {editingId === item.id ? (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full p-2 border rounded h-24 resize-none"
                        placeholder="Enter content..."
                      />
                    ) : (
                      <div className="bg-gray-50 p-2 rounded text-sm whitespace-pre-wrap">
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {content.length === 0 && !loading && (
          <div className="text-center text-white/70">
            No content found. Please check your database connection.
          </div>
        )}
      </div>

      
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return {
      redirect: { destination: '/admin/login', permanent: false },
    };
  }
  return { props: {} };
};

export default ContentPage;