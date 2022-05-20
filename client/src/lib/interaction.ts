import React from "react";

export const onDoubleClick = (e: React.SyntheticEvent, onClick: () => any) => {
  //@ts-ignore
  if (e.detail >= 2) {
    onClick();
  }
};
