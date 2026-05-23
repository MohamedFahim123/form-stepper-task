export async function fetchApi<TData>(
  endpoint: string,
  options: RequestInit = {},
): Promise<TData> {
  const response = await fetch(`/api/${endpoint}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data as TData;
}
