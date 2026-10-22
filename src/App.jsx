import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <main>
      <Hero />
      {/* Content after the hero so the page continues to scroll naturally */}
      <section className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
        <p className="max-w-xl text-center text-2xl text-neutral-400">
          Scroll back up to replay the animation — it is tied to scroll position, not time.
        </p>
      </section>
    </main>
  );
}
