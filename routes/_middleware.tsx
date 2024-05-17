// El middleware se ejecuta antes de cada página

// Middleware a la página de proyectos mostrandola solo en caso de
// que exista al menos uno de estos, en caso contrario redirigir a una página de error.


import { FreshContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = async (req:Request, ctx:FreshContext) => {

    if(ctx.destination !== "route") { // Si no es una ruta, no se ejecuta el middleware
        const resp = await ctx.next();
        return resp;
    }
    
    // Si es la ruta de inicio, no se ejecuta el middleware
    if(ctx.route === "/projects") {
        // Si no hay cookies de proyecto, redirigir a error
        
        const cookies = getCookies(req.headers); // Ya que siempre que se haga una petición en la cabecera se envían todas las cookie

        const projects = cookies.projectsCookie; // Obtener la cookie de los proyectos --> Si no existe, será undefined

        if(!projects){ // Si no existe la cookie, redirigir a error
            return new Response("",{ // Respuesta
                status: 307, // Redireccionar
                headers: {
                    "location": "/error" // Redirigir a login
                }
            })

        } else if(projects === "[]") { // Si la cookie está vacía, redirigir a error
            return new Response("",{ // Respuesta
                status: 307, // Redireccionar
                headers: {
                    "location": "/error" // Redirigir a login
                }
            })
        }
    }
     // Si existe la cookie, continuar con la petición
    const resp = await ctx.next(); // Continuar con la petición
    return resp;
}