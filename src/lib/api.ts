const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> ?? {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const json = await res.json().catch(() => ({}))

  if (!res.ok) throw new Error(json.error ?? `Error ${res.status}`)
  return json as T
}
