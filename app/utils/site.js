// ==========================================================================
// Single source of truth for business facts, routes and prices.
// The booking form, the visible page copy, the JSON-LD structured data and
// llms.txt should all agree — edit prices / contact details HERE only
// (and mirror any change in public/llms.txt).
// ==========================================================================

export const SITE = {
    name: 'Airport Bansko Transfer',
    url: 'https://airportbanskotransfer.com',
    phone: '+359899239723',
    phoneDisplay: '+359 89 923 9723',
    email: 'book@airportbanskotransfer.com',
    whatsapp: 'https://wa.me/359899239723',
    facebook: 'https://www.facebook.com/profile.php?id=61550512595450',
    logo: 'https://airportbanskotransfer.com/images/logo.webp',
    ogImage: 'https://airportbanskotransfer.com/images/og-bansko-transfer.jpg',
    locality: 'Bansko',
    region: 'Blagoevgrad Province',
    country: 'BG',
}

export const RESORTS = [
    { name: 'Bansko', text: 'Bulgaria\'s best-known ski resort at the foot of the Pirin mountains — we drop off at any hotel, apartment or chalet in town, including near the gondola.' },
    { name: 'Razlog', text: 'The town in the valley a few kilometres before Bansko, popular for longer stays and apartment rentals.' },
    { name: 'Dobrinishte', text: 'The quieter village just past Bansko, known for its mineral springs and its own small ski area.' },
    { name: 'Pirin Golf', text: 'The golf and spa resort between Razlog and Bansko.' },
]

// Price tiers: `max` = maximum passengers for that price, `cost` = one-way EUR.
// A return transfer is charged at 2 × the one-way price.
// The same price applies to every resort (Bansko, Razlog, Dobrinishte, Pirin Golf).
export const ROUTES = [
    {
        slug: 'sofia-airport-to-bansko',
        airport: 'Sofia Airport, Bulgaria',
        airportShort: 'Sofia Airport',
        iata: 'SOF',
        city: 'Sofia',
        country: 'Bulgaria',
        distance: '~155 km',
        time: '2h 15m',
        prices: [ { max: 4, cost: 95 }, { max: 6, cost: 140 }, { max: 8, cost: 150 } ],
        intro: 'Sofia Airport is the closest and best-connected airport to Bansko, with year-round flights from across Europe. It is the route most of our customers take.',
        journey: 'From Sofia Airport the drive follows the Sofia ring road onto the A3 Struma motorway heading south, leaves the motorway at Simitli and climbs over the Predela pass between the Rila and Pirin mountains, then drops down through Razlog into Bansko.',
        meeting: 'Sofia Airport has two terminals (Terminal 1 and Terminal 2). Your driver tracks your flight and waits in the arrivals hall of whichever terminal you land at, holding a sign with your name.',
    },
    {
        slug: 'plovdiv-airport-to-bansko',
        airport: 'Plovdiv Airport, Bulgaria',
        airportShort: 'Plovdiv Airport',
        iata: 'PDV',
        city: 'Plovdiv',
        country: 'Bulgaria',
        distance: '~170 km',
        time: '2h 30m',
        prices: [ { max: 4, cost: 110 }, { max: 8, cost: 160 } ],
        intro: 'Plovdiv Airport is a smaller, quieter alternative to Sofia, with seasonal low-cost flights — a good option when flights to Sofia are full or more expensive.',
        journey: 'From Plovdiv the drive heads west across the Thracian plain and up into the mountains via Velingrad, then on through Razlog to Bansko. It is a scenic mountain road; your driver knows it well in both summer and winter.',
        meeting: 'Plovdiv Airport has a single small terminal. Your driver tracks your flight and waits in the arrivals area with a name sign.',
    },
    {
        slug: 'thessaloniki-airport-to-bansko',
        airport: 'Thessaloniki Airport, Greece',
        airportShort: 'Thessaloniki Airport',
        iata: 'SKG',
        city: 'Thessaloniki',
        country: 'Greece',
        distance: '~230 km',
        time: '3h',
        prices: [ { max: 4, cost: 220 }, { max: 8, cost: 300 } ],
        intro: 'Thessaloniki Airport in northern Greece has a wide choice of flights and is a popular way to combine a Greek holiday with a stay in Bansko.',
        journey: 'From Thessaloniki the drive heads north to the Promachonas–Kulata border crossing, follows the Struma valley on the A3 motorway to Simitli, then climbs over the Predela pass to Razlog and Bansko.',
        meeting: 'Your driver tracks your flight and waits in the arrivals hall at Thessaloniki "Makedonia" Airport with a name sign.',
        border: 'Greece and Bulgaria are both in the Schengen Area, so there are no routine passport checks at the border — but every passenger should still carry a valid passport or national ID card.',
    },
    {
        slug: 'kavala-airport-to-bansko',
        airport: 'Kavala Airport, Greece',
        airportShort: 'Kavala Airport',
        iata: 'KVA',
        city: 'Kavala',
        country: 'Greece',
        distance: '~190 km',
        time: '3h',
        prices: [ { max: 4, cost: 110 }, { max: 8, cost: 170 } ],
        intro: 'Kavala Airport on the northern Aegean coast has seasonal flights and is a good choice for travellers combining Bansko with the Greek coast.',
        journey: 'From Kavala Airport the drive crosses northern Greece into Bulgaria and continues into the Pirin region to Bansko — door to door, with no changes and no waiting for other passengers.',
        meeting: 'Your driver tracks your flight and waits in the arrivals area at Kavala "Alexander the Great" Airport with a name sign.',
        border: 'Greece and Bulgaria are both in the Schengen Area, so there are no routine passport checks at the border — but every passenger should still carry a valid passport or national ID card.',
    },
]

export const getRoute = (slug) => ROUTES.find(r => r.slug === slug)

export const fromPrice = (route) => Math.min(...route.prices.map(p => p.cost))

export const tierLabel = (prices, i) => {
    const min = i === 0 ? 1 : prices[i - 1].max + 1
    return min === prices[i].max ? `${min} passenger${min > 1 ? 's' : ''}` : `${min}–${prices[i].max} passengers`
}

// Price lookup used by the booking form. Returns the one-way price for the
// airport side of the trip and the passenger count, or 0 if not found.
export const quotePrice = (airport, passengers) => {
    const route = ROUTES.find(r => r.airport === airport)
    if (!route || !passengers) return 0
    const tier = route.prices.find(p => passengers <= p.max)
    return tier ? tier.cost : 0
}

export const routePriceSentence = (route) => route.prices
    .map((p, i) => `€${p.cost} for ${tierLabel(route.prices, i)}`)
    .join(', ')

// ---------------------------------------------------------------- JSON-LD
export const BUSINESS_ID = `${SITE.url}/#business`

export const businessSchema = () => ({
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    description: 'Private, fixed-price airport transfers between Sofia, Plovdiv, Thessaloniki and Kavala airports and Bansko, Razlog, Dobrinishte and Pirin Golf in Bulgaria. No prepayment, free cancellation, pay the driver on arrival.',
    url: SITE.url,
    logo: SITE.logo,
    image: [SITE.ogImage, `${SITE.url}/images/bansko-lift.webp`],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: `€${Math.min(...ROUTES.map(fromPrice))}–€${Math.max(...ROUTES.flatMap(r => r.prices.map(p => p.cost)))}`,
    currenciesAccepted: 'EUR, USD, GBP',
    paymentAccepted: 'Cash, Revolut',
    knowsLanguage: ['en', 'bg', 'ru'],
    address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
    },
    areaServed: [
        ...RESORTS.map(r => ({ '@type': 'Place', name: `${r.name}, Bulgaria` })),
        ...ROUTES.map(r => ({ '@type': 'Airport', name: r.airportShort, iataCode: r.iata })),
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'reservations',
        telephone: SITE.phone,
        email: SITE.email,
        availableLanguage: ['English', 'Bulgarian'],
    },
    sameAs: [SITE.facebook],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Airport transfers to Bansko',
        itemListElement: ROUTES.map(r => ({
            '@type': 'OfferCatalog',
            name: `${r.airportShort} to Bansko transfer`,
            url: `${SITE.url}/transfers/${r.slug}`,
            itemListElement: r.prices.map((p, i) => offerSchema(r, p, i)),
        })),
    },
})

export const offerSchema = (route, p, i) => ({
    '@type': 'Offer',
    name: `${route.airportShort} → Bansko, one way, ${tierLabel(route.prices, i)}`,
    price: p.cost,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE.url}/transfers/${route.slug}`,
    eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: p.max, unitText: 'passengers' },
})

export const routeServiceSchema = (route) => ({
    '@type': 'TaxiService',
    '@id': `${SITE.url}/transfers/${route.slug}#service`,
    name: `${route.airportShort} to Bansko private transfer`,
    serviceType: 'Private airport transfer',
    description: `Private door-to-door transfer from ${route.airport} (${route.iata}) to Bansko, Razlog, Dobrinishte and Pirin Golf. ${route.distance}, approx. ${route.time}. Fixed price: ${routePriceSentence(route)} (one way). No prepayment.`,
    provider: { '@id': BUSINESS_ID },
    areaServed: RESORTS.map(r => ({ '@type': 'Place', name: `${r.name}, Bulgaria` })),
    offers: route.prices.map((p, i) => offerSchema(route, p, i)),
})

export const faqSchema = (items) => ({
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
})

export const ldJson = (graph) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
})
