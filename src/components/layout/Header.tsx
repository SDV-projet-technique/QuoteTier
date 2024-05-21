import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-100 p-4">
      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="ml-2 text-3xl font-bold">Quote Tier</h1>
      </Link>
      <nav>
        <ul className="flex space-x-4 text-xl font-bold">
          <li>
            <Link href="/" className="hover:underline">
              Quote List
            </Link>
          </li>
          <li>
            <a href="/add" className="hover:underline">
              Add Quote
            </a>
          </li>
          <li>
            <a href="/review" className="hover:underline">
              Approve Quote
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
