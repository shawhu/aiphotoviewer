import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  <GoogleAnalytics />;
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="G-VWC01FW6XV" />
      <Component {...pageProps} />
    </>
  );
}
