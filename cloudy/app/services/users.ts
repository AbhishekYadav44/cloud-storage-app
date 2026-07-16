const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/user/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const logoutAll = async () => {
  const res = await fetch(`${BASE_URL}/user/user/logout-all`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/user/user`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/users`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getDeletedUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/user/deletedUsers`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const logoutUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/user/user/${id}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${BASE_URL}/user/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const deleteUserHard = async (id: string) => {
  const res = await fetch(`${BASE_URL}/user/users/${id}/hard`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};