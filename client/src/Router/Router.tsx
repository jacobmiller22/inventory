import Layout from "layouts/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  EditItemView,
  IndexView,
  ItemDetailsView,
  LocationsView,
  NewItemView,
  NewLocationView,
  TagsView,
  LocationDetailsView,
} from "views";

import { wildcardsToDynamicRoutes } from "./routes";
import {
  editItemRoute,
  itemDetailsRoute,
  itemsRoute,
  locationDetailsRoute,
  locationsRoute,
  newItemRoute,
  newLocationRoute,
  tagsRoute,
} from "./routes/client";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Item Routes */}
        <Route
          path={itemsRoute.path}
          element={
            <Layout variant="light" title={itemsRoute.name}>
              <IndexView />
            </Layout>
          }
        />
        <Route
          path={newItemRoute.path}
          element={
            <Layout variant="light" title={newItemRoute.name}>
              <NewItemView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(itemDetailsRoute)}
          element={
            <Layout variant="light" title={itemDetailsRoute.name}>
              <ItemDetailsView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editItemRoute)}
          element={
            <Layout variant="light" title={editItemRoute.name}>
              <EditItemView />
            </Layout>
          }
        />
        {/* Location Routes */}
        <Route
          path={locationsRoute.path}
          element={
            <Layout variant="light" title={locationsRoute.name}>
              <LocationsView />
            </Layout>
          }
        />
        <Route
          path={newLocationRoute.path}
          element={
            <Layout variant="light" title={newLocationRoute.name}>
              <NewLocationView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(locationDetailsRoute)}
          element={
            <Layout variant="light" title={newLocationRoute.name}>
              <LocationDetailsView />
            </Layout>
          }
        />
        {/* Tag Routes */}
        <Route
          path={tagsRoute.path}
          element={
            <Layout variant="light" title={tagsRoute.name}>
              <TagsView />
            </Layout>
          }
        />
        {/* User Routes */}
        {/* Admin Management Routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
