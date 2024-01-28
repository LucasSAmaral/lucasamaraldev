/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { styledComponents: { ssr: true, transpileTemplateLiterals: true } }
}

module.exports = nextConfig
