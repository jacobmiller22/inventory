import { List, Chip, ChipProps } from "@mui/material";

interface ChipListProps {
  items: string[];
  chipProps?: ChipProps;
}

const ChipList = ({ items, chipProps, ...rest }: ChipListProps) => {
  const renderContent = () => {
    return items.map((label: string, i: number) => {
      return <Chip {...chipProps} label={label} key={`chip-${i}`} />;
    });
  };

  return <List>{renderContent()}</List>;
};

export default ChipList;
