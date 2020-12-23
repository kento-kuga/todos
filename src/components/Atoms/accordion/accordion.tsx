import React from "react";
import * as UI from "semantic-ui-react";

interface Props {
  /** タイトル */
  title: string;
}

export const Accordion: React.FC<Props> = ({ children, ...props }) => {
  //state
  //現在のインデックス
  const [activeIndex, setActiveIndex] = React.useState(-1);

  //function
  //タイトルクリック時ハンドラ-
  const handleClickTile = React.useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? -1 : 0));
  }, []);

  return (
    <UI.Accordion>
      <UI.AccordionTitle
        index={0}
        active={activeIndex === 0}
        onClick={handleClickTile}
      >
        <UI.Icon name="dropdown" />
        {props.title}
      </UI.AccordionTitle>
      <UI.AccordionContent active={activeIndex === 0}>
        {children}
      </UI.AccordionContent>
    </UI.Accordion>
  );
};
