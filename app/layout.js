import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "../components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GreenEats",
  description: "Order delicious food from local vendors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-white text-gray-900">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
