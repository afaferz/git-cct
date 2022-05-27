<template>
    <article
        class="card-wrapper"
        tabindex="0"
        @keyup.ctrl.capture="clipboardEmoji(emojiItem.img, emojiItem.name)"
    >
        <div
            class="card-content"
            :style="{ '--bg-color': emojiItem.color }"
            tabindex="-1"
        >
            <figure class="card-emoji" tabindex="-1">
                <button
                    tabindex="-1"
                    :data-clipboard="emojiItem.img"
                    @click="clipboardEmoji(emojiItem.img, emojiItem.name)"
                >
                    <span>
                        {{ emojiItem.img }}
                    </span>
                </button>
            </figure>
            <div class="card-description" tabindex="-1">
                <button
                    class="card-description__emoji-name"
                    @click.stop="clipboardEmoji(emojiItem.img, emojiItem.name)"
                    tabindex="-1"
                >
                    <code>{{ emojiItem.code }}</code>
                </button>
                <p
                    class="card-description__information"
                    v-html="emojiItem.description"
                ></p>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    props: {
        emoji: {
            type: Object,
            default: () => ({
                name: "Test",
                code: ":test:",
                img: "img",
                color: "#fff000",
                description: `Lorem ipsum dolor Lorem ipsum dolorLorem ipsum dolorLorem
                    ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum
                    dolorLorem ipsum dolor`,
            }),
        }
    },
    setup(props) {
        const store = useStore();
        const emojiItem = ref(props.emoji);
        const alert: any = inject("$alert");

        const clipboardEmoji = (emoji: string, name: string) => {
            const patternName = name.toLowerCase();
            const message = `git commit -m "${patternName}: ${emoji} "`;
            navigator.clipboard.writeText(message);
            store.commit("SET_CLIPBOARD_EMOJI", message);
            alert.info(`<code>${message}</code> coppied to clipboard :D`);
        };

        return {
            emojiItem,
            clipboardEmoji,
        };
    },
});
</script>

<style lang="scss" scoped>
.card-wrapper {
    box-sizing: border-box;
    background: transparent;
    display: flex;
    flex-basis: 100%;
    height: 350px;
    flex: 1 1 1;
    max-width: 100%;
    padding: 1.25rem;
    margin: 1rem 0;
    &:focus {
        border: 2px solid black;
        border-radius: 5px;
        outline: none;
    }
    @media screen and(min-width: 768px) {
        flex-basis: 50%;
    }
    @media screen and (min-width: 992px) {
        flex-basis: 33.33%;
    }
    @media screen and (min-width: 1024px) {
        flex-basis: 25%;
    }
}
.card-content {
    align-items: baseline;
    background-color: aliceblue;
    box-shadow: 0px 3px 5px rgba($color: #020202, $alpha: 0.55);
    border-radius: 10px;
    display: flex;
    height: 100%;
    flex-direction: column;
    transition: all 0.4s ease-in-out;
    width: 100%;
    &:hover {
        box-shadow: 0 10px 20px 0 rgba(168, 182, 191, 0.6);
        transform: translateY(-1px);
        .card-description > .card-description__emoji-name {
            &::after {
                width: 100%;
            }
        }
    }
}
.card-emoji {
    background: var(--bg-color);
    height: 55%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    width: 100%;
    button {
        cursor: pointer;
        font-size: 5.5rem;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        transition: all 0.4s ease-in-out;
        span {
            transition: all 0.4s ease-in-out;
            position: relative;
            top: 0;
            font-family: Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji,
                Segoe UI Symbol, Android Emoji, EmojiSymbols;
        }
    }
    &:hover > button > span {
        display: inline-block;
        box-shadow: 0px 5px 10px rgba($color: #020202, $alpha: 0.55);
        padding: 1rem;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        transform-origin: bottom;
        top: -50%;
    }
}
.card-description {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 45%;
    justify-content: center;
    margin: 25px 1.25rem 0 1.25rem;
    &__emoji-name {
        width: 50%;
        all: unset;
        font-size: 2rem;
        font-weight: 900;
        position: relative;
        cursor: pointer;
        &::after {
            background: var(--bg-color);
            bottom: 0px;
            content: "";
            height: 4px;
            left: 0;
            position: absolute;
            transition: all 0.3s ease-in-out;
            width: 0%;
        }
    }
    &__information {
        margin: 1.56rem;
        text-align: justify;
        line-height: 1.5;
        font-size: 1.25rem;
    }
}
</style>
