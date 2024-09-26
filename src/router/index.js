import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Journal from "../components/Journal.vue";
import ItemDetail from "@/components/ItemDetail.vue";

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
//    {
//     path: '/item-detail/:id/:sectionId',
//     name: 'ItemDetail',
//     component: ItemDetail, // Ensure this imports the correct component
//   },
{
    path: "/item/:sectionId/:id", // URL structure for the route
    name: "ItemDetail",
    component: ItemDetail,
    props: true, // Ensure props are passed to the component
  },

    
    // component: () => import('../components/ItemDetails.vue'),
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
