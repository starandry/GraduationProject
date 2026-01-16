export type FiltersState = {
    movieName: string;
    genres: string[];
    yearFrom: string;
    yearTo: string;
    ratingFrom: string;
    ratingTo: string;
    country: string;
    sortBy: 'Rating' | 'Year' | null;
    showButtons: boolean;
};
