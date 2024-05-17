import { FunctionComponent } from 'preact';

import { film } from '../types.ts';
import ButtonModal from "../islands/modals/index/ButtonModal.tsx";

type FilmDisplayProps = {
    films: film[];
}

const FilmDisplay:FunctionComponent<FilmDisplayProps> = (props) => {

    const films:film[] = props.films;

    return (
        <div class = "FilmDisplay">
            {films.map((film) => (
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
                <ButtonModal film_id={film._id}/>
            </div>
            ))}
        </div>
    )
}

export default FilmDisplay;