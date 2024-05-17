import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { film } from "../types.ts";

import MainIsland from "../islands/MainIsland.tsx"

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext) {
        
        const api_fetch = await fetch("https://filmapi.vercel.app/api/films");
        const data:film[] = await api_fetch.json();

        return ctx.render(data);
    },
};


const Page = (props: PageProps) => {

    const films:film[] = props.data
    //console.log(films)

    return (<MainIsland films_original={films}/>)
}

export default Page;