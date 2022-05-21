/** Interfaces/types */

import { Skeleton } from "@mui/material";

/** components */

interface IChipSkeletonProps {}

const ChipSkeleton = ({}: IChipSkeletonProps) => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{ display: "inline-block", mr: "0.5rem", borderRadius: "16px" }}
      width={72.5}
      height={32}
    />
  );
};

export default ChipSkeleton;
