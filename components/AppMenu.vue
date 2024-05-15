<template>
  <div class="menu-wrapper">
    <ul class="menu-default-type">
      <li
        class="menu-item-title"
        :class="{
          'active-item': activeItem === ''
        }"
        @click="handleResetFilter"
      >
        All Brands
      </li>

      <li
        v-for="(brand, i) in brands"
        :key="'b' + i"
        @click="handleMenuItemClick(brand)"
      >
        <span
          class="menu-item-title"
          :class="{
            'active-item': activeItem === brand.id
          }"
        >
          {{ brand.title }}
        </span>
      </li>
    </ul>

    <select class="menu-select-type" @change="handleSelectChange">
      <option value="" :selected="activeItem === ''">All Brands</option>

      <option
        v-for="(brand, i) in brands"
        :key="'b' + i"
        :value="brand.id"
        :selected="activeItem === brand.id"
      >
        {{ brand.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: ''
    };
  },
  computed: {
    brands() {
      return this.$store.getters['brands/GET_BRANDS'];
    }
  },
  methods: {
    handleSelectChange($event) {
      const value = $event.target.value;

      if (value.length) {
        this.$store.commit('products/FILTER_PRODUCTS_BY_BRAND', +value);
        this.activeItem = +value;
      } else {
        this.handleResetFilter();
      }
    },
    handleMenuItemClick(brand) {
      this.$store.commit('products/FILTER_PRODUCTS_BY_BRAND', brand.id);
      this.activeItem = brand.id;
    },
    handleResetFilter() {
      this.$store.commit('products/RESET_PRODUCTS_TO_DISPLAY');
      this.activeItem = '';
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  margin: 0;
  margin-top: 40px;
  padding: 10px;
  padding-left: 30px;
  border-right: 1px solid black;
  list-style: none;
}

li {
  cursor: pointer;
  font-weight: 300;
  width: 100px;

  &:hover {
    font-weight: bolder;
  }
}

.menu-item-title {
  padding-inline: 5px;
}

.active-item {
  font-weight: bold;
  border-bottom: 1px solid black;
}

@media screen and (max-width: 740px) {
  .menu-default-type {
    display: none;
  }

  .menu-select-type {
    display: flex;
    padding: 5px;
    font-size: 1.1em;
    margin-top: 10px;
    margin-left: 20px;
  }
}

@media screen and (min-width: 741px) {
  .menu-select-type {
    display: none;
  }
}
</style>
