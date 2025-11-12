import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { readCookie, verifyToken } from '@infrastructure/auth';
import { Edit2, Eye, X } from 'lucide-react';

interface Image {
  id: string;
  name: string;
  url: string;
  alt_text: string | null;
  created_at: string;
  updated_at: string;
}

const ImagesPage: React.FC = () => {
  const router = useRouter();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    altText: '',
    file: null as File | null,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', uploadForm.file);
      formData.append('name', uploadForm.name || uploadForm.file.name);
      formData.append('altText', uploadForm.altText);

      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setShowUploadModal(false);
        setUploadForm({ name: '', altText: '', file: null });
        fetchImages();
      } else {
        const error = await res.json();
        alert(error.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', editingImage.name);
      formData.append('altText', editingImage.alt_text || '');

      const res = await fetch(`/api/images?id=${editingImage.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setShowEditModal(false);
        setEditingImage(null);
        fetchImages();
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



  const openEditModal = (image: Image) => {
    setEditingImage({ ...image });
    setShowEditModal(true);
  };

  return (
    <div className="w-screen h-screen overflow-auto bg-baby-blue text-white">
      <div className="container mx-auto p-4 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Logout
            </button>
            <button
              onClick={() => router.push('/admin/contacts')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Contacts
            </button>
            <button
              onClick={() => router.push('/admin/content')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Content
            </button>
            <button
              onClick={() => router.push('/admin/reviews')}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Reviews
            </button>
          </div>


        </div>

        <h1 className="text-2xl font-bold text-center">Edit Images</h1>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg p-4 text-baby-blue">
              <div className="aspect-video bg-gray-200 rounded mb-2 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt_text || image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1 truncate">{image.name}</h3>
              {image.alt_text && (
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{image.alt_text}</p>
              )}
              <div className="text-xs text-gray-500 mb-3">
                {new Date(image.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(image.url, '_blank')}
                  className="flex-1 bg-blue-500 text-white p-1 rounded text-xs flex items-center justify-center gap-1"
                >
                  <Eye size={12} style={{ color: 'white !important' }} />
                  View
                </button>
                <button
                  onClick={() => openEditModal(image)}
                  className="flex-1 bg-yellow-500 text-white p-1 rounded text-xs flex items-center justify-center gap-1"
                >
                  <Edit2 size={12} style={{ color: 'white !important' }} />
                  Edit
                </button>

              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && !loading && (
          <div className="text-center text-white/70">
            No images available. Contact your administrator to add images.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-baby-blue rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upload New Image</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} style={{ color: '#6b7280 !important' }} />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Leave empty to use filename"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alt Text</label>
                <textarea
                  value={uploadForm.altText}
                  onChange={(e) => setUploadForm({ ...uploadForm, altText: e.target.value })}
                  placeholder="Describe the image for accessibility"
                  className="w-full p-2 border rounded h-20 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadForm.file || loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50 font-medium"
                  style={{ backgroundColor: loading ? '#3b82f6' : '#3b82f6', color: '#ffffff' }}
                >
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-baby-blue rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Image</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} style={{ color: '#6b7280 !important' }} />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="aspect-video bg-gray-200 rounded mb-4 overflow-hidden">
                <img
                  src={editingImage.url}
                  alt={editingImage.alt_text || editingImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={editingImage.name}
                  onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alt Text</label>
                <textarea
                  value={editingImage.alt_text || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, alt_text: e.target.value })}
                  placeholder="Describe the image for accessibility"
                  className="w-full p-2 border rounded h-20 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50 font-medium"
                  style={{ backgroundColor: loading ? '#3b82f6' : '#3b82f6', color: '#ffffff' }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

export default ImagesPage;