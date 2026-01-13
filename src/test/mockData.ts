import { Movie, MovieDetails } from '../types';

export const mockMovie: Movie = {
  Title: 'The Matrix',
  Year: '1999',
  imdbID: 'tt0133093',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  Genre: 'Action, Sci-Fi',
};

export const mockMovies: Movie[] = [
  mockMovie,
  {
    Title: 'The Matrix Reloaded',
    Year: '2003',
    imdbID: 'tt0234215',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    Genre: 'Action, Sci-Fi',
  },
  {
    Title: 'The Matrix Revolutions',
    Year: '2003',
    imdbID: 'tt0242653',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    Genre: 'Action, Sci-Fi',
  },
];

export const mockMovieDetails: MovieDetails = {
  ...mockMovie,
  Rated: 'R',
  Released: '31 Mar 1999',
  Runtime: '136 min',
  Genre: 'Action, Sci-Fi',
  Director: 'Lana Wachowski, Lilly Wachowski',
  Writer: 'Lilly Wachowski, Lana Wachowski',
  Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
  Plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  Language: 'English',
  Country: 'United States, Australia',
  Awards: 'Won 4 Oscars. 42 wins & 52 nominations total',
  Metascore: '73',
  imdbRating: '8.7',
  imdbVotes: '1,900,000',
  BoxOffice: '$171,479,930',
  Production: 'Warner Bros. Pictures',
  Website: 'N/A',
  Response: 'True',
};
