export const BaseFetch = async (url, options = {}) => {
  const res = await fetch("http://localhost:8080/api" + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || "API request failed");
  }

  return res.json();
};
