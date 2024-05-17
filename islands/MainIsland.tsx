import { FunctionComponent } from 'preact';

import FilmDisplay from "../components/FilmDisplay.tsx";
import { film } from "../types.ts";

import { useEffect, useState } from "preact/hooks";

import {color_signal,formato_signal,iso_signal,marca_signal,nombre_signal} from "../signals/signals.ts"
import { color_options,format_options,iso_options,marca_options } from "../types.ts";

import { id_signal } from "../signals/signals.ts";

import SelectFilter from "./filtro/SelectFilter.tsx";

import NombreFilter from "./filtro/NombreFilter.tsx";
import C_A_Modal from "./modals/index/C_A_Modal.tsx";

type MainIslandParams = {
    films_original: film[];
}

const MainIsland:FunctionComponent<MainIslandParams> = ({films_original}) => {

    const [films, setFilms] = useState<film[]>(films_original);

    const filter_color = ( films:film[] ) => {
        if(color_signal.value == "color options"){return films}

        if(color_signal.value == "Color"){
            return films.filter(film => film.color == true);
        } else if(color_signal.value == "B&W"){
            return films.filter(film => film.color == false);
        } else {
            return films;
        }
    }
    
    const filter_format = ( films:film[] ) => {
        if(formato_signal.value == "format"){return films}

        if(formato_signal.value == "ThirtyFive"){
            return films.filter(film => film.formatThirtyFive == true);
        } else if(formato_signal.value == "OneTwenty"){
            return films.filter(film => film.formatOneTwenty == true);
        } else if(formato_signal.value == "ThirtyFive & OneTwenty"){
            return films.filter(film => film.formatThirtyFive == true && film.formatOneTwenty == true);
        } else 
        {
            return films;
        }
    }

    const filter_iso = ( films:film[] ) => {
        if(iso_signal.value == "iso"){return films}
        else{
            return films.filter(film => film.iso == iso_signal.value);
        }
    }

    const filter_marca = ( films:film[] ) => {
        if(marca_signal.value == "brand"){return films}
        return films.filter(film => film.brand == marca_signal.value);
    }

    const filter_nombre = ( films:film[] ) => {
        if(nombre_signal.value == "name"){return films}
        return films.filter(film => film.name.includes(nombre_signal.value.toLowerCase()));
    }

    useEffect(() => {
        setFilms(filter_marca(filter_iso(filter_format(filter_color(filter_nombre(films_original))))));
        console.log("Filters: ",color_signal.value,formato_signal.value,iso_signal.value,marca_signal.value,nombre_signal.value)
    }, [color_signal.value,formato_signal.value,iso_signal.value,marca_signal.value,nombre_signal.value]);
    

    return (
    <>
        <div class="TitleContainer">
            <h1 class="Title">BEST FILM DISPLAY EVER!!!</h1>
            <a href="/projects" class="Projects_link" >Projects</a>
        </div>
        <div class="FilterContainer">
            <SelectFilter options={marca_options} selected={marca_signal} FilterType={"brand"}/>
            <SelectFilter options={iso_options} selected={iso_signal} FilterType={"iso"}/>
            <SelectFilter options={format_options} selected={formato_signal} FilterType={"format"}/>
            <SelectFilter options={color_options} selected={color_signal} FilterType={"color options"}/>
            <NombreFilter name={nombre_signal}/>
        </div>

        <FilmDisplay films={films} />
        <C_A_Modal film_id={id_signal.value}/>
    </>
        )

}

export default MainIsland;