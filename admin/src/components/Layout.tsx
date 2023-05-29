import { useUser } from "../context/UserContext";
import Login from "../pages/login";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: JSX.Element }) {
  const { user } = useUser();

  if (user) {
    return (
      <div className="flex justify-between">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />

        <div className="w-[350px]">
          <SideBar />
        </div>
        <div className="w-full me-[2%]">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}
