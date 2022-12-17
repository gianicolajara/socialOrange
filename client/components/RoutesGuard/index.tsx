import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loadingStateUser } from "../../types/enums/generalEnums";

interface ProviderRoutesGuardProps {
  children: React.ReactNode;
}

const RoutesGuard = ({ children }: ProviderRoutesGuardProps) => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();

  const authCheck = () => {
    //evitar re-renderizados antes de obtener los datos del usuario
    //solamente seguira si no se consigue un usuario o si se consigue
    if (
      loading === loadingStateUser.FAILED ||
      loading === loadingStateUser.SUCCEEDED ||
      loadingStateUser.SUCCEEDEDLOGOUT
    ) {
      if (!user && router.pathname !== "/login") {
        router.push("/login");
      } else if (user && router.pathname === "/login") {
        router.push("/");
        setAuth(true);
      } else {
        setAuth(true);
      }
    }
  };

  useEffect(() => {
    authCheck();

    const hideContent = () => setAuth(false);

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
      router.events.off("routeChangeStart", hideContent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return <>{auth && children}</>;
};

export default RoutesGuard;
