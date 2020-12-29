import React from "react";

export const useToggle = (defaultTrue?: boolean) => {
  //state
  const [isActive, setIsActive] = React.useState(defaultTrue || false);

  //トグル切り替え
  const toggle = React.useCallback(() => {
    setIsActive((state) => !state);
  }, []);

  //オン
  const turnOn = React.useCallback(() => {
    setIsActive(true);
  }, []);

  //オフ
  const turnOff = React.useCallback(() => {
    setIsActive(false);
  }, []);

  return [isActive, toggle, turnOn, turnOff] as const;
};
