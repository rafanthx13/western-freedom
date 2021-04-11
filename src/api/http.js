import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/' 

let http = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	}
});

export default http;
