import axios from 'axios';

// Replace with your computer's IP address if running on a real device
// For simulator/emulator, localhost is usually fine, but for Android emulator use 10.0.2.2
const baseURL = 'http://localhost:3001/api';

const client = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
