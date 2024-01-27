import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Bigscreen</title>
        <meta name="description" content="Application sondage Bigscreen" />
      </Helmet>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
