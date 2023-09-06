// import "@styles/globals.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
export const metadata = {
  title: "世界盡頭深夜酒館",
  description: "一個分享「太好了不能只有我知道」的Podcast",
  icons: {
    icon: "/favicon.ico",
  },
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="zh-tw">
      <body>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Navbar />
        <main className="App">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Rootlayout;
