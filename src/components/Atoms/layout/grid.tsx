import React from "react";
import * as UI from "semantic-ui-react";
import styled from "styled-components";
import { Columns } from "../../../common/consts/ui-value-type";

interface Props {
  /** カラム数 */
  columns?: Columns;
  /** スタック可能 */
  stackable?: boolean;
  /** 内側罫線 */
  internally?: boolean;
  /** コンテナフラグ */
  container?: boolean;
  /** クラスネーム */
  className?: string;
}

const GridPresenter: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.Grid
        columns={props.columns}
        stackable={props.stackable}
        className={props.className}
        celled={props.internally ? "internally" : false}
      >
        {children}
      </UI.Grid>
    </>
  );
};

export const Grid = styled(GridPresenter)<Props>`
  &&&&& {
    ${(props) =>
      props.container ? "margin-left: 0rem; margin-right: 0rem;" : ""}
  }
`;
