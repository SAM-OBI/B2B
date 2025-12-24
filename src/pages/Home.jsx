import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';

const Home = () => {
    const navigate = useNavigate();

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://b2b-market.com';
    const siteName = import.meta.env.VITE_SITE_NAME || 'B2B Marketplace';

    const siteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "url": siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <SEO 
                title="Home" 
                description="The leading B2B marketplace for connecting industrial suppliers with buyers."
                schema={siteSchema} 
            />
            <section style={{ 
                textAlign: 'center', 
                padding: '4rem 1rem', 
                background: 'linear-gradient(to right, var(--surface), var(--background))',
                borderRadius: 'var(--radius-lg)',
                margin: '2rem 0',
                border: '1px solid var(--border)'
            }}>
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Connect. Trade. Grow.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        The premier marketplace for industrial buyers and suppliers. Streamline your procurement process today.
                    </p>
                </header>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={() => navigate('/register')} size="lg" variant="primary">
                        Get Started
                    </Button>
                    <Button onClick={() => navigate('/login')} size="lg" variant="outline">
                        Login
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Home;
