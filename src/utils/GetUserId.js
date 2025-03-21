import { jwtDecode } from 'jwt-decode';

export function getUserId() {
    const token = localStorage.getItem('jwt');

    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub; 
    }

    return null;
}