import './css/styles.css';
import PhotoApiService from './photo-service';

const photosApiService = new PhotoApiService();

console.log(photosApiService);

refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

console.log(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  photosApiService.resetPage();
  photosApiService.fetchPhotos().then(renderPhotos);
}

function onLoadMoreBtnClick() {
  photosApiService.fetchPhotos().then(photos => console.log(photos));
}

function renderPhotos(photos) {
  const template = photos
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <div class='thumb'>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b> <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b> <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b> <span>${downloads}</span>
        </p>
      </div>
    </div>`
    )
    .join('');

  refs.gallery.innerHTML = template;

  // refs.searchForm.insertAdjacentHTML('afterEnd', template);
}
