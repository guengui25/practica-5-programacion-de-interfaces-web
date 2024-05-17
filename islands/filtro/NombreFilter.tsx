import { FunctionComponent } from 'preact';

import { Signal } from "@preact/signals";

type NombreFilterProps = {
    name: Signal;
}

const NombreFilter:FunctionComponent<NombreFilterProps> = ({name}) => {
    return (
    <input class="name_input" type="search" value={name.value} 
        onInput={(e)=>{name.value = e.currentTarget.value}} 
        onFocus={(e)=>{e.currentTarget.value = ''}}/>
    )
}

export default NombreFilter;