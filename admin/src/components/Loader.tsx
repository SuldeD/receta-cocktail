import React, { ReactNode } from "react";
import ReactLoading from "react-loading";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Loader = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? (
    <div className="loader-container w-screen h-screen flex justify-center items-center">
      <div className="loader">
        <ReactLoading color="black" height={50} width={50} type="bars" />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;
