import { Signal } from "@preact/signals";

import { projectsCookie } from "../types.ts"

export const color_signal = new Signal<string>("color options");
export const formato_signal = new Signal<string>("format");
export const iso_signal = new Signal<number| string>("iso");
export const marca_signal = new Signal<string>("brand");
export const nombre_signal = new Signal<string>("name");

export const id_signal = new Signal<string>("");

export const projects_signal = new Signal<projectsCookie[]>();