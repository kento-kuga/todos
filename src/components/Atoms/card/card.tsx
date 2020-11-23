import React from "react";
import * as UI from "semantic-ui-react";

interface CardProps {
  /** クラスネーム */
  className?: string;
  /** key */
  key?: any;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <>
      <UI.Card className={props.className} key={props.key}>
        {children}
      </UI.Card>
    </>
  );
};

interface CardContentProps {
  /** ラベル */
  label?: string;
  /** クラスネーム */
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <UI.CardContent className={props.className}>
        {props.label && <CardHeader>{props.label}</CardHeader>}
        {children}
      </UI.CardContent>
    </>
  );
};

interface CardHeaderProps {
  /** クラスネーム */
  className?: string;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <UI.CardHeader className={props.className}>{children}</UI.CardHeader>
    </>
  );
};

interface CardMetaProps {
  /** クラスネーム */
  className?: string;
}
export const CardMeta: React.FC<CardMetaProps> = ({ children, ...props }) => {
  return (
    <>
      <UI.CardMeta className={props.className}>{children}</UI.CardMeta>
    </>
  );
};

interface CardDescriptionProps {
  /** クラスネーム */
  className?: string;
}
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <UI.CardDescription className={props.className}>
        {children}
      </UI.CardDescription>
    </>
  );
};
