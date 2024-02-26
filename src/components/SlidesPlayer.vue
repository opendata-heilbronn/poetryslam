
<script setup>

    import { useConfigStore } from '@/stores/Config'
    import { defineProps } from 'vue'

    const config = useConfigStore()

    defineProps({
        slide: Object
    })

</script>

<template>

    {{ config.name }}

    <!-- <player-event-name-announcement />
    <player-asset />
    <player-group-announcement />
    <player-group-score />
    <player-poet-announcement />
    <player-poet-score /> -->
</template>