/** Components */
import { Divider } from "@mui/material";
import { Footer, Header } from "./components";
import styles from "./Layout.module.css";
import { Helmet } from "react-helmet";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  variant?: "full" | "light";
  title?: string;
};

const Layout = ({
  children,
  variant = "light",
  title = "Inventory",
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

  return (
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
};
export default Layout;
