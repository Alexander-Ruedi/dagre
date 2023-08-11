import { GetTokenSilentlyOptions } from "@auth0/auth0-spa-js";
import { InternalAxiosRequestConfig } from "axios";

class AuthInterceptor {
  tokenProvider: ((options?: GetTokenSilentlyOptions) => Promise<string>) | null = null;

  constructor() {
    this.intercept = this.intercept.bind(this);
  }

  setAccessTokenProvider(tokenProvider: ((options?: GetTokenSilentlyOptions) => Promise<string>) | null) {
    this.tokenProvider = tokenProvider;
  }

  async intercept(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    if (!this.tokenProvider) {
      return config;
    }

    const token = await this.tokenProvider();
    config.headers.setAuthorization(`Bearer ${token}`);

    return config;
  }
}

export const authInterceptor = new AuthInterceptor();
