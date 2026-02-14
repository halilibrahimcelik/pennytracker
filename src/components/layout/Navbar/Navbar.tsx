"use client";
import { signOutUser } from "@/app/actions/auth/auth.actions";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { SelectUser } from "@/db/schema";
import { ROUTES } from "@/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { RiCollapseHorizontalLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  user: Omit<SelectUser, "image"> | undefined;
  activePath?: string;
};
export const Navbar: React.FC<Props> = ({ user }) => {
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(signOutUser, {
    error: "",
    success: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = useCallback(() => {
    if (state?.success) {
      queryClient.cancelQueries();
      queryClient.clear();
      toast.success("User signed out successfully");
    }
  }, [state?.success, queryClient]);

  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  if (isScrolled && !isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="fixed top-4 left-4 z-50 rounded-full h-12 w-12 p-0 animate-in fade-in slide-in-from-left-5 duration-300"
        variant="default"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <nav
      className={`bg-primary text-accent max-w-4xl fixed z-50 w-full left-0 right-0 mx-auto px-4 sm:px-6 lg:px-8 rounded-full shadow-md transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-4 animate-in fade-in slide-in-from-top-5 duration-300"
          : "top-10"
      }`}
    >
      <Container>
        <div className="py-4 flex items-center justify-between">
          <Link
            href={"/"}
            className="transition-transform hover:scale-105 duration-200"
          >
            <Image
              src={"/logo.svg"}
              width={70}
              priority
              className="rounded-full"
              height={30}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center animate-in fade-in slide-in-from-right-5 duration-300">
              {!user ? (
                <>
                  <Button
                    className="uppercase transition-all hover:scale-105 duration-200"
                    variant={pathname === ROUTES.SIGN_IN ? "secondary" : "link"}
                    asChild
                  >
                    <Link href={ROUTES.SIGN_IN}>Sign in</Link>
                  </Button>
                  <Button
                    className="uppercase transition-all hover:scale-105 duration-200"
                    variant={pathname === ROUTES.SIGN_UP ? "secondary" : "link"}
                    asChild
                  >
                    <Link href={ROUTES.SIGN_UP}>Sign-up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={"link"}
                    asChild
                    className="cursor-pointer transition-all hover:scale-105 duration-200"
                  >
                    <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
                  </Button>
                  <form action={formAction}>
                    <Button
                      disabled={isPending}
                      type="submit"
                      variant={"default"}
                      className="cursor-pointer transition-all hover:scale-105 duration-200"
                    >
                      Log Out
                    </Button>
                  </form>
                </>
              )}
            </div>
            <div className="animate-in fade-in zoom-in-50 duration-300">
              <ThemeSwitcher
                onChange={(theme) => setTheme(theme)}
                value={theme as "light" | "dark" | "system"}
              />
            </div>
            {isScrolled && (
              <Button
                onClick={() => setIsExpanded(false)}
                variant="ghost"
                size="icon"
                title="Close Navbar"
                aria-label="Close Navbar"
                className="h-[32px] w-8  flex  rounded-full bg-background  ring-full ring-border  relative left-6  animate-in fade-in zoom-in-50 duration-200"
              >
                <RiCollapseHorizontalLine
                  className="text-foreground"
                  style={{ width: "24px", height: "24px" }}
                />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};
