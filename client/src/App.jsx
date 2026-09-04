import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Landing from "./views/Landing";
import WhatsAppButton from "./components/WhatsAppButton";
import DevTerminal from "./components/DevTerminal";
import AiRecruiterChatbot from "./components/AiRecruiterChatbot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />
      }
    ]
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <WhatsAppButton />
      <DevTerminal />
      <AiRecruiterChatbot />
    </>
  );
};

export default App;
