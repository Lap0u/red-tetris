export type Game = {
    id: string;
    status: 'waiting' | 'playing' | 'finished';
    userId: number;
}