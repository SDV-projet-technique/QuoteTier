import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested page</p>
        <Link href="/">Return Home</Link>
      </div>
    </main>
  );
}
