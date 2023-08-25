import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IGame } from '../models/IGame'
export const gamesAPI = createApi({
    reducerPath:"gamesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: headers => {
        headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_KEY)
        headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPID_HOST)
        return headers
    }}),
    
    endpoints: build => ({
        fetchGameById: build.query<IGame, number>({
            query: id => `game?id=${id}`,
            keepUnusedDataFor: 300
        }),
        fetchGames: build.query<IGame[], Record<string, string>>({
            query: params => {
              const queryParams = new URLSearchParams();
              Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    queryParams.set(key, value);
                }
            });
              return `games?${queryParams.toString()}`;
            },
          }),
    })

})
