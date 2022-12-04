import axios from 'axios';

const API_KEY = '31789224-1660db70791515116d946dcb0';
const BASE_URL = `https://pixabay.com/api/`;

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalLoadedPhoto = 0;
    this.totalHits = 0;
  }

  fetchPhotos() {
    const options = {
      params: {
        key: API_KEY,
        q: `${encodeURIComponent(this.searchQuery)}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${BASE_URL}`, options).then(photos => {
      this.incrementPage();
      this.incrementQuantityLoadedPhoto(photos.data.hits.length);
      this.totalHits = photos.data.totalHits;
      return photos.data;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  incrementQuantityLoadedPhoto(value) {
    this.totalLoadedPhoto += value;
  }

  resetPage() {
    this.page = 1;
  }

  resetTotalLoadedPhoto() {
    this.totalLoadedPhoto = 0;
  }

  resettotalHits() {
    this.totalHits = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
