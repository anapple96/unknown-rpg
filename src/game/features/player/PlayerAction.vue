<template>
  <div>
    <p>{{ action.description }}: {{ action.currentProgress | twoDigits }} / {{ action.duration | twoDigits }}
    <span v-if="action.repeat > 0">Repeat {{action.repeat}} times</span>
    </p>
  </div>
</template>

<script>
import {PlayerAction} from "@/game/features/player/PlayerAction";

export default {
  name: "PlayerAction",
  props: {
    action: PlayerAction,
  },
}
</script>

<style scoped>

</style>
