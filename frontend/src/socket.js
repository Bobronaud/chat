import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : undefined;
const socket = io(URL);
export default socket;
