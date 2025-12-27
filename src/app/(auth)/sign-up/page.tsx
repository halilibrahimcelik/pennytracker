import { signUpCreateUser } from "@/app/actions/auth/auth.actions";
import { AuthForm } from "@/components/auth";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Penny Tracker | Sign Up",
  description:
    "Create an account on Penny Tracker to manage your personal finances effectively.",
  openGraph: {
    title: "Penny Tracker | Sign Up",
    description:
      "Create an account on Penny Tracker to manage your personal finances effectively.",
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

const SignUpPage: NextPage = () => {
  const initialState = {
    success: false,
    errors: {},
  };
  return (
    <AuthForm
      initialState={initialState}
      authMethod={signUpCreateUser}
      title="Create your account"
      authType="sign-up"
    />
  );
};
export default SignUpPage;
