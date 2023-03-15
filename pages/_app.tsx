import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { DataProvider } from "@/utils/store/golobalState";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}
