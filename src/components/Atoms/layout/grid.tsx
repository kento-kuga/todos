import React from "react";
import * as UI from "semantic-ui-react";
import { Columns } from "../../../common/consts/ui-value-type";

interface Props {
  /** カラム数 */
  columns?: Columns;
  /** スタック可能 */
  stackable?: boolean;
  /** 内側罫線 */
  internally?: boolean;
  /** クラスネーム */
  className?: string;
}

export const Grid: React.FC<Props> = ({ children, ...props }) => {
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
