<template>
  <div>
    <div v-for="setting in settings.list" :key="setting.name">
      <BooleanSetting :setting="setting"></BooleanSetting>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import BooleanSetting from "@/engine/features/settings/ABCBooleanSetting.vue";

export default {
  name: "ABCSettings",
  components: {BooleanSetting},
  data: function () {
    return {
      settings: App.game.settings
    }
  },

}
</script>

<style scoped>

</style>
