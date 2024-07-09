<template>
  <div class="config-options">
    <div v-for="(config, i) in product.configurable_options" :key="'opt' + i">
      <div class="product-config-options-list">
        <div v-for="(option, k) in config.values" :key="'val' + k">
          <div
            :class="getStyleClass(config.attribute_code, option.value_index)"
            :style="getStyle(option.value)"
            @click="
              handleSelectedConfigurations(
                config.attribute_code,
                option.value_index
              )
            "
          >
            <span v-if="!option.value.toString().match(colorHexRegex)">
              {{ option.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Product } from '@/common/types.ts';

const props = defineProps<{ product: Product }>();

const productFilters = [];
const colorHexRegex = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi;

const productOptionsTypes = computed(() => {
  // return [
  //   ...new Set(
  //     props.product.configurable_options.map((opt) => opt.attribute_code)
  //   )
  // ];

  return [];
});

function getStyleClass(attrCode, optionValIndex) {
  // return {
  //   'product-config-option': true,
  //   'selected-option': productFilters.some(
  //     (f) => f.code === attrCode && f.value_index === optionValIndex
  //   )
  // };
}

function getStyle(optValue) {
  // return {
  //   backgroundColor: optValue.toString().match(colorHexRegex)
  //     ? optValue
  //     : 'white'
  // };
}

function handleSelectedConfigurations(attrCode, valIndex) {
  // const sameFilterType = productFilters.find(
  //   (f) => f.code === attrCode
  // );
  // if (sameFilterType) {
  //   const filterIndex = productFilters.indexOf(sameFilterType);
  //   productFilters[filterIndex].value_index = valIndex;
  // } else {
  //   productFilters = [
  //     ...productFilters,
  //     {
  //       code: attrCode,
  //       value_index: valIndex
  //     }
  //   ];
  // }
  // const filterVariants = props.product.variants.filter((item) => {
  //   const matchFiltersCount = productFilters
  //     .map((selFilter) => {
  //       return item.attributes.some(
  //         (a) =>
  //           a.code === selFilter.code &&
  //           a.value_index === selFilter.value_index
  //       );
  //     })
  //     .filter(Boolean);
  //   return matchFiltersCount.length === productFilters.length;
  // });
  // if (filterVariants.length) {
  //   this.$emit('update-product', {
  //     variant_id: filterVariants[0].product.id,
  //     variant_image: filterVariants[0].product.image
  //   });
  // }
}
</script>

<style scoped lang="scss">
.config-options {
  display: flex;
  flex-direction: column;
}

.product-config-option {
  cursor: pointer;
  border: 2px solid black;
  border-radius: 2px;
  width: 24px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
  margin-top: 5px;

  &:hover {
    border: 2px solid rgb(243, 141, 45);
  }
}

.selected-option {
  border: 2px solid rgb(243, 141, 45);
}

.product-config-options-list {
  display: flex;
  flex-wrap: wrap;
}

.disabled-option {
  pointer-events: none;
}

.crossed-red {
  background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 0, 0) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 0, 0) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    );
}

.crossed-light {
  background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 255, 255) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 255, 255) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    );
}
</style>
