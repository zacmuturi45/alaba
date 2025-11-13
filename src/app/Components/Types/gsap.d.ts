interface CommandMap {
  play: () => void;
  pause: () => void;
  restart: () => void;
  repeat: () => void;
  reverse: () => void;
}
type Command = keyof CommandMap;
