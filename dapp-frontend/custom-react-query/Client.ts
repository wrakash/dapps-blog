import { QueryClient } from "react-query";
import { toast } from "react-toastify";

function queryErrorHandler(error: any): void {
  const title = error instanceof Error ? error.message : "error connecting to server";
  // prevent duplicate toasts
  if (error.message === "Request failed with status code 401") {
    window.location.href = process.env.REACT_APP_REDIRECT_URL as string + '/auth/signIn'
  }
  toast.error(title);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});

const optimisticOptions = (query: any) => {
  return {
    // When mutate is called:
    onMutate: async (newChange: any) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([query, newChange.id]);

      // Snapshot the previous value
      const previousTodo = await queryClient.getQueryData([
        query,
        newChange.id,
      ]);

      // Optimistically update to the new value
      await queryClient.setQueryData([query, newChange.id], newChange);

      // Return a context with the previous and new todo
      return { previousTodo, newChange };
    },
    // If the mutation fails, use the context we returned above
    onError: async (err: any, newChange: any, context: any) => {
      await queryClient.setQueryData(
        [query, context.newTodo.id],
        context.previousTodo
      );
    },
    // Always refetch after error or success:
    onSettled: async (newChange: any) => {
      //await queryClient.invalidateQueries([query, newChange.id]); why not working
      await queryClient.invalidateQueries([query]);
    },
  };
};

export { queryClient, optimisticOptions };
