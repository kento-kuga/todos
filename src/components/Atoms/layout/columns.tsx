import React from "react";
import * as UI from "semantic-ui-react";
import {
  Width,
  TextAlign,
  Columns,
} from "../../../common/consts/ui-value-type";

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
  /** クラスネーム */
  className?: string;
}

export const Column: React.FC<Props> = ({ children, ...props }) => {
  //function
  //クリック時ハンドラ
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <UI.GridColumn
        width={props.width}
        columns={props.columns}
        textAlign={props.textAlign}
        className={props.className}
        key={props.key}
        onClick={handleClick}
      >
        {children}
      </UI.GridColumn>
    </>
  );
};
