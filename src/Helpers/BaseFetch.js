export const BaseFetch = async (url, options = {}) => {
  const res = await fetch("http://localhost:8080/api" + url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!res.ok) {
    const error = isJson ? await res.json() : await res.text();
    throw new Error(
      typeof error === "string" ? error : error.message || "API request failed"
    );
  }

  return isJson ? res.json() : null;
};
