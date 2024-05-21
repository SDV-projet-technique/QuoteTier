import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center">
      <Image
        src="/images/404.png"
        className="mb-5 rounded-full"
        alt="404"
        width={200}
        height={200}
      />
      <div className="text-center text-3xl font-bold">
        <h2>404 - Page not Found</h2>
        <Link href="/" className="hover:underline">
          Click here to return Home
        </Link>
      </div>
    </main>
  );
}
