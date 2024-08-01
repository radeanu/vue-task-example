<template>
  <div class="config-options">
    <div v-for="(config, i) in configOptions" :key="'opt' + i">
      <SizeConfigComp
        v-if="config.attribute_code === configAttributeCode.size"
        :config="config"
        @select="onFilterSelect(config.attribute_code, $event)"
      />

      <ColorConfigComp
        v-if="config.attribute_code === configAttributeCode.color"
        :config="config"
        @select="onFilterSelect(config.attribute_code, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type ConfigurableProduct,
  type ConfigValueOption,
  type ProductVariant,
  configAttributeCode
} from '@/common/types';

import SizeConfigComp from './product-config/sizeConfig.vue';
import ColorConfigComp from './product-config/colorConfig.vue';

interface Emits {
  (e: 'updateVariant', option: ProductVariant): void;
}

interface Props {
  product: ConfigurableProduct;
}

interface SelectedConfig {
  code: configAttributeCode;
  value_index: number;
}

const props = defineProps<Props>();
const $emit = defineEmits<Emits>();

const currConfig = ref<SelectedConfig[]>([]);
const defaultVariant = {
  id: props.product.id,
  image: props.product.image,
  sku: props.product.sku
};

const configOptions = computed(() => {
  return props.product.configurable_options.map((opt) => {
    const validValues = opt.values.map((v) => {
      const variant = {
        code: opt.attribute_code,
        value_index: v.value_index
      };

      const selectedAttributes = currConfig.value.filter(
        (c) => c.code !== opt.attribute_code
      );

      const variantAttributes = [variant, ...selectedAttributes];

      const exists = props.product.variants.some((item) => {
        return variantAttributes.every((v) => {
          return item.attributes.some((attr) => {
            return attr.code === v.code && attr.value_index === v.value_index;
          });
        });
      });

      const selected = currConfig.value.some((c) => {
        return c.code === opt.attribute_code && c.value_index === v.value_index;
      });

      return {
        ...v,
        _exists: exists,
        _selected: selected
      };
    });

    return {
      ...opt,
      values: validValues
    };
  });
});

watchEffect(() => {
  const productVariant = props.product.variants.find((v) => {
    return currConfig.value.every((c) => {
      return v.attributes.some((att) => {
        return att.code === c.code && att.value_index === c.value_index;
      });
    });
  });

  if (!productVariant) return defaultVariant;

  $emit('updateVariant', {
    id: props.product.id,
    image: productVariant.product.image,
    sku: productVariant.product.sku
  });
});

function onFilterSelect(
  attribute_code: configAttributeCode,
  value: ConfigValueOption
) {
  const confIdx = currConfig.value.findIndex((c) => c.code === attribute_code);

  if (confIdx === -1) {
    currConfig.value.push({
      code: attribute_code,
      value_index: value.value_index
    });
    return;
  }

  if (currConfig.value[confIdx].value_index === value.value_index) {
    currConfig.value = currConfig.value.filter((c) => {
      return c.code !== attribute_code && c.value_index !== value.value_index;
    });
    return;
  }

  currConfig.value[confIdx].value_index = value.value_index;
}
</script>

<style scoped lang="scss">
.config-options {
  gap: 5px;
  display: flex;
  flex-direction: column;
}
</style>
