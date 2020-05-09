import cardTpl from '../templates/card.hbs';
import fetchGallery from './apiService';
import * as basicLightbox from 'basiclightbox';

const searchFormRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-button');

searchFormRef.addEventListener('submit', inputHandler);
loadMoreBtnRef.addEventListener('click', loadMoreFn);
galleryRef.addEventListener('click', modalOpen);

let inputValue = '';
let page;

function inputHandler(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.query.value;
  galleryRef.innerHTML = '';
  page = 1;

  fetchGallery(inputValue, page)
    .then(data => fetchResultDisplay(data))
    .catch(error => console.log(error));

  loadMoreBtnRef.classList.remove('is-hidden');
}

function fetchResultDisplay(data) {
  const markup = cardTpl(data.hits);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function loadMoreFn() {
  page += 1;
  fetchGallery(inputValue, page)
    .then(data => fetchResultDisplay(data))
    .catch(error => console.log(error));
  setTimeout(() => {
    window.scrollBy({
      top: document.documentElement.clientHeight - 65,
      behavior: 'smooth',
    });
  }, 800);
}

function modalOpen(e) {
  e.preventDefault();
  const target = event.target;
  if (target.nodeName == 'IMG') {
    const bigImgUrl = target.dataset.source;
    console.log(bigImgUrl);
    basicLightbox.create(`<img class="modal-img" src="${bigImgUrl}" alt="">`).show();
  }
}
