/** Components */
import { Toolbar, Typography, Link } from "@mui/material";
import { Spacer } from "components";
import { itemsRoute, locationsRoute, tagsRoute } from "Router/routes/client";
import styles from "./Header.module.css";
import clsx from "clsx";

const Header = () => {
  return (
    <Toolbar className={styles["toolbar"]}>
      <div className={styles["content"]}>
        <LinkItem className={styles["brand"]} href="/" side="left">
          <strong>
            <span className={styles["accent"]}>I</span>nventory
          </strong>
        </LinkItem>
        <Spacer />
        <LinkItem href={itemsRoute.path} side="inside">
          Items
        </LinkItem>
        <LinkItem href={locationsRoute.path} side="inside">
          Locations
        </LinkItem>
        <LinkItem href={tagsRoute.path} side="right">
          Tags
        </LinkItem>
      </div>
    </Toolbar>
  );
};

interface LinkItemProps {
  href: string;
  children: React.ReactNode;
  side: "left" | "right" | "inside";
  [rest: string]: any;
}

const LinkItem = ({ href, children, side, ...rest }: LinkItemProps) => {
  return (
    <Typography
      component={Link}
      href={href}
      className={clsx(styles["link"], styles[`link-side-${side}`])}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Header;
