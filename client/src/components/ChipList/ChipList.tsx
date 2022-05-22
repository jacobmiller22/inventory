import styles from "./ChipList.module.css";
import { List, Chip, ChipProps, Typography } from "@mui/material";

interface ChipListProps {
  items: string[];
  noneText?: string;
  chipProps?: ChipProps;
  [rest: string]: any;
}

const ChipList = ({
  items,
  chipProps,
  noneText = "No items",
  ...rest
}: ChipListProps) => {
  const renderContent = () => {
    return (
      <div className={styles["chip-container"]}>
        {items.map((label: string, i: number) => (
          <Chip label={label} key={`chip-${i}`} {...chipProps} />
        ))}
      </div>
    );
  };

  return <List {...rest}>{renderContent()}</List>;
};

export default ChipList;
