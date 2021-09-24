import Vue from "vue";
import Form from "@/components/Form";
import Main from "@/components/Main";
import Product from "@/components/Product";
import EditProduct from "@/components/EditProduct";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      props: true,
    },
    {
      path: "/product/:id",
      name: "Id",
      component: Product,
      props: true,
      children: [
        {
          path: "edit",
          name: "Edit",
          component: EditProduct,
          props: true,
        },
      ],
    },
    {
      path: "/form",
      name: "Form",
      component: Form,
      props: true,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
