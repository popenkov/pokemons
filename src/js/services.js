import PocketBase from "pocketbase";
import { state } from "./state";

export const BASE_URL = "http://127.0.0.1:8090";

export const FILE_URL = "http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME";

const pb = new PocketBase(BASE_URL);

export const getMenuData = async () => {
  const data = await pb.collection("types").getFullList();

  return data;
};

export const getPockemons = async () => {
  const { currentPage, type, perPage } = state;
  console.log(currentPage, type, perPage);
  const data = await pb.collection("pockemon").getList(currentPage, perPage, {
    sort: "+id",
    filter: type !== "All" ? `type ~ "${type}"` : "",
  });

  return data;
};
