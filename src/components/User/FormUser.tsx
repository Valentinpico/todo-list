import { useState } from "react";
import { loginType, UserDraftType } from "../../types/types.user";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useStoreUtils } from "../../store/useStoreUtils";
const initialUserState: UserDraftType = {
  email: "",
  password: "",
  username: "",
  password2: "",
};
const initialLoginState: loginType = {
  emailOrUsername: "",
  password: "",
};
export const FormUser = () => {
  const setToast = useStoreUtils((state) => state.setToast);

  const [user, setUser] = useState<UserDraftType>(initialUserState);
  const [LoginState, setLoginState] = useState<loginType>(initialLoginState);
  const [showError, setShowError] = useState(false);

  const [register, setRegister] = useState(false);

  const handleRegisterMode = () => {
    setRegister(!register);
    setShowError(false);
    setUser(initialUserState);
    setLoginState(initialLoginState);
  };

  const handleSubmmit = () => {
    if (!register) {
      loginSubmit();
      return;
    }
    registerSubmit();
  };

  const loginSubmit = () => {
    if (LoginState.emailOrUsername === "" || LoginState.password === "") {
      setToast({
        message: "Los campos son obligatorios",
        type: "error",
        isVisible: true,
      });
      setShowError(true);
      return;
    }

    setShowError(false);
  };
  const registerSubmit = () => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.username === "" ||
      user.password2 === "" ||
      user.password !== user.password2
    ) {
      setToast({
        message: "Los campos son obligatorios",
        type: "error",
        isVisible: true,
      });
      setShowError(true);
      return;
    }
    setShowError(false);
  };

  return (
    <>
      <div className="my-4 m-auto text-lg bg-slate-100 p-4 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-2/5">
        <h1 className="text-2xl uppercase font-black text-blue-700 text-center my-2">
          {register ? "Registro de usuario" : "Inicio de sesion"}
        </h1>
        <div className="flex flex-col ">
          {!register ? (
            <LoginForm
              LoginState={LoginState}
              setLoginState={setLoginState}
              showError={showError}
            />
          ) : (
            <RegisterForm user={user} setUser={setUser} showError={showError} />
          )}
          <button
            onClick={handleSubmmit}
            className="text-center bg-blue-500 text-white uppercase rounded w-full my-2 p-1  hover:bg-blue-700 transition-all "
          >
            {register ? "Registrar" : "Iniciar sesión"}
          </button>

          <div className="flex justify-center text-sm text-gray-500 mt-3">
            <span>
              {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            </span>
            <button
              onClick={handleRegisterMode}
              className="text-blue-500 ml-1 hover:underline"
            >
              {register ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
