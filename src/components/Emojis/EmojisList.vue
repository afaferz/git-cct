<template>
    <TransitionGroup
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        tag="div"
        mode="fade"
        :css="false"
        class="wrapper"
    >
        <EmojiCard
            v-for="item in emojis"
            :key="item.code"
            :emoji="item"
        />
        <div v-show="emojis.length === 0" class="no-results">No Results</div>
    </TransitionGroup>
</template>

<script lang="ts">
import {
    computed,
    defineAsyncComponent,
    defineComponent,
    onMounted,
} from "vue";
import { useStore } from "vuex";
const EmojiCard = defineAsyncComponent(() => import("../Cards/EmojiCard.vue"));
import gsap from "gsap";

export default defineComponent({
    name: "EmojisList",
    components: {
        EmojiCard,
    },
    setup() {
        const store = useStore();

        async function getEmojis() {
            await store.dispatch("GET_EMOJIS");
        }
        const emojis = computed(() => store.getters["GET_EMOJIS"]);

        onMounted(() => getEmojis());

        function onBeforeEnter(el: any) {
            el.style.opacity = 0;
            el.style.height = 0;
        }

        type DoneGsap = (...args: any[]) => void | null;

        function onEnter(el: gsap.TweenTarget, done: DoneGsap) {
            gsap.to(el, {
                opacity: 1,
                height: "300px",
                delay: (el as any).dataset.index * 0.15,
                onComplete: done,
            });
        }

        function onLeave(el: gsap.TweenTarget, done: DoneGsap) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                delay: (el as any).dataset.index * 0.15,
                onComplete: done,
            });
        }

        return {
            emojis,
            onBeforeEnter,
            onEnter,
            onLeave,
        };
    },
});
</script>

<style lang="scss" scoped>
.wrapper {
    align-items: flex-start;
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0;
    width: 100%;

    .no-results {
        font-size: 2rem;
        color: #8d8d8d;
        font-weight: 900;
        margin-left: 2rem;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}
</style>
