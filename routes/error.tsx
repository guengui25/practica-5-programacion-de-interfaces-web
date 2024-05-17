// Página de error indicando la falta de proyectos y botón de redirección a la página principal.

const Page = () => {
    return (
        <div class = "Error_page">
            <h1 class="Title">Error, there are no projects</h1>
            <a href="/"> Go back to main page</a>  
        </div>
    );
}	

export default Page;