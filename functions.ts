import { projectsCookie } from "./types.ts";

export const openSection = (section_id:string) => {
    const section = document.getElementById(section_id);
    if(section)section.style.display = "block";
    else console.log("Section not found");
}

export const closeSection = (section_id:string) => {
    const section = document.getElementById(section_id);
    if(section) section.style.display = "none";
    else console.log("Section not found");
}

export const getProjects = () => {
    const cookies = document.cookie.split("; "); // Dividimos la cadena de cookies en un array de cookies
    //console.log(cookies);
    const projectsCookie = cookies.find((cookie) => cookie.startsWith("projectsCookie=")); // Encontramos la cookie que queremos

    if (!projectsCookie)
        return;
    else {
        const projects: projectsCookie[] = JSON.parse(projectsCookie.split("=")[1]); // Parseamos la cadena de la cookie en un array de proyectos
                
        return projects;
    }
}
