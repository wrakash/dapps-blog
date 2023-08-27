"use client";
import { FAQ } from "@/types/types";
import React, { useState } from "react";

export function FaqView({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="py-6">
      <p className="font-bold text-2xl mb-4">Frequently Asked Questions</p>
      <div className="w-full mt-4">
        <div className="w-full flex flex-col space-y-4">
          {faqs.map((faq: FAQ, index: number) => (
            <div
              key={index}
              className="rounded-lg bg-gradient-to-r space-y-2"
            >
              <button
                onClick={() => handleToggle(index)}
                className="flex w-full justify-between rounded-lg bg-white px-4 py-1 text-left text-sm font-medium text-black hover:bg-gray-100 focus:outline-none"
              >
                <span>{`Q : ${faq.question}`}</span>
                <span
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 text-sm text-gray-500">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
