import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { RootState, useAppDispatch } from "../../redux/store";
import { loginUserThunk } from "../../redux/thunks/user.thunk";
import { useSelector } from "react-redux";
import { loadingStateUser } from "../../types/enums/generalEnums";
import { toast } from "react-toastify";
import { errorToast } from "../../utils/toasts";

const initialFormLogin = {
  username: "",
  password: "",
};

const FormLogin = () => {
  const [formLogin, setFormLogin] = useState(initialFormLogin);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserThunk(formLogin));
  };

  useEffect(() => {
    if (loading === loadingStateUser.SUCCEEDED && !error) {
      setFormLogin(initialFormLogin);
    }

    if (loading === loadingStateUser.FAILED && error) {
      errorToast("Algo fue mal, intentelo de nuevo");
    }
  }, [error, loading, router]);

  return (
    <div className="md:max-w-[400px] w-full h-max rounded-lg shadow-lg flex flex-col p-5 items-center bg-white ">
      <h2 className="text-3xl mb-10">Login</h2>
      <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-5">
        <Input
          placeholder="Usuario"
          name="username"
          onChange={handleOnChange}
          value={formLogin.username}
          error={error?.errors?.username?.msg}
        />
        <Input
          placeholder="Contraseña"
          name="password"
          type="password"
          onChange={handleOnChange}
          value={formLogin.password}
          error={error?.errors?.password?.msg}
        />
        <Button type="submit" loading={loading === loadingStateUser.PENDING}>
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;
