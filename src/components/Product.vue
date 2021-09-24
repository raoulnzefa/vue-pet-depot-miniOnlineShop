<template>
  <div>
    <my-header></my-header>

    <h1>This is the id {{ $route.params.id }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image" />
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-0 description">
          <h1>{{ product.title }}</h1>
          <p v-html="product.description"></p>
          <p class="price">
            {{ product.price }}
          </p>
          <button @click="edit">Edit Product</button>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./Header.vue";
import axios from "axios";

export default {
  components: { MyHeader },
  data() {
    return {
      product: {},
    };
  },
  methods: {
    edit() {
      this.$router.push({ name: "Edit" });
    },
  },
  created() {
    axios.get("http://localhost:3000/products").then((response) => {
      this.product = response.data.filter(
        (data) => data.id == this.$route.params.id
      )[0];
      // this.product.image = "/" + this.product.image;
    });
  },
};
</script>

<style scoped>
.container {
  width: 800px;
  display: flex;
}

.row {
  width: 600px;
  margin: 15px 0;
  padding: 10px 0;
  border: 1px solid grey;
}

.product {
  margin-top: 22px;
  width: 200px;
}

.router-link {
  cursor: pointer;
}
</style>
