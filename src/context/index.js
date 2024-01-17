import React from "react";
import AuthProvider from "./AuthProvider";
import MoviesProvider from "./MoviesProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import Theme from "./Theme";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MoviesProvider>
          <AuthProvider>
            <Theme>{children}</Theme>
          </AuthProvider>
        </MoviesProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}
