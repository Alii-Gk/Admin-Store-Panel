import TanstackQueryProvider from "provider/TanstackQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "router/Router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <TanstackQueryProvider>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={true}
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default App;
