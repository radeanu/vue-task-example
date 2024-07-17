<template>
  <div class="config-options">
    <div v-for="(config, i) in product.configurable_options" :key="'opt' + i">
      <SizeConfigComp
        v-if="config.attribute_code === configAttributeCode.size"
        :config="config"
        @select="onFilterSelect(config.attribute_code, $event)"
      />

      <ColorConfigComp
        v-if="config.attribute_code === configAttributeCode.color"
        :values="config.values"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type ConfigurableProduct,
  type ConfigValueOption,
  configAttributeCode
} from '@/common/types';

import SizeConfigComp from './product-config/sizeConfig.vue';
import ColorConfigComp from './product-config/colorConfig.vue';

const props = defineProps<{ product: ConfigurableProduct }>();

const validVariants = ref([]);

function onFilterSelect(attrCode: string, value: ConfigValueOption) {
  console.log({ attrCode, value });
}
</script>

<style scoped lang="scss">
.config-options {
  gap: 5px;
  display: flex;
  flex-direction: column;
}

// .disabled-option {
//   pointer-events: none;
// }

// .crossed-red {
//   background: linear-gradient(
//       to top left,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0) calc(50% - 2px),
//       rgb(255, 0, 0) 50%,
//       rgba(0, 0, 0, 0) calc(50% + 2px),
//       rgba(0, 0, 0, 0) 100%
//     ),
//     linear-gradient(
//       to top right,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0) calc(50% - 2px),
//       rgb(255, 0, 0) 50%,
//       rgba(0, 0, 0, 0) calc(50% + 2px),
//       rgba(0, 0, 0, 0) 100%
//     );
// }

// .crossed-light {
//   background: linear-gradient(
//       to top left,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0) calc(50% - 2px),
//       rgb(255, 255, 255) 50%,
//       rgba(0, 0, 0, 0) calc(50% + 2px),
//       rgba(0, 0, 0, 0) 100%
//     ),
//     linear-gradient(
//       to top right,
//       rgba(0, 0, 0, 0) 0%,
//       rgba(0, 0, 0, 0) calc(50% - 2px),
//       rgb(255, 255, 255) 50%,
//       rgba(0, 0, 0, 0) calc(50% + 2px),
//       rgba(0, 0, 0, 0) 100%
//     );
// }
</style>
