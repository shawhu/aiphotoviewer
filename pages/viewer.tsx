import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { getAllImages } from "../lib/ImagesLocal";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const allImageData: { id: string; fullpath: string }[] = getAllImages();

  return {
    props: {
      allImageData,
    },
  };
}

export default function Home({ allImageData }: any) {
  const [imgIndex, setimgIndex] = useState(0);

  useEffect(() => {
    setimgIndex(Math.floor(Math.random() * allImageData.length));
  }, []);

  function handleRefresh() {
    console.log("imgIndex:" + imgIndex);
    console.log("data len:" + allImageData.length);
    let ii = Math.floor(Math.random() * allImageData.length);
    console.log("setting index to :" + ii);
    setimgIndex(ii);
  }
  function handleDoubleClick() {
    console.log("double clicked");
    let ii = Math.floor(Math.random() * allImageData.length);
    setimgIndex(ii);
  }
  function s3Loader(key: string) {
    return `https://ai-tokyo-001.s3.ap-northeast-1.amazonaws.com/testimgs/${key}`;
  }

  return (
    <main className="bg-gray-500 min-h-screen flex flex-col justify-center">
      <Image
        loader={({ src, width, quality }) => {
          return s3Loader(allImageData[imgIndex].id);
        }}
        src={allImageData[imgIndex].id}
        alt={allImageData[imgIndex].id}
        width={512}
        height={1024}
        onClick={handleRefresh}
        priority={true}
        hidden={false}
      />
      <div className="bg-red-700/50 absolute top-0 left-0 right-0 text-white text-xs">
        debug: {imgIndex}/{allImageData.length}{" "}
        {s3Loader(allImageData[imgIndex].id)}
      </div>
      {/* <div className="bg-red-700/50 absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="p-5 text-white" onClick={handleRefresh}>
          Refresh
        </div>
        <div className="p-5 text-white">Heart</div>
      </div> */}
      {allImageData.map((img: { id: string; fullpath: string }) => (
        <link rel="preload" as="image" key={img.id} href={s3Loader(img.id)} />
      ))}
    </main>
  );
}
