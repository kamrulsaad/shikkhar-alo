import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Shikkhar Alo",
  description: "Auth Layout",
  keywords: "Auth Layout",
};

export default function Page() {
  return <SignIn />;
}
