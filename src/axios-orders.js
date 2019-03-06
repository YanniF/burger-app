import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://yanni-react-my-burger.firebaseio.com/'
});

export default instance;