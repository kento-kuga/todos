import React from "react";
import * as UI from "semantic-ui-react";
import { Columns, TextAlign, Width } from "../../../core/ui-value-type";

interface Props {
  /** 幅 */
  width?: Width;
  /** 寄せ方向 */
  textAlign?: TextAlign;
  /** カラム数 */
  columns?: Columns;
  /** key */
  key?: any;
  /** onClick */
  onClick?: () => void;
  className?: string;
}

export const Column: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <UI.GridColumn
        width={props.width}
        columns={props.columns}
        textAlign={props.textAlign}
        className={props.className}
        key={props.key}
        onClick={props.onClick}
      >
        {children}
      </UI.GridColumn>
    </>
  );
};
