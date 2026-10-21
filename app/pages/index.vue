<template>
    <v-container fluid class="pa-0">
        <SiteHeader />
        <SocialIcons />

        <!-- ============ HERO ============ -->
        <section class="hero">
            <div class="hero__overlay"></div>
            <div class="hero__content container-narrow px-4">
                <div class="hero__text">
                    <p class="eyebrow" style="color:var(--color-amber)">Sofia · Plovdiv · Thessaloniki · Kavala → Bansko</p>
                    <h1 class="hero__title">Reliable<br class="hidden-sm-and-down" /> airport transfers to Bansko</h1>
                    <p class="hero__lead">
                        Private door-to-door transfers between Sofia, Plovdiv, Thessaloniki and Kavala airports and Bansko, Dobrinishte, Pirin Golf and Razlog.
                        Fixed prices, English-speaking drivers, no prepayment.
                    </p>
                    <div class="hero__actions">
                        <v-btn size="x-large" rounded="pill" color="var(--color-amber)" class="px-8 font-weight-bold" elevation="0" href="#book">Get Your Free Quote</v-btn>
                        <v-btn size="x-large" rounded="pill" variant="outlined" color="white" class="px-8 ml-3" href="tel:+359899239723">Call Us</v-btn>
                    </div>
                </div>
                <RouteLine class="hero__route" />
            </div>
        </section>

        <!-- ============ TRUST STRIP ============ -->
        <section class="trust-strip">
            <div class="container-narrow px-4">
                <v-row class="text-center" dense>
                    <v-col cols="6" md="3">
                        <v-icon color="var(--color-amber)" size="26">mdi-shield-check-outline</v-icon>
                        <p class="trust-strip__label">Licensed &amp; insured drivers</p>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-icon color="var(--color-amber)" size="26">mdi-currency-eur</v-icon>
                        <p class="trust-strip__label">Fixed prices, no surprises</p>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-icon color="var(--color-amber)" size="26">mdi-airplane-clock</v-icon>
                        <p class="trust-strip__label">Flight tracking &amp; meet &amp; greet</p>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-icon color="var(--color-amber)" size="26">mdi-close-circle-outline</v-icon>
                        <p class="trust-strip__label">Free cancellation</p>
                    </v-col>
                </v-row>
            </div>
        </section>

        <main>
            <!-- ============ WELCOME ============ -->
            <section class="section container-narrow px-4">
                <h2 class="text-h4 text-center font-weight-bold mb-4">Your private transfer to the Pirin mountains</h2>
                <p class="section__lead">
                    Airport Bansko Transfer has been driving travellers between regional airports and the Bansko area for years.
                    We run a private, door-to-door service — no shared shuttles, no waiting for other passengers, no taxi queues.
                    Whether you are arriving for a ski week in the Pirin mountains, a summer hike, or a round of golf at Pirin Golf,
                    your driver will be waiting at arrivals, ready to help with luggage and get you to your accommodation directly.
                </p>
            </section>

            <RidgeDivider tone="dim" />

            <!-- ============ BOOKING ============ -->
            <section class="section section--dim" aria-labelledby="booking-heading">
                <div class="container-narrow px-4">
                    <p class="eyebrow text-center">Book In Under A Minute</p>
                    <h2 id="booking-heading" class="text-h3 text-center font-weight-bold mb-8 mb-md-12">Book Your Transfer</h2>
                    <BookingForm />
                </div>
            </section>

            <RidgeDivider tone="light" />

            <!-- ============ WHY US ============ -->
            <section id="why-us" class="section container-narrow px-4" aria-labelledby="why-us-heading">
                <p class="eyebrow text-center">Why Travellers Choose Us</p>
                <h2 id="why-us-heading" class="text-h3 text-center font-weight-bold mb-10">Why Book With Us</h2>

                <v-row>
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="item in whyUs" :key="item.title" class="pa-2 pa-md-3">
                        <v-card class="feature-card" rounded="lg" elevation="0">
                            <v-icon color="var(--color-glacier)" size="44">{{ item.icon }}</v-icon>
                            <h3 class="feature-card__title">{{ item.title }}</h3>
                            <p class="feature-card__text">{{ item.text }}</p>
                        </v-card>
                    </v-col>
                </v-row>
            </section>

            <RidgeDivider tone="dim" />

            <!-- ============ HOW IT WORKS ============ -->
            <section id="how-it-works" class="section section--dim" aria-labelledby="how-heading">
                <div class="container-narrow px-4">
                    <p class="eyebrow text-center">Simple By Design</p>
                    <h2 id="how-heading" class="text-h3 text-center font-weight-bold mb-10">How It Works</h2>

                    <v-row>
                        <v-col cols="12" md="4" v-for="step in howItWorks" :key="step.title">
                            <v-card class="step-card" rounded="lg" elevation="0">
                                <div class="step-card__num">{{ step.num }}</div>
                                <h3 class="step-card__title">{{ step.title }}</h3>
                                <p class="step-card__text">{{ step.text }}</p>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </section>

            <RidgeDivider tone="light" />

            <!-- ============ ROUTES ============ -->
            <section id="routes" class="section container-narrow px-4" aria-labelledby="routes-heading">
                <p class="eyebrow text-center">Routes We Cover</p>
                <h2 id="routes-heading" class="text-h3 text-center font-weight-bold mb-4">Airport transfers to Bansko, from every direction</h2>
                <p class="section__lead mb-10">
                    Approximate one-way drive times — your exact fixed price is shown instantly in the booking form above.
                </p>

                <v-row>
                    <v-col cols="12" sm="6" lg="3" v-for="route in routes" :key="route.from">
                        <v-card class="route-card" rounded="lg" elevation="0" href="#book">
                            <v-icon color="var(--color-amber-dark)" size="28">mdi-airplane</v-icon>
                            <h3 class="route-card__title">{{ route.from }}</h3>
                            <v-icon size="18" color="var(--color-ink-soft)" class="my-1">mdi-arrow-down</v-icon>
                            <p class="route-card__to"><v-icon size="16" color="var(--color-glacier)">mdi-map-marker</v-icon> {{ route.to }}</p>
                            <p class="route-card__meta">{{ route.distance }} · approx. {{ route.time }}</p>
                        </v-card>
                    </v-col>
                </v-row>
            </section>

            <RidgeDivider tone="dim" />

            <!-- ============ FAQ ============ -->
            <section id="faq" class="section section--dim" aria-labelledby="faq-heading">
                <div class="container-narrow px-4" style="max-width:820px">
                    <p class="eyebrow text-center">Good To Know</p>
                    <h2 id="faq-heading" class="text-h3 text-center font-weight-bold mb-10">Frequently Asked Questions</h2>

                    <v-expansion-panels variant="accordion" class="faq-panels">
                        <v-expansion-panel v-for="item in faq" :key="item.q" :title="item.q" :text="item.a"></v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </section>
        </main>

        <ContactForm />

        <v-container class="container-narrow">
            <CustomerRatings class="mt-16" />
        </v-container>

        <!-- ============ FOOTER ============ -->
        <v-footer class="site-footer">
            <div class="container-narrow px-4 py-10">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-img src="/images/logo.webp" alt="Airport Bansko Transfer logo" width="170" class="mb-4"></v-img>
                        <p class="site-footer__text">Private, fixed-price airport transfers between Sofia, Plovdiv, Thessaloniki and Kavala airports and the Bansko area.</p>
                    </v-col>
                    <v-col cols="6" md="4">
                        <h3 class="site-footer__heading">Quick Links</h3>
                        <ul class="site-footer__list">
                            <li><a href="#why-us">Why Us</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                            <li><a href="#routes">Routes</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                        </ul>
                    </v-col>
                    <v-col cols="6" md="4">
                        <h3 class="site-footer__heading">Contact</h3>
                        <ul class="site-footer__list">
                            <li><a href="tel:+359899239723">+359 89 923 9723</a></li>
                            <li><a href="mailto:book@airportbanskotransfer.com">book@airportbanskotransfer.com</a></li>
                            <li>Bansko, Bulgaria</li>
                        </ul>
                    </v-col>
                </v-row>
                <v-divider class="my-8" color="rgba(255,255,255,0.15)"></v-divider>
                <p class="site-footer__copy">
                    All rights reserved. Copyright© {{ new Date().getFullYear() }}
                    <a href="https://airportbanskotransfer.com" aria-label="airportbanskotransfer.com">airportbanskotransfer.com</a>
                </p>
            </div>
        </v-footer>
    </v-container>
</template>

<script setup>
const whyUs = [
    { icon: 'mdi-currency-usd-off', title: 'No Prepayment Needed', text: 'Pay on arrival. We accept EUR, USD, GBP in cash or Revolut.' },
    { icon: 'mdi-percent-outline', title: 'No Hidden Fees', text: 'What you see is what you pay. No extra charges for flight delays, luggage or fuel.' },
    { icon: 'mdi-car-estate', title: '100% Private Transfer', text: 'A vehicle reserved exclusively for you — personalised and safe.' },
    { icon: 'mdi-close-circle-outline', title: 'Free Cancellation', text: 'Cancel your booking at any time without additional fees.' },
    { icon: 'mdi-thumb-up-outline', title: 'Trusted, Local Team', text: 'Years of experience driving the airport-to-Bansko route in all seasons.' },
    { icon: 'mdi-account-tie-outline', title: 'Professional Driver', text: 'English-speaking, experienced drivers for a safe and pleasant trip.' },
    { icon: 'mdi-clock-outline', title: 'Meet & Greet', text: 'Your driver waits at arrivals and tracks your flight, even if it is delayed.' },
    { icon: 'mdi-hand-coin-outline', title: 'Affordable Service', text: 'Reliable transfers — no taxi queues, no crowded buses.' },
]
const howItWorks = [
    { num: '01', title: 'Book', text: 'Fill in the form above, or contact us by phone, email or WhatsApp. You will see your fixed price before you confirm.' },
    { num: '02', title: 'Meet Your Driver', text: 'Your driver waits at the pick-up point at the scheduled time and helps with your luggage.' },
    { num: '03', title: 'Relax', text: 'Sit back and relax — your driver takes you straight to your destination, no stops or detours.' },
]
const routes = [
    { from: 'Sofia Airport, Bulgaria', to: 'Bansko', distance: '~155 km', time: '2h 15m' },
    { from: 'Plovdiv Airport, Bulgaria', to: 'Bansko', distance: '~170 km', time: '2h 30m' },
    { from: 'Thessaloniki Airport, Greece', to: 'Bansko', distance: '~230 km', time: '3h' },
    { from: 'Kavala Airport, Greece', to: 'Bansko', distance: '~280 km', time: '3h 45m' },
]
const faq = [
    { q: 'How much does a transfer cost?', a: 'Select your pickup and drop-off points and passenger count in the booking form above — your fixed, all-inclusive price is shown instantly, before you enter any personal details.' },
    { q: 'Do I need to pay in advance?', a: 'No. There is no prepayment. You pay your driver directly on arrival, in EUR, USD or GBP, in cash or via Revolut.' },
    { q: 'What happens if my flight is delayed?', a: "We track your flight, so your driver will be waiting at arrivals regardless of delays — there's no need to contact us to update your pickup time." },
    { q: 'Can I cancel or change my booking?', a: 'Yes, you can cancel free of charge at any time. To change a booking, contact us by phone, email or WhatsApp with your reference number.' },
    { q: 'Do you provide child seats?', a: "Let us know what you need in the Notes field when booking, or contact us directly, and we'll confirm availability for your dates." },
    { q: 'How many passengers and how much luggage can you take?', a: 'We take up to 8 passengers depending on the vehicle. Select your passenger count in the booking form so we can quote a vehicle with enough space for your luggage.' },
]

useHead({
    title: "Reliable Airport Transfers to Bansko, Bulgaria | Airport Bansko Transfer",
    htmlAttrs: { lang: 'en' },
    link: [
        { rel: 'canonical', href: 'https://airportbanskotransfer.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    ],
    meta: [
        { name: "description", content: "Private, fixed-price airport transfers to Bansko from Sofia, Plovdiv, Thessaloniki and Kavala airports. No prepayment, free cancellation, English-speaking drivers." },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#0e2338" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Airport Transfers to Bansko, Bulgaria" },
        { property: "og:description", content: "Book your fixed-price Bansko transfer. Reliable private service from Sofia, Plovdiv, Thessaloniki and Kavala airports." },
        { property: "og:image", content: "https://airportbanskotransfer.com/images/logo.webp" },
        { property: "og:url", content: "https://airportbanskotransfer.com" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Airport Transfers to Bansko, Bulgaria" },
        { name: "twitter:description", content: "Private, fixed-price airport transfers to Bansko from Sofia, Plovdiv, Thessaloniki and Kavala airports." },
        { name: "twitter:image", content: "https://airportbanskotransfer.com/images/logo.webp" },
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'TaxiService',
                name: 'Airport Bansko Transfer',
                url: 'https://airportbanskotransfer.com',
                image: 'https://airportbanskotransfer.com/images/logo.webp',
                telephone: '+359899239723',
                email: 'book@airportbanskotransfer.com',
                priceRange: '€€',
                areaServed: [
                    { '@type': 'City', name: 'Bansko' },
                    { '@type': 'City', name: 'Dobrinishte' },
                    { '@type': 'City', name: 'Razlog' },
                ],
                sameAs: [
                    'https://www.facebook.com/profile.php?id=61550512595450',
                ],
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faq.map(item => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            })
        }
    ]
})
</script>

<style scoped>
/* ---------------- Hero ---------------- */
.hero {
    position: relative;
    min-height: 620px;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-top: 76px;
}
.hero:before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/bansko-lift.webp');
    background-size: cover;
    background-position: center;
    animation: hero-zoom 9s ease forwards;
}
.hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, rgba(14,35,56,0.94) 40%, rgba(14,35,56,0.55) 100%);
}
.hero__content {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding-top: 64px;
    padding-bottom: 64px;
    flex-wrap: wrap;
}
.hero__text {
    max-width: 620px;
}
.hero__title {
    font-family: var(--font-display);
    color: #fff;
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.1;
    margin: 10px 0 20px;
}
.hero__lead {
    color: rgba(255,255,255,0.85);
    font-size: 1.05rem;
    max-width: 520px;
}
.hero__actions {
    margin-top: 32px;
}
.hero__route {
    flex: 0 0 auto;
}
@keyframes hero-zoom {
    0% { transform: scale(1.15); }
    100% { transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
    .hero:before { animation: none; }
}
@media (max-width: 960px) {
    .hero { min-height: auto; }
    .hero__content { justify-content: center; text-align: center; padding-top: 48px; padding-bottom: 48px; }
    .hero__lead { margin: 0 auto; }
    .hero__route { display: none; }
    .hero__actions .v-btn { margin: 6px; }
}

/* ---------------- Trust strip ---------------- */
.trust-strip {
    background: var(--color-alpine-night-soft);
    padding: 20px 0;
}
.trust-strip__label {
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    margin-top: 6px;
}

/* ---------------- Sections ---------------- */
.section {
    padding: 64px 0;
}
.section--dim {
    background: var(--color-snow-dim);
}
.section__lead {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    color: var(--color-ink-soft);
    font-size: 1.05rem;
    line-height: 1.7;
}

/* ---------------- Feature / why-us cards ---------------- */
.feature-card {
    height: 100%;
    padding: 28px 20px;
    text-align: center;
    border: 1px solid var(--color-line);
    transition: transform .25s, box-shadow .25s;
}
.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card);
}
.feature-card__title {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 14px 0 8px;
}
.feature-card__text {
    color: var(--color-ink-soft);
    font-size: 0.9rem;
    line-height: 1.55;
}

/* ---------------- Steps ---------------- */
.step-card {
    height: 100%;
    padding: 32px 24px;
    border: 1px solid var(--color-line);
    background: #fff;
}
.step-card__num {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 2.2rem;
    color: var(--color-amber);
    line-height: 1;
}
.step-card__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 10px 0 8px;
}
.step-card__text {
    color: var(--color-ink-soft);
    line-height: 1.6;
}

/* ---------------- Routes ---------------- */
.route-card {
    height: 100%;
    padding: 26px 18px;
    text-align: center;
    border: 1px solid var(--color-line);
    text-decoration: none;
    transition: border-color .2s, transform .2s;
}
.route-card:hover {
    border-color: var(--color-amber);
    transform: translateY(-3px);
}
.route-card__title {
    font-size: 0.98rem;
    font-weight: 700;
    margin-top: 6px;
    color: var(--color-alpine-night);
}
.route-card__to {
    font-weight: 600;
    color: var(--color-glacier);
    margin: 0;
}
.route-card__meta {
    color: var(--color-ink-soft);
    font-size: 0.85rem;
    margin-top: 6px;
}

/* ---------------- FAQ ---------------- */
.faq-panels {
    border-radius: var(--radius-md);
    overflow: hidden;
}

/* ---------------- Footer ---------------- */
.site-footer {
    background: var(--color-alpine-night);
    display: block;
}
.site-footer__text {
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    line-height: 1.6;
}
.site-footer__heading {
    color: #fff;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
}
.site-footer__list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.site-footer__list li {
    margin-bottom: 10px;
}
.site-footer__list a {
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    font-size: 0.9rem;
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
