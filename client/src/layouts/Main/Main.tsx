/** Components */
import { Divider } from "@mui/material";
import { Footer, Header } from "./components";
import styles from "./Layout.module.css";
import { Helmet } from "react-helmet";
import { AuthGuard } from "views/Auth";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  variant?: "full" | "light";
  title?: string;
  auth?: boolean;
};

const Layout = ({
  children,
  variant = "light",
  title = "Inventory",
  auth = false,
}: LayoutProps) => {
  const renderContent = () => {
    switch (variant) {
      case "light":
        return (
          <>
            <div className={styles["content-light"]}>{children}</div>
            <div style={{ flexGrow: 1 }} />
          </>
        );
      case "full":
        return (
          <>
            <div className={styles["content-full"]}>{children}</div>
            <div style={{ flexGrow: 1 }} />
          </>
        );
      default:
        return null;
    }
  };

  const Comp = (
    <div className={styles["container"]}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <Divider />
      {renderContent()}
      <Footer />
    </div>
  );
  if (auth) {
    return <AuthGuard>{Comp}</AuthGuard>;
  }

  return Comp;
};
export default Layout;
