<template>
    <svg class="route-line" viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="routeLineTitle">
        <title id="routeLineTitle">Route from the airport to Bansko, in the Pirin mountains</title>

        <path class="route-line__path" d="M28,190 C 120,190 150,120 210,110 C 300,96 340,40 486,30"
              fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 10" />

        <!-- Airport marker -->
        <g transform="translate(28,190)">
            <circle r="7" fill="var(--color-amber)" />
            <path transform="translate(-9,-32)" d="M9 0 L11 8 L18 10 L18 12 L11 11 L11 17 L14 19 L14 21 L9 20 L4 21 L4 19 L7 17 L7 11 L0 12 L0 10 L7 8 Z" fill="#fff" opacity="0.9"/>
            <text x="16" y="5" class="route-line__label">Airport</text>
        </g>

        <!-- Resort / mountain marker -->
        <g transform="translate(486,30)">
            <circle r="7" fill="#fff" />
            <path transform="translate(-13,-30)" d="M0 20 L9 4 L14 12 L19 2 L26 20 Z" fill="#fff" opacity="0.95"/>
            <text x="-70" y="-14" class="route-line__label route-line__label--end">Bansko</text>
        </g>
    </svg>
</template>

<style scoped>
.route-line {
    width: 100%;
    max-width: 460px;
    height: auto;
    color: rgba(255, 255, 255, 0.55);
    overflow: visible;
}
.route-line__path {
    stroke-dashoffset: 620;
    animation: draw-route 2.2s ease-out 0.3s forwards;
}
.route-line__label {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    fill: #ffffff;
    letter-spacing: 0.04em;
}

@keyframes draw-route {
    to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .route-line__path {
        animation: none;
        stroke-dashoffset: 0;
    }
}
</style>
