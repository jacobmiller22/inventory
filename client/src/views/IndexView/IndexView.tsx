import styles from "./IndexView.module.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryList from "./components/InventoryList";

const IndexView = () => {
  // const [useLocal, setUseLocal] = useState(false);

  return (
    <div>
      <br />
      <InventoryList />
    </div>
  );
};

export default IndexView;
