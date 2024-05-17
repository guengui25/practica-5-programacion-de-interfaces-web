import {FunctionComponent} from "preact";
import { film, projectsCookie } from "../types.ts";

type ProjectDisplayProps = {
    project_cookies:projectsCookie[]
    films:film[]
}

const ProjectDisplay: FunctionComponent<ProjectDisplayProps> = ({project_cookies,films}) => {

    return (
        <div class="ProjectDisplay">
            {project_cookies.map((project) => (

                <div class="Project_container">
                    <h1>Project {project.project_name}</h1>
                    
                    <div class="FilmDisplay">
                        {project.film_ids.map((film_id) => {
                            const film = films.find((film) => film._id === film_id);
                            if(film){
                                return (
                                <div class="Film_container">
                                    <a href={`/film/${film._id}`} key={film._id}>
                                        <div class="Film">
                                            <h1 class="FilmBrandName">{film.brand} {film.name}</h1>
                                            <img src={film.staticImageUrl} alt={film.name} />
                                            <p>Format: {film.formatThirtyFive?"Thirty Five":""}{film.formatThirtyFive && film.formatOneTwenty?", ":""}{film.formatOneTwenty?"One Twenty":""}</p>
                                            <p>Iso: {film.iso}</p>
                                            <p>Color: {film.color ? "Color" : "B&W"}</p>
                                        </div>
                                    </a>
                                </div>
                                )
                            }
                        })}
                    </div>
                </div>

            ))}
        </div>
    )

}

export default ProjectDisplay;