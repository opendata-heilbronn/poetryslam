
<script setup>

// import { useConfigStore } from '@/stores/Config'
import { computed, defineProps } from 'vue'
import SlideTextSingleLine from '@/components/SlideTextSingleLine.vue'
import SlideTextDoubleLine from '@/components/SlideTextDoubleLine.vue'
import SlideBlack from '@/components/SlideBlack.vue'


// const config = useConfigStore()

const props = defineProps(['slide'])
const activeComponent = computed(() => {
    if (props.slide && props.slide.type == 'text-single-line')
        return SlideTextSingleLine
    if (props.slide && props.slide.type == 'text-double-line')
        return SlideTextDoubleLine

    return SlideBlack
})

const options = computed(() => {
    if (props.slide)
        return props.slide.options

    return {}
})

</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<template>
    <Transition name="fade" mode="out-in">
        <component :is="activeComponent" v-bind="{ slide: options }"></component>
    </Transition>

    <!-- 
    <player-asset />
    <player-group-announcement />
    <player-group-score />
    <player-poet-announcement />
    <player-poet-score /> -->
</template>