import React from "react";
import { TextArea } from "../TextArea";
import { TextField } from "../TextField";

interface InputItem {
  question: string;
  answer: string;
}

interface DynamicInputProps {
  title: string;
  inputList: InputItem[];
  setInputList: React.Dispatch<React.SetStateAction<InputItem[]>>;
}

export const FaqDynamicInput: React.FC<DynamicInputProps> = ({
  inputList,
  setInputList,
  title,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list: InputItem[] = [...inputList];
    list[index] = { ...list[index], [name]: value };
    setInputList(list);
  };

  const handleRemoveClick = (index: number) => {
    const list: InputItem[] = inputList.filter((_, i) => i !== index);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { question: "", answer: "" }]);
  };

  return (
    <div className="w-full space-y-4">
      <label htmlFor={title} className="font-bold block">
        {title}
      </label>
      {inputList.map((x, i) => (
        <div
          key={i}
          className="w-full md:space-y-0 md:flex md:items-end lg:items-center md:space-x-4"
        >
          <TextField
            name="question"
            placeholder="Enter the title"
            value={x.question}
            onChange={(e) => handleInputChange(e, i)}
            className="w-full h-10 focus:outline-none py-1 px-1  rounded border border-gray-300"
          >
            <label
              htmlFor="Question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
          </TextField>

          <TextArea
            name="answer"
            placeholder="Enter the description"
            value={x.answer}
            onChange={(e: any) => handleInputChange(e, i)}
            className="h-10 border border-gray-300 w-full focus:outline-none py-1 px-1 rounded-md"
          >
            <label
              htmlFor="Answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
          </TextArea>

          <div className="flex space-x-2">
            {inputList.length !== 1 && (
              <button
                onClick={() => handleRemoveClick(i)}
                className="bg-red-500 text-white px-2 py-1 lg:mt-4 rounded"
              >
                Remove
              </button>
            )}
            {inputList.length - 1 === i && (
              <button
                onClick={handleAddClick}
                className="bg-green-500 text-white px-2 py-1 lg:mt-4 rounded"
              >
                Add
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
