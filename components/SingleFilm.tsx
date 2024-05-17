import { FunctionComponent } from 'preact';

import { film } from '../types.ts';

type SingleFilmProps = {
    film: film;
}

const SingleFilm:FunctionComponent<SingleFilmProps> = (props) => {

    const film:film = props.film;

    return (
        <div class = "SingleFilm">
            <h1 class="FilmBrandName">{film.brand} {film.name}</h1>
            <img src={film.staticImageUrl} alt={film.name}/>
            <p>{film.description}</p>
            <div class="FilmFeatures">
                <div class="FilmDetails">
                    <p>ISO: {film.iso}</p>
                    <p>Format: {film.formatThirtyFive?"Thirty Five":""}{film.formatThirtyFive && film.formatOneTwenty?", ":""}{film.formatOneTwenty?"One Twenty":""}</p>
                    <p>Color: {film.color ? "Color" : "B&W"}</p>
                    <p>Process: {film.process}</p>
                </div>
                <div class="FilmKeyFeatures">
                    <p>Key Features:</p>
                    <ul class="Features">
                        {film.keyFeatures.map(feature => <li key={feature.id}>{feature.feature}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingleFilm;