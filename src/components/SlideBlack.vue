
<script setup>

    import { defineProps } from 'vue'

    const props = defineProps(['slide'])


    console.log(props.slide)

</script>

<style scoped lang="scss">

.slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #000;
    color: white;

    &.res1920x1080 {
        width: 800px;
        height: 600px;
    }
}

</style>

<template>
    <div class="slide res1920x1080">
    </div>
</template>