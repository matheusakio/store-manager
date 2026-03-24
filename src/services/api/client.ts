export const api = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`/api${url}`);
    const data = await response.json();
    return data;
  },

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(`/api${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  },

  async put<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(`/api${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  },

  async delete(url: string) {
    await fetch(`/api${url}`, {
      method: "DELETE",
    });
  },
};
