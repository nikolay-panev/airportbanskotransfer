<template>
    <v-app-bar elevation="0" height="76" class="site-header" color="white">
        <div class="d-flex align-center" style="width:100%">
            <a href="/" aria-label="Airport Bansko Transfer — home" class="logo">
                <v-img src="/images/logo.webp" alt="Airport Bansko Transfer logo" width="180" class="ml-2 ml-md-6"></v-img>
            </a>

            <v-spacer></v-spacer>

            <nav class="hidden-md-and-down mr-6" aria-label="Primary">
                <a href="#why-us" class="nav-link">Why Us</a>
                <a href="#how-it-works" class="nav-link">How It Works</a>
                <a href="#routes" class="nav-link">Routes</a>
                <a href="#reviews" class="nav-link">Reviews</a>
                <a href="#contact" class="nav-link">Contact</a>
            </nav>

            <div class="hidden-sm-and-down mr-6 contact-block">
                <a :href="encode('tel:+359899239723')" class="contact-line" @click.prevent="clickHandler">
                    <v-icon size="16" color="var(--color-glacier)">mdi-cellphone</v-icon>
                    <span>+359 89 923 9723</span>
                </a>
                <a :href="encode('mailto:book@airportbanskotransfer.com')" class="contact-line" @click.prevent="clickHandler">
                    <v-icon size="16" color="var(--color-glacier)">mdi-email-outline</v-icon>
                    <span>book@airportbanskotransfer.com</span>
                </a>
            </div>

            <v-btn class="hidden-sm-and-down mr-4" color="var(--color-amber)" rounded="pill" elevation="0" href="#book" aria-label="Jump to booking form">
                Book Now
            </v-btn>

            <v-btn class="hidden-md-and-up mr-2" icon variant="text" aria-label="Open menu" @click="drawer = true">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="right" width="280">
        <v-list nav aria-label="Mobile navigation">
            <v-list-item title="Why Us" href="#why-us" @click="drawer=false"></v-list-item>
            <v-list-item title="How It Works" href="#how-it-works" @click="drawer=false"></v-list-item>
            <v-list-item title="Routes" href="#routes" @click="drawer=false"></v-list-item>
            <v-list-item title="Reviews" href="#reviews" @click="drawer=false"></v-list-item>
            <v-list-item title="Contact" href="#contact" @click="drawer=false"></v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item :href="encode('tel:+359899239723')" @click.prevent="clickHandler">
                <template v-slot:prepend><v-icon color="var(--color-glacier)">mdi-cellphone</v-icon></template>
                +359 89 923 9723
            </v-list-item>
            <v-list-item :href="encode('mailto:book@airportbanskotransfer.com')" @click.prevent="clickHandler">
                <template v-slot:prepend><v-icon color="var(--color-glacier)">mdi-email-outline</v-icon></template>
                book@airportbanskotransfer.com
            </v-list-item>
            <v-list-item class="mt-4">
                <v-btn block color="var(--color-amber)" href="#book" @click="drawer=false">Book Now</v-btn>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
const { encode, decode } = useCoder()
const drawer = ref(false)
const clickHandler = (event) => {
    let href = decode(event.currentTarget.href)

    if(href) {
        window.location = href
    }
}
</script>

<style scoped>
.site-header {
    border-bottom: 1px solid var(--color-line);
}
.logo {
    display: inline-flex;
    align-items: center;
}
.nav-link {
    color: var(--color-ink);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
    margin: 0 14px;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
    transition: border-color .2s, color .2s;
}
.nav-link:hover, .nav-link:focus-visible {
    color: var(--color-glacier);
    border-color: var(--color-amber);
}
.contact-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
}
.contact-line {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-ink-soft);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
}
.contact-line:hover {
    color: var(--color-glacier);
}
</style>
