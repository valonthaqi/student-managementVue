<template>
  <button v-if="!link" :class="[mode, 'text-white bg-purple-800 border border-purple-800 px-4 py-2  mr-2']">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="[mode, 'text-white bg-purple-800 border border-purple-800 px-4 py-2  mr-2']">
    <slot></slot>
  </router-link>
</template>


<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: "/",
        }
    }
}
</script>