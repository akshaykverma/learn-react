import axios from "axios";

// Free fake and reliable API for testing and prototyping
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const http = axios.create({
    baseURL: POSTS_URL,
  });

 export default http;