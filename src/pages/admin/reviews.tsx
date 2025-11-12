import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { readCookie, verifyToken } from '@infrastructure/auth';
import { Star, Eye, EyeOff, Edit2, Trash2, Plus, X, Save } from 'lucide-react';

interface Review {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
  visible: boolean;
}

const ReviewsPage: React.FC = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState({
    author_name: '',
    rating: 5,
    text: '',
    visible: true,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
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

  const toggleVisibility = async (id: number, currentVisible: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible }),
      });

      if (res.ok) {
        fetchReviews();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update visibility');
      }
    } catch (error) {
      console.error('Toggle visibility error:', error);
      alert('Failed to update visibility');
    } finally {
      setLoading(false);
    }
  };



  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewReview({ author_name: '', rating: 5, text: '', visible: true });
        fetchReviews();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add review');
      }
    } catch (error) {
      console.error('Add error:', error);
      alert('Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?id=${editingReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: editingReview.author_name,
          rating: editingReview.rating,
          text: editingReview.text,
          visible: editingReview.visible,
        }),
      });

      if (res.ok) {
        setShowEditModal(false);
        setEditingReview(null);
        fetchReviews();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update review');
      }
    } catch (error) {
      console.error('Edit error:', error);
      alert('Failed to update review');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchReviews();
      } else {
        const error = await res.json();
        alert(error.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    } finally {
      setLoading(false);
    }
  };



  const openEditModal = (review: Review) => {
    setEditingReview({ ...review });
    setShowEditModal(true);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

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
              onClick={() => router.push('/admin/content')}
              className="bg-white text-baby-blue p-2 rounded"
              style={{ backgroundColor: '#ffffff', color: '#81CAEA' }}
            >
              Content
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white p-2 rounded flex items-center gap-2"
            style={{ backgroundColor: '#10b981', color: '#ffffff' }}
          >
            <Plus size={16} />
            Add Review
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center">Reviews Management</h1>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-lg p-4 text-baby-blue border-2 ${
                review.visible ? 'border-green-200' : 'border-red-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{review.author_name}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(review.id, review.visible)}
                    className={`p-1 rounded text-xs flex items-center gap-1 ${
                      review.visible
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                    style={{ 
                      backgroundColor: review.visible ? '#10b981' : '#ef4444', 
                      color: '#ffffff' 
                    }}
                  >
                    {review.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                    {review.visible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-4">
                {review.text}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(review)}
                    className="bg-blue-500 text-white p-1 rounded flex items-center gap-1"
                    style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                  >
                    <Edit2 size={10} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white p-1 rounded flex items-center gap-1"
                    style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                  >
                    <Trash2 size={10} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && !loading && (
          <div className="text-center text-white/70">
            No reviews found. Click &ldquo;Add Review&rdquo; to get started.
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-baby-blue rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Add New Review</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Author Name *</label>
                <input
                  type="text"
                  value={newReview.author_name}
                  onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating *</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Review Text</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full p-2 border rounded h-24 resize-none"
                  placeholder="Write the review text..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={newReview.visible}
                  onChange={(e) => setNewReview({ ...newReview, visible: e.target.checked })}
                />
                <label htmlFor="visible" className="text-sm">
                  Visible on website
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                  style={{ backgroundColor: '#d1d5db', color: '#374151' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:opacity-50 font-medium"
                  style={{ backgroundColor: loading ? '#3b82f6' : '#3b82f6', color: '#ffffff' }}
                >
                  {loading ? 'Adding...' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-baby-blue rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Review</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Author Name *</label>
                <input
                  type="text"
                  value={editingReview.author_name}
                  onChange={(e) => setEditingReview({ ...editingReview, author_name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating *</label>
                <select
                  value={editingReview.rating}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Review Text</label>
                <textarea
                  value={editingReview.text}
                  onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                  className="w-full p-2 border rounded h-24 resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editVisible"
                  checked={editingReview.visible}
                  onChange={(e) => setEditingReview({ ...editingReview, visible: e.target.checked })}
                />
                <label htmlFor="editVisible" className="text-sm">
                  Visible on website
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                  style={{ backgroundColor: '#d1d5db', color: '#374151' }}
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

export default ReviewsPage;