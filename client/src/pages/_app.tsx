import "@/styles/global.scss";
import type { AppProps } from "next/app";
import OthersProvider from "../context/OthersContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "../context/UserContext";
import CocktailProvider from "../context/CocktailContext";
import React from "react";
import Loader from "@/component/Loader";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps): JSX.Element {
  return (
    <UserProvider>
      <CocktailProvider>
        <OthersProvider>
          <ChakraProvider>
            <Loader>
              <Component {...pageProps} />
            </Loader>
          </ChakraProvider>
        </OthersProvider>
      </CocktailProvider>
    </UserProvider>
  );
}
