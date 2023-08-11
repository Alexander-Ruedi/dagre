import { Auth0Provider } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { AuthenticationGuard } from "../../../authentication/AuthenticationGuard";
import { TokenInject } from "../../api/TokenInject";
import { RoutingComponent } from "../routing/RoutingComponent";

interface LoginProps {
  componentToBeProtected: ComponentType;
}

export const LoginComponent = (props: LoginProps) => {
  const skipAuth = process.env.REACT_APP_AUTH0_DISABLED === "true";
  if (skipAuth) {
    return <RoutingComponent />;
  }

  const stage = getStage();

  return (
    <Auth0Provider {...getAuth0Config(stage)}>
      <TokenInject />
      <AuthenticationGuard component={props.componentToBeProtected} />
    </Auth0Provider>
  );
};

const getStage = (): Stage => {
  const hostname = window.location.hostname;

  let stage = Stage.local;
  if (hostname != "localhost") {
    if (hostname.split(".")[0] == "test") {
      stage = Stage.test;
    } else {
      stage = Stage.prod;
    }
  }
  return stage;
};

enum Stage {
  local,
  test,
  prod,
}

const getAuth0Config = (stage: Stage) => {
  const config = {
    clientId: "No client id",
    domain: "auth.optravis.com",
    authorizationParams: {
      redirect_uri: window.location.origin + process.env.PUBLIC_URL + "/",
      audience: "No Audience",
    },
  };
  switch (stage) {
    case Stage.prod:
      config.clientId = "FoYxeIczG6Ju3uyliDndrFMCFUCNDDye";
      config.authorizationParams.audience = "sctool.optravis.com";
      break;
    case Stage.test:
      config.clientId = "aW1gfrI6MhNoRNdxDAzB5tfQ00Kcs7JU";
      config.authorizationParams.audience = "test.sctool.optravis.com";
      break;
    case Stage.local:
      config.clientId = "9nGFgt54BMVGe2VwgV2GGAYQvGlsQilQ";
      config.authorizationParams.audience = "local.sctool.optravis.com";
      break;
  }
  return config;
};
