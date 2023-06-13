"use client";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}
const page: FC<pageProps> = () => {
  return (
    <div>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default page;
