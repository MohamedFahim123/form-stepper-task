/** 
  * Fetch API utility function to make requests to the backend API. It handles JSON responses and errors.
  * @param endpoint - The API endpoint to fetch data from.
  * @param options - Optional fetch options such as method, headers, and body.
  * @returns A promise that resolves to the data of type TData or throws an error if the response is not ok.
  */

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
