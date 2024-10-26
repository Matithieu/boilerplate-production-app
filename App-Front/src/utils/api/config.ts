import handleToastErrors from './errors/handleToastErrors'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * Fetches data from the API with the provided configuration.
 * @param url - The URL to fetch data from.
 * @param method - The HTTP method to use for the request.
 * @param options - Additional options for the fetch request.
 * @returns A Promise that resolves to the fetched data.
 * @throws An error if the API request fails.
 * @example fetchWithConfig("/api/v1/data", "POST")
 */
export const fetchWithConfig = async (
  url: string,
  method: HttpMethod,
  options?: { body?: any; headers?: Record<string, string> },
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_API_PREFIX

  const response = await fetch(baseUrl + url, {
    ...options,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  handleToastErrors(response, url)

  return response
}
