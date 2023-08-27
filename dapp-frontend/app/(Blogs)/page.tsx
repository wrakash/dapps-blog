import type { Metadata } from "next";
import { getBlogs } from "@/lib";
import { BlogList } from "@/components";
import { Blog } from "@/types/types";

export const metadata: Metadata = {
  title: "Blogs",
};

export const revalidate = 1; // revalidate at most every hour

async function Blogs() {
  const { data: blogsData }: { data: Promise<Blog[]> } = await getBlogs();
  const blogs = await blogsData;
  return <BlogList blogs={blogs} />;
}

export default Blogs;
