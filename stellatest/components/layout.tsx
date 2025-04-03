import Head from "next/head";
import { ReactNode } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "My App" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Navbar /> */}
      <main className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
