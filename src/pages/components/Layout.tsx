import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import Head from next/head
import Header from './Header';
import Footer from './Footer';
import { ClipLoader } from 'react-spinners';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = (url: string) => {
      setLoading(false);
    };
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  const isAdminPage = router.pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }
  
  return (
    <>
      {/* Add Head component with favicon link */}
      <Head>
        <link rel="icon" href="/favicon.ico" /> {/* Update the href if your favicon has a different name or path */}
        {/* Add Google Tag Manager script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F7FNZKV7J1"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F7FNZKV7J1');
          `}
        </script>
      </Head>
      
      { loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}

    </>
  );
};

export default Layout;
