import React, { useState, useEffect } from "react";
import { TextField } from "./TextField";
import { ImageField } from "./ImageField";
import { TextArea } from "./TextArea";

interface AuthorInputProps {
  author: {
    name: string;
    designation: string;
    description: string;
    imageUrl: any;
    twitterUrl: string;
  };
  setAuthor: React.Dispatch<
    React.SetStateAction<{
      name: string;
      designation: string;
      description: string;
      imageUrl: any;
      twitterUrl: string;
    }>
  >;
  title: string;
}

export const AuthorField: React.FC<AuthorInputProps> = (props) => {
  const { author, setAuthor } = props;
  const { name, designation, description, imageUrl, twitterUrl } = author;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleImageChange = (url: string) => {
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      imageUrl: url,
    }));
  };

  return (
    <div className="w-full  pt-2">
      <label htmlFor={props?.title} className="font-bold">
        {props?.title}
      </label>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <TextField
              placeholder="enter name"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full h-10 focus:outline-none py-1 px-1  rounded border border-gray-300"
            >
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
            </TextField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <TextField
              name="designation"
              placeholder="enter designation"
              value={designation}
              onChange={handleInputChange}
              className="w-full h-10 focus:outline-none py-1 px-1  rounded border border-gray-300"
            >
              <label
                htmlFor="Designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
            </TextField>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <TextArea
              name="description"
              placeholder="enter description"
              value={description}
              onChange={handleInputChange}
              className="h-40  border border-gray-300 w-full  focus:outline-none py-1 px-1 rounded-md"
            >
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
            </TextArea>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <TextField
              name="twitterUrl"
              placeholder="enter Twitter URL"
              value={twitterUrl}
              onChange={handleInputChange}
              className="w-full h-10 focus:outline-none py-1 px-1  rounded border border-gray-300"
            >
              <label
                htmlFor=" Twitter URL"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter URL
              </label>
            </TextField>
          </div>
        </div>
        <div>
          <ImageField
            url={imageUrl}
            setUrl={handleImageChange}
            title="choose author image"
            isRound={true}
          />
        </div>
      </div>
    </div>
  );
};
