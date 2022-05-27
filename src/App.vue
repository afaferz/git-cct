<template>
    <MHeader />
    <MAlert />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MHeader from "./components/Shared/MHeader.vue";
import MAlert from "./components/Custom/MAlert.vue";
export default defineComponent({
    components: {
        MHeader,
        MAlert
    }
});
</script>

<style lang="scss">
#app {
    background-color: #fefeef;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
}
</style>
