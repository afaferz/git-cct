<template>
    <div class="alert" :class="[show && 'show', type]">
        <p class="alert-text" v-html="message"></p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "MAlert",
    setup() {
        const store = useStore();

        const show = computed(() => store.state.alert.show);
        const message = computed(() => store.state.alert.message);
        const type = computed(() => store.state.alert.type);

        return {
            show,
            message,
            type,
        };
    },
});
</script>
<style lang="scss">
.alert {
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba($color: #000000, $alpha: 0.55);
    position: fixed;
    height: 7rem;
    width: 90%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    padding: 0.75rem;
    line-height: 1.5;
    transition: all 0.4s ease-in-out;
    z-index: 20;
    @media screen and (min-width: 768px) {
        width: 55%;
    }

    &.show {
        top: 1.5rem;
        opacity: 1;
    }
    &.info {
        background-color: aquamarine;
    }
    &.error {
        background-color: rgb(250, 70, 70);
    }
    &.success {
        background-color: rgb(250, 70, 70);
    }
}

.alert-text {
    color: #444242;
    letter-spacing: 0.085;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    code {
        background-color: #f6f8fa;
        color: #020202;
        border-radius: 4px;
        padding: 0.5rem  0.7rem;
        border-radius: 4px;
        margin: 0 0.5rem;
        box-shadow: 0px 4px 5px rgba($color: #000000, $alpha: 0.55);
        font-size: 85%;
        word-wrap: normal;
        white-space: pre;
    }

    @media screen and (min-width: 768px) {
        font-size: 2rem;
    }
}
</style>
