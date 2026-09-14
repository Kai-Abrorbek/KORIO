export function BootScreen({ message }: { message: string }) {
  return (
    <main className="app-viewport boot-screen" aria-live="polite">
      <div className="brand-mark" aria-hidden="true">
        K
      </div>
      <div className="loading-ring" aria-hidden="true" />
      <p>{message}</p>
    </main>
  );
}
