import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/index";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import GetUser from "@/actions/getUser/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Zap",
  description: "Um link, muitos whatsapps",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await GetUser();
  const userData = await GetUserProfile({ userId: data?.user?.id });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header userData={userData}/>
          <main className="pt-16 min-h-[calc(100svh-340px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
