const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const uploadFile = async (
  parentDirId: string | undefined,
  file: File
) => {
  const res = await fetch(
    `${BASE_URL}${parentDirId ? `/file/${parentDirId}` : "/file"}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        filename: file.name,
      },
      body: file,
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const renameFile = async (
  id: string,
  newFilename: string
) => {
  const res = await fetch(`${BASE_URL}/file/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newFilename }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const deleteFile = async (id: string) => {
  const res = await fetch(`${BASE_URL}/file/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getFileUrl = (
  id: string,
  download = false
) => {
  return `${BASE_URL}/file/${id}${download ? "?action=download" : ""
    }`;
};

export const uploadinitiate = async (fileData: any) => {
  console.log("fileData:", fileData);
  console.log("is FormData:", fileData instanceof FormData);

  const res = await fetch(`${BASE_URL}/file/upload/initiate`, {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fileData),
    credentials: "include",
  });
  console.log("res", res)
  let data = await res.json()
  return data;

}