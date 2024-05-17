import { FunctionComponent } from 'preact';

import AddToProject from "./options/AddToProject.tsx";

import CreateProject from "./options/CreateProject.tsx";

import { closeSection } from "../../../functions.ts";
import { Signal } from "@preact/signals";

type ModalProps = {
    film_id: string;
}

const C_A_Modal:FunctionComponent<ModalProps> = ({film_id}) => {

    const signal_reboot = new Signal<boolean>(false);

    return (
        <div id = "Modal" class="Modal_container">     
                <span class="close" onClick={(e)=>{
                    closeSection("Modal")
                    signal_reboot.value = true;
                }}>&times;</span>
                <div class = "modal_content">
                    <br/><br/>
                    <CreateProject film_id={film_id} reboot={signal_reboot}/>
                    <AddToProject film_id={film_id} reboot={signal_reboot}/>
                </div>
        </div>
    )

}

export default C_A_Modal;