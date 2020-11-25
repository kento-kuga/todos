import React from "react";
import * as UI from "semantic-ui-react";
import { Columns, TextAlign } from "../../../common/consts/ui-value-type";
import { Column } from "./columns";

interface Props {
  /** 寄せ方向 */
  textAlign?: TextAlign;
  /** カラム数 */
  columns?: Columns;
  /** クラスネーム */
  className?: string;
  /** key */
  key?: any;
}

export const Row: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.GridRow
        columns={props.columns}
        textAlign={props.textAlign}
        className={props.className}
        key={props.key}
      >
        {props.columns && <>{children}</>}
        {!props.columns && <Column>{children}</Column>}
      </UI.GridRow>
    </>
  );
};
