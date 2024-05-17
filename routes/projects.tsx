/*
Debe existir una página a parte en la que ver todos nuestros proyectos con sus respectivas películas. 
Todos los datos de esta página se obtendrán de una cookie (o varias) y será completamente renderizada en servidor, 
excepto por dos islas que me permitan en un 

MODAL seleccionar (no escribir) un proyecto y eliminarlo
MODAL eliminar películas de un proyecto en concreto.
*/

import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { film, projectsCookie } from "../types.ts";

import { getCookies } from "$std/http/cookie.ts";

import ProjectDisplay from "../components/ProjectDisplay.tsx"; // Componente que muestra los proyectos y sus películas

import DeleteProject from "../islands/modals/project/DeleteProject.tsx"; // MODAL seleccionar (no escribir) un proyecto y eliminarlo
import ModifyProject from "../islands/modals/project/ModifyProject.tsx"; // MODAL eliminar películas de un proyecto en concreto.

type ProjectsProps = {
    project_cookies:projectsCookie[]
    films:film[]
}

export const handler:Handlers = {
    GET: async (req:Request, ctx:FreshContext) => {
        
        const cookies = getCookies(req.headers); // Ya que siempre que se haga una petición en la cabecera se envían todas las cookies
        const project_cookies:projectsCookie[] = JSON.parse(cookies.projectsCookie); // Parseamos el JSON de la cookie

        const api_fetch = await fetch("https://filmapi.vercel.app/api/films"); // Hacemos fetch a la API de películas
        const data:film[] = await api_fetch.json(); // Parseamos la respuesta a JSON

        // Filtramos las películas que coincidan con los proyectos de la cookie

        const films:film[] = data.filter((film:film) => {
            return project_cookies.some((project:projectsCookie) => project.film_ids.includes(film._id));
        });


        return ctx.render({project_cookies,films});
    },
}

const Page = (props:PageProps<ProjectsProps>) => {

    const {project_cookies,films} = props.data;

    return (
        <>
            <div class="TitleContainer">
                <h1 class="Title">Projects</h1>
                <a href="/" class="Projects_link" >Main Page</a>
            </div>
            <div class="ModalContainer">
                <ModifyProject project_cookies={project_cookies} films={films} />
                <DeleteProject project_cookies={project_cookies} />
            </div>
            <ProjectDisplay project_cookies={project_cookies} films={films}/>
        </>
    );

}

export default Page;