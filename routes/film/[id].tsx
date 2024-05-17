import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { film } from "../../types.ts";

import SingleFilm from "../../components/SingleFilm.tsx";


export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext) {
        
        const {id} = ctx.params;

        const api_fetch = await fetch("https://filmapi.vercel.app/api/films");

        const data:film[] = await api_fetch.json();

        //console.log(data);

        const film = data.find(film => film._id === id);

        return ctx.render({film,id});
    },
};


const Page = (props: PageProps) =>{

    const {film,id} = props.data;

    //console.log(film);

    if(!film){
        return (<div class="error">Film with id {id} not found</div>);
    }
    else{
        return(<SingleFilm film={film}/>);
    }
}

export default Page;
  