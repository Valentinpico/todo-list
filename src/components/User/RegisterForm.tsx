import { Dispatch, SetStateAction } from "react";
import { UserDraftType } from "../../types/types.user";
import { Input } from "../Inputs/Input";

type RegisterFormType = {
  user: UserDraftType;
  setUser: Dispatch<SetStateAction<UserDraftType>>;
  showError: boolean;
};
export const RegisterForm = ({
  setUser,
  user,
  showError,
}: RegisterFormType) => {
  return (
    <>
      <Input
        label=" Username"
        name="username"
        value={user.username}
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        showError={showError}
        validate={(value) => value.length > 0}
        errorMessage="El nombre de usuario es obligatorio"
      />
      <Input
        label="Email "
        name="email"
        value={user.email}
        type="text"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        errorMessage="Email invalido"
        pattern="[^ @]*@[^ @]*"
        showError={showError}
      />
      <Input
        label="Contraseña"
        name="password"
        value={user.password}
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Contraseña"
        showError={showError}
        errorMessage="La contraseña es obligatoria"
        validate={(value) => value.length > 0}
        maxLength={12}
        minLength={4}
      />
      <Input
        label="Confirmar contraseña"
        name="password2"
        value={user.password2}
        type="password"
        onChange={(e) => setUser({ ...user, password2: e.target.value })}
        placeholder="Contraseña"
        validate={(value) => value === user.password && value.length > 0}
        errorMessage="Las contraseñas no coinciden"
        showError={showError}
      />
    </>
  );
};
