<template>
  <button @click="buy" class="btn btn-primary" :class="{'disabled': !canBuy}">
    <p> {{ upgrade.displayName }}</p>
    <currency :currency="cost"></currency>
  </button>
</template>

<script>
import {Upgrade} from "@/engine/upgrades/Upgrade.ts";
import Currency from "@/engine/features/wallet/ABCCurrency.vue";

export default {
  name: "ABCUpgrade",
  components: {
    'currency' :Currency
  },
  props: {
    upgrade: Upgrade
  },

  methods: {
    buy() {
      this.upgrade.buy();
    }
  },

  computed: {
    cost() {
      return this.upgrade.getCost();
    },

    canBuy() {
      return this.upgrade.canBuy();
    }
  }

}
</script>

<style scoped>

</style>
