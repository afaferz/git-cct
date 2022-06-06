<template>
    <div class="control-wrapper">
        <div class="input-wrapper">
            <input
                type="text"
                v-model="search"
                placeholder="Search emoji..."
                ref="inputControl"
                data-jest="input-search"
            />
            <kbd>Ctrl I</kbd>
        </div>
        <div class="display-list-wrapper">
            <div class="display-list__button">
                <button tabindex="-1">AS</button>
            </div>
            <div class="display-list__button">
                <button tabindex="-1">AS</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useBreakpoints from "@/hooks/useBreakpoints";
import {
    computed,
    defineComponent,
    ref,
    WritableComputedRef,
    onMounted,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "MInput",
    setup(_props) {
        const { type } = useBreakpoints();
        const store = useStore();
        const search: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters["GET_SEARCH"];
            },
            set(value: string) {
                store.commit("SET_SEARCH", value);
            },
        });
        const inputControl = ref(document.createElement("input"));
        onMounted(() => {
            const searchKey = (event: any) => {
                const { ctrlKey, key } = event;

                if (ctrlKey && key === "i") {
                    event.preventDefault();

                    event.stopPropagation();
                    return inputControl.value.focus();
                }
            };
            window.addEventListener("keydown", searchKey);
        });
        return {
            type,
            search,
            inputControl,
        };
    },
});
</script>

<style lang="scss" scoped>
.control-wrapper {
    background-color: transparent;
    box-sizing: border-box;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    @media screen and (min-width: 768px) {
        display: inline-flex;
        flex-direction: row;
    }
}
.input-wrapper {
    background-color: #fefefe;
    box-shadow: 0 10px 20px 0 rgba(168, 182, 191, 0.6);
    display: flex;
    flex-direction: row;
    padding: 1.25rem;
    width: 85%;
    input {
        border: none;
        width: 90%;
        outline: none;
        padding-left: 2rem;
        color: #8d8d8d;
        font-weight: 900;
        font-size: 1.5rem;
    }
    kbd {
        border: 2px solid #8d8d8d;
        padding: 0.65rem;
        width: 30%;
        font-size: 1.25rem;
        font-weight: 900;
    }
    @media screen and (min-width: 768px) {
        input {
            width: 100%;
        }
        kbd {
            width: 5%;
        }
    }
}
.display-list-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 45%;
    @media screen and (min-width: 768px) {
        width: 15%;
    }
}
.display-list__button {
    background-color: transparent;
    height: 100%;
    width: 100%;
    margin: 1rem;
    &:first-of-type {
        margin-left: 0;
    }
    button {
        background-color: #fefefe;
        box-shadow: 0 10px 20px 0 rgba(168, 182, 191, 0.6);
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        height: 100%;
        padding: 1.5rem;
        width: 75%;
    }
    @media screen and (min-width: 768px) {
        width: 50%;
        margin: 0;
    }
}
</style>
