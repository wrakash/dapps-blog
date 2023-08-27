import React from "react";
import Image from "next/image";
import Link from "next/link";

export function BlogList({ blogs }: { blogs: any }) {
  return (
    <div className="px-[1rem] md:px-[5rem] lg:px-[6rem] py-4">
      <div className="col-span-full text-left mb-4">
        <p className="text-xl font-semibold">All Blogs</p>
      </div>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 ">
        {blogs?.map((blog: any) => (
          <Link
            href={blog._id}
            key={blog?._id}
            className="block rounded-md overflow-hidden bg-gray-200"
          >
            <div className="relative h-48 md:h-60 lg:h-64">
              <Image
                alt="Image Alt"
                className="object-cover w-full h-full"
                src={blog?.image}
                layout="fill"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{blog.title}</p>
              <p className="text-sm line-clamp-3">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
