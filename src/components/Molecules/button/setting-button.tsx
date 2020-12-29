import React from "react";
import styled from "styled-components";
import { Icon } from "../../atoms/icon";

interface Props {
  /** アクティブ状態 */
  isActive: boolean;
  /** クリック時ハンドラ */
  handleClick: () => void;
  /** クラスネーム */
  className?: string;
}

const SettingButtonPresenter = (props: Props) => {
  return (
    <>
      <Icon
        iconName="setting"
        color={props.isActive ? "blue" : "black"}
        onClick={props.handleClick}
        className={props.className}
      />
    </>
  );
};

export const SettingButton = styled(SettingButtonPresenter)`
  &&&&& {
    font-size: 1.7rem;
  }
`;
