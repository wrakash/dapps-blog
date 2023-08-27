"use client";
import { BasicDatagrid } from "@/components/datagrid";
import {
  getRequest,
  optimisticOptions,
  queries,
  updateRequest,
} from "@/custom-react-query";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  AuthorField,
  ImageField,
  ParagraphDynamicInput,
  FaqDynamicInput,
  TextArea,
  TextField,
} from "../input";
import TagInput from "../input/TagField";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SpinnerLoader } from "../loader";

const EditComponent = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  let id = searchParams?.get("id");

  //edit a existing blog
  const { data: { data: blog } = {}, isLoading } = useQuery(
    [queries.blog, id],
    () => getRequest(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs/${id}`, ""),
    { enabled: !!id }
  );

  //create a new blog
  const { mutate: editBlog } = useMutation(
    updateRequest,
    optimisticOptions(queries.blogs)
  );

  //general change
  const [common, setCommon] = useState({
    title: "",
    description: "",
  });

  //author change
  const [author, setAuthor] = useState({
    name: "",
    designation: "",
    description: "",
    imageUrl: "",
    twitterUrl: "",
  });

  //keywords change
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //blog image
  const [blogImage, setBlogImage] = useState<string>("");

  //paragraph inputs
  const [paragraphList, setParagraphList] = useState([
    { title: "", description: "" },
  ]);

  //paragraph inputs
  const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);

  const [error, setError] = useState({
    title: "",
    description: "",
    authorName: "",
    authorDesignation: "",
    blogImage: "",
    paragraphs: "",
    faqs: "",
  });

  const validateForm = () => {
    const newErrors = { ...error };

    // Validate title and description
    if (!common.title) {
      newErrors.title = "Title is required";
    } else {
      newErrors.title = "";
    }
    if (!common.description) {
      newErrors.description = "Description is required";
    } else {
      newErrors.description = "";
    }

    // Validate author
    if (!author.name) {
      newErrors.authorName = "Author name is required";
    } else {
      newErrors.authorName = "";
    }
    if (!author.designation) {
      newErrors.authorDesignation = "Author designation is required";
    } else {
      newErrors.authorDesignation = "";
    }

    // Validate blog image
    if (!blogImage) {
      newErrors.blogImage = "Blog image is required";
    } else {
      newErrors.blogImage = "";
    }

    // Validate paragraphs
    const isAnyParagraphEmpty = paragraphList.some(
      (paragraph) => !paragraph.title || !paragraph.description
    );
    if (isAnyParagraphEmpty) {
      newErrors.paragraphs = "All paragraphs must have a title and description";
    } else {
      newErrors.paragraphs = "";
    }

    // Validate FAQs
    const isAnyFaqEmpty = faqList.some((faq) => !faq.question || !faq.answer);
    if (isAnyFaqEmpty) {
      newErrors.faqs = "All FAQs must have a question and answer";
    } else {
      newErrors.faqs = "";
    }

    setError(newErrors);

    return Object.values(newErrors).every((val) => val === "");
  };

  const handleInputChane = (value: string, name: string) => {
    setCommon({ ...common, [name]: value });
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    let token: any = session?.data?.user?.accessToken;

    const isValid = validateForm();

    if (isValid) {
      try {
        editBlog({
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs/${id}`,
          token: token,
          payload: {
            ...common,
            keywords: selectedTags,
            author: { ...author, imageUrl: author.imageUrl },
            image: blogImage,
            faq: faqList,
            paragraphs: paragraphList,
          },
        });
        router.push("/manage");
        toast.success("Successfully created");
      } catch (error: any) {
        toast.error("error", error.message);
      }

      // Perform API call here with the validated data
    }
  };

  useEffect(() => {
    if (blog && blog.author) {
      //set commmon state
      setCommon({
        title: blog.title,
        description: blog.description,
      });
      //set author state
      setAuthor({
        name: blog.author.name,
        designation: blog.author.designation,
        description: blog.author.description,
        imageUrl: blog.author.imageUrl,
        twitterUrl: blog.author.twitterUrl,
      });

      // set keywords
      setSelectedTags(blog.keywords);

      //set blog image url
      setBlogImage(blog.image);

      //set paragraphs
      setParagraphList(blog.paragraphs);

      //set faq
      setFaqList(blog.faq);
    }
  }, [blog]);

  return (
    <>
      {blog && blog.image && blog.author && blog.author.imageUrl ? (
        <div className="w-full h-full px-[1rem] md:px-[5rem] lg:px-[6rem]">
          <form onSubmit={onSubmit} className="space-y-4 w-full h-full py-2">
            <TextField
              placeholder="enter the title"
              value={common.title}
              onChange={(e) => handleInputChane(e.target.value, "title")}
              className={`w-full h-10 focus:outline-none py-1 px-1  rounded border ${
                error.title ? "border-red-500" : "border-gray-300"
              }  `}
            >
              <label htmlFor="Title" className="font-bold">
                Title
              </label>
            </TextField>
            {error.title && <p className="text-red-500">{error.title}</p>}

            <TextArea
              name="description"
              placeholder="enter the description"
              value={common.description}
              onChange={(e) => handleInputChane(e.target.value, "description")}
              className={`h-40 border ${
                error.title ? "border-red-500" : "border-gray-300"
              } w-full  focus:outline-none py-1 px-1 rounded-md`}
            >
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
            </TextArea>
            {error.description && (
              <p className="text-red-500">{error.description}</p>
            )}

            {blogImage && (
              <>
                <ImageField
                  url={blogImage}
                  setUrl={setBlogImage}
                  title="choose blog image"
                  isRound={false}
                  className={`${
                    error.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error.blogImage && (
                  <p className="text-red-500">{error.blogImage}</p>
                )}
              </>
            )}

            {selectedTags.length > 0 && (
              <TagInput
                initialTags={selectedTags}
                onTagsChange={handleTagsChange}
                title="Select Keywords"
                className={`${error.title ? "border-red-500" : "border-gray-300"}`}
              />
            )}

            {author && author.imageUrl && (
              <>
                <AuthorField
                  author={author}
                  setAuthor={setAuthor}
                  title="Autor"
                />
                {error.authorName && (
                  <p className="text-red-500">{error.authorName}</p>
                )}
                {error.authorDesignation && (
                  <p className="text-red-500">{error.authorDesignation}</p>
                )}
              </>
            )}

            <ParagraphDynamicInput
              inputList={paragraphList}
              setInputList={setParagraphList}
              title="Add Paragraphs"
            />

            {error.paragraphs && (
              <p className="text-red-500">{error.paragraphs}</p>
            )}

            <FaqDynamicInput
              inputList={faqList}
              setInputList={setFaqList}
              title="Add Faqs"
            />
            {error.faqs && <p className="text-red-500">{error.faqs}</p>}

            <div className="w-full flex justify-end">
              <div className="justify-between flex space-x-4 items-center">
                <button
                  onClick={() => router.back()}
                  className="bg-gray-300 text-black p-2 rounded-md"
                  type="button"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="bg-green-500 p-2 rounded-md text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <SpinnerLoader/>
      )}
    </>
  );
};

export default EditComponent;
