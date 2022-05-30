/** Interfaces/types */

/** components */
import { CircularProgress } from "@mui/material";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
}

const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div className={styles["container"]}>
      <CircularProgress size={size} />
    </div>
  );
};

export default Loader;
