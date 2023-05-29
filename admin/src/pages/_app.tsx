import "../styles/globals.css";
import type { AppProps } from "next/app";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import OthersProvider from "../context/OthersContext";
import CocktailProvider from "../context/CocktailContext";
import Loader from "../components/Loader";
import UserProvider from "../context/UserContext";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <CocktailProvider>
        <OthersProvider>
          <UserProvider>
            <Loader>
              <Component {...pageProps} />
            </Loader>
          </UserProvider>
        </OthersProvider>
      </CocktailProvider>
    </ChakraProvider>
  );
}
