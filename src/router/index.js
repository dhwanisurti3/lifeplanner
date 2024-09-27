import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Journal from "../components/Journal.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/journal",
        name: "Journal",
        component: Journal,
    },  
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
