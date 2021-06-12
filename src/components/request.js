const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const request = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginalsMovie: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

    fetchNetflixOriginalsTv: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTvTopRated: `/tv/top_rated?api_key=${API_KEY}`,
    fetchTvAction: `/tv/top_rated?api_key=${API_KEY}&with_genres=10759`,
    fetchTvComedy: `/tv/top_rated?api_key=${API_KEY}&with_genres=35`,
    fetchTvCrime: `/tv/top_rated?api_key=${API_KEY}&with_genres=80`,
    fetchTvDrama: `/tv/top_rated?api_key=${API_KEY}&with_genres=18`,
    fetchTvDocumentaries: `/tv/top_rated?api_key=${API_KEY}&with_genres=99`,
    fetchTvAniamtion: `/tv/top_rated?api_key=${API_KEY}&with_genres=16`,
    fetchSciFi: `/tv/top_rated?api_key=${API_KEY}&with_genres=10765`
}

export default request;