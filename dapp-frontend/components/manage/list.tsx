"use client";
import { BasicDatagrid } from "@/components/datagrid";
import ReactQueryLoading, {
  deleteRequest,
  getRequest,
  optimisticOptions,
  queries,
} from "@/custom-react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import SearchComponent from "../input/SearchInput";
import { SpinnerLoader } from "../loader";

const ListComponent = () => {
  const router = useRouter();
  const session = useSession();
  const [query, setQuery] = useState<string[]>([]);
  let token = session?.data?.user?.accessToken;

  const { data: blogs = [], isLoading } = useQuery(
    [queries.blogs, token, query],
    () =>
      getRequest(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs?${query
          .map((keyword) => `keywords=${keyword}`)
          .join("&")}`,
        ""
      ),
    {
      enabled: !!token || !!query,
    }
  );

  //create a new blog
  const { mutate: deleteBlog } = useMutation(
    deleteRequest,
    optimisticOptions(queries.blogs)
  );

  const handleDelete = (id: string) => {
    try {
      let token: any = session?.data?.user.accessToken;
      // console.log("delete", token);
      deleteBlog({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs/${id}`,
        token: token,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: ({ title }: { title: string }) => {
          return (
            <p>{title.length > 30 ? title.substring(0, 30) + "..." : title}</p>
          );
        },
      },

      {
        Header: "url",
        accessor: ({ url }: { url: string }) => {
          return <p>{url.length > 30 ? url.substring(0, 30) + "..." : url}</p>;
        },
      },

      {
        Header: "createdAt",
        accessor: "createdAt",
      },

      {
        Header: "Action",
        accessor: ({ _id }: { _id: string }) => {
          return (
            <div className="flex justify-between space-x-1">
              <Link
                href={{
                  pathname: "/manage/edit-blog",
                  query: {
                    id: _id,
                  },
                }}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white rounded-md p-2"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return (
     <SpinnerLoader/>
    );
  }

  return (
    <div>
      <ReactQueryLoading />
      <div className="px-[1rem] bg-white md:px-[5rem] lg:px-[6rem] space-y-2 py-2">
        <div className="w-full  flex justify-between items-center space-x-2">
          {/* search input */}
          <div>
            <SearchComponent query={query} setQuery={setQuery} />
          </div>
          {/* create button */}
          <div>
            <Link
              href="/manage/create-blog"
              className="bg-green-500 text-white rounded-md px-2 py-2 inline-flex "
            >
              Create
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
          </div>
        </div>
        <BasicDatagrid data={blogs?.data} columns={columns} />
      </div>
    </div>
  );
};

export default ListComponent;
