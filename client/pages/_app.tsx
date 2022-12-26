import "../styles/globals.css";
import { AppPropsWithLayout } from "../types/types/generalTypes";
import { Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesGuard from "../components/RoutesGuard";
import UserRegeneration from "../components/UserRegeneration";
import { useEffect } from "react";
import { socket } from "../utils/socket";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "500", "800"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ToastContainer className="z-[999999999]" />
      {getLayout(
        <main className={`${poppins.className} w-full h-max`}>
          <UserRegeneration>
            <RoutesGuard>
              <Component {...pageProps} />
            </RoutesGuard>
          </UserRegeneration>
        </main>
      )}
    </Provider>
  );
}
