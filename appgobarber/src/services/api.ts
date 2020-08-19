import axios from 'axios';

const api = axios.create({
  // passar o ip da máquina quando o emulador está em modo bridged
  baseURL: 'http://192.168.1.7:3333',
});

export default api;
