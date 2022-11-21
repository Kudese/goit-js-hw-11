import { fethPixaBay } from './js/fetchPixaBay';
import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

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
  elGellary.innerHTML=''
  text=''
  fethPixaBay(elInputFild.value, page).then(data => paintHTML(data.data.hits));
}
function paintHTML(list) {
  console.log(list);
  text += list
    .map(el => {
      return `<div class="photo-card"href="${el.largeImageURL}"><img class="geleri_foto" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b> ${el.likes}</p><p class="info-item"><b>Views</b>${el.views}</p>
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
    console.log(elLearMore)
    
    console.log(page)
    elLearMore.addEventListener('click', makeMore)

  }
  page++;
  let lightbox = new SimpleLightbox(".gallery div", {
    captionsData: "alt",
    captionDelay: 250,
  });
}

function makeMore(e) {
    e.preventDefault()
    fethPixaBay(elInputFild.value, page).then(data => paintHTML(data.data.hits))
    
}

