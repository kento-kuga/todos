import React from "react";
import * as UI from "semantic-ui-react";
import { ModalSize } from "../../../common/consts/ui-value-type";

//モーダル
interface ModalProps {
  /** オープンフラグ */
  open: boolean;
  /** トリガー */
  getTrigger?: () => React.ReactNode;
  /** オープンハンドラ */
  onOpen?: () => void;
  /** クローズハンドラ */
  onClose?: () => void;
  /** サイズ */
  size?: ModalSize;
  /** 画面上部に表示 */
  topAligned?: boolean;
  /** 閉じるボタン不要 */
  noCloseIcon?: boolean;
  /** モーダル外クリックで閉じない */
  noCloseOnDimmerClick?: boolean;
  /** クラスネーム */
  className?: string;
  /** テストid */
  testid?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const getTrigger = () => {
    if (props.getTrigger) {
      return props.getTrigger();
    }
  };

  return (
    <>
      <UI.Modal
        onClose={props.onClose}
        onOpen={props.onOpen}
        open={props.open}
        trigger={getTrigger()}
        className={props.className}
        size={props.size ? props.size : "large"}
        centered={!props.topAligned}
        closeIcon={!props.noCloseIcon}
        closeOnDimmerClick={!props.noCloseOnDimmerClick}
        data-testid={props.testid}
      >
        {children}
      </UI.Modal>
    </>
  );
};

//モーダルヘッダー
interface ModalHeaderProps {
  /** クラスネーム */ className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <UI.ModalHeader className={props.className}>{children}</UI.ModalHeader>
  );
};

//モーダルコンテンツ
interface ModalContentProps {
  /** クラスネーム */ className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  ...props
}) => {
  return (
    <UI.ModalContent className={props.className}>{children}</UI.ModalContent>
  );
};

//モーダルアクションズ
interface ModalActionsProps {
  /** クラスネーム */ className?: string;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  children,
  ...props
}) => {
  return (
    <UI.ModalActions className={props.className}>{children}</UI.ModalActions>
  );
};
