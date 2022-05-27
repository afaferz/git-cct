import { computed, onMounted, onUnmounted, ref } from "vue"

export default function () {
    // Resize to detect mobile

    const windowSize = ref(window.innerWidth);
    const onResize = () => (windowSize.value = window.innerWidth);

    onMounted(() => window.addEventListener("resize", onResize));
    onUnmounted(() => window.removeEventListener("resize", onResize));

    const type = computed(() => {
        if (windowSize.value < 550) return 'xs'
        if (windowSize.value >= 550 && windowSize.value < 1200) return 'md'
        if (windowSize.value >= 1200) return 'lg'
        return null; // This is an unreachable line, simply to keep eslint happy.
    })

    const width = computed(() => windowSize.value)

    return { width, type }
}