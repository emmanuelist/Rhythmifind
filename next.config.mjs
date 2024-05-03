/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		//domains: ["ypoppodeangspytycuhz.supabase.co"]
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ypoppodeangspytycuhz.supabase.co',
				pathname: '/**',
			},
		],
	}
};

export default nextConfig;
