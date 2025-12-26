type Props = {
  children: React.ReactNode;
  className?: string;
};
const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`container mx-auto px-4 ${className || ""}`}>
      {children}
    </div>
  );
};
export default Container;
