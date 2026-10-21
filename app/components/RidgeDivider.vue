<template>
    <svg class="ridge-divider" :class="`ridge-divider--${tone}`" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,80 L0,46 L90,20 L180,50 L260,10 L340,42 L430,4 L520,38 L610,16 L700,48 L790,24 L880,52 L970,18 L1060,44 L1150,12 L1250,40 L1340,22 L1440,46 L1440,80 Z" />
    </svg>
</template>

<script setup>
defineProps({
    tone: {
        type: String,
        default: 'light', // light | dim | night — matches the background of the section BELOW the divider
    }
})
</script>
