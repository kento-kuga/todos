import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { commonInputStyle } from "../../../common/css/common-style";
import { UserAuthFormParam } from "../../../common/dto/user";
import { useAuthHandler } from "../../../common/hooks/common/auth-handler-hook";
import { WrongEmailOrPassword } from "../../../core/error";
import { PrimaryButton } from "../../atoms/button";
import { ErrorMessageDiv, Form, Input } from "../../atoms/form";
import { Grid, Row } from "../../atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const LoginFormPresenter = (props: Props) => {
  //hook
  //フォームコンテキスト
  const { control, handleSubmit, errors } = useFormContext<UserAuthFormParam>();

  //state
  //エラー
  const [apiErrorMessage, setApiErrorMessage] = React.useState("");

  //function
  //ログインハンドラ
  const { handleLogin } = useAuthHandler();

  //ログインクリック時ハンドラ
  const handleClickLogin = React.useCallback(
    (data: UserAuthFormParam) => {
      const login = async () => {
        //ログイン
        try {
          await handleLogin(data.loginEmail, data.loginPassword);
        } catch (e) {
          if (e instanceof WrongEmailOrPassword) {
            setApiErrorMessage(
              "メールアドレス、もしくはパスワードが間違っています。"
            );
          } else {
            setApiErrorMessage("システムエラーです。");
          }
        }
      };
      login();
    },
    [handleLogin]
  );

  return (
    <Grid className={props.className}>
      <Row>
        {apiErrorMessage && (
          <div className="api-error-message">{apiErrorMessage}</div>
        )}
        <Form onSubmit={handleSubmit(handleClickLogin)} className="login-form">
          <Input
            name="loginEmail"
            fluid
            defaultValue=""
            control={control}
            placeholder="email"
            rules={{
              required: "必ず入力してください。",
              pattern: {
                value: /[^\s]+@[^\s]+/,
                message: "正しいメールアドレスを入力してください。",
              },
            }}
            className="login-email-input"
          />
          <ErrorMessageDiv name="loginEmail" errors={errors} redFont />
          <Input
            name="loginPassword"
            fluid
            defaultValue=""
            control={control}
            placeholder="password"
            rules={{
              required: "必ず入力してください。",
            }}
            className="login-password-input"
          />
          <ErrorMessageDiv name="loginPassword" errors={errors} redFont />
        </Form>
      </Row>
      <Row textAlign="right" className="login-button-row">
        <Form onSubmit={handleSubmit(handleClickLogin)}>
          <PrimaryButton label="Login" />
        </Form>
      </Row>
    </Grid>
  );
};

export const LoginForm = styled(LoginFormPresenter)`
  &&&&& {
    //apiエラーメッセージ
    .api-error-message {
      text-align: center;
      margin-bottom: 1rem;
      color: red;
    }
    //ログインフォーム
    .login-form {
      input {
        ${commonInputStyle}
      }
      //メールアドレス
      .login-email-input {
      }
      //パスワード
      .login-password-input {
        margin-top: 1.5rem;
      }
    }
    //ログインボタン行
    .login-button-row {
      padding-bottom: 0.5rem;
    }
  }
`;
