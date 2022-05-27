<template>
    <div class="container">
        <slot name="content"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MContainer",
});
</script>

<style lang="scss" scoped>
@mixin container($width) {
    max-width: $width;
    width: auto;
    margin: 0 auto;
}
.container {
    @media (max-width: 575.98px) {
        @include container(350px);
    }
    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) and (max-width: 767.98px) {
        @include container(662px);
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) and (max-width: 991.98px) {
        @include container(768px);
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) and (max-width: 1199.98px) {
        @include container(1024px);
    }

    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) and (max-width: 1399px) {
        @include container(1220px);
    }
    @media (min-width: 1440px) {
        @include container(1400px);
    }
}
</style>
