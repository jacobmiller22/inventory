/** Interfaces/types */

import type { Variant } from "@mui/material/styles/createTypography";

/** components */
import { Skeleton } from "@mui/material";

interface ITypographySkeletonProps {
  width?: number;
  variant?: Variant;
}

const TypographySkeleton = ({
  width = 80,
  variant,
}: ITypographySkeletonProps) => {
  return (
    <Skeleton
      animation="wave"
      height={variantToHeight(variant)}
      width={width}
    />
  );
};

export default TypographySkeleton;

const variantToHeight = (variant: Variant): number => {
  switch (variant) {
    case "h1":
      return 66;
    case "h2":
      return 58;
    case "h3":
      return 50;
    case "h4":
      return 42;
    case "h5":
      return 34;
    case "h6":
      return 26;
    case "subtitle1":
      return 50;
    case "subtitle2":
      return 50;
    case "body1":
      return 24;
    case "body2":
      return 50;
    case "caption":
      return 50;
    case "button":
      return 50;
    case "overline":
      return 50;
    default:
      return 50;
  }
};
