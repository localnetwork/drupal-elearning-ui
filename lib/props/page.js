import Jsona from "jsona";
const dataFormatter = new Jsona();
import PAGEAPI from "@/lib/api/pages/request";
// import { pagesPath } from "@/lib/services/propService";
import { pagesPath } from "../services/propService";

const paths = async () => {
  const pages = await pagesPath();

  const filteredPages = pages?.filter((e) => e.slug !== "/home") || [];

  // const contentTypes = ["node--article"];

  // const contentData = await Promise.all(
  //   contentTypes.map(async (contentType) => {
  //     return await contentEntriesPath(contentType);
  //   })
  // );
  // const pathsHandler = [...filteredPages, ...contentData.flat()];
  const pathsHandler = [...filteredPages];

  const paths = pathsHandler.map((page) => {
    const segments = page.slug.split("/").slice(1);

    return {
      params: { id: segments },
    };
  });
  return { paths, fallback: false };
};

const props = async (context) => {
  try {
    let id = context?.params?.id || "";

    // Special case: when Next.js calls "/" (index), map it to Drupal's "/home"
    if (!id || (Array.isArray(id) && id.length === 0)) {
      id = "home";
    } else {
      id = Array.isArray(id) ? id.join("/") : id;
    }

    const pageHandler = await PAGEAPI.findByRoute(id);
    const page = pageHandler?.data || null;

    const blocks =
      page?.relationships?.field_blocks?.map((e) => {
        let type = e.type.replace(/^.*--/, "");
        type = type.replace(/-./g, (match) => match[1].toUpperCase());
        type = type.charAt(0).toUpperCase() + type.slice(1);

        return {
          key: type,
          attributes: e.attributes ?? null,
          relationships: e.relationships ?? null,
        };
      }) || [];

    return {
      props: {
        page: page?.attributes ?? null,
        blocks,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export { paths, props };
