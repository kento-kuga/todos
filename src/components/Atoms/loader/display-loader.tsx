import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** 表示フラグ */
  isDisplay: boolean;
}

export const DisplayLoader = (props: Props) => {
  return (
    <>
      <UI.Dimmer active={props.isDisplay} page>
        <UI.Loader />
      </UI.Dimmer>
    </>
  );
};
