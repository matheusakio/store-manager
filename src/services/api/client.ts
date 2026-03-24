const BASE_URL = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const hasJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const data = hasJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Erro na requisição.");
  }

  return data as T;
}

export const api = {
  get<T>(path: string) {
    return request<T>(path, {
      method: "GET",
    });
  },

  post<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete(path: string) {
    return request<void>(path, {
      method: "DELETE",
    });
  },
};
