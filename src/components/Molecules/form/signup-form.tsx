import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { commonInputStyle } from "../../../common/css/common-style";
import { UserAuthFormParam } from "../../../common/dto/user";
import { useAuthHandler } from "../../../common/hooks/common/auth-handler-hook";
import { ExistingRegistrationError } from "../../../core/error";
import { PrimaryButton } from "../../atoms/button";
import { ErrorMessageDiv, Form, Input } from "../../atoms/form";
import { Grid, Row } from "../../atoms/layout";

interface Props {
  /** クラスネーム */
  className?: string;
}

const SignupFormPresenter = (props: Props) => {
  //hook
  //フォームコンテキスト
  const {
    control,
    watch,
    handleSubmit,
    errors,
  } = useFormContext<UserAuthFormParam>();

  //state
  //エラー
  const [apiErrorMessage, setApiErrorMessage] = React.useState("");

  //watch
  const watchPassword = watch("signupPassword");

  //function
  //サインアップハンドラ
  const { handleSignup } = useAuthHandler();

  //サインアップクリック時ハンドラ
  const handleClickSignup = React.useCallback(
    (data: UserAuthFormParam) => {
      //サインアップ
      const signup = async () => {
        try {
          await handleSignup(data.signupEmail, data.signupPassword);
        } catch (e) {
          if (e instanceof ExistingRegistrationError) {
            setApiErrorMessage("このメールアドレスはすでに登録されています。");
          } else {
            setApiErrorMessage("システムエラーです。");
          }
        }
      };
      signup();
    },
    [handleSignup]
  );

  return (
    <Grid className={props.className}>
      <Row>
        {apiErrorMessage && (
          <div className="api-error-message">{apiErrorMessage}</div>
        )}
        <Form
          onSubmit={handleSubmit(handleClickSignup)}
          className="signup-form"
        >
          <Input
            name="signupEmail"
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
            className="signup-email"
          />
          <ErrorMessageDiv name="signupEmail" errors={errors} redFont />
          <Input
            name="signupPassword"
            fluid
            defaultValue=""
            control={control}
            placeholder="password"
            rules={{
              required: "必ず入力してください。",
              minLength: {
                value: 8,
                message: "8文字以上で入力してください。",
              },
            }}
            className="signup-password"
          />
          <ErrorMessageDiv name="signupPassword" errors={errors} redFont />
          <Input
            name="confirmSignupPassword"
            fluid
            defaultValue=""
            control={control}
            placeholder="confirmPassword"
            rules={{
              required: "必ず入力してください。",
              validate: (value: any) =>
                value === watchPassword || "パスワードが一致しません。",
            }}
            className="confirm-signup-password"
          />
          <ErrorMessageDiv
            name="confirmSignupPassword"
            errors={errors}
            redFont
          />
        </Form>
      </Row>
      <Row textAlign="right">
        <PrimaryButton
          label="SignUp"
          onClick={handleSubmit(handleClickSignup)}
        />
      </Row>
    </Grid>
  );
};

export const SignupForm = styled(SignupFormPresenter)`
  &&&&& {
    //apiエラーメッセージ
    .api-error-message {
      text-align: center;
      margin-bottom: 1rem;
      color: red;
    }
    //サインアップフォーム
    .signup-form {
      input {
        ${commonInputStyle}
      }
    }
    //メールアドレス
    .signup-email {
    }
    //パスワード
    .signup-password {
      margin-top: 1.5rem;
    }
    //確認用パスワード
    .confirm-signup-password {
      margin-top: 1.5rem;
    }
  }
`;
