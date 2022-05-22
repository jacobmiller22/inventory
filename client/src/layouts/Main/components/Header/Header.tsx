import { Link } from "react-router-dom";

/** Components */
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Spacer } from "components";
import { itemsRoute, locationsRoute, tagsRoute } from "Router/routes/client";
import styles from "./Header.module.css";
import clsx from "clsx";
import { AuthButton, SignupButton } from "components/Auth";

const Header = () => {
  return (
    <Toolbar className={styles["toolbar"]}>
      <div className={styles["content"]}>
        <List className={styles["option-list"]}>
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
          <LinkItem href={tagsRoute.path} side="inside">
            Tags
          </LinkItem>
          <SignupButton
            className={clsx(styles["no-wrap"], styles["link-side-inside"])}
          />
          <AuthButton
            className={clsx(styles["no-wrap"], styles["link-side-right"])}
          />
        </List>
      </div>
    </Toolbar>
  );
};

interface LinkItemProps {
  href: string;
  children: React.ReactNode;
  side: "left" | "right" | "inside";
  className?: string;
  [rest: string]: any;
}

const LinkItem = ({
  href,
  children,
  side,
  className,
  ...rest
}: LinkItemProps) => {
  return (
    <Link to={href} className={styles["link"]}>
      <ListItem
        className={clsx(styles["link"], styles[`link-side-${side}`], className)}
        component="span"
        sx={{ textDecoration: "none" }}
      >
        <ListItemText disableTypography>{children}</ListItemText>
      </ListItem>
    </Link>
  );
};

export default Header;
