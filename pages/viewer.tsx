import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { listS3Bucket } from "../lib/S3ImagePreloader";
import { useState, useEffect } from "react";
import * as ga from "../lib/ga";

export async function getServerSideProps() {
  const s3data: { key: string; size: number }[] = await listS3Bucket();
  const s3urlprefix: string = `https://ai-tokyo-001.s3.ap-northeast-1.amazonaws.com/`;
  return {
    props: { s3data, s3urlprefix }, // will be passed to the page component as props
  };
}
export default function Home({ s3data, s3urlprefix }: any) {
  const [imgIndex, setimgIndex] = useState(0);
  const [timerToken, settimerToken] = useState<number>();

  useEffect(() => {
    setimgIndex(0);
  }, []);

  function handleRefresh() {
    //stop auto timer
    window.clearInterval(timerToken);
    setimgIndex(imgIndex - 2);
    ga.event({
      action: "refreshimage",
      params: {
        key: "asdfadsf.jpg",
      },
    });
    console.log("imgIndex:" + imgIndex);
    console.log("data len:" + s3data.length);
    if (imgIndex == s3data.length - 1) {
      setimgIndex(0);
    } else {
      setimgIndex(imgIndex + 1);
    }

    console.log("setting index to :" + imgIndex);
  }
  function handleDoubleClick() {
    AutoRefresh();
  }
  function AutoRefresh() {
    console.log("double clicked start timer testing");
    let interval = 200; //smaller means faster
    var token = window.setInterval(timerHandler, interval);
    settimerToken(token);
    let i = 0;
    function timerHandler() {
      console.log("timer trigged");
      i++;
      setimgIndex(imgIndex + i);
    }
  }

  return (
    <main className="bg-gray-500 min-h-screen flex flex-col justify-center">
      <Image
        className="place-self-center "
        loader={({ src, width, quality }) => {
          return s3urlprefix + s3data[imgIndex].key;
        }}
        src={s3data[imgIndex].key}
        alt={s3data[imgIndex].key}
        width={512}
        height={1024}
        onClick={handleRefresh}
        onDoubleClick={handleDoubleClick}
        priority={true}
        hidden={false}
      />
      {/*this is the debugger on the top*/}
      <div className="bg-stone-700/50 absolute top-0 left-0 right-0 text-white text-[8px]">
        debug: {imgIndex + 1}/{s3data.length} {s3data[imgIndex].key}
      </div>
      {/*this is tab on the bottom*/}
      <div className="bg-stone-700/50 absolute bottom-0 left-0 right-0  flex justify-center">
        <div hidden={true} className="p-1  text-white" onClick={handleRefresh}>
          Refresh
        </div>
        <div hidden={true} className="p-1 text-white" onClick={AutoRefresh}>
          Auto
        </div>
      </div>

      {/*this is to preload all the images*/}
      {s3data.map((img: { key: string }) => (
        <link
          rel="preload"
          as="image"
          key={img.key}
          href={s3urlprefix + img.key}
        />
      ))}
    </main>
  );
}
