<template>
    <transition name="modal">
        <div
            class="modal-overlay"
            v-show="open"
            :class="{ active: open }"
            @click.stop.self="open = !open; message = ''"
        >
            <div class="modal" @keypress.ctrl.enter="copyCommit">
            <span class="preview__title">PRÉVIA</span>
                <div class="git-commit">
                    <code>
                        {{ fullCommit }}
                    </code>
                </div>
                <fieldset class="fieldset__message">
                    <legend>MENSAGEM</legend>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        v-model="message"
                    ></textarea>
                </fieldset>
                <button @click.self="copyCommit" class="modal-button button--copy">COPIAR</button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, inject, WritableComputedRef } from "vue";
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
                `git commit -m "${commit.value.pattern}: ${commit.value.emoji} ${message.value}"`
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
        height: 60vh;
    }
}
.modal-enter-to .modal {
    animation: slide 0.3s;
}

.preview__title {
    font-size: 1.5rem;
    background-color: #8d8d8d;
    padding: .85rem;
    color: #fefefe;
    font-weight: 900;
    margin-bottom: 20px;
    width: 60px;
}
.git-commit {
    box-sizing: border-box;
    font-size: 2rem;
    word-wrap: break-word;
    max-height: 200px;
    overflow: scroll;
}

.fieldset__message {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
    border-radius: 5px;
    margin: 1.57rem 0;
    border-color: #2c3e50;
    box-sizing: border-box;
    legend {
        font-size: 1.5rem;
        padding: .65rem;
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
    padding: .75rem;
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
