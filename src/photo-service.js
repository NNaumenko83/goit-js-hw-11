import axios from 'axios';

const API_KEY = '31789224-1660db70791515116d946dcb0';
const BASE_URL = `https://pixabay.com/api/`;

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    console.log(this);

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

    return axios.get(`${BASE_URL}`, options).then(data => {
      this.incrementPage();
      return data.data.hits;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
