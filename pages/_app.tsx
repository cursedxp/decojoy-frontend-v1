import React from "react";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "../src/app/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
