export const playSound = (type) => {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const context = new AudioCtx();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  switch (type) {
    case "success":
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      break;
    case "error":
      oscillator.frequency.setValueAtTime(220, context.currentTime);
      break;
    default:
      oscillator.frequency.setValueAtTime(440, context.currentTime);
  }

  gain.gain.setValueAtTime(0.05, context.currentTime);
  oscillator.type = "sine";

  oscillator.start();
  oscillator.stop(context.currentTime + 0.25);
  oscillator.onended = () => {
    context.close();
  };
};
