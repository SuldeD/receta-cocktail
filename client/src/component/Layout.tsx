/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import jwtDecode from "jwt-decode";

export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const router = useRouter();
  const { setUser } = useUser();
  useEffect(() => {
    if (router.query.token) {
      Cookies.set("token", `${router.query.token}`);
      router.replace("/");
      setUser(jwtDecode(`${router.query.token}`));
    }
  }, [router]);

  return (
    <>
      <Head>
        <title key="title">Receta</title>
      </Head>
      <div className="bg-[#ffffff] text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
