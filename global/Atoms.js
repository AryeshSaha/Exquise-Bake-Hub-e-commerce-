import { atom } from "jotai";

// const BaseUrl = "http://localhost:3000";
const BaseUrl = "https://exquise-bake-hub.vercel.app";

const loadingAtom = atom(false)

const userAtom = atom(false)
const userDetailsAtom = atom()

const cartSidebarAtom = atom(false)
const cartAtom = atom({})
const subTotalAtom = atom(0.0)

const dropdownAtom = atom(false);

const reviewsAtom = atom([]);
const avgRatingAtom = atom(0.0);

export { BaseUrl, loadingAtom, userAtom, userDetailsAtom, cartSidebarAtom, cartAtom, subTotalAtom, dropdownAtom, reviewsAtom, avgRatingAtom };
