import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>
        Scale Your Business
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        The leading B2B marketplace for enterprise solutions. 
        Connect, trade, and grow with confidence.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </div>
    </div>
  );
};

export default Home;
