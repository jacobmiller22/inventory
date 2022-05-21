/** Interfaces/types */

/** components */
import { Skeleton } from "@mui/material";

interface IButtonSkeletonProps {
  width?: number;
  height?: number;
}

const ButtonSkeleton = ({
  width = 125,
  height = 36.5,
}: IButtonSkeletonProps) => {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={{ borderRadius: "4px" }}
    />
  );
};

export default ButtonSkeleton;
