import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (query, perPage = 12, page = 1) => {
  const API_KEY = 'knYehEae0WkMN_T4vgmU0_g8gFCAviIMZ5Y6O8W2n3Y';
  const response = await axios.get(`search/photos`, {
    params: {
      query,
      client_id: API_KEY,
      per_page: perPage, // Ліміт кількості елементів на сторінку
      page, // Номер сторінки для пагінації
    },
  });

  // Повертаємо лише необхідні дані
  return {
    total: response.data.total, // Загальна кількість результатів
    totalPages: response.data.total_pages, // Загальна кількість сторінок
    images: response.data.results.map(image => ({
      id: image.id,
      smallURL: image.urls.small, // Посилання для картки
      regularURL: image.urls.regular, // Посилання для модального вікна
      description: image.alt_description || 'No description', // Опис зображення
      likes: image.likes, // Кількість лайків
      author: {
        name: image.user.name, // Ім'я автора
        portfolio: image.user.portfolio_url, // Портфоліо автора
        avatar: image.user.profile_image.small, // Аватар автора
      },
    })),
  };
};
