import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#19381f] mb-4">
            Welcome to GreenEats
          </h1>
          <p className="text-xl mb-8">
            Order delicious food from local vendors, delivered right to your
            doorstep.
          </p>
          <Link
            href="/menu"
            className="bg-[#19381f] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#19381f]/80"
          >
            View Menu
          </Link>
        </div>
      </main>
    </div>
  );
}
