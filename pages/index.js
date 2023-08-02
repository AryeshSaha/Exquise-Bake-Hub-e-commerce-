import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import HomeContent from "@/components/HomeContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ExquiseBakeHub.com - Home Baked Exquisite Flavors</title>
        <meta
          name="description"
          content="ExquiseBakeHub.com - Home Baked Exquisite Flavors"
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Image src="/home.jpg" alt="bg wallpaper" width={1920} height={720} />
      <HomeContent />
    </>
  );
}
