import { Paragraph } from "@/types/types";
import React from "react";

export function ParagraphsView({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <div className="space-y-10 mt-12">
      {paragraphs?.map((paragraph: Paragraph, index: number) => (
        <section key={index} id={`section-${index}`} className="text-justify pr-8">
          <p className="font-bold">{paragraph?.title}</p>
          <div dangerouslySetInnerHTML={{ __html: paragraph?.description }} />
        </section>
      ))}
    </div>
  );
}
