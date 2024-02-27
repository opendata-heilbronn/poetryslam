<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped lang="scss">
.main-container {
    display: flex;

    .main-content {
        color: white;
        width: 100%;
    }
}


</style>

<template>
    <div class="main-container">
        <NavBar />

        <div class="main-content">
            <slot />
        </div>
    </div>
</template>