'use client';

import React, { useEffect, useRef, useState } from 'react';
import MyScene from '@/components/cube/scene';
import styles from '@/styles/Cube.module.css';
import scrollAnimation from '@/app/assets/scroll.json';
import dynamic from 'next/dynamic';
import '@/app/globals.css';
import Lenis from '@studio-freight/lenis';

const Lottie = dynamic(() => import('lottie-react').then(mod => mod.default), { ssr: false });
import type { LottieRefCurrentProps } from 'lottie-react';

function App() {
  const [showScene, setShowScene] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (window.scrollY < 30) {
          setShowScrollHint(true);
        }
      }, 5000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <MyScene />
      {showScrollHint && (
        <div className={styles.scrollHint}>
          <Lottie
            lottieRef={lottieRef}
            animationData={scrollAnimation}
            loop
            autoplay
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
    </main>
  );
}

export default App;
