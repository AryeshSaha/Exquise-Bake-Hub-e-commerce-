import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import HomeContent from "@/components/HomeContent";
import { useCart } from "@/context/useCart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toggleDropDown } = useCart();
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
      <Image
        src="/homewallpaper.jpg"
        alt="bg wallpaper"
        width={1920}
        height={720}
        onClick={() => toggleDropDown(false)}
      />
      <HomeContent />
    </>
  );
}
