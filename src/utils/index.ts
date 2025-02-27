import { SocialNetwork } from "../types";

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const isValidUrl = (urlString: SocialNetwork['url']) => {
    const regexURL = new RegExp(
        // valida protocolo
        '^(https?:\\/\\/)?'+
        // valida nombre de dominio
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        // valida OR direccion ip (v4)
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        // valida puerto y path
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        // valida queries
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        // valida fragment locator
        '(\\#[-a-z\\d_]*)?$','i'); ; 

    return regexURL.test(urlString); 
}

// export const isValidUrl = (urlString: SocialNetwork['url']) => {
//     let url; 

//     try {
//         url = new URL(urlString);
//     } catch (error) {
//         return false;
//     }

//     return url.protocol === "http:" || url.protocol === "https:"; 
// }