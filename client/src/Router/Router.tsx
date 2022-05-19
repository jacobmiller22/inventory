import Layout from "layouts/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexView, NewItemView } from "views";

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

        <Route
          path="/items/new"
          element={
            <Layout variant="light">
              <NewItemView />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
