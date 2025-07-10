import axios from 'axios';

// Configuração base do axios para o backend Spring Boot
// Em desenvolvimento, usa o proxy configurado no package.json
// Em produção, usa a URL completa
const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment ? '' : 'https://athleticlivingback-production-38d9.up.railway.app';

axios.defaults.baseURL = baseURL;

// Configurar headers padrão
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Headers de CORS apenas em produção
if (!isDevelopment) {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
}

// Configurar timeout padrão
axios.defaults.timeout = 30000;

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