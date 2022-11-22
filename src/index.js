import { fethPixaBay } from './js/fetchPixaBay';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';

import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
const elInputForm = document.querySelector('[id="search-form"]');
const elInputFild = document.querySelector('[name="searchQuery"]');
const elGellary = document.querySelector('[class="gallery"]');
let elLearMore;
let text = '';
let page = 1;
console.log(page);
elInputForm.addEventListener('submit', createdList);

function createdList(e) {
  e.preventDefault();
  elGellary.innerHTML = '';
  text = '';
  page = 1;
  try {
    elLearMore.remove();
  } catch (error) {}
  fethPixaBay(elInputFild.value.trim(), page).then(data => {
    if (data.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      try {
        elLearMore.remove();
      } catch (error) {}
      return;
    }else{
        Notify.info(`"Hooray! We found ${data.data.totalHits} images."`)
    }
    
    paintHTML(data.data.hits);
  });
}
function paintHTML(list) {
  console.log(list);
  text += list
    .map(el => {
      return `<div class="photo-card"href="${el.largeImageURL}"><div class="container"><img class="geleri_foto" src="${el.webformatURL}" 
      alt="${el.tags}" loading="lazy" /></div><div class="info"><p class="info-item"><b>Likes</b>${el.likes}</p><p class="info-item"><b>Views</b>${el.views}</p>
    <p class="info-item"><b>Comments</b>${el.comments}</p> <p class="info-item"><b>Downloads</b>${el.downloads}</p></div></div>`;
    })
    .join('');
  elGellary.innerHTML = text;
  if (page === 1) {
    elGellary.insertAdjacentHTML(
      'afterend',
      ' <button type="button" class="load-more">Load more</button>'
    );
    elLearMore = document.querySelector('[class="load-more"]');
    console.log(elLearMore);

    console.log(page);
    elLearMore.addEventListener('click', makeMore);
  }
  page++;
//   let lightbox = new SimpleLightbox('.gallery div', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
  if (list.length < 40) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    try {
      elLearMore.remove();
    } catch (error) {}
  }
}

function makeMore(e) {
  e.preventDefault();
  fethPixaBay(elInputFild.value, page).then(data => paintHTML(data.data.hits));
}
