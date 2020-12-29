import React from "react";
import { Icon, IconGroup } from "../../atoms/icon";

interface Props {
  /** クリック時ハンドラ */
  handleClick: () => void;
}

export const AddFolderButton = (props: Props) => {
  return (
    <>
      <IconGroup size="big" onClick={props.handleClick}>
        <Icon iconName="folder outline" />
        <Icon iconName="add" corner="top right" inverted />
      </IconGroup>
    </>
  );
};
