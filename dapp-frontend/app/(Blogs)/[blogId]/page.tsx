import { BlogSingle, NotFound } from "@/components";
import { getBlog, getBlogs } from "@/lib";
import { Blog } from "@/types/types";
import { Metadata } from "next";

type Params = {
  params: {
    blogId: string;
  };
};

export async function generateMetadata({
  params: { blogId },
}: Params): Promise<Metadata> {
  const { data: blog }: { data: Blog } = await getBlog(blogId);

  if (!blog.title) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: `This is the page of ${blog.title}`,
  };
}

export default async function BlogPage({ params: { blogId } }: Params) {
  const { data: blogData }: { data: Promise<Blog> } = await getBlog(blogId);

  const blog = await blogData;

  if (!blog.title) NotFound();
  return <BlogSingle blog={blog} />;
}

export async function generateStaticParams() {
  const { data: blogsData }: { data: Promise<Blog[]> } = await getBlogs();
  const blogs = await blogsData;

  return blogs.map((blog) => ({
    blogId: blog._id.toString(),
  }));
}
