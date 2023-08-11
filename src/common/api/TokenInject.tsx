import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { authInterceptor } from "./AuthInterceptor";

export const TokenInject = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    authInterceptor.setAccessTokenProvider(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return null;
};
