import axios from 'axios';

// Configuração base do axios para o backend Spring Boot
// URL do backend no Railway (mesma para dev e prod)
// FORÇANDO NOVO DEPLOY - Vercel cache reset
const baseURL = 'https://athleticlivingback-production-38d9.up.railway.app';

axios.defaults.baseURL = baseURL;

// Configurar headers padrão
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Configurar timeout padrão
axios.defaults.timeout = 30000;

// Interceptor para logs de requisições
axios.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', config.method?.toUpperCase(), config.url);
    console.log('📍 URL completa:', `${baseURL}${config.url}`);
    console.log('🌍 Ambiente:', process.env.NODE_ENV);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de respostas
axios.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', response.status, response.config.url);
    console.log('📊 Tamanho da resposta:', JSON.stringify(response.data).length, 'bytes');
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.config?.url);
    console.error('🔍 Detalhes do erro:', error.response?.data);
    console.error('📋 Headers da resposta:', error.response?.headers);
    
    // Log específico para erros de CORS
    if (error.message?.includes('CORS') || error.message?.includes('cors')) {
      console.error('🚨 ERRO DE CORS DETECTADO!');
      console.error('💡 Verifique se o backend está configurado corretamente');
    }
    
    return Promise.reject(error);
  }
);

export default axios; 