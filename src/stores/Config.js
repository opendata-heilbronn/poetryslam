import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {

    state: () => ({
        theme: 'dark',
        id: '',
        name: 'Beispiel Slam',
        textColor1: '#7cdeb9',
        backgroundColor1: '#008552',
        textColor2: '#a7c4cd',
        backgroundColor2: '#005470',
        backgroundImage: '',

        countWinners: 1,
        countJury: 5,
        gameMode: 'simple',
        resolution: '1920x1080',
    }),

    actions: {
        setTheme(theme) {
            this.theme = theme
        },

        setId(id) {
            this.id = id
        },

        setName(name) {
            this.name = name
        },

        setTextColor1(color) {
            this.textColor1 = color
        },

        setTextColor2(color) {
            this.textColor2 = color
        },

        setBackgroundColor1(color) {
            this.backgroundColor1 = color
        },

        setBackgroundColor2(color) {
            this.backgroundColor2 = color
        },

        setBackgroundImage(image) {
            this.backgroundImage = image
        },

        setCountWinners(count) {
            this.countWinners = count
        },

        setCountJury(count) {
            this.countJury = count
        },

        setGameMode(mode) {
            this.gameMode = mode
        },

        setResolution(resolution) {
            this.resolution = resolution
        }
    }
})