import { FunctionComponent } from 'preact';

import { openSection,closeSection } from "../../../functions.ts";
import { film, projectsCookie } from "../../../types.ts";
import { useEffect, useState } from "preact/hooks";

type ModifyProjectProps = {
    project_cookies:projectsCookie[]
    films:film[]
}

const ModifyProject:FunctionComponent<ModifyProjectProps> = ({project_cookies,films}) => {
    
    const [project_name,setProjectName] = useState<string>("");
    const [project_films,setProjectFilms] = useState<film[]>([]);

    const modifyProject = (project_name:string,project_cookies:projectsCookie[]) => {
        
        // Recogemos las películas seleccionadas
        const new_films = project_films.filter((film:film) => {
            const film_checkbox = document.getElementById(film._id) as HTMLInputElement;
            return film_checkbox.checked;
        }).map((film:film) => film._id);
        
        if(new_films.length !== 0){ // Si se han seleccionado películas

            // Modificamos el proyecto
            const new_project_cookies = project_cookies.map((project:projectsCookie) => {
                if(project.project_name === project_name){
                    project.film_ids = new_films;
                }
                return project;
            });

            // Actualizamos la cookie
            document.cookie = `projectsCookie=${JSON.stringify(new_project_cookies)}`;
            location.reload(); // Recargamos la página
        } else{
            // Eliminamos el proyecto si no se han seleccionado películas
            const new_project_cookies = project_cookies.filter((project:projectsCookie) => project.project_name !== project_name);

            // Actualizamos la cookie
            document.cookie = `projectsCookie=${JSON.stringify(new_project_cookies)}`;
            location.reload(); // Recargamos la página
        }

        
    }

    useEffect(() => {
        if(project_name !== ""){
            const project = project_cookies.find((project:projectsCookie) => project.project_name === project_name);
            if(project){
                const project_films = films.filter((film:film) => project.film_ids.includes(film._id));
                setProjectFilms(project_films);
            }
        }
    },[project_name])


    return (
        <div class = "Modal_Modify">
            <button class = "Modal_modify_button" onClick={(e)=>openSection("Modal_Modify")}>Modify a project</button>

            <div id="Modal_Modify" class="Modal_container">     
                <span class="close" onClick={(e)=>{closeSection("Modal_Modify")}}>&times;</span>

                <div class = "modal_content">
                    <h1 class="Modal_title" >Modify Project</h1>
                    <select class="Modal_select" onChange={(e)=> setProjectName(e.currentTarget.value)}>
                        <option value="" disabled selected>Select a project</option>
                        {project_cookies.map((project:projectsCookie) => {
                            return <option value={project.project_name}>{project.project_name}</option>
                        })}
                    </select>
                    
                    {project_films.length > 0 && 
                        <div class="Modal_films_container">
                            <h2 class="Modal_films_title">Films</h2>
                            {project_films.map((film:film) => {
                                return( 
                                    <>
                                        <input type="checkbox" id={film._id} class="Modal_film" value={film._id} defaultChecked/>
                                        <label for={film._id}>{film.brand} {film.name}</label>
                                    </>
                                    )
                            })}
                        </div>
                    }

                    <button class="Modal_modify_button" onClick={(e)=>{modifyProject(project_name,project_cookies)}}>Modify</button>
                </div>

            </div>

        </div>
    )
}

export default ModifyProject;