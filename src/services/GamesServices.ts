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
            query: id => `game?id=${id}`
        }),
        fetchGames: build.query<IGame[], string>({
            query: params => {
              const queryParams = new URLSearchParams(params);
              return `games?${queryParams.toString()}`;
            },
          }),
    })

})
