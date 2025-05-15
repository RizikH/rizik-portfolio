'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/Home.module.css';
import '@/app/globals.css';
import { useRouter } from 'next/navigation';


export default function Home() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

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
              const buttonContainer = document.querySelector(`.${styles.buttonContainer}`);
              if (buttonContainer) {
                buttonContainer.classList.remove(styles.hidden);
                buttonContainer.classList.add(styles.visible);
              }
            })
            .start();
        })
        .start();
    };

    loadTypewriter();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.welcomeHeader} ref={line1Ref} />
        <div className={styles.welcomeParaghraph} ref={line2Ref} />
      </div>
      <div className={styles.buttonContainer + ' ' + styles.hidden}>
        <button className={styles.button} onClick={() => router.push('/cube')}>
          Continue
        </button>
      </div>
    </main>
  );
}
