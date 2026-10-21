<template>
    <v-container fluid class="pa-0">
        <SiteHeader />
        <SocialIcons />

        <!-- ============ HERO ============ -->
        <section class="route-hero">
            <div class="route-hero__overlay"></div>
            <div class="route-hero__content container-narrow px-4">
                <nav aria-label="Breadcrumb" class="breadcrumb">
                    <NuxtLink to="/">Home</NuxtLink>
                    <span aria-hidden="true">/</span>
                    <a href="/#routes">Transfers</a>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{{ route.airportShort }} to Bansko</span>
                </nav>
                <p class="eyebrow" style="color:var(--color-amber)">{{ route.iata }} → Bansko · {{ route.distance }} · approx. {{ route.time }}</p>
                <h1 class="route-hero__title">{{ route.airportShort }} to Bansko Transfer</h1>
                <p class="route-hero__lead">
                    Private, door-to-door transfer from {{ route.airport }} to Bansko, Razlog, Dobrinishte and Pirin Golf.
                    Fixed price from <strong>€{{ fromPrice(route) }}</strong> per vehicle — no prepayment, free cancellation, flight tracking included.
                </p>
                <div class="route-hero__actions">
                    <v-btn size="x-large" rounded="pill" color="var(--color-amber)" class="px-8 font-weight-bold" elevation="0" href="#book">Book This Transfer</v-btn>
                    <v-btn size="x-large" rounded="pill" variant="outlined" color="white" class="px-8 ml-3" :href="`tel:${SITE.phone}`">Call Us</v-btn>
                </div>
            </div>
        </section>

        <div>
            <!-- ============ AT A GLANCE + PRICES ============ -->
            <section class="section container-narrow px-4" aria-labelledby="glance-heading">
                <v-row>
                    <v-col cols="12" md="6">
                        <h2 id="glance-heading" class="text-h4 font-weight-bold mb-4">At a glance</h2>
                        <dl class="facts">
                            <div><dt>From</dt><dd>{{ route.airport }} ({{ route.iata }})</dd></div>
                            <div><dt>To</dt><dd>Bansko, Razlog, Dobrinishte or Pirin Golf</dd></div>
                            <div><dt>Distance</dt><dd>{{ route.distance }}</dd></div>
                            <div><dt>Drive time</dt><dd>approx. {{ route.time }}</dd></div>
                            <div><dt>Vehicle</dt><dd>Private car or minivan, up to 8 passengers</dd></div>
                            <div><dt>Payment</dt><dd>On arrival — EUR, USD or GBP, cash or Revolut</dd></div>
                            <div><dt>Cancellation</dt><dd>Free, at any time</dd></div>
                        </dl>
                        <p class="mt-4 body-copy">{{ route.intro }}</p>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h2 class="text-h4 font-weight-bold mb-4">{{ route.airportShort }} to Bansko prices</h2>
                        <div class="price-table-wrap">
                            <table class="price-table">
                                <caption class="sr-only">One-way and return private transfer prices in EUR from {{ route.airport }} to Bansko</caption>
                                <thead>
                                    <tr><th scope="col">Passengers</th><th scope="col">One way</th><th scope="col">Return</th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(p, i) in route.prices" :key="i">
                                        <th scope="row">{{ tierLabel(route.prices, i) }}</th>
                                        <td><strong>€{{ p.cost }}</strong></td>
                                        <td>€{{ p.cost * 2 }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="price-note mt-3">Price per vehicle, not per person. Includes luggage, fuel and waiting time for delayed flights. Same price to Razlog, Dobrinishte and Pirin Golf, and for the trip back to the airport.</p>
                    </v-col>
                </v-row>
            </section>

            <RidgeDivider tone="dim" />

            <!-- ============ BOOKING ============ -->
            <section class="section section--dim" aria-labelledby="booking-heading">
                <div class="container-narrow px-4">
                    <p class="eyebrow text-center">Instant Fixed Price</p>
                    <h2 id="booking-heading" class="text-h3 text-center font-weight-bold mb-8">Book your {{ route.airportShort }} to Bansko transfer</h2>
                    <BookingForm :pickup="route.airport" />
                </div>
            </section>

            <RidgeDivider tone="light" />

            <!-- ============ JOURNEY ============ -->
            <section class="section container-narrow px-4" aria-labelledby="journey-heading" style="max-width:860px">
                <h2 id="journey-heading" class="text-h4 font-weight-bold mb-4">The journey</h2>
                <p class="body-copy">{{ route.journey }}</p>

                <h3 class="text-h5 font-weight-bold mt-8 mb-3">Meeting your driver</h3>
                <p class="body-copy">{{ route.meeting }} If your flight is delayed, your driver simply adjusts — there is no extra charge and no need to call us.</p>

                <template v-if="route.border">
                    <h3 class="text-h5 font-weight-bold mt-8 mb-3">Crossing the border</h3>
                    <p class="body-copy">{{ route.border }}</p>
                </template>

                <h3 class="text-h5 font-weight-bold mt-8 mb-3">Where we drop you off</h3>
                <ul class="resort-list">
                    <li v-for="r in RESORTS" :key="r.name"><strong>{{ r.name }}</strong> — {{ r.text }}</li>
                </ul>
            </section>

            <RidgeDivider tone="dim" />

            <!-- ============ FAQ ============ -->
            <section class="section section--dim" aria-labelledby="faq-heading">
                <div class="container-narrow px-4" style="max-width:820px">
                    <h2 id="faq-heading" class="text-h4 text-center font-weight-bold mb-8">{{ route.airportShort }} to Bansko: questions</h2>
                    <!-- eager: answers are rendered into the HTML even while collapsed, so crawlers can read them -->
                    <v-expansion-panels variant="accordion" class="faq-panels">
                        <v-expansion-panel v-for="item in faq" :key="item.q" :title="item.q" eager>
                            <v-expansion-panel-text>{{ item.a }}</v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </section>

            <!-- ============ OTHER ROUTES ============ -->
            <section class="section container-narrow px-4" aria-labelledby="other-heading">
                <h2 id="other-heading" class="text-h5 text-center font-weight-bold mb-6">Other airport transfers to Bansko</h2>
                <v-row justify="center">
                    <v-col cols="12" sm="4" v-for="r in otherRoutes" :key="r.slug">
                        <NuxtLink :to="`/transfers/${r.slug}`" class="other-route">
                            <strong>{{ r.airportShort }} → Bansko</strong>
                            <span>{{ r.distance }} · approx. {{ r.time }} · from €{{ fromPrice(r) }}</span>
                        </NuxtLink>
                    </v-col>
                </v-row>
            </section>
        </div>

        <SiteFooter />
    </v-container>
</template>

<script setup>
const params = useRoute().params
const route = getRoute(params.slug)

if (!route) {
    throw createError({ statusCode: 404, statusMessage: 'Route not found', fatal: true })
}

const otherRoutes = ROUTES.filter(r => r.slug !== route.slug)
const url = `${SITE.url}/transfers/${route.slug}`
const top = route.prices[route.prices.length - 1]

const faq = [
    { q: `How much is a transfer from ${route.airportShort} to Bansko?`, a: `A private one-way transfer from ${route.airport} to Bansko costs ${routePriceSentence(route)}. The price is per vehicle, not per person, and includes luggage and waiting time for delayed flights. A return transfer is twice the one-way price.` },
    { q: `How long does it take to get from ${route.airportShort} to Bansko?`, a: `The drive is roughly ${route.distance.replace('~', '')} and takes approximately ${route.time}, depending on traffic, weather and border conditions.` },
    { q: 'Do I have to pay in advance?', a: 'No. Nothing is charged online. You pay the driver on arrival in EUR, USD or GBP, cash or Revolut, and you can cancel free of charge at any time.' },
    { q: 'What if my flight is late?', a: 'We track your flight number, so your driver waits for you even if the flight is delayed — at no extra cost.' },
    { q: `Is the price the same to Razlog, Dobrinishte and Pirin Golf?`, a: `Yes. Transfers from ${route.airportShort} to Bansko, Razlog, Dobrinishte and Pirin Golf all cost the same fixed price.` },
    { q: 'How many people and bags fit?', a: `Up to ${top.max} passengers with luggage. Tell us about skis, snowboards, golf bags or child seats in the Notes field when you book.` },
    ...(route.border ? [{ q: 'Do I need my passport?', a: route.border }] : []),
]

const title = `${route.airportShort} to Bansko Transfer — from €${fromPrice(route)} | Private, Fixed Price`
const description = `Private ${route.airportShort} (${route.iata}) to Bansko transfer: ${routePriceSentence(route)}, one way. ${route.distance}, approx. ${route.time}. No prepayment, free cancellation, flight tracking.`

useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
    script: [
        ldJson([
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: title,
                description,
                inLanguage: 'en',
                isPartOf: { '@id': `${SITE.url}/#website` },
                about: { '@id': `${url}#service` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
                    { '@type': 'ListItem', position: 2, name: 'Transfers', item: `${SITE.url}/#routes` },
                    { '@type': 'ListItem', position: 3, name: `${route.airportShort} to Bansko`, item: url },
                ],
            },
            routeServiceSchema(route),
            {
                '@type': 'LocalBusiness',
                '@id': BUSINESS_ID,
                name: SITE.name,
                url: SITE.url,
                telephone: SITE.phone,
                email: SITE.email,
                image: SITE.ogImage,
                address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
            },
            { '@id': `${url}#faq`, ...faqSchema(faq) },
        ]),
    ],
})
useSeoMeta({
    description,
    robots: 'index, follow, max-image-preview:large',
    ogType: 'website',
    ogTitle: `${route.airportShort} to Bansko private transfer — from €${fromPrice(route)}`,
    ogDescription: description,
    ogUrl: url,
    ogImage: SITE.ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: `${route.airportShort} to Bansko private transfer`,
    twitterDescription: description,
    twitterImage: SITE.ogImage,
})
</script>

<style scoped>
.route-hero {
    position: relative;
    overflow: hidden;
    padding-top: 76px;
}
.route-hero:before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/bansko-lift.webp');
    background-size: cover;
    background-position: center;
}
.route-hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, rgba(14,35,56,0.95) 45%, rgba(14,35,56,0.65) 100%);
}
.route-hero__content {
    position: relative;
    z-index: 1;
    padding-top: 40px;
    padding-bottom: 56px;
}
.breadcrumb {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    margin-bottom: 18px;
}
.breadcrumb a {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
}
.breadcrumb a:hover { color: var(--color-amber); }
.breadcrumb span[aria-hidden] { margin: 0 8px; }
.route-hero__title {
    font-family: var(--font-display);
    color: #fff;
    font-weight: 700;
    font-size: clamp(1.9rem, 4.5vw, 3rem);
    line-height: 1.12;
    margin: 10px 0 16px;
}
.route-hero__lead {
    color: rgba(255,255,255,0.88);
    font-size: 1.05rem;
    max-width: 640px;
}
.route-hero__lead strong { color: var(--color-amber); }
.route-hero__actions { margin-top: 28px; }
@media (max-width: 600px) {
    .route-hero__actions .v-btn { margin: 6px 0 !important; width: 100%; }
}

.section { padding: 56px 0; }
.section--dim { background: var(--color-snow-dim); }
.body-copy {
    color: var(--color-ink-soft);
    font-size: 1.02rem;
    line-height: 1.7;
}

.facts { margin: 0; }
.facts > div {
    display: flex;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-line);
}
.facts dt {
    flex: 0 0 120px;
    font-weight: 700;
    color: var(--color-alpine-night);
}
.facts dd {
    margin: 0;
    color: var(--color-ink-soft);
}

.price-table-wrap {
    overflow-x: auto;
    background: #fff;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-md);
}
.price-table {
    width: 100%;
    border-collapse: collapse;
}
.price-table th, .price-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--color-line);
}
.price-table thead th {
    background: var(--color-alpine-night);
    color: #fff;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.price-table tbody td strong { color: var(--color-amber-dark); font-size: 1.1rem; }
.price-note {
    color: var(--color-ink-soft);
    font-size: 0.9rem;
}

.resort-list {
    padding-left: 20px;
    color: var(--color-ink-soft);
    line-height: 1.7;
}
.resort-list li { margin-bottom: 8px; }
.resort-list strong { color: var(--color-alpine-night); }

.faq-panels {
    border-radius: var(--radius-md);
    overflow: hidden;
}

.other-route {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 18px 20px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-md);
    background: #fff;
    text-decoration: none;
    color: var(--color-alpine-night);
    height: 100%;
    transition: border-color .2s;
}
.other-route:hover { border-color: var(--color-amber); }
.other-route span {
    color: var(--color-ink-soft);
    font-size: 0.88rem;
}
</style>
