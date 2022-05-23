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
  editUserRoute,
  itemDetailsRoute,
  itemsRoute,
  locationDetailsRoute,
  locationsRoute,
  loginRoute,
  newItemRoute,
  newLocationRoute,
  newTagRoute,
  newUserRoute,
  signupRoute,
  tagDetailsRoute,
  tagsRoute,
  userDetailsRoute,
  usersRoute,
} from "./routes/client";
import TagFormView from "views/Tags/TagFormView";
import { AuthGuard, LoginView, SignupView } from "views/Auth";
import { UserDetailsView, UserFormView, UsersView } from "views/Users";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Item Routes */}
        <Route
          path={itemsRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={itemsRoute.name} auth>
                <ItemsView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={newItemRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={newItemRoute.name} auth>
                <ItemFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editItemRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={editItemRoute.name} auth>
                <ItemFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(itemDetailsRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={itemDetailsRoute.name} auth>
                <ItemDetailsView />
              </Layout>
            </AuthGuard>
          }
        />
        {/* Location Routes */}
        <Route
          path={locationsRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={locationsRoute.name} auth>
                <LocationsView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={newLocationRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={newLocationRoute.name} auth>
                <LocationFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editLocationRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={editLocationRoute.name} auth>
                <LocationFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(locationDetailsRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={locationDetailsRoute.name} auth>
                <LocationDetailsView />
              </Layout>
            </AuthGuard>
          }
        />
        {/* Tag Routes */}
        <Route
          path={tagsRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={tagsRoute.name} auth>
                <TagsView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={newTagRoute.path}
          element={
            <AuthGuard>
              <Layout variant="light" title={newTagRoute.name} auth>
                <TagFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editTagRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={editTagRoute.name} auth>
                <TagFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(tagDetailsRoute)}
          element={
            <AuthGuard>
              <Layout variant="light" title={tagDetailsRoute.name} auth>
                <TagDetailsView />
              </Layout>
            </AuthGuard>
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

        <Route
          path={usersRoute.path}
          element={
            <AuthGuard admin>
              <Layout variant="light" title={usersRoute.name} auth>
                <UsersView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={newUserRoute.path}
          element={
            <AuthGuard admin>
              <Layout variant="light" title={newUserRoute.name} auth>
                <UserFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(editUserRoute)}
          element={
            <AuthGuard admin>
              <Layout variant="light" title={editUserRoute.name} auth>
                <UserFormView />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path={wildcardsToDynamicRoutes(userDetailsRoute)}
          element={
            <AuthGuard admin>
              <Layout variant="light" title={userDetailsRoute.name} auth>
                <UserDetailsView />
              </Layout>
            </AuthGuard>
          }
        />

        {/* Admin Management Routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
