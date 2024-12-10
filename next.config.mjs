import createNextIntlPlugin from 'next-intl/plugin';

const withNextCreateIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextCreateIntl(nextConfig);
