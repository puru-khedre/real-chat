"use client";

import { account } from "@/lib/appwrite";
import { Models } from "appwrite";
import { ReactNode, createContext, useContext, useState } from "react";

type User = Models.User<Models.Preferences>;

interface IUserStatus {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface IUserState {
  user: User | null;
  status: IUserStatus;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: (sessioId: string) => void;
}

const defaultState: IUserState = {
  user: null,
  status: { isError: false, isLoading: false, isSuccess: false },
  login: () => {},
  signup: () => {},
  logout: () => {},
};
export const UserContext = createContext<IUserState>(defaultState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<IUserStatus>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const login = (email: string, password: string) => {
    const promise = account.createEmailSession(email, password);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then((d) => {
        console.log(d);
        setStatus((prev) => ({ ...prev, isSuccess: true, isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
        setStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
      });
  };
  const signup = (email: string, password: string, name: string) => {
    const promise = account.create("unique()", email, password, name);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then((d) => {
        console.log(d);
        setStatus((prev) => ({ ...prev, isSuccess: true, isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
        setStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
      });
  };

  const logout = (sessioId: string = "current") => {
    const promise = account.deleteSession(sessioId);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then((d) => {
        console.log(d);
        setStatus((prev) => ({ ...prev, isSuccess: true, isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
        setStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
      });
  };

  return (
    <UserContext.Provider value={{ user, status, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
