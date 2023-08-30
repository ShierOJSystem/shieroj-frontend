<template>
  <Viewer :value="value" :plugins="plugins" :locale="locale" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import { withDefaults, defineProps } from "vue";
import locale from "bytemd/locales/zh_Hans.json";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm({
    locale: gfmLocale,
  }),
  highlight(),
  // 中文显示
  math({
    locale: mathLocale,
  }),
  gemoji(),
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
