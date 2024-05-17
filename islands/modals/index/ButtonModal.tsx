import { FunctionComponent } from 'preact';

import { id_signal } from "../../../signals/signals.ts";

import { openSection } from "../../../functions.ts";

type ButtonModalProps = {
    film_id: string;
}

const ButtonModal:FunctionComponent<ButtonModalProps> = ({film_id}) => {
    
    const click = () => {
        id_signal.value = film_id;

        openSection("Modal");
    }
    
    return (
        <button class = "Modal_button" onClick={(e)=>click()}>Add film to project</button>
    )
}

export default ButtonModal;