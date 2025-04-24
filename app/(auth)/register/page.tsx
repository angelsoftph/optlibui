"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpForm from "./signup-form";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("optlib_auth_token");

    if (token) {
      router.push("/home");
    }
  }, [router]);

  return <SignUpForm />;
}
