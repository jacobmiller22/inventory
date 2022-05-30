/** Interfaces/types */

/** components */
import { Typography, Grid } from "@mui/material";
import { BackButton } from "components";
import styles from "./FourOFour.module.css";

interface FourOFourProps {
  article: string;
  allowBack?: boolean;
  returnTo?: string;
}

const FourOFour = ({ article, allowBack = true, returnTo }: FourOFourProps) => {
  return (
    <Grid container spacing={2} className={styles["container"]}>
      <Grid
        item
        xs={6}
        container
        justifyContent="center"
        alignItems="flex-end"
        direction="column"
      >
        <img
          width={375}
          height={375}
          alt="No Content Image"
          src="https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration6.svg"
        />
      </Grid>
      <Grid
        item
        xs={6}
        container
        justifyContent="center"
        alignItems="flex-start"
        direction="column"
      >
        <Typography variant="h2">
          <strong>404</strong>
        </Typography>
        <Typography variant="body1">
          <span>
            {article} not found. If you feel this is a mistake, please open an
            issue on the public{" "}
            <a
              href="https://github.com/jacobmiller22/inventory/issues"
              target="__blank"
            >
              Github Repository
            </a>
            .
          </span>
        </Typography>
        <br />
        {allowBack && <BackButton href={returnTo} />}
      </Grid>
    </Grid>
  );
};

export default FourOFour;
