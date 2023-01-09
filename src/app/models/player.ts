export interface Player {
    gender: string;
    id: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    city: string;
    age: number;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    skillLevel: number;
    pos: string;
}
