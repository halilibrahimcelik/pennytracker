type Props = {
  children: React.ReactNode;
  className?: HTMLElement['className'];
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'icon' | 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'bold';
  lineHeight?: 'short' | 'normal' | 'tall';
  textAlign?: 'left' | 'center' | 'right';
  color?: 'default' | 'muted' | 'accent';
};

const typographyVariants = {
  h1: ' text-4xl font-extrabold tracking-tight text-balance',
  h2: ' text-3xl font-bold tracking-tight text-balance',
  h3: ' text-2xl font-semibold tracking-tight text-balance',
  h4: ' text-xl font-semibold tracking-tight text-balance',
  h5: ' text-lg font-medium tracking-tight text-balance',
  h6: ' text-base font-medium tracking-tight text-balance',
  p: ' text-base font-normal text-balance',
  span: ' text-base font-normal text-balance',
};
const fontSizes = {
  icon: '0.60rem',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};
const Typography: React.FC<Props> = ({
  variant = 'p',
  children,
  color,
  lineHeight,
  textAlign,
  weight,
  className,
  size,
}) => {
  const Comp = variant;
  return (
    <Comp
      className={`${typographyVariants[variant]} ${className}`}
      style={{
        color,
        fontSize: size && fontSizes[size],
        lineHeight,
        textAlign,
        fontWeight: weight,
      }}
    >
      {children}
    </Comp>
  );
};
export default Typography;
