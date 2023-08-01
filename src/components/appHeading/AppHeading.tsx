import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}
const AppHeading = ({ children }: AppProps) => {
  return (
    <header className="app_header">
      <h1>{children}</h1>
    </header>
  );
};

export default AppHeading;
