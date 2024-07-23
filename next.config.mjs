/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.vox-cdn.com", "another-allowed-domain.com"], // tambahkan domain lain jika diperlukan
  },
};

export default nextConfig;
