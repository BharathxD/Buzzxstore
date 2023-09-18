const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

const robots = () => {
    return {
        rules: [{ userAgent: '*' }],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl
    };
}

export default robots;