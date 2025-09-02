import { paths, props } from "@/lib/props/page";
export const getStaticPaths = paths;
export const getStaticProps = props;
export default function DynamicPage({ page, blocks }) {
  return <div>Hello World</div>;
}
