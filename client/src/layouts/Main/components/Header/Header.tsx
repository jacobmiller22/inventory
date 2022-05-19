/** Components */
import { Toolbar, Typography, Link } from "@mui/material";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Toolbar className={styles["toolbar"]}>
      <div className={styles["content"]}>
        <Typography
          className={styles["brand"]}
          component={Link}
          href="/"
          sx={{ textDecoration: "none" }}
        >
          <span className={styles["accent"]}>I</span>nventory
        </Typography>
      </div>
    </Toolbar>
  );
};

export default Header;
