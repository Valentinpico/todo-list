import { loginType } from "../../types/types.user";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../Inputs/Input";

type LoginFormProps = {
  LoginState: loginType;
  setLoginState: Dispatch<SetStateAction<loginType>>;
  showError: boolean;
};

export const LoginForm = ({
  LoginState,
  setLoginState,
  showError,
}: LoginFormProps) => {
  return (
    <>
      <Input
        label="Email o Username"
        name="emailOrUsername"
        value={LoginState.emailOrUsername}
        type="text"
        onChange={(e) =>
          setLoginState({ ...LoginState, emailOrUsername: e.target.value })
        }
        placeholder="Username o email"
        validate={(value) => value.length > 0}
        showError={showError}
      />
      <Input
        label="Contraseña"
        name="password"
        value={LoginState.password}
        type="password"
        onChange={(e) =>
          setLoginState({ ...LoginState, password: e.target.value })
        }
        validate={(value) => value.length > 0}
        placeholder="Contraseña"
        showError={showError}
      />
    </>
  );
};
