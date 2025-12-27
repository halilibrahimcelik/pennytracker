import { ForgotPasswordForm } from "@/components/auth";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Penny Tracker | Forgot Password",
  description:
    "Reset your Penny Tracker account password to regain access and manage your personal finances effectively.",
  openGraph: {
    title: "Penny Tracker | Forgot Password",
    description:
      "Reset your Penny Tracker account password to regain access and manage your personal finances effectively.",
    images: [
      {
        url: "logo.svg",
        width: 800,
        height: 600,
        alt: "Penny Tracker Logo",
        type: "image/svg+xml",
      },
    ],
  },
};
const ForgotPasswordPage: NextPage = () => {
  return <ForgotPasswordForm />;
};
export default ForgotPasswordPage;
