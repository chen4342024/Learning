import { addPrefix } from '../utils/util'

const HOST = 'http://localhost:3000';

const urls = {
    getMovieList: '/api/rntest/movieList/'
}

export const URL = addPrefix(urls, HOST);