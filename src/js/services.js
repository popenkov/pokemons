import PocketBase from "pocketbase";
import { state } from "./state";

export const BASE_URL = "http://127.0.0.1:8090";

export const FILE_URL = "http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME";

const pb = new PocketBase(BASE_URL);

export const getMenuData = async () => {
  // todo pb
  // const data = await pb.collection("types").getFullList();
  try {
    const response = await fetch(`${BASE_URL}/api/collections/types/records`);

    if (response.status === 200) {
      const data = await response.json();
      return data.items;
    }
  } catch (err) {
    console.log("Ошибка загрузки", err.message);
  }
};

export const getPockemons = async () => {
  const { currentPage, type, perPage } = state;
  const data = await pb.collection("pockemon").getList(currentPage, perPage, {
    sort: "+id",
    filter: type !== "Normal" && type !== "All" ? `type ~ "${type}"` : "",
  });

  return data;
};
