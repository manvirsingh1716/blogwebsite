import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/navbar";
import { getNavigationTree } from "@/lib/navigation";

const geist = Geist({
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
      <body className={geist.className}>
        <Navbar navigation={navigation} />
        {children}
      </body>
    </html>
  );
}
