import Layout from "@/components/layout";
import Portfolio from "./profile.mdx";

export default async function Home() {
  return (
    <Layout>
      <Portfolio />
    </Layout>
  );
}
export const runtime = "edge";
export const revalidate = 60;
