import request from '../utils/request';
import { URL } from './urls'

export function getList() {
    return request.get(URL.getMovieList);
}