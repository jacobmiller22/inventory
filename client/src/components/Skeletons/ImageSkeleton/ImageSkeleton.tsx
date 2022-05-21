/** Interfaces/types */

/** components */
import { Skeleton } from "@mui/material";

interface IImageSkeletonsProps {
  size?: number;
}

const ImageSkeletons = ({ size = 128 }: IImageSkeletonsProps) => {
  return (
    <Skeleton animation="wave" variant="circular" height={128} width={128} />
  );
};

export default ImageSkeletons;
