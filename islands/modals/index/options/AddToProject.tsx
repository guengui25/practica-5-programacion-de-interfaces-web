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

const AddToProject:FunctionComponent<ModalProps> = ({film_id,reboot}) => {
    
    const [project_name, setProjectName] = useState<string>("");
    const [projectsNames, setProjectsNames] = useState<string[]>([]);
    const [error, setError] = useState<string>("");


    // Obtengo los proyectos del usuario de las cookies
    const AddToProject = (film_id:string,project_name:string) => {
        console.log("Adding to project")
        setError("");

        if(project_name === "") { // Si el nombre del proyecto está vacío, mostramos un error
            setError("Select a project");
            return;
        }

        const projects = getProjects(); // Obtenemos los proyectos del usuario de las cookies

        if(projects){
            const found = projects.find((project) => project.project_name === project_name); // Buscamos el proyecto en los proyectos del usuario
            
            if (found) { // Si el proyecto existe, añadimos el film_id al proyecto (debería existir)

                if(found.film_ids.includes(film_id)) { // Si el carrete ya está en el proyecto, mostramos un error
                    setError("Film already in project");
                    console.log("Film already in project")
                    return;
                }
                
                found.film_ids.push(film_id); // Añadimos el carrete al proyecto

                document.cookie = `projectsCookie=${JSON.stringify(projects)}; path=/`; // Actualizamos la cookie con el proyecto

                projects_signal.value = projects; // Ponemos los proyectos en el signal

                setError("Film added to project"); // Mostramos un mensaje de éxito
                console.log("Film added to project")
                return;
            }
        }else{
            setError("There are no projects, create one"); // Si el proyecto no existe, mostramos un error
            return;
        }
    }

    useEffect (() => {
        const projects = getProjects(); // Recogemos los proyectos del usuario de las cookies

        if (!projects) { // Si no hay proyectos, mostramos un error
            setError("There are no projects, create one");
            return;
        } else { // Si hay proyectos, los ponemos en el signal y en el select
            projects_signal.value = projects;
            setProjectsNames(projects.map((project) => project.project_name));
        }

    },[projects_signal.value])

    // UseEffect para limpiar el formulario
    useEffect(() => {
        setProjectName("");
        setError("");
        document.getElementById("select_project").selectedIndex = 0; // Reseteamos el select
    },[reboot.value]);

    return (
        <>
            <button class="button_" onClick={(e)=>openSection("add_section")}>Add to existing proyect</button>
            <div id="add_section" class="add_section">
                <div class="add_items">
                    <select id="select_project" onChange={(e)=>setProjectName(e.currentTarget.value)}>
                        <option value="" disabled selected>Select a project</option>
                        {projectsNames.map((project) => <option value={project}>{project}</option>)}
                    </select>
                    <div class="add_buttons">
                        <button class="button_" onClick={(e)=>AddToProject(film_id,project_name)}>Add to project</button>
                        <button class="button_" onClick={(e)=>closeSection("add_section")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    )

}

export default AddToProject;