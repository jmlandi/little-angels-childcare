import React, { useState, useEffect } from 'react';
import{ useRouter } from 'next/router';
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
      if (url != router.asPath) {
        setLoading(true);
      }
    }
    const handleComplete = (url: string) => {
      setLoading(false);
    }
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  }, [router])


  return (
    <>
      { loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <Header></Header>
          {children}
          <Footer></Footer>
        </>
      )}

    </>
  );
};

export default Layout;
