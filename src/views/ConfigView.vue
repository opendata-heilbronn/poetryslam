<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue'
import { useConfigStore } from '@/stores/Config'


const config = useConfigStore()

</script>

<style scoped lang="scss">
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: 32%;

    .card-header {
        background-color: #42b983;
        color: white;
        padding: 10px;
    }

    .card-content {
        padding: 10px;

        .form-group {
            margin-bottom: 20px;

            input,
            select {
                height: 32px;

                width: 100%;
                padding: 0 10px;
                margin-bottom: 10px;
                border: none;
            }


            .input-group-color {
                display: flex;
                align-items: center;



                input[type="text"] {
                    flex: 1;
                }

                input[type="color"] {
                    width: 32px;
                    border: none;
                    padding: 0;
                }
            }
        }


        label {
            display: block;
            margin-bottom: 5px;
            font-size: 16px;
        }

    }

}
</style>

<template>
    <LayoutMain>
        <form>
            <div class="card-container">


                <div class="card">
                    <div class="card-header"
                        :style="{ 'background-color': config.backgroundColor1, 'color': config.textColor1 }">About the Slam
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" v-model="config.name">
                        </div>

                        <div class="form-group">
                            <label for="countWinners">Number of winners</label>
                            <input type="number" id="countWinners" name="countWinners" v-model="config.countWinners">
                        </div>

                        <div class="form-group">
                            <label for="countJury">Number of jury members</label>
                            <input type="number" id="countJury" name="countJury" v-model="config.countJury">
                        </div>

                        <div class="form-group">
                            <label for="gameMode">Game mode</label>
                            <select id="gameMode" name="gameMode" v-model="config.gameMode">
                                <option value="simple" :selected="config.gameMode == 'simple'">Simple</option>
                                <option value="bw-slam" :selected="config.gameMode == 'bw-slam'">BW Slam</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"
                        :style="{ 'background-color': config.backgroundColor2, 'color': config.textColor2 }">Colors</div>
                    <div class="card-content">

                        <div class="form-group">
                            <label for="primaryColor">Primary Text Color</label>
                            <div class="input-group-color">
                                <input type="text" id="textColor1_text" name="textColor1_text" v-model="config.textColor1">
                                <input type="color" id="textColor1_color" name="textColor1_color"
                                    v-model="config.textColor1">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="secondaryColor">Primary Background Color</label>
                            <div class="input-group-color">
                                <input type="text" id="backgroundColor1_text" name="backgroundColor1_text"
                                    v-model="config.backgroundColor1">
                                <input type="color" id="backgroundColor1_color" name="backgroundColor1_color"
                                    v-model="config.backgroundColor1">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="secondaryColor">Secondary Text Color</label>
                            <div class="input-group-color">
                                <input type="text" id="textColor2_text" name="textColor2_text" v-model="config.textColor2">
                                <input type="color" id="textColor2_color" name="textColor2_color"
                                    v-model="config.textColor2">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="secondaryColor">Secondary Background Color</label>
                            <div class="input-group-color">
                                <input type="text" id="backgroundColor2_text" name="backgroundColor2_text"
                                    v-model="config.backgroundColor2">
                                <input type="color" id="backgroundColor2_color" name="backgroundColor2_color"
                                    v-model="config.backgroundColor2">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"
                        :style="{ 'background-color': config.backgroundColor1, 'color': config.textColor1 }">Projection
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label for="resolution">Resolution</label>
                            <select id="resolution" name="resolution" v-model="config.resolution">
                                <option value="800x600" :selected="config.resolution == '800x600'">800x600</option>
                                <option value="1024x768" :selected="config.resolution == '1024x768'">1024x768</option>
                                <option value="1280x720" :selected="config.resolution == '1280x720'">1280x720</option>
                                <option value="1920x1080" :selected="config.resolution == '1920x1080'">1920x1080</option>
                                <option value="3840x2160" :selected="config.resolution == '3840x2160'">3840x2160</option>

                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    </LayoutMain></template>
