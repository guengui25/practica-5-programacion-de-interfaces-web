import { FunctionComponent } from 'preact';

import { openSection,closeSection } from "../../../functions.ts";
import { projectsCookie } from "../../../types.ts";
import { useState } from "preact/hooks";

type DeleteProjectProps = {
    project_cookies:projectsCookie[]
}

const DeleteProject:FunctionComponent<DeleteProjectProps> = ({project_cookies}) => {
    
    const [project_name,setProjectName] = useState<string>("");

    const deleteProject = (project_name:string,project_cookies:projectsCookie[]) => {
        const new_project_cookies = project_cookies.filter((project:projectsCookie) => project.project_name !== project_name);
        
        document.cookie = `projectsCookie=${JSON.stringify(new_project_cookies)}; path=/`;
        location.reload();
    }

    return (
        <div class = "Modal_Delete">
            <button class = "Modal_delete_button" onClick={(e)=>openSection("Modal_Delete")}>Delete a project</button>
            <div id="Modal_Delete" class="Modal_container">     
                <span class="close" onClick={(e)=>{closeSection("Modal_Delete")}}>&times;</span>
                <div class = "modal_content">
                    <h1 class="Modal_title" >Delete Project</h1>
                    <select class="Modal_select" onChange={(e)=> setProjectName(e.currentTarget.value)}>
                        <option value="" disabled selected>Select a project</option>
                        {project_cookies.map((project:projectsCookie) => {
                            return <option value={project.project_name}>{project.project_name}</option>
                        })}
                    </select>
                    <button class="Modal_delete_button" onClick={(e)=>{deleteProject(project_name,project_cookies)}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProject;