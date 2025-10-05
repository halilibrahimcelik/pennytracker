'use client';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme();
  return (
    <nav className='bg-primary text-accent'>
      <Container>
        <div className='py-4 flex items-center justify-between'>
          <Link href={'/'}>
            <Image
              src={'logo.svg'}
              width={70}
              className='rounded-full'
              height={30}
              alt='Logo'
            />
          </Link>
          <div className='flex items-center gap-4'>
            <div className='flex items-center '>
              <Button className='uppercase' variant={'link'} asChild>
                <Link href={'/sign-in'}>Log in</Link>
              </Button>
              <Button className='uppercase' variant={'secondary'} asChild>
                <Link href={'/sign-up'}>Sign-up</Link>
              </Button>
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
