import PAGEAPI from "@/lib/api/pages/request";

export async function getStaticProps() {
  // Always load Drupal's "/home" for the Next.js homepage
  const pageHandler = await PAGEAPI.findByRoute("/home");
  const page = pageHandler?.data || null;

  const blocks = page.relationships?.field_blocks
    ? page.relationships.field_blocks.map((e) => {
        let type = e.type.replace(/^.*--/, "");
        type = type.replace(/-./g, (match) => match[1].toUpperCase());
        type = type.charAt(0).toUpperCase() + type.slice(1);

        return {
          key: type,
          attributes: e.attributes ?? null,
          relationships: e.relationships ?? null,
        };
      })
    : [];

  return {
    props: {
      page: page?.attributes ?? null,
      blocks,
    },
  };
}

export default function Homepage({ page, blocks }) {
  return (
    <>
      <h1>{page?.title || "Homepage"}</h1>
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </>
  );
}
