"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";
import { account } from "@/lib/appwrite/appwrite";
import { Models } from "appwrite";
import Link from "next/link";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

  const { toast, dismiss } = useToast();

  useEffect(() => {
    const promise = account.get();

    promise
      .then((res) => {
        console.log("in get");
        setUser(res);
      })
      .catch((err) => console.log("error: ", err));
  }, []);

  const login = async (email: string, password: string) => {
    const promise = account.createEmailSession(email, password);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then(async (response) => {
        console.log(response);
        const userData = await account.get();
        setUser(userData);
        setStatus((prev) => ({ ...prev, isSuccess: true, isLoading: false }));
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check the email and password.",
          action: (
            <ToastAction altText="login button" onClick={() => dismiss()}>
              <Button variant="link" asChild>
                <Link href="/signup">try SignUp</Link>
              </Button>
            </ToastAction>
          ),
        });
        console.log(err);
        setStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
      });
  };
  const signup = (email: string, password: string, name: string) => {
    const promise = account.create("unique()", email, password, name);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then((response) => {
        console.log(response);
        setUser(response);
        setStatus((prev) => ({ ...prev, isSuccess: true, isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Try with different Email",
          description: "A user is already Signed up with this email, try login",
          action: (
            <ToastAction altText="login button" onClick={() => dismiss()}>
              <Button variant="link" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </ToastAction>
          ),
        });
        setStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
      });
  };

  const logout = (sessioId: string = "current") => {
    const promise = account.deleteSession(sessioId);
    setStatus((prev) => ({ ...prev, isLoading: true }));

    promise
      .then((response) => {
        console.log(response);
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
