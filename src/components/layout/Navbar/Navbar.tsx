'use client';
import Container from '@/components/ui/container';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { useTheme } from 'next-themes';

export const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme();
  return (
    <nav className='bg-primary text-accent'>
      <Container>
        <div className='py-4'>Navbar</div>
        <ThemeSwitcher
          onChange={(theme) => setTheme(theme)}
          value={theme as 'light' | 'dark' | 'system'}
        />
      </Container>
    </nav>
  );
};
