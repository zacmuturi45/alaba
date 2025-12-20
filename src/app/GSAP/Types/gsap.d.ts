interface CommandMap {
  play: () => void;
  pause: () => void;
  restart: () => void;
  repeat: () => void;
  reverse: () => void;
}
type Command = keyof CommandMap;

type StaggerConfig = {
  each: number;
  from?: "start" | "center" | "end" | "edges" | "random" | number;
  ease?: string;
  amount?: number;
  repeat?: number;
  yoyo?: boolean;
  // ... other stagger properties
};

interface PreloaderProps {
  onComplete?: () => void;
}

type AnimationContextType = {
  isReady: boolean;
  hasAnimated: boolean;
  setHasAnimated: (value: boolean) => void;
};
