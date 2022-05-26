import { useNavigate } from "react-router-dom";

/** Components */
import { BackButton, EditButton, Spacer } from "components";
import { Typography } from "@mui/material";
import styles from "./DetailsView.module.css";
import { replaceWildcards } from "Router/routes";
import { Route } from "Router/routes/client";

interface DetailsViewProps {
  item: any;
  editRoute: Route;
  idKey: string;
  children?: React.ReactNode | React.ReactNode[];
}

const DetailsView = ({
  item,
  editRoute,
  idKey,
  children,
}: DetailsViewProps) => {
  const navigate = useNavigate();

  if (item == null) {
    throw new Error("The provided item must not be null or undefined");
  }

  const handleEdit = () => {
    navigate(replaceWildcards(editRoute, [item[idKey]]));
  };

  return (
    <div>
      <br />
      <BackButton variant="text" />
      <br />
      <br />
      <div className={styles["title-container"]}>
        <Typography variant="h6" className={styles["title"]}>
          {item.name}
        </Typography>
        <Spacer />
        <EditButton onClick={handleEdit} color="primary" />
      </div>

      <br />
      {children}
    </div>
  );
};

export default DetailsView;
