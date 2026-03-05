import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title: string
    description: string
    image?: string
    url?: string
    type?: string
}

const SEOHead = ({
    title,
    description,
    image = 'https://manuastro.com/og-image.jpg',
    url = 'https://manuastro.com',
    type = 'website'
}: SEOProps) => (
    <Helmet>
        <title>{title} | ManuAstro — Vedic Sciences</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Er. Manu Gupta" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${title} | ManuAstro`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="ManuAstro" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
    </Helmet>
)

export default SEOHead
