import { useState } from "react";
import { modeFormLogin } from "../../types/enums/generalEnums";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import PresentationLogin from "./PresentationLogin";

const Login = () => {
  const [modeForm, setModeForm] = useState(modeFormLogin.LOGIN);

  const handleChangeModeForm = (mode: modeFormLogin): void => setModeForm(mode);

  return (
    <section aria-label="login-section" className="w-full h-full">
      <div className="grid grid-cols-1 grid-rows-[auto,_1fr] lg:grid-cols-2 lg:grid-rows-1 w-full min-h-screen ">
        <div className="w-full h-full flex flex-col bg-orange-300 p-10 justify-center items-center">
          <PresentationLogin />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full bg-neutral-100">
          {modeForm === modeFormLogin.LOGIN ? (
            <FormLogin />
          ) : (
            <FormRegister setModeForm={setModeForm} />
          )}
          <div className="w-full flex flex-col justify-center items-center mt-5">
            <small className="text-orange-300 hover:text-orange-500 text-center transition-all select-none">
              {modeForm === modeFormLogin.LOGIN ? (
                <a
                  className="cursor-pointer"
                  onClick={() => handleChangeModeForm(modeFormLogin.REGISTER)}
                >
                  Crear cuenta
                </a>
              ) : (
                <a
                  className="cursor-pointer"
                  onClick={() => handleChangeModeForm(modeFormLogin.LOGIN)}
                >
                  Ingresar a mi cuenta
                </a>
              )}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
