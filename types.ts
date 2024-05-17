export type film = {
    _id: string;
    brand: string;
    name: string;
    iso: number;
    formatThirtyFive: boolean;
    formatOneTwenty: boolean;
    color: boolean;
    process: string;
    staticImageUrl: string;
    description: string;
    customDescription: string[];
    keyFeatures: {id:string; feature:string} [];
    dateAdded: string;
    _v0: number;
}

export const color_options = ["Color","B&W"];

export const format_options = ["ThirtyFive","OneTwenty","ThirtyFive & OneTwenty"];

export const iso_options = [1.6,6,25,50,64,80,100,125,160,200,250,320,400,800,3200];

export const marca_options = ["agfaphoto","arista","bergger","catlabs","cinestill film",
"dubblefilm","film photography project","foma","fujifilm","ilford","japan camera hunter",
"kentmere","kodak","kono","kosmo foto","lomography","psychedelic blues","revolog","rollei",
"shanghai film","street candy film","yodica"];

export type projectsCookie = {
    project_name: string;
    film_ids: string[];
}