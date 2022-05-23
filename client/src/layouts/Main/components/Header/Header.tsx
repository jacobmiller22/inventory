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
import {
  itemsRoute,
  locationsRoute,
  tagsRoute,
  usersRoute,
} from "Router/routes/client";
import styles from "./Header.module.css";
import clsx from "clsx";
import { AuthButton, AuthGuard, SignupButton } from "components/Auth";

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
          <AuthGuard admin>
            <LinkItem href={usersRoute.path}>Users</LinkItem>
          </AuthGuard>
          <LinkItem href={itemsRoute.path}>Items</LinkItem>
          <LinkItem href={locationsRoute.path}>Locations</LinkItem>
          <LinkItem href={tagsRoute.path}>Tags</LinkItem>
          <SignupButton className={styles["no-wrap"]} />
          <AuthButton className={styles["no-wrap"]} />
        </List>
      </div>
    </Toolbar>
  );
};

interface LinkItemProps {
  href: string;
  children: React.ReactNode;
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
        className={clsx(styles["link"], className)}
        component="span"
        sx={{ textDecoration: "none" }}
      >
        <ListItemText disableTypography>{children}</ListItemText>
      </ListItem>
    </Link>
  );
};

export default Header;
