import { Author } from "@/types/types";
import React from "react";
import Image from "next/image";

export function AuthorBioView({
  author,
  updatedAt,
}: {
  author: Author;
  updatedAt: string;
}) {
  return (
    <div className="w-full flex space-x-4 md:space-x-6 justify-center items-center py-4">
      <div
        className={`flex justify-center items-center ${
          author?.imageUrl && "border border-gray-200 rounded-full"
        }`}
      >
        <Image
          src={author.imageUrl}
          alt="Author-Image"
          width={134}
          height={134}
          className="border border-gray-200 rounded-full"
        />
      </div>

      <div className="w-full h-20 md:h-28 pb-2 md:pb-3 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-lg font-semibold">{author?.name}</p>
          <p className="text-gray-600">{author?.designation}</p>
        </div>

        <div className="w-full flex flex-col lg:flex-row space-y-1 lg:space-x-4 lg:items-center">
          <p className="text-sm text-gray-400">
            Updated: {new Date(updatedAt).toLocaleDateString()}
          </p>
          <p className="bg-gray-200 rounded px-2 p-1 text-xs w-20">5 min read</p>
        </div>
      </div>
    </div>
  );
}
