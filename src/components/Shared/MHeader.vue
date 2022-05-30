<template>
    <header class="header">
        <button class="nav__button" @click="openNav = !openNav">menu</button>
        <nav :class="{ active: openNav }">
            <router-link to="/" @click.stop="openNav = !openNav">
                Home
            </router-link>
            <router-link to="/about" @click.stop="openNav = !openNav">
                About
            </router-link>
        </nav>
        <div class="navigation-control" v-if="type !== 'xs'">
            <ul>
                <li>
                    <code>TAB</code>
                    <span>Selecionar convenção de commit</span>
                </li>
                <li>
                    <code>CTRL + Space</code>
                    <span>Selecionar uma convenção</span>
                </li>
                <li>
                    <code>CRTL + I</code>
                    <span>Focar na pesquisa</span>
                </li>
            </ul>
        </div>
        <div class="utils-links">
            <button>
                <a
                    href="https://www.conventionalcommits.org/en/v1.0.0/"
                    target="_blank"
                >
                    CONVENTIONAL COMMITS
                </a>
            </button>
            <button>
                <a
                    href="https://learngitbranching.js.org/?locale=pt_BR"
                    target="_blank"
                >
                    APRENDA GIT
                </a>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import useBreakpoints from "@/hooks/useBreakpoints";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const openNav = ref(false);
        const { type } = useBreakpoints();
        return {
            openNav,
            type,
        };
    },
});
</script>

<style lang="scss" scoped>
header.header {
    min-height: 40vh;
    background: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.nav__button {
    position: fixed;
    right: 15px;
    top: 3rem;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    padding: 1rem;
    cursor: pointer;
    z-index: 11;
    border: none;
}
nav {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: fixed;
    transform: translate(150vw, -150vh);
    background: #2c3e50;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    width: 0%;
    height: 0%;
    padding: 4rem;
    transition: all 0.5s cubic-bezier(0.665, 0.84, 0.54, 1);
    overflow: hidden;

    a {
        font-weight: 900;
        text-align: left;
        font-size: 3.5rem;
        margin: 1.5rem 0;
        text-decoration: none;

        color: #fefefe;
        &.router-link-exact-active {
            color: aqua;
        }
    }

    &.active {
        width: 100%;
        height: 100%;
        transform: translate(0, 0);
        z-index: 10;
    }
}
.navigation-control {
    width: 60%;
    margin: 0 auto;
    ul {
        display: flex;
        width: 100%;
        flex-direction: column;
        color: #fefefe;
        list-style: none;
        justify-content: flex-start;
        li {
            padding: 1rem;
            display: flex;
            align-items: center;
            flex-direction: row;
            font-size: 1.75rem;
            width: 100%;
            // width: 400px;
            font-weight: 900;
            code {
                padding: 1rem;
                width: 18rem;
                margin: 10px 0;
                display: inline-block;
                background-color: #f6f8fa;
                color: #020202;
                border-radius: 4px;
                padding: 0.5rem 0.7rem;
                border-radius: 4px;
                margin: 0 0.5rem;
                box-shadow: 0px 4px 5px rgba($color: #000000, $alpha: 0.55);
                font-size: 85%;
                word-wrap: normal;
                white-space: pre;
                margin-right: 15px;
            }
        }
    }
}
.utils-links {
    width: 60%;
    height: auto;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    button {
        background-color: rgb(162, 255, 247);
        border: none;
        border-radius: 4px;
        padding: 1.25rem;
        display: block;
        width: 200px;
        margin: 1rem 0;
        transition: all 0.4s ease-in-out;
        a {
            color: inherit;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 900;
        }
    }
    @media screen and (min-width: 768px) {
        flex-direction: row;
        button {
            margin: 0 1rem;
            width: 250px;
        }
        button:hover {
            background-color: rgb(124, 202, 196);
        }
    }
}
</style>
