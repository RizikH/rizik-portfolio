// src/app/types/TypeWriter.d.ts
declare module 'typewriter-effect/dist/core' {
  interface TypewriterOptions {
    delay?: number;
    loop?: boolean;
  }

  class Typewriter {
    constructor(container: Element, options?: TypewriterOptions);
    typeString(text: string): this;
    pauseFor(duration: number): this;
    callFunction(callback: () => void): this;
    start(): void;
  }

  export default Typewriter;
}
