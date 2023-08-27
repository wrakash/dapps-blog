import React, { ReactElement } from "react";
import { useIsFetching } from "react-query";

function Loading(props: any): ReactElement {
  const isFetching = useIsFetching();
  return (
    <>
      {Boolean(isFetching) && (
        <div className="fixed inset-0 w-screen h-screen z-50 backdrop-blur-lg bg-gray-400 opacity-70 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-20 w-20 mb-4"></div>
          {!props?.text ? (
            <h2 className="text-center text-white text-xl font-semibold">
              Loading...
            </h2>
          ) : (
            <p className="w-full sm:w-1/3 text-center text-white">
              {props?.text ?? "This may take a few seconds, please wait."}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Loading;
