import axios from 'axios';

const server = 'http://localhost:8080';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: `${server}`
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = '12345678910';

export{ server };