export interface IGame {
    id: number;
    title: string;
    thumbnail: string;
    developer: string;
    genre: string;
    platform: string;
    publisher: string;
    release_date: string;
    short_description: string;
    minimum_system_requirements?: {
        os: string;
        processor: string;
        graphics: string;
        storage: string;
        memory: string;
    }
    description?: string;
    screenshots?: Screenshots[]

}

interface Screenshots {
    id: number;
    image: string;
}