import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { RootState, useAppDispatch } from "../../redux/store";
import { registerUserThunk } from "../../redux/thunks/user.thunk";
import { useSelector } from "react-redux";
import { loadingState, modeFormLogin } from "../../types/enums/generalEnums";
import { toast } from "react-toastify";

const initialFormRegister = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
};

interface FormRegisterProps {
  setModeForm: Dispatch<SetStateAction<modeFormLogin>>;
}

const FormRegister = ({ setModeForm }: FormRegisterProps) => {
  const [formRegister, setformRegister] = useState(initialFormRegister);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setformRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUserThunk(formRegister));
  };

  useEffect(() => {
    if (loading === loadingState.SUCCEEDED && !error) {
      setformRegister(initialFormRegister);
      toast("Usuario creado con exito", {
        type: "success",
      });
    }

    if (loading === loadingState.FAILED && error) {
      toast("Algo fue mal, intentelo de nuevo", {
        type: "error",
      });
    }
  }, [error, loading, router]);

  return (
    <div className="md:max-w-[400px] w-full h-max rounded-lg shadow-lg flex flex-col p-5 items-center bg-white ">
      <h2 className="text-3xl mb-10">Registrar</h2>
      <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-5">
        <Input
          placeholder="Nombre"
          name="firstName"
          onChange={handleOnChange}
          value={formRegister.firstName}
          error={error?.errors?.firstName?.msg}
        />
        <Input
          placeholder="Apellido"
          name="lastName"
          onChange={handleOnChange}
          value={formRegister.lastName}
          error={error?.errors?.lastName?.msg}
        />
        <Input
          placeholder="Usuario"
          name="username"
          onChange={handleOnChange}
          value={formRegister.username}
          error={error?.errors?.username?.msg}
        />
        <Input
          placeholder="Contraseña"
          name="password"
          type="password"
          onChange={handleOnChange}
          value={formRegister.password}
          error={error?.errors?.password?.msg}
        />
        <Button type="submit" loading={loading === loadingState.PENDING}>
          Crear
        </Button>
      </form>
    </div>
  );
};

export default FormRegister;
