<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    :locale="locale"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import locale from "bytemd/locales/zh_Hans.json";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight";

/**
 * 定义组件属性类型，外层传入数据
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
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
 * 属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    // console.log(v);
    return "";
  },
});
</script>

<style>
/*去掉GitHub图表*/
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
