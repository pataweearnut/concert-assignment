import { Role } from '../types/role';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type ApiFetchOptions = RequestInit & {
  userId: string;
  role: Role;
};

export async function apiFetch<T = void>(
  path: string,
  { userId, role, headers, body, ...rest }: ApiFetchOptions,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
      'x-role': role,
      ...headers,
    },
    body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

async function parseError(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type');

  try {
    if (contentType?.includes('application/json')) {
      const json = await res.json();
      return json?.message ?? JSON.stringify(json);
    }
    return await res.text();
  } catch {
    return 'Request failed';
  }
}
