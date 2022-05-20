import Layout from "layouts/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditItemView, IndexView, ItemDetailsView, NewItemView } from "views";
import { newItemRoute } from "./routes/client";

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
          path={newItemRoute.path}
          element={
            <Layout variant="light">
              <NewItemView />
            </Layout>
          }
        />
        <Route
          path="/items/:itemId"
          element={
            <Layout variant="light">
              <ItemDetailsView />
            </Layout>
          }
        />
        <Route
          path="/items/:itemId/edit"
          element={
            <Layout variant="light">
              <EditItemView />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
