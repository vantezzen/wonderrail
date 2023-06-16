import AuthenticatedRoute from "@/components/Layout/AuthenticatedRoute";
import UserProvider from "@/components/Layout/UserProvider";
import NoSsr from "@/components/Various/NoSsr";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NoSsr>
      <AuthenticatedRoute>
        <UserProvider>{children}</UserProvider>
      </AuthenticatedRoute>
    </NoSsr>
  );
}

export default AppLayout;
