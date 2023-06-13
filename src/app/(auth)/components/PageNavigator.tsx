"use client";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const PageNavigator: FC = () => {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return <div className="hidden w-1 h-1">Navigator</div>;
};

export default PageNavigator;
