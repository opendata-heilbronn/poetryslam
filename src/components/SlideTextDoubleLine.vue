
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
        scale: 0.5;
    }
    100% {
        scale: 1;
        opacity: 1;
    }
}

@keyframes text_2_in {
    0% {
        opacity: 0;
        transform: scale(2) translateY(-60%);
    }
    50% {
        opacity: 1;
        transform: scale(2) translateY(-60%);
    }
    100% {
        transform: translateY(0);
    }
}

.slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #000;
    color: white;
    overflow: hidden;

    &.res1920x1080 {
        width: 800px;
        height: 600px;
    }

    .multiline {
        width: 80%;
        .text_1 {
            animation: text_1_in;
            animation-duration: 3s;
            animation-timing-function: ease-in-out;
            animation-delay: 3s;
            animation-fill-mode: forwards;
            width: 100%;
            padding: 16px 32px;
            text-align: center;
            opacity: 0;
            font-size: 32px;
        }
    
        .text_2 {
            animation-name: text_2_in;
            animation-timing-function: ease-in-out;
            animation-duration: 3s;
            width: 100%;
            padding: 16px 32px;
            text-align: center;
            font-size: 16px;
        }
    }
}

</style>

<template>
    <div class="slide res1920x1080">
        <div class="multiline">
            <div class="text_1" :style="{ 'background-color': slide.backgroundColor1 }">
                <span :style="{ 'color': slide.textColor1}">{{ slide.text1 }}</span>
            </div>
    
            <div class="text_2">
                <span :style="{ 'color': slide.textColor2}">{{ slide.text2 }}</span>
            </div>
        </div>
    </div>
</template>