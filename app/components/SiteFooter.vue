<template>
    <v-footer class="site-footer">
        <div class="container-narrow px-4 py-10">
            <v-row>
                <v-col cols="12" md="4">
                    <img src="/images/logo-footer.webp" alt="Airport Bansko Transfer logo" width="170" height="39" loading="lazy" class="mb-4 site-footer__logo" />
                    <p class="site-footer__text">Private, fixed-price airport transfers between Sofia, Plovdiv, Thessaloniki and Kavala airports and Bansko, Razlog, Dobrinishte and Pirin Golf.</p>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <h2 class="site-footer__heading">Transfers</h2>
                    <ul class="site-footer__list">
                        <li v-for="r in ROUTES" :key="r.slug">
                            <NuxtLink :to="`/transfers/${r.slug}`">{{ r.airportShort }} to Bansko</NuxtLink>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="6" sm="3" md="2">
                    <h2 class="site-footer__heading">Info</h2>
                    <ul class="site-footer__list">
                        <li><a href="/#why-us">Why Us</a></li>
                        <li><a href="/#how-it-works">How It Works</a></li>
                        <li><a href="/#prices">Prices</a></li>
                        <li><a href="/#faq">FAQ</a></li>
                        <li><a href="/#reviews">Reviews</a></li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <h2 class="site-footer__heading">Contact</h2>
                    <ul class="site-footer__list">
                        <li><a :href="`tel:${SITE.phone}`">{{ SITE.phoneDisplay }}</a></li>
                        <li><a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a></li>
                        <li><a :href="SITE.whatsapp" target="_blank" rel="noopener">WhatsApp</a></li>
                        <li>Bansko, Bulgaria</li>
                    </ul>
                </v-col>
            </v-row>
            <v-divider class="my-8" color="rgba(255,255,255,0.15)"></v-divider>
            <p class="site-footer__copy">
                All rights reserved. Copyright © {{ year }}
                <a :href="SITE.url">airportbanskotransfer.com</a>
            </p>
        </div>
    </v-footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
    background: var(--color-alpine-night);
    display: block;
}
.site-footer__logo {
    height: auto;
    display: block;
}
.site-footer__text {
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    line-height: 1.6;
}
.site-footer__heading {
    color: #fff !important;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
}
.site-footer__list {
    list-style: none;
    padding: 0;
    margin: 0;
    color: rgba(255,255,255,0.75);
    font-size: 0.9rem;
}
.site-footer__list li {
    margin-bottom: 10px;
    overflow-wrap: anywhere;
}
.site-footer__list a {
    color: rgba(255,255,255,0.75);
    text-decoration: none;
}
.site-footer__list a:hover {
    color: var(--color-amber);
}
.site-footer__copy {
    color: rgba(255,255,255,0.55);
    font-size: 0.8rem;
    text-align: center;
}
.site-footer__copy a {
    color: rgba(255,255,255,0.8);
}
</style>
