<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue'
import SlidesPlayer from '@/components/SlidesPlayer.vue'
import { useConfigStore } from '@/stores/Config'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

const config = useConfigStore()

library.add(faRetweet)


let slidePreview = ref({
  type: 'text-double-line',
  options: {
    text1: 'Event Name Preview',
    text2: 'Event Date Preview line 2',
    backgroundColor1: config.backgroundColor1,
    textColor1: config.textColor1,
    backgroundColor2: config.backgroundColor2,
    textColor2: config.textColor2
  }
})

let slideProgram = ref({
  type: 'text-single-line',
  options: {
    text: 'Event Name Program',
    backgroundColor: config.backgroundColor1,
    textColor: config.textColor1,
  }
})


let switchSlides = () => {
  let temp = slidePreview.value
  slidePreview.value = slideProgram.value
  slideProgram.value = temp
}

</script>

<style scoped lang="scss">
.monitors {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 32px;

  .switches {
    width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: none;
      border: none;
      cursor: pointer;

      svg {
        color: #42b983;
        font-size: 32px;
      }
    }
  }
}
</style>

<template>
  <LayoutMain>

    <div class="monitors">
      <div class="monitor">
        <h2>Preview</h2>
        <SlidesPlayer :slide="slidePreview"></SlidesPlayer>
      </div>

      <div class="switches">
        <button @click="switchSlides()"><font-awesome-icon :icon="'retweet'" /></button>
      </div>

      <div class="monitor">
        <h2>Program</h2>
        <SlidesPlayer :slide="slideProgram"></SlidesPlayer>
      </div>
    </div>
  </LayoutMain>
</template>
