import { signInUser } from "@/app/actions/auth/auth.actions";
import { AuthForm } from "@/components/auth";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Penny Tracker | Sign In",
  description:
    "Log in to your Penny Tracker account to manage your personal finances effectively.",
  openGraph: {
    title: "Penny Tracker | Sign In",
    description:
      "Log in to your Penny Tracker account to manage your personal finances effectively.",
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
const SignInPage: NextPage = () => {
  const initialState = {
    success: false,
    errors: {},
  };
  return (
    <AuthForm
      initialState={initialState}
      authMethod={signInUser}
      title="Log in to your account"
      authType="sign-in"
    />
  );
};
export default SignInPage;
