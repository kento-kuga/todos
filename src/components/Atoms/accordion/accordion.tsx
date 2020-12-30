import React from "react";
import * as UI from "semantic-ui-react";
import styled from "styled-components";

interface Props {
  /** タイトル */
  title: string;
  /** 表示前オプションコンテンツ */
  getBeforeDisplayOptionContent?: React.ReactNode;
  /** 表示後オプションコンテンツ */
  getAfterDisplayOptionContent?: React.ReactNode;
  /** クラスネーム */
  className?: string;
}

const AccordionPresenter: React.FC<Props> = ({ children, ...props }) => {
  //state
  //現在のインデックス
  const [activeIndex, setActiveIndex] = React.useState(-1);

  //function
  //タイトルクリック時ハンドラ-
  const handleClickTile = React.useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? -1 : 0));
  }, []);

  return (
    <UI.Accordion className={props.className}>
      <UI.AccordionTitle
        index={0}
        active={activeIndex === 0}
        onClick={handleClickTile}
        className="accordion-title"
      >
        <div className="title-block">
          <UI.Icon name="dropdown" />
          {props.title}
        </div>
        {props.getBeforeDisplayOptionContent && activeIndex === -1 && (
          <div>{props.getBeforeDisplayOptionContent}</div>
        )}
        {props.getAfterDisplayOptionContent && activeIndex !== -1 && (
          <div>{props.getAfterDisplayOptionContent}</div>
        )}
      </UI.AccordionTitle>
      <UI.AccordionContent active={activeIndex === 0}>
        {children}
      </UI.AccordionContent>
    </UI.Accordion>
  );
};

export const Accordion = styled(AccordionPresenter)`
  &&&&& {
    .accordion-title {
      display: flex;
      .title-block {
        margin-right: auto;
      }
    }
  }
`;
