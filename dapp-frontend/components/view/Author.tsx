import { Author } from "@/types/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export function AuthorView({ author }: { author: Author }) {
  return (
    <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center sm:items-start py-6">
      <div
        className={`flex justify-center items-center ${
          author.imageUrl && "border border-gray-200 rounded-full"
        }`}
      >
        <Image
          src={author.imageUrl}
          alt="Author-Image"
          width={134}
          height={134}
          className="rounded-full"
        />
      </div>

      <div className="w-full h-full flex flex-col space-y-2 pr-0 sm:pr-8">
        <p className="text-center sm:text-left">{author.name}</p>
        <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <p>Follow on: </p>
          <Link href={author.twitterUrl}>
            <div className="flex justify-center items-center space-x-2 bg-black px-4 sm:px-8 rounded-lg text-white py-0.5">
              <span>Twitter</span>
            </div>
          </Link>
        </div>
        <p className="text-justify">{author.description}</p>
      </div>
    </div>
  );
}
