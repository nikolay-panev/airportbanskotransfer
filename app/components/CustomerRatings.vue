<template>
    <section id="reviews" class="py-4" aria-labelledby="reviews-heading">
        <div v-if="ratings.length">
            <p class="eyebrow text-center">Real Feedback</p>
            <h2 id="reviews-heading" class="text-h3 text-center font-weight-bold my-4">What Our Customers Think</h2>

            <div class="d-flex align-center justify-center mb-10" v-if="averageRating">
                <v-rating :model-value="averageRating" readonly half-increments density="compact" size="small" color="var(--color-amber)" empty-icon="mdi-star-outline" full-icon="mdi-star"></v-rating>
                <span class="ml-2 rating-summary">{{ averageRating.toFixed(1) }} average from {{ ratings.length }} reviews</span>
            </div>

            <v-row>
                <v-col cols="12" sm="12" md="6" lg="4" v-for="(rating, index) in ratings" :key="index">
                    <v-card class="review-card" rounded="lg" elevation="0">
                        <v-card-text class="rating-body">
                            <div class="d-flex align-center mb-1">
                                <v-avatar size="32" color="var(--color-snow-dim)" class="mr-2">
                                    <v-icon size="18" color="var(--color-glacier)">mdi-account</v-icon>
                                </v-avatar>
                                <div>
                                    <strong>{{rating.name}}</strong>
                                    <div class="rating-date">{{rating.created}}</div>
                                </div>
                            </div>
                            <v-rating readonly size="small" :model-value="parseInt(rating.rating)" :length="5" empty-icon="mdi-star-outline" full-icon="mdi-star" color="var(--color-amber)"></v-rating>
                            <p class="text-left mt-3">{{rating.comment}}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <v-card flat class="rate-us mx-auto mt-12" max-width="560" rounded="lg">
            <h2 class="text-h4 text-center font-weight-bold mb-2">Rate Our Service</h2>
            <h3 class="text-center rate-us__sub font-weight-regular">We read every review — tell us how your transfer went.</h3>
            <v-form ref="rate" v-model="formValid" class="mt-6">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-rating :length="5" empty-icon="mdi-star-outline" full-icon="mdi-star" color="var(--color-amber)" size="large" hover v-model="rating.rating"></v-rating>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea variant="outlined" flat rows="4" label="Your feedback / comments" v-model="rating.comment" :rules="[fieldRequired]"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" flat label="Your name" v-model="rating.name" :rules="[fieldRequired]"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <v-btn size="x-large" rounded="pill" color="var(--color-alpine-night)" class="px-12 font-weight-bold" elevation="0" @click="sendRating()" theme="dark">Submit Review</v-btn>
                    </v-col>
                </v-row>
                <v-row v-if="alert.show">
                    <v-col cols="12">
                        <v-alert :type="alert.type" rounded="lg" variant="tonal">{{alert.text}}</v-alert>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </section>
</template>

<script setup>
const api = useApi()
const formValid = ref(false)
const rate = ref(null)
const rating = ref({
    name: null,
    comment: null,
    rating: 5,
})
const ratings = ref([])
const alert = ref({
    show: false,
    text: null,
    type: null,
})
const fieldRequired = (val) => {
    return !!val || "This is a required field.";
}

const sendRating = async () => {
    const response = await api.post("rate.php", {
        'rating': rating.value
    })
    
    if(response.status == 'success') {
        alert.value.text = 'Thank you! Your rating has been sent.'
        alert.value.type = 'success'
        alert.value.show = true

        rate.value.reset()
    }
}

const getRatings = async () => {
    const response = await api.post("", {
        operation: "select",
        table: "comments",
        fields: ['name', 'comment', 'rating', 'created'],
        where: [{deleted:{'is':null}}, {approved:{'eq':'1'}}],
        page: 1,
        limit: 12,
        order: {'RAND()':''}
    })

    ratings.value = response?.data || []
}

await getRatings()

// Real (not fabricated) average, computed from whatever reviews were actually returned.
const averageRating = computed(() => {
    if(!ratings.value.length) return null
    const sum = ratings.value.reduce((acc, r) => acc + (parseInt(r.rating) || 0), 0)
    return sum / ratings.value.length
})

// Feed real review data into structured data so search engines and AI answer
// engines can surface an accurate aggregate rating — never invented numbers.
if(averageRating.value) {
    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'AggregateRating',
                    itemReviewed: { '@type': 'LocalBusiness', name: 'Airport Bansko Transfer' },
                    ratingValue: averageRating.value.toFixed(1),
                    reviewCount: ratings.value.length,
                })
            }
        ]
    })
}
</script>
<style scoped>
.rating-summary {
    color: var(--color-ink-soft);
    font-size: 0.9rem;
    font-weight: 600;
}
.review-card {
    border: 1px solid var(--color-line);
    height: 100%;
}
.rating-body {
    height: 210px;
    font-size: 0.92rem;
    overflow-y: auto;
}
.rating-date {
    font-size: 0.75rem;
    color: var(--color-ink-soft);
}
.rating-body::-webkit-scrollbar {
    width: 6px;
}
.rating-body::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--color-line);
}
.rate-us {
    background: var(--color-snow-dim);
    padding: 40px 24px;
}
.rate-us__sub {
    color: var(--color-ink-soft);
    text-align: center;
}
</style>
