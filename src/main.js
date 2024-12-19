import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showInfo,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const inputField = document.querySelector('input[name="searchQuery"]');
const loadMoreButton = document.createElement('button');
const galleryContainer = document.querySelector('.gallery-section');

let currentPage = 1;
let query = '';
let totalHits = 0;
let galleryLightbox = new SimpleLightbox('.gallery a');

loadMoreButton.textContent = 'Load more';
loadMoreButton.classList.add('load-more-btn');
loadMoreButton.style.display = 'none';
galleryContainer.appendChild(loadMoreButton);

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  query = inputField.value.trim();
  if (!query || !/^[a-zA-Z0-9 ]+$/.test(query)) {
    showInfo(
      'Please enter a valid search term using only letters, numbers, and spaces.'
    );
    return;
  }

  clearGallery();
  currentPage = 1;
  totalHits = 0;
  loadMoreButton.style.display = 'none';
  showLoader();

  try {
    const data = await fetchImages(query, currentPage, 15);

    if (!data.hits.length) {
      showInfo(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoader();
      return;
    }

    renderGallery(data.hits);
    galleryLightbox.refresh();
    totalHits = data.totalHits;

    if (data.hits.length < totalHits) {
      loadMoreButton.style.display = 'block';
    }

    hideLoader();
  } catch (error) {
    showError(
      'Sorry, there was an error fetching images. Please try again later.'
    );
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(query, currentPage, 15);
    renderGallery(data.hits);
    galleryLightbox.refresh();

    if (currentPage * 15 >= totalHits) {
      loadMoreButton.style.display = 'none';
      showInfo("We're sorry, but you've reached the end of search results.");
    }

    hideLoader();
    scrollToNewImages();
  } catch (error) {
    showError(
      'Sorry, there was an error fetching images. Please try again later.'
    );
    hideLoader();
  }
});

function scrollToNewImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
