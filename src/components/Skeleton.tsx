import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = false,
  count = 1
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`animate-pulse bg-gray-300 ${height} ${width} ${
        rounded ? 'rounded-full' : 'rounded'
      } ${className}`}
    />
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
};

export const ImageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`}>
    <div className="w-full h-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white rounded-lg p-4 space-y-3 ${className}`}>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 rounded"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    </div>
    <div className="flex space-x-2">
      <div className="h-8 bg-gray-300 rounded w-16"></div>
      <div className="h-8 bg-gray-300 rounded w-16"></div>
    </div>
  </div>
);

export const ReviewSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white rounded-lg p-4 space-y-3 ${className}`}>
    <div className="flex items-center space-x-3">
      <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      <div className="space-y-1">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 rounded"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
      <div className="h-3 bg-gray-300 rounded w-3/5"></div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4
}) => (
  <div className="animate-pulse">
    <div className="overflow-hidden shadow rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const GallerySkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 6,
  className = ''
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <ImageSkeleton key={index} className="aspect-video" />
    ))}
  </div>
);

export const HeroSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse space-y-4 ${className}`}>
    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
    </div>
    <div className="h-10 bg-gray-300 rounded w-32 mx-auto"></div>
  </div>
);

export default Skeleton;