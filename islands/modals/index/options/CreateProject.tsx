import { FunctionComponent } from 'preact';
import { useEffect, useState } from "preact/hooks";
import { projects_signal } from "../../../../signals/signals.ts";
import { openSection,closeSection } from "../../../../functions.ts";
import { getProjects } from "../../../../functions.ts";

import { Signal } from "@preact/signals";

type ModalProps = {
    film_id: string;
    reboot: Signal<boolean>;
}

const CreateProject:FunctionComponent<ModalProps> = ({film_id,reboot}) => {

    const [project_name, setProjectName] = useState<string>("");
    const [error, setError] = useState<string>("");

    // UseEffect para limpiar el formulario
    useEffect(() => {
        setProjectName("");
        setError("");
    },[reboot.value]);

    //Uso cookies para almacenar el id del proyecto con el nombre del proyecto
    const createProject = (film_id:string,project_name:string) => {
        console.log("Creating project cookie")

        setError("");   

        if(project_name === "") { // Si el nombre del proyecto está vacío, mostramos un error
            setError("Project name can't be empty");
            return;
        }

        const projects = getProjects(); // Obtenemos los proyectos del usuario de las cookies

        if (!projects) { // Si no hay proyectos, creamos la cookie con el proyecto

            document.cookie = `projectsCookie=${JSON.stringify([ 
                {project_name:project_name , film_ids: [film_id]}, 
            ])}; path=/`;

            projects_signal.value = [{project_name:project_name , film_ids: [film_id]}]; // Ponemos el proyecto en el signal

            setError("Project created"); // Mostramos un mensaje de éxito
            return;
        }

        else { // Si existen proyectos, añadimos el proyecto a la cookie

            const found = projects.find((project) => project.project_name === project_name); // Comprobamos si el proyecto ya existe
            
            if (found) { // Si el proyecto ya existe, mostramos un error
                setError("Project already exists");
                return;
                
            } else { // Si el proyecto no existe, lo añadimos a la cookie
                projects.push({project_name:project_name , film_ids: [film_id]});
                
                document.cookie = `projectsCookie=${JSON.stringify(projects)}; path=/`;

                projects_signal.value = projects; // Ponemos los proyectos en el signal

                setError("Project created"); // Mostramos un mensaje de éxito
                return;
            }
        }
    }

    return (
        <>
            <button class="button_" onClick={(e)=>openSection("create_section")}>Create a new proyect</button>
            <div id="create_section" class = "create_section">
                <div class="create_items">
                    <input type="text" placeholder="Project name" value={project_name} onBlur={(e)=> setProjectName(e.currentTarget.value)}/>
                    <div class = "create_buttons">
                        <button class="button_" onClick={(e)=>createProject(film_id,project_name)}>Create</button>
                        <button class="button_" onClick={(e)=>closeSection("create_section")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    )
}

export default CreateProject;