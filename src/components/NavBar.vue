<script setup>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faEnvelope, faInfoCircle, faAnglesLeft, faAnglesRight, faGear } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

library.add(faHome, faEnvelope, faInfoCircle, faAnglesLeft, faAnglesRight, faGear)

let router = useRouter()
let routes = router.getRoutes()
let navigationItems = routes.filter(m => m.meta.icon != null).map(route => {
    return {
        text: route.name,
        href: route.path,
        icon: route.meta.icon,
        active: false
    }
})
router.afterEach((to) => {
    navigationItems.forEach(item => {
        item.active = item.text.toLowerCase() === to.name.toLowerCase()
    })
})


let compact = ref(false)

let gotoView = (href) => {
    console.log('gotoView', href)
    router.push(href)
}

</script>

<style scoped lang="scss">
.navigation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */

    height: 100vh;
    background-color: #444950;
    width: 250px;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;

        li {
            padding: 20px 20px;
            height: 64px;
            border-bottom: solid 1px #1c1e21;
            cursor: pointer;
            text-decoration: none;
            color: #42b983;
            font-size: 18px;

            svg {
                color: #42b983;
            }
            span {
                margin-left: 10px;
            }


            &.active {
                color: #64FFDA;

                svg {
                    color: #64FFDA;
                }
            }

            &:hover {
                background-color: #42b983;

                span,
                svg {
                    color: #1c1e21;
                }
            }
        }
    }

    .footer {
        // padding: 20px;
        border-top: solid 1px #1c1e21;

        button {
            background: none;
            border: none;
            cursor: pointer;
            width: 64px;
            height: 64px;

            &:hover {
                color: #42b983;
            }
        }
    }

    &.compact {
        width: 64px;


        ul li span {
            display: none;
        }
    }
}
</style>

<template>
    <div class="navigation" :class="{ 'compact': compact }">
        <ul>
            <li v-for="(item, index) in navigationItems" :key="index" :class="{ 'active': item.active }"
                @click="gotoView(item.href)">
                <font-awesome-icon :icon="item.icon" />
                <span>{{ item.text }}</span>
            </li>
        </ul>

        <div class="footer">
            <button @click="compact = !compact">
                <font-awesome-icon :icon="'angles-left'" v-if="!compact" />
                <font-awesome-icon :icon="'angles-right'" v-if="compact" />
            </button>

        </div>
    </div>
</template>