'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Home.module.css';
import '@/app/globals.css';
import Scene from '@/components/scene/scene';
import scrollAnimation from '@/app/assets/scroll.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

export default function Home() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const loadTypewriter = async () => {
      const { default: Typewriter } = await import('typewriter-effect/dist/core');

      const tw1 = new Typewriter(line1Ref.current!, {
        delay: 65,
        loop: false,
      });

      tw1
        .typeString('I am Rizik Haddad')
        .pauseFor(1000)
        .callFunction(() => {
          document.querySelectorAll('.Typewriter__cursor').forEach(c => c.remove());

          const tw2 = new Typewriter(line2Ref.current!, {
            delay: 45,
            loop: false,
          });

          tw2
            .typeString('Welcome to my portfolio.')
            .callFunction(() => {
              document.querySelectorAll('.Typewriter__cursor').forEach(c => c.remove());
              setShowScene(true);
            })
            .start();
        })
        .start();
    };

    loadTypewriter();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (window.scrollY < 50) {
          setShowScrollHint(true);
        }
      }, 5000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className= {styles.welcomeHeader} ref={line1Ref} />
        <div className= {styles.welcomeParaghraph} ref={line2Ref} />
      </div>

      {showScene && (
        <div className={styles.scene}>
          <Scene />
        </div>
      )}

      {showScrollHint && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        >
          <Lottie animationData={scrollAnimation} loop autoplay lottieRef={lottieRef} />
        </div>
      )}
    </main>
  );
}
