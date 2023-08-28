"use Client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";
import { SpinnerLoader } from "../loader";

interface ImageFieldProps {
  title: string;
  isRound: boolean;
  url: string;
  setUrl: (url: string) => void;
  className?: string;
}

export const ImageField: React.FC<ImageFieldProps> = ({
  url,
  setUrl,
  title,
  isRound,
  ...rest
}) => {
  const [preview, setPreview] = useState<string>(url);
  const [isDropzoneActive, setIsDropzoneActive] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const session = useSession();

  const onDrop = async (acceptedFiles: File[]) => {
    let token: any = session.data?.user?.accessToken;
    const selectedFile = acceptedFiles[0];
    const image = await handleUpload(selectedFile, token);
    setUrl(image);
    setPreview(URL.createObjectURL(selectedFile));
    setIsDropzoneActive(false);
  };

  const clearImage = () => {
    setPreview("");
    setIsUploading(false);
    setIsDropzoneActive(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    //accept: 'image/*',
    onDrop,
    disabled: !isDropzoneActive,
  });

  const handleUpload = async (file: File, token: string) => {
    try {
      setIsUploading(true); // Start uploading
      const formData = new FormData();
      formData.append("file", file);

      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/aws/upload`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        let res = await response.json();
        toast.success("Upload successful");
        setIsUploading(false); // Upload finished
        return res.data;
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsUploading(false); // Upload failed
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isUploading ? (
        <SpinnerLoader/>
      ) : (
        <div className="flex flex-col items-center ">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed ${
              rest.className
            } rounded-lg cursor-pointer relative ${
              isDropzoneActive ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            style={{ width: "100%", height: "100%" }}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="relative w-full h-full flex justify-center items-center">
                <Image
                  src={preview}
                  alt="Uploaded"
                  width={96}
                  height={96}
                  layout={isRound ? "fixed" : "responsive"}
                  className={`${
                    isRound
                      ? "w-48 h-48 rounded-full"
                      : "w-full h-full object-cover rounded-lg"
                  }`}
                />

                <button
                  onClick={clearImage}
                  className="absolute top-0 right-0 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-600">{title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
