import { ResetPasswordForm } from "@/components/auth";
import { ROUTES } from "@/types";
import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Penny Tracker | Reset Password",
  description:
    "Reset your Penny Tracker account password to regain access and manage your personal finances effectively.",
  openGraph: {
    title: "Penny Tracker | Reset Password",
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
type Props = {
  searchParams: Promise<{ token: string | undefined }>;
};
const ResetPasswordPage: NextPage<Props> = async ({ searchParams }) => {
  const { token } = await searchParams;
  if (!token) {
    redirect(ROUTES.SIGN_IN);
  }
  return <ResetPasswordForm token={token} />;
};
export default ResetPasswordPage;
