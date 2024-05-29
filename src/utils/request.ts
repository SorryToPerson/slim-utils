class HttpRequest {
  private defaultHeaders = {
    'Content-Type': 'application/json',
  };

  constructor(
    private requestInterceptor?: (options: RequestInit) => RequestInit,
    private responseInterceptor?: (response: Response) => Response,
  ) {}

  setRequestInterceptor(interceptor: (options: RequestInit) => RequestInit) {
    this.requestInterceptor = interceptor;
  }

  setResetRequestInterceptor(
    interceptor: (options: RequestInit) => RequestInit,
  ) {
    this.requestInterceptor = interceptor;
  }

  async sendRequest(url: string, options: RequestInit) {
    let mergedOptions: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(options.headers || {}),
      },
    };

    if (this.requestInterceptor) {
      mergedOptions = this.requestInterceptor(mergedOptions);
    }

    try {
      let response = await fetch(url, mergedOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (this.responseInterceptor) {
        response = this.responseInterceptor(response);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch request failed:', error);
      throw error;
    }
  }

  async get(url: string, params = {}, options = {}) {
    const searchParams = new URLSearchParams(params);
    const fullUrl = `${url}?${searchParams.toString()}`;
    return this.sendRequest(fullUrl, { method: 'GET', ...options });
  }

  async post(url: string, data = {}, options = {}) {
    return this.sendRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(url: string, data = {}, options = {}) {
    return this.sendRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(url: string, options = {}) {
    return this.sendRequest(url, {
      method: 'DELETE',
      ...options,
    });
  }

  async patch(url: string, data = {}, options = {}) {
    return this.sendRequest(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }
}

const httpClient = new HttpRequest();

export const request = {
  get: httpClient.get.bind(httpClient),
  post: httpClient.post.bind(httpClient),
  put: httpClient.put.bind(httpClient),
  delete: httpClient.delete.bind(httpClient),
  patch: httpClient.patch.bind(httpClient),
  setRequestInterceptor: httpClient.setRequestInterceptor.bind(httpClient),
  setResponseInterceptor:
    httpClient.setResetRequestInterceptor.bind(httpClient),
};
