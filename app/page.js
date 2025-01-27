import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Image
        src="/background.jpg"
        alt="Green leaves background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
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
          <div className="mt-12 flex justify-center">
            <Image
              src="/healthy-food.png"
              alt="A variety of healthy, colorful foods"
              width={1000}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
