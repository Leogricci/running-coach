interface Props {
  isRunning: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
  onStop: () => void;
}

export function TimerControls({ isRunning, onPlayPause, onSkip, onStop }: Props) {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Stop */}
      <button
        onClick={onStop}
        className="flex h-14 w-14 items-center justify-center rounded-full transition-opacity active:opacity-60"
        style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
        aria-label="Stop"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="4" y="4" width="12" height="12" rx="2" />
        </svg>
      </button>

      {/* Play / Pause */}
      <button
        onClick={onPlayPause}
        className="flex h-20 w-20 items-center justify-center rounded-full transition-opacity active:opacity-70"
        style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
        aria-label={isRunning ? "Pause" : "Play"}
      >
        {isRunning ? (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
            <rect x="6" y="5" width="4.5" height="16" rx="1.5" />
            <rect x="15.5" y="5" width="4.5" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
            <path d="M8 5l14 8-14 8V5z" />
          </svg>
        )}
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="flex h-14 w-14 items-center justify-center rounded-full transition-opacity active:opacity-60"
        style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
        aria-label="Skip"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4l8 6-8 6V4zM15 4h2v12h-2V4z" />
        </svg>
      </button>
    </div>
  );
}
