import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Shikkhar Alo",
  description: "",
  keywords: "",
};

export default function Page() {
  return <SignUp />;
}
