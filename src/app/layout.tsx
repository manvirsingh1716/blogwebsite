import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/navbar";
import { getNavigationTree } from "@/lib/navigation";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "99Notes",
  description: "Your learning companion",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigationTree();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar navigation={navigation} />
        {children}
      </body>
    </html>
  );
}
