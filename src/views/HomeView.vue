<template>
    <MContainer>
        <template #content>
            <MInputControl />
            <EmojisList />
        </template>
    </MContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MContainer from "@/components/Shared/MContainer.vue";
import MInputControl from "@/components/Inputs/MInputControl.vue";
import EmojisList from "@/components/Emojis/EmojisList.vue";
export default defineComponent({
    name: "HomeView",
    components: {
        MContainer,
        MInputControl,
        EmojisList,
    },
});
</script>
