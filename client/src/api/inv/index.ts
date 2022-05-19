import axios from "axios";

const locationApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/locations`,
});

export const getLocations = async () => {
  const res = await locationApi.get("/");
  console.log(res);

  const locations: any[] = res.data;

  return locations;
};

const itemApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/items`,
});

export const getItems = async () => {
  const res = await itemApi.get("/");
  console.log(res);

  const items: any[] = res.data;

  return items;
};
