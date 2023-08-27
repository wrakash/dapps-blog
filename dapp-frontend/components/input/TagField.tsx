import React, { useState } from "react";

interface TagInputProps {
  initialTags: string[];
  title: string;
  onTagsChange: (tags: string[]) => void;
  className? : string;
}

const TagInput: React.FC<TagInputProps> = ({
  initialTags,
  onTagsChange,
  title,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(initialTags);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (!tags.includes(inputValue)) {
        const updatedTags = [...tags, inputValue];
        setTags(updatedTags);
        onTagsChange(updatedTags);
      }
      setInputValue("");
    }
    if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const updatedTags = tags.slice(0, tags.length - 1);
      setTags(updatedTags);
      onTagsChange(updatedTags);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

 
  return (
    <div className="w-full space-y-1">
      <label htmlFor={title} className="font-bold">
        {title}
      </label>
      <div className={`flex flex-wrap gap-2 p-2  rounded-md border border-gray-300 ${rest.className}`}>
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer"
            onClick={() => handleTagRemove(tag)}
          >
            {tag}
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 outline-none"
          placeholder="Type and press Enter to add tags"
        />
      </div>
    </div>
  );
};

export default TagInput;
