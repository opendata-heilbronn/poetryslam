
<script setup>

import { defineProps } from 'vue'

defineProps({
    slide: Object
})

</script>

<style scoped lang="scss">
@keyframes text_1_in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

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

    .text_1 {
        animation: text_1_in;
        animation-duration: 3s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        width: 80%;
        padding: 16px 32px;
        text-align: center;
        opacity: 0;
        font-size: 32px;
    }
}
</style>

<template>
    <div class="slide res1920x1080">
        <div class="text_1" :style="{ 'background-color': slide.backgroundColor }">
            <h1 :style="{ 'color': slide.textColor }">{{ slide.text }}</h1>
        </div>
    </div>
</template>