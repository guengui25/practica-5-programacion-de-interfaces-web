import { FunctionComponent } from 'preact';

import { Signal } from "@preact/signals";

type SelectFilterParams = {
    FilterType: string;
    options: string[] | number[];
    selected: Signal;
}

const SelectFilter:FunctionComponent<SelectFilterParams> = ({FilterType,options,selected}) => {

    return (
        <select class="select_filter" onChange={(e)=>{selected.value = e.currentTarget.value}}>
            <option value={FilterType} selected>{FilterType}</option>
            {options.map(option_X => {
                return <option value={option_X}>{option_X}</option>
            }
            )}
        </select>
    )
}

export default SelectFilter;