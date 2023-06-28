import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectionIdea } from "../interfaces/collectionIdea";

export const ideasSlice = createApi({
    reducerPath: "ideas-api",
    baseQuery: fetchBaseQuery(
        {baseUrl: 'https://2a3abc1f-04d7-471a-8850-66d830bef05e.mock.pstmn.io'}
    ),
    endpoints: (builder) => ({
        getIdeas: builder.query<CollectionIdea[], undefined>({
            query: () => '/ideas'
        })
    })
})

export const { useGetIdeasQuery } = ideasSlice;