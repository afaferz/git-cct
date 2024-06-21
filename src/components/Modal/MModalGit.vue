<template>
    <transition name="modal">
        <div
            class="modal-overlay"
            v-show="open"
            :class="{ active: open }"
            @click.stop.self="
                open = !open;
                message = '';
            "
        >
            <div class="modal" @keypress.ctrl.enter="copyCommit">
                <div class="git-commit">
                    <span>Prévia</span>
                    <code>
                        {{ fullCommit }}
                    </code>
                </div>

                <fieldset class="fieldset">
                    <legend>IMPORTANT</legend>
                    <button
                        @click="important = !important"
                        :class="{
                            important: important,
                        }"
                        class="fieldset__button"
                    >
                        IMPORTANTE ( ! )
                    </button>
                </fieldset>

                <fieldset class="fieldset fieldset--scope">
                    <legend>ESCOPO</legend>
                    <input
                        class="fieldset__input"
                        type="text"
                        v-model="scope"
                    />
                    <button class="fieldset__button--clear" @click="scope = ''">
                        LIMPAR
                    </button>
                </fieldset>

                <span class="preview__command">
                    Pressione <kbd>CTRL + Enter</kbd> para copiar commit
                </span>
                <fieldset class="fieldset">
                    <legend>MENSAGEM</legend>
                    <textarea v-model="message" name="" id=""></textarea>
                </fieldset>
                <button
                    @click.self="copyCommit"
                    class="modal-button button--copy"
                >
                    COPIAR
                </button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    inject,
    ref,
    WritableComputedRef,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        const alert: any = inject("$alert");

        // Modal Control
        const open: WritableComputedRef<boolean> = computed({
            get(): boolean {
                return store.getters["modalGit/GET_OPEN"];
            },
            set(value: boolean) {
                store.commit("modalGit/SET_OPEN", value);
            },
        });
        // Commit obj
        const commit = computed(() => store.getters["modalGit/GET_COMMIT"]);
        const important = ref(false);
        const scope = ref("");
        // Commit message
        const message: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters["modalGit/GET_MESSAGE"];
            },
            set(value: string) {
                store.commit("modalGit/SET_MESSAGE", value);
            },
        });
        // Full commit to clipboard
        const fullCommit = computed(
            () =>
                `git commit -m "${commit.value.pattern}${
                    scope.value ? `(${scope.value})` : ""
                }${important.value ? "!" : ""}: ${commit.value.emoji}  ${
                    message.value
                }"`
        );

        const copyCommit = () => {
            const message = `Comando GIT copiado com sucesso :D`;
            navigator.clipboard.writeText(fullCommit.value);
            alert.info(message);
        };

        return {
            open,
            message,
            commit,
            important,
            scope,
            fullCommit,
            copyCommit,
        };
    },
});
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba($color: #020202, $alpha: 0.55);
    z-index: 20;
    width: 100vw;
    height: 100vh;
    transition: all 0.3s ease-in-out;
}
.modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    height: 65vh;
    width: 90vw;
    background: #fefefe;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    font-family: Avenir, Helvetica, Arial, sans-serif;

    @media screen and (min-width: 768px) {
        width: 45vw;
        height: 85vh;
    }
    @media screen and (max-width: 600px) {
        height: 90vh;
    }
}
.modal-enter-to .modal {
    animation: slide 0.3s;
}

.modal-preview {
    margin-bottom: 20px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    .preview__title {
        background-color: #8d8d8d;
        padding: 0.85rem;
        color: #fefefe;
        font-weight: 900;
        margin-bottom: 15px;
        width: 60px;
    }
}
.preview__command {
    padding: 1rem;
    width: 270px;
    margin: 10px 0;
    display: inline-block;
    background-color: #f6f8fa;
    color: #020202;
    border-radius: 4px;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    box-shadow: 0px 4px 5px rgba($color: #000000, $alpha: 0.55);
    font-size: 1.25rem;
    word-wrap: normal;
    white-space: pre;
    margin-bottom: 15px;
}
.git-commit {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & > span {
        display: flex;
        width: max-content;
        margin-bottom: 6px;
        font-size: 2rem;
        background: #ccc;
        border-radius: 4px;
        font-weight: bold;
        color: #121212;
        padding: 5px;
    }
    & > code {
        box-sizing: border-box;
        font-size: 1.55rem;
        word-wrap: break-word;
        max-height: 150px;
        overflow-y: auto;
    }
}

.fieldset {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
    border-radius: 5px;
    margin: 1.57rem 0;
    border-color: #2c3e50;
    box-sizing: border-box;
    &--scope {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
    }
    &__button {
        all: unset;
        padding: 1rem;
        color: #2c3e50;
        width: max-content;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 700;
        border: 1px dashed #020202;
        cursor: pointer;
        &.important {
            color: #fefefe;
            background: #2c3e50;
        }
    }
    &__button--clear {
        height: max-content;
        padding: 1rem;
        color: #fefefe;
        font-weight: 700;
        background-color: rgb(219, 81, 81);
        border: none;
        cursor: pointer;
        margin-left: auto;
        &:hover {
            background-color: red;
        }
    }
    &__input {
        width: 100%;
        height: max-content;
        padding: 1rem;
    }
    legend {
        font-size: 1.5rem;
        padding: 0.65rem;
        color: #fefefe;
        font-weight: 900;
        background-color: #2c3e50;
        border-radius: 5px;
    }
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        border-radius: 5px;
        outline: none;
        font-weight: 900;
        font-size: 1.7rem;
        color: #8d8d8d;
    }
}
.modal-button.button--copy {
    background-color: aquamarine;
    border: none;
    border-radius: 5px;
    font-size: 1.575rem;
    padding: 0.75rem;
    color: #2c3e50;
    cursor: pointer;
    font-weight: bold;
    position: absolute;
    bottom: -10px;
    width: 250px;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (min-width: 768px) {
        width: 80%;
    }
}
.moda-enter,
.modal-leave-to {
    opacity: 0;
}
.modal-enter-active,
.modal-leave-to {
    transition: opacity 0.3s;
}
.modal-leave-to .modal {
    animation: slide 0.3s reverse;
}
@keyframes slide {
    from {
        top: 0;
    }
    to {
        top: 50%;
    }
}
</style>
l
