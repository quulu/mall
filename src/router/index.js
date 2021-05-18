import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter);

const routes = [
    {
        path:'',
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home,
        meta: {
            TabbarShow: true
        }
    },
    {
        path: "/category",
        component: Category,
        meta: {
            TabbarShow: true
        }
    },
    {
        path: "/cart",
        component: Cart,
        meta: {
            TabbarShow: true
        }
    },
    {
        path: "/profile",
        component: Profile,
        meta: {
            TabbarShow: true
        }
    },
    {
        // path: "/detail/:iid/",
        path: "/detail",
        name: "Detail",
        component: Detail,
        meta: {
            TabbarShow: false
        }
    }

];
const router = new VueRouter({
    routes,
    mode:"history"
});

export default router;