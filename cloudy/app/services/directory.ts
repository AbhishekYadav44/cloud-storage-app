const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getDirectory = async (id?: string) => {
  const res = await fetch(
    `${BASE_URL}${id ? `/directory/${id}` : "/directory"}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const createDirectory = async (
  parentDirId: string | undefined,
  name: string
) => {
  const res = await fetch(
    `${BASE_URL}${parentDirId ? `/directory/${parentDirId}` : "/directory"}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        dirname: name,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const renameDirectory = async (
  id: string,
  newDirName: string
) => {
  const res = await fetch(`${BASE_URL}/directory/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newDirName }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const deleteDirectory = async (id: string) => {
  const res = await fetch(`${BASE_URL}/directory/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};