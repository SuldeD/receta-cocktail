import { PropType, UserContextType, UsersType } from "../util/Types";
import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecide from "jwt-decode";
import Cookies from "js-cookie";

const userContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(userContext);

export default function UserProvider({ children }: PropType) {
  const [user, setUser] = useState<UsersType | null>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser(jwtDecide(token));
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
