import { PropType, UserContextType, UsersType } from "../util/Types";
import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecide from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const userContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(userContext);

export default function UserProvider({ children }: PropType) {
  const [user, setUser] = useState<UsersType | null>(null);
  const [users, setUsers] = useState<UsersType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    token && setUser(jwtDecide(token));
  }, [router]);

  return (
    <userContext.Provider value={{ user, setUser, users, setUsers }}>
      {children}
    </userContext.Provider>
  );
}
