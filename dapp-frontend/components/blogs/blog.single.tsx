import React from "react";
import Image from "next/image";
import Breadcrumbs from "../breadcrumbs";
import { Blog } from "@/types/types";
import {
  FaqView,
  IndexView,
  ParagraphsView,
  AuthorView,
  AuthorBioView,
} from "../view";

export function BlogSingle({ blog }: { blog: Blog }) {
  const breadcrumbs = [
    { label: "Blog", link: "/" },
    { label: blog.url },
  ];

  return (
    <div className="px-[1rem] md:px-[5rem] lg:px-[6rem] py-4 space-y-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <AuthorBioView author={blog.author} updatedAt={blog.updatedAt} />
      <IndexView indexes={blog.indexing} />

      <div className="space-y-4 py-6">
        <h1 className="text-xl font-semibold">{blog.title}</h1>
        <p className="text-xl font-normal">{blog.description}</p>

        <div className="relative h-48 md:h-60 lg:h-[80vh]">
          <Image
            alt="Image Alt"
            className="object-cover w-full h-full rounded"
            src={blog?.image}
            layout="fill"
          />
        </div>
      </div>

      <ParagraphsView paragraphs={blog.paragraphs} />
      <FaqView faqs={blog.faq} />
      <AuthorView author={blog.author} />
    </div>
  );
}
