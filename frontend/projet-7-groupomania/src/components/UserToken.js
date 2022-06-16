import { createContext } from "react";
import { useState, useMemo } from "react";

export const UserToken = createContext(null);
export const UserTokenComponent = (props) => {
  const [token, setToken] = useState(null);
  const value = useMemo(() => ({ token, setToken }), [token, setToken]);
  return (
    <UserToken.Provider value={value}> {props.children}</UserToken.Provider>
  );
};
