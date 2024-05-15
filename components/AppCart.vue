<template>
  <div class="cart-wrapper">
    <h3>Shopping Cart</h3>
    <small v-if="!cartProducts.length">No products found...</small>

    <div v-else class="cart-items">
      <table>
        <thead>
          <tr>
            <th class="col-large"><span class="md">Item</span></th>
            <th class="col-standard md">Price</th>
            <th class="col-standard md">Qty</th>
            <th class="col-standard md">Total</th>
            <th class="col-small md" />
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, i) in cartProducts" :key="'cart-p' + i">
            <td>
              <CartProductWidget :product="product">
                <template #default>
                  <div class="sm product-params justify-between">
                    <div>
                      <div>
                        <b>Qty:</b>
                        <input
                          type="number"
                          min="1"
                          :style="{
                            width: product.count.toString().length + 2 + 'ch'
                          }"
                          :value="product.count"
                          @input="($e) => handleProductCount($e, product.id)"
                        />
                      </div>

                      <div>
                        <b>Price</b>: ${{ product.regular_price.value }}
                      </div>

                      <div>
                        <b>Total</b> ${{
                          calculatePrice(
                            product.regular_price.value,
                            product.count
                          )
                        }}
                      </div>
                    </div>

                    <button
                      class="btn-default"
                      @click="removeProductFromCart(product)"
                    >
                      <img
                        class="remove-icon"
                        src="../assets/images/delete-icon.png"
                        alt="del"
                      />
                    </button>
                  </div>
                </template>
              </CartProductWidget>
            </td>

            <td class="text-center md">${{ product.regular_price.value }}</td>

            <td class="text-center md">
              <input
                type="number"
                min="1"
                :style="{
                  width: product.count.toString().length + 2 + 'ch'
                }"
                :value="product.count"
                @input="($e) => handleProductCount($e, product.id)"
              />
            </td>

            <td class="text-center md">
              ${{ calculatePrice(product.regular_price.value, product.count) }}
            </td>

            <td class="md">
              <button class="btn-default" @click="removeProductFromCart(i)">
                <img
                  class="remove-icon"
                  src="../assets/images/delete-icon.png"
                  alt="del"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="cartProducts.length" class="cart-summary">
      <span class="subtotal">Subtotal: ${{ calculateSubtotal }}</span>
      <button class="btn outlined">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CartProductWidget from './cart-product-widget.vue';

const cartItems = computed(() => this.$store.getters['cart/GET_ITEMS']);

const cartProducts = computed(() => {
  return this.cartItems.map((item) => {
    const product = this.$store.getters['products/GET_PRODUCT_BY_ID'](item.id);

    return {
      ...item,
      ...product
    };
  });
});

const calculateSubtotal = computed(() => {
  return this.cartProducts.reduce((acc, curr) => {
    const total = this.calculatePrice(curr.regular_price.value, curr.count);
    return Math.round((acc + total + Number.EPSILON) * 100) / 100;
  }, 0);
});

function handleProductCount(event, productId) {
  this.$store.commit('cart/UPDATE_ITEM_COUNT', {
    itemId: productId,
    count: +event.target.value
  });
}

function removeProductFromCart(index) {
  this.$store.commit('cart/REMOVE_ITEM_FROM_CART', index);
}

function calculatePrice(price, count) {
  return Math.round((price * count + Number.EPSILON) * 100) / 100;
}
</script>

<style lang="scss" scoped>
.cart-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  max-width: 1200px;
  align-self: center;
  overflow: hidden;
}

.cart-items {
  display: flex;
  overflow: auto;
}

.col-standard {
  width: 120px;
}

.col-large {
  width: auto;
}

.col-small {
  width: 40px;
}

.cart-summary {
  display: flex;
  padding: 10px;
  align-items: flex-end;
  flex-direction: column;

  button {
    margin-top: 20px;
    font-size: 1.2em;
    font-weight: bold;
    padding-inline: 35px;
  }
}

.subtotal {
  font-size: 1.2em;
  font-weight: bold;
}

.remove-icon {
  width: 24px;
}

.product-params {
  padding: 10px;
  min-width: 240px;
}

input[type='number'] {
  font-size: 1.17em;
  padding-left: 5px;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

tbody {
  tr {
    border-bottom: 1px solid black;
  }
}

th,
td {
  padding: 0;
}

@media screen and (max-width: 740px) {
  .md {
    display: none;
  }

  .sm {
    display: flex;
  }

  .product-params {
    padding-left: 0;
  }
}

@media screen and (min-width: 741px) {
  .sm {
    display: none;
  }
}
</style>
