import PAGEAPI from "../api/pages/request";
import Jsona from "jsona";
const dataFormatter = new Jsona();
export async function pagesPath() {
  // First request
  const pagesHandler = await PAGEAPI.getPages();

  // First batch of
  let allData = pagesHandler.data;

  // Pagination info
  const totalPages = pagesHandler?.meta?.pages ?? 1;
  let currentPage = pagesHandler?.meta?.page ?? 0;

  // Loop through remaining pages
  while (currentPage + 1 < totalPages) {
    currentPage += 1;
    const nextHandler = await PAGEAPI.getPages(`?page=${currentPage}&limit=10`);
    const nextPages = dataFormatter.deserialize(nextHandler);
    allData = [...allData, ...nextPages];
  }
  return allData;
}
