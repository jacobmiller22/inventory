import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "layouts/Main";
import { ItemsView, ItemDetailsView, ItemFormView } from "views/Items";

import {
  LocationsView,
  LocationFormView,
  LocationDetailsView,
} from "views/Locations";

import { TagDetailsView, TagsView } from "views/Tags";
import { wildcardsToDynamicRoutes } from "./routes";
import {
  editItemRoute,
  editLocationRoute,
  editTagRoute,
  itemDetailsRoute,
  itemsRoute,
  locationDetailsRoute,
  locationsRoute,
  loginRoute,
  newItemRoute,
  newLocationRoute,
  newTagRoute,
  signupRoute,
  tagDetailsRoute,
  tagsRoute,
} from "./routes/client";
import TagFormView from "views/Tags/TagFormView";
import { AuthGuard, LoginView, SignupView } from "views/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Item Routes */}
        <Route
          path={itemsRoute.path}
          element={
            <Layout variant="light" title={itemsRoute.name} auth>
              <ItemsView />
            </Layout>
          }
        />
        <Route
          path={newItemRoute.path}
          element={
            <Layout variant="light" title={newItemRoute.name} auth>
              <ItemFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editItemRoute)}
          element={
            <Layout variant="light" title={editItemRoute.name} auth>
              <ItemFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(itemDetailsRoute)}
          element={
            <Layout variant="light" title={itemDetailsRoute.name} auth>
              <ItemDetailsView />
            </Layout>
          }
        />
        {/* Location Routes */}
        <Route
          path={locationsRoute.path}
          element={
            <Layout variant="light" title={locationsRoute.name} auth>
              <LocationsView />
            </Layout>
          }
        />
        <Route
          path={newLocationRoute.path}
          element={
            <Layout variant="light" title={newLocationRoute.name} auth>
              <LocationFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editLocationRoute)}
          element={
            <Layout variant="light" title={editLocationRoute.name} auth>
              <LocationFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(locationDetailsRoute)}
          element={
            <Layout variant="light" title={locationDetailsRoute.name} auth>
              <LocationDetailsView />
            </Layout>
          }
        />
        {/* Tag Routes */}
        <Route
          path={tagsRoute.path}
          element={
            <Layout variant="light" title={tagsRoute.name} auth>
              <TagsView />
            </Layout>
          }
        />
        <Route
          path={newTagRoute.path}
          element={
            <Layout variant="light" title={newTagRoute.name} auth>
              <TagFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editTagRoute)}
          element={
            <Layout variant="light" title={editTagRoute.name} auth>
              <TagFormView />
            </Layout>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(tagDetailsRoute)}
          element={
            <Layout variant="light" title={tagDetailsRoute.name} auth>
              <TagDetailsView />
            </Layout>
          }
        />
        {/* Auth Routes */}
        <Route
          path={signupRoute.path}
          element={
            <Layout variant="light" title={signupRoute.name}>
              <SignupView />
            </Layout>
          }
        />
        <Route
          path={loginRoute.path}
          element={
            <Layout variant="light" title={loginRoute.name}>
              <LoginView />
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
