import React, {ReactNode} from "react";

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
    Country: string;
};

export type ComponentWithChildren = {
    className?: string;
    children: ReactNode;
};

export type ComponentWithTextProps = {
    text: string;
    className?: string;
};

export type InputProps = {
    type: string;
    id?: string;
    label?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
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
}