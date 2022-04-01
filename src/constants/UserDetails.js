export const userDetails = async (token) => {
  const requestBody = {
    headers: {
      accept: "application/vnd.github.v3+json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  requestBody.headers.Authorization = `token ${token}`;
  const res = await fetch("https://api.github.com/user", {
    method: "get",
    ...requestBody,
  })
    .then((response) => response.json())
    .then((data) => data);
  return res;
};
