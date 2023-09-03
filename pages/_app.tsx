import "../app/globals.css";
import Layout from "@/components/layout/Layout";
import { NextComponentType } from "next";
function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
