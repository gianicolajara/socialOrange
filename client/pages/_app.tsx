import "../styles/globals.css";
import { AppPropsWithLayout } from "../types/types/generalTypes";
import { Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesGuard from "../components/RoutesGuard";
import UserRegeneration from "../components/UserRegeneration";
import ModalProvider from "../contexts/modalContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "500", "800"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ModalProvider>
        <ToastContainer className="z-[999999999]" />
        {getLayout(
          <main className={`${poppins.className} w-full h-full`}>
            <UserRegeneration>
              <RoutesGuard>
                <Component {...pageProps} />
              </RoutesGuard>
            </UserRegeneration>
          </main>
        )}
      </ModalProvider>
    </Provider>
  );
}
