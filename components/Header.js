import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#19381f]">
            GreenEats
          </Link>
          <div className="space-x-4">
            <Link
              href="/vendor/login"
              className="text-[#19381f] hover:text-[#19381f]/80"
            >
              Vendor Login
            </Link>
            <Link
              href="/menu"
              className="bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
            >
              Order Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
