<template>
  <div>

    <p>We are the world</p>

    <h3>Player Position</h3>
    <p> {{ playerPosition }}</p>
    <br>
    <h3>Towns</h3>
    <p v-for="town of allTowns" :key="town.id"> {{ town }}</p>
    <br>
    <h3>Roads</h3>
    <p v-for="road of allRoads" :key="road.id"> {{ road }}</p>

  </div>
</template>

<script>
import {App} from "@/App.ts";

export default {
  name: "World",
  data: function () {
    return {
      world: App.game.world,
    }
  },


  computed: {
    playerPosition() {
      return this.world.playerPosition;
    },

    allTowns() {
      return this.world.towns;
    },
    allRoads() {
      return this.world.roads;
    },
  }
}
</script>

<style scoped>
div {
  border: 1px solid black;
}
</style>
