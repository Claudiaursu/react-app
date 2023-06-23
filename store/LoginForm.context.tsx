import { createContext, useContext, useState } from "react";

interface LoginData {
  username: string;
  password: string;
  setLoginData: Function;
}

const LoginFormContext = createContext<LoginData>({
  username: "",
  password: "",
  setLoginData: () => {},
});

export const useLoginFormContext = () => {
  return useContext(LoginFormContext);
};

export const useLoginFormUsername = () => {
  return useContext(LoginFormContext).username;
};

export const LoginFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [{ username, password }, setLoginData] = useState({
    username: "",
    password: "",
  });

  return (
    <LoginFormContext.Provider
      value={{
        username,
        password,
        setLoginData,
      }}
    >
      {children}
    </LoginFormContext.Provider>
  );
};
