'use client';
import { signOutUser } from '@/app/actions';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { SelectUser } from '@/db/schema';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  user: Omit<SelectUser, 'image'> | undefined;
};
export const Navbar: React.FC<Props> = ({ user }) => {
  const { setTheme, theme } = useTheme();
  const [state, formAction, isPending] = useActionState(signOutUser, {
    error: '',
    success: false,
  });
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push('/sign-in');
      toast.success('User signed out successfully');
    }
  }, [state]);
  return (
    <nav className='bg-primary text-accent'>
      <Container>
        <div className='py-4 flex items-center justify-between'>
          <Link href={'/'}>
            <Image
              src={'logo.svg'}
              width={70}
              priority
              className='rounded-full'
              height={30}
              alt='Logo'
            />
          </Link>
          <div className='flex items-center gap-4'>
            <div className='flex items-center '>
              {!user ? (
                <>
                  <Button className='uppercase' variant={'link'} asChild>
                    <Link href={'/sign-in'}>Log in</Link>
                  </Button>
                  <Button className='uppercase' variant={'secondary'} asChild>
                    <Link href={'/sign-up'}>Sign-up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={'link'} asChild className='cursor-pointer'>
                    <Link href={'/dashboard'}>Dashboard</Link>
                  </Button>
                  <form action={formAction}>
                    <Button
                      disabled={isPending}
                      type='submit'
                      variant={'default'}
                      className='cursor-pointer'
                    >
                      Log Out
                    </Button>
                  </form>
                </>
              )}
            </div>
            <ThemeSwitcher
              onChange={(theme) => setTheme(theme)}
              value={theme as 'light' | 'dark' | 'system'}
            />
          </div>
        </div>
      </Container>
    </nav>
  );
};
