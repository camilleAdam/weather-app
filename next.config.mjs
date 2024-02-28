/** @type {import('next').NextConfig} */
const nextConfig = {};

const imagesConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'openweathermap.org',
        },
      ],
    },
  };
  
export default imagesConfig;
