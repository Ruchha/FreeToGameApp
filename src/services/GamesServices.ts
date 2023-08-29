import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IGame } from '../models/IGame'
export const gamesAPI = createApi({
    reducerPath: "gamesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: headers => {
            return headers
        }
    }),
    endpoints: build => ({
        fetchGameById: build.query<IGame, number>({
            query: id => `game?id=${id}`,
            keepUnusedDataFor: 300 // На 5 минут кешируем данные конкретной карточки при открытии страницы
        }),
        fetchGames: build.query<IGame[], Record<string, string>>({
            query: params => {
                const queryParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {  // Конструирование query вида platform=browser&category=mmorpg&sort-by=release-date
                                                                    // Если какое то из полей пустое, не добавляем его чтобы был корректный запрос
                    if (value) {
                        queryParams.set(key, value);
                    }
                });
                return queryParams.toString().includes("tag") ? `filter?${queryParams.toString()}` : `games?${queryParams.toString()}`; // Так как эндпоинт games не подразумевает несколько тэгов сразу, пришлось сделать проверку и использовать другой эндпоинт filter
            },
        }),
    })

})
