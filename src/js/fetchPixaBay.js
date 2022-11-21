import axios from 'axios';
import Notiflix from 'notiflix';
export { fethPixaBay };

import axios from 'axios';
const KEYPIXABAY = '31478931-cee6e25ac54ee9bbca917239e';
const perpage = '40';

function fethPixaBay(category, page) {
  console.log(category);
  return axios
    .get(
      `https://pixabay.com/api/?key=${KEYPIXABAY}&q=${category}&image_type=photo&per_page=${perpage}&orientation=horizontal&safesearch=true&page=${page}`
    )
    .then(data =>{ 
        if (data.data.totalhits===0) {
            throw new Error(data.data.status)
        }
        return data} )
    .catch(data => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}