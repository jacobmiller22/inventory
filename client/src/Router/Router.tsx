import Layout from "layouts/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexView } from "views";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout variant="light">
              <IndexView />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
