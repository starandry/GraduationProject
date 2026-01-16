export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
    Country: string;
};

export type MovieDetails = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
    Runtime: string;
    Released: string;
    BoxOffice: string;
    Country: string;
    Production: string;
    Actors: string;
    Director: string;
    Writer: string;
    Plot: string;
};

export type FilterOptions = {
    movieName?: string;
    genres?: string[];
    yearFrom?: number;
    yearTo?: number;
    ratingFrom?: number;
    ratingTo?: number;
    country?: string;
    sortBy?: string;
};
