import axios from 'axios';

// Configuração base do axios para o backend Spring Boot
axios.defaults.baseURL = 'http://athleticlivingback-production-38d9.up.railway.app';

// Configurar headers padrão
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Interceptor para logs de requisições
axios.interceptors.request.use(
  (config) => {
    console.log('Requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de respostas
axios.interceptors.response.use(
  (response) => {
    console.log('Resposta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export default axios; 