<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <main>
      <div v-for="product in products" :key="product.id">
        <div class="container">
          <div class="row">
            <div class="col-md-5 col-md-offset-0">
              <figure>
                <img class="product" :src="product.image" />
              </figure>
            </div>
            <div class="col-md-6 col-md-offset-0 description">
              <router-link
                class="router-link"
                tag="h1"
                :to="{ name: 'Id', params: { id: product.id } }"
                >{{ product.title }}</router-link
              >
              <p v-html="product.description"></p>
              <p class="price">
                {{ product.price | formatPrice }}
              </p>
              <button
                class=" btn btn-primary btn-lg"
                v-on:click="addToCart(product)"
                v-if="canAddToCart(product)"
              >
                Add to cart
              </button>
              <button disabled="true" class=" btn btn-primary btn-lg" v-else>
                Add to cart
              </button>
              <transition name="bounce" mode="out-in">
                <span
                  class="inventory-message"
                  v-if="
                    product.availableInventory - cartCount(product.id) === 0
                  "
                  key="0"
                >
                  All Out!
                </span>
                <span
                  class="inventory-message"
                  v-else-if="
                    product.availableInventory - cartCount(product.id) < 5
                  "
                  key=""
                >
                  Only
                  {{ product.availableInventory - cartCount(product.id) }} left!
                </span>
                <span class="inventory-message" v-else key="">Buy Now! </span>
              </transition>
              <div class="rating">
                <span
                  v-bind:class="{ 'rating-active': checkRating(n, product) }"
                  v-for="n in 5"
                  :key="n"
                  >☆
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MyHeader from "./Header.vue";
import Vue from "vue";
import axios from "axios";
import { store } from "../store/store";

Vue.config.productionTip = false;

export default {
  name: "Main",
  data() {
    return {
      cart: [],
      products: {},
    };
  },
  components: { MyHeader },
  store,

  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
  },
  async mounted() {
    axios.get("http://localhost:3000/products").then((response) => {
      this.products = response.data;
      console.log(this.products);
    });
    // let { data } = await axios.get("http://localhost:3000/logo");
    // console.log(data);
  },
  filters: {
    formatPrice(price) {
      if (!parseInt(price)) {
        return "";
      }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    },
  },
  created() {
    this.$store.dispatch("initStore");
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

.hr {
  width: 600px;
}

.product {
  margin-top: 22px;
  width: 200px;
}

.router-link {
  cursor: pointer;
}

.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
@keyframes shake {
  10%,
  90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
