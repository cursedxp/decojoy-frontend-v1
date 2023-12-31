import "../src/app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import store from "../store/store";
import { Provider } from "react-redux";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </Provider>
  );
}
