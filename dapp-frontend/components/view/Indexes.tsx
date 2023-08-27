import Link from 'next/link';
import React from 'react';

interface IndexViewProps {
  indexes: string[];
}

export function IndexView({ indexes }: IndexViewProps) {
  return (
    <>
      <p className="font-bold">Index: </p>
      <div className="flex flex-col space-y-1 mt-1">
        {indexes.map((title, index) => (
          <Link href={`#section-${index}`} key={title}>
            <div className="text-blue-600 cursor-pointer">
              {`${index + 1}. ${title}`}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
