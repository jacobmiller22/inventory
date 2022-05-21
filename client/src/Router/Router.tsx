import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "layouts/Main";
import {
  EditItemView,
  IndexView,
  ItemDetailsView,
  NewItemView,
} from "views/Items";

import {
  LocationsView,
  LocationFormView,
  LocationDetailsView,
} from "views/Locations";

import { TagsView } from "views/Tags";
import { wildcardsToDynamicRoutes } from "./routes";
import {
  editItemRoute,
  editLocationRoute,
  editTagRoute,
  itemDetailsRoute,
  itemsRoute,
  locationDetailsRoute,
  locationsRoute,
  newItemRoute,
  newLocationRoute,
  newTagRoute,
  tagsRoute,
} from "./routes/client";
import TagFormView from "views/Tags/TagFormView";

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
              <LocationFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editLocationRoute)}
          element={
            <Layout variant="light" title={editLocationRoute.name}>
              <LocationFormView />
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
        <Route
          path={tagsRoute.path}
          element={
            <Layout variant="light" title={tagsRoute.name}>
              <TagsView />
            </Layout>
          }
        />
        <Route
          path={newTagRoute.path}
          element={
            <Layout variant="light" title={tagsRoute.name}>
              <TagFormView />
            </Layout>
          }
        />
        <Route
          path={editTagRoute.path}
          element={
            <Layout variant="light" title={tagsRoute.name}>
              <TagFormView />
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
