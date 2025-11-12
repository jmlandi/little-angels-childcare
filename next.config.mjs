/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable worker threads to avoid SIGBUS errors in Docker
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;
