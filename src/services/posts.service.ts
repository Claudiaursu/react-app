import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const postsSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostProps[], undefined>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPostsById: builder.query<PostProps, number>({
      query: (id) => `/posts/${id}`,
    }),
    addNewPost: builder.mutation<undefined, PostProps>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByIdQuery, useAddNewPostMutation } =
  postsSlice;