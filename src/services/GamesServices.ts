import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IGame } from '../models/IGame'
export const gamesAPI = createApi({
    reducerPath:"gamesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_RAPID_API_URL,
        prepareHeaders: headers => {
        headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_KEY) // Напрямую Free-To-Play API дает CORS, использую RapidAPI
        headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPID_HOST) 
        return headers
    }}),
    
    endpoints: build => ({
        fetchGameById: build.query<IGame, number>({
            query: id => `game?id=${id}`,
            keepUnusedDataFor: 300 // На 5 минут кешируем данные конкретной карточки при открытии страницы
        }),
        fetchGames: build.query<IGame[], Record<string, string>>({
            query: params => {
              const queryParams = new URLSearchParams();
              Object.entries(params).forEach(([key, value]) => { // Конструирование query вида platform=browser&category=mmorpg&sort-by=release-date
                                                                 // Если какое то из полей пустое, не добавляем его чтобы был корректный запрос
                if (value) {
                    queryParams.set(key, value);
                }
            });
              return `games?${queryParams.toString()}`;
            },
          }),
    })

})
// Free-To-Play не предоставляет пагинацию, как ее сделать, и нужно ли в таком случае?