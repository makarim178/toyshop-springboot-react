import { API } from '../../backend';

export const getProducts = () => {
    return fetch(`${API}product/`, {method: "GET"}).then( response => {
        console.log(response.json());
        return response.json();
    }).catch(err => console.log(err));
}