import axios from 'axios';
const KEY = 'AIzaSyBHJOuFZ39aI5o9BavQ2IKNN_9xWQr9_q0'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 15,
        key: KEY
    }
})