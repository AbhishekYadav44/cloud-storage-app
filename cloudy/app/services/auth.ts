const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const sendOtp = async (email: string) => {
  const res = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  otp: string
) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      otp,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};