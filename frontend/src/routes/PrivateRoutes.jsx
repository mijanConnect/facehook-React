import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "./../providers/PostProvider";

export default function PrivateRoute() {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="mx-auto max-w-[770px] py-8">
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
