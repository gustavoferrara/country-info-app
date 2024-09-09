interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div id='wrapper'>{children}</div>
    </>
  );
};

export default Layout;
