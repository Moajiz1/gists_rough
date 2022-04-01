import axios from "axios";
import { localToken } from "./Utfn";

const client = axios.create({ baseURL: "https://api.github.com" });
export const api = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localToken}`;
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    console.log("error", error);
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

// export const GetGists = async () => {
//   const req = await request({ url: `/gists` });
//   return req.data;
// };
