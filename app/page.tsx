import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 justify-center p-24">
      <div className="text-5xl font-bold">Wiki Starter</div>
      <Link href="/wiki" className="font-bold rounded-lg p-4 border bg-cyan-600 text-white">
        Go to Wiki {" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </Link>
    </main>
  );
}
