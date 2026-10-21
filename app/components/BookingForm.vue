<template>
    <v-card id="book" tile flat class="booking-form" role="region" aria-label="Booking form">
        <div class="booking-form__inner">
            <v-form ref="book1" v-model="formValid">
                <v-row>
                     <v-col cols="12" sm="12" md="6" lg="3">
                        <v-autocomplete v-model="booking.pickup_location" label="Pickup Location" prepend-inner-icon="mdi-map-marker-outline" :items="sources" :rules="[fieldRequired]" @update:modelValue="showConfirm=false; updateDestinations();" variant="outlined" density="comfortable" bg-color="white">
                            <template v-slot:subheader="{ props }">
                                <v-list-subheader class="font-weight-bold bg-primary">{{ props.title }}</v-list-subheader>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3">
                        <v-autocomplete v-model="booking.dropoff_location" label="Drop Off Location" prepend-inner-icon="mdi-map-marker" :items="destinations" :rules="[fieldRequired]" @update:modelValue="showConfirm=false; updateSources();" variant="outlined" density="comfortable" bg-color="white">
                            <template v-slot:subheader="{ props }">
                                <v-list-subheader class="font-weight-bold bg-primary">{{ props.title }}</v-list-subheader>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3">
                        <v-menu v-model="menu.pickup_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ props }">
                                <v-text-field :model-value="formatDate(booking.pickup_date)" label="Pickup Date" prepend-inner-icon="mdi-calendar-outline" readonly v-bind="props" :rules="[fieldRequired]" @input="showConfirm=false" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </template>
                            <v-date-picker v-model="booking.pickup_date" label="Pickup Date" @input="menu.pickup_date=false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3">
                        <v-menu v-model="menu.pickup_time" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ props }">
                                <v-text-field v-model="booking.pickup_time" label="Pickup Time" prepend-inner-icon="mdi-clock-outline" readonly v-bind="props" :rules="[fieldRequired]" @input="showConfirm=false" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </template>
                            <v-time-picker format="24h" v-model="booking.pickup_time" label="Pickup Time" @input="menu.pickup_time=false"></v-time-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12" md="6" lg="3">
                        <v-select v-model="booking.passangers" label="Passengers (Inc. Children)" prepend-inner-icon="mdi-account-multiple-outline" :items="[1,2,3,4,5,6,7,8]" :rules="[fieldRequired]" @input="showConfirm=false" variant="outlined" density="comfortable" bg-color="white"></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3" class="d-flex align-center">
                        <v-radio-group v-model="booking.oneway" inline hide-details class="mt-0">
                            <v-radio label="One Way" :value="true" color="var(--color-amber)">
                                <template v-slot:label="obj">
                                    <span class="text-white">{{ obj.label }}</span>
                                </template>
                            </v-radio>
                            <v-radio label="Return" :value="false" color="var(--color-amber)">
                                <template v-slot:label="obj">
                                    <span class="text-white">{{ obj.label }}</span>
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3" v-if="!booking.oneway">
                        <v-menu v-model="menu.return_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ props }">
                                <v-text-field :model-value="formatDate(booking.return_date)" label="Return Date" prepend-inner-icon="mdi-calendar-outline" readonly v-bind="props" :rules="[fieldRequired]" @input="showConfirm=false" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </template>
                            <v-date-picker v-model="booking.return_date" label="Return Date" @input="menu.return_date=false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="3" v-if="!booking.oneway">
                        <v-menu v-model="menu.return_time" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ props }">
                                <v-text-field v-model="booking.return_time" label="Return Time" prepend-inner-icon="mdi-clock-outline" readonly v-bind="props" :rules="[fieldRequired]" @input="showConfirm=false" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </template>
                            <v-time-picker format="24h" v-model="booking.return_time" label="Return Time" @input="menu.return_time=false"></v-time-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-btn size="x-large" rounded="pill" :disabled="!formValid" @click="updatePrice()" color="var(--color-amber)" class="px-10 font-weight-bold" elevation="0">
                            Get Instant Rate
                        </v-btn>
                        <p class="reassurance mt-3">No prepayment · Free cancellation · Pay the driver on arrival</p>
                    </v-col>
                </v-row>

                <v-expand-transition>
                <v-card v-if="showConfirm" flat color="transparent" class="mx-auto mt-4 pa-0">
                    <v-divider class="mb-6"></v-divider>
                    <v-row>
                        <v-col cols="12" class="text-center">
                            <p class="price-tag">Total: <span>{{parseFloat(booking.cost).toFixed(2)}} EUR</span></p>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <p class="price-note">Fixed price, all-inclusive. Complete your details to reserve this transfer.</p>
                        </v-col>
                    </v-row>
                    <v-form ref="book2" v-model="bookForm" class="mt-4">
                        <v-row>
                            <v-col cols="12" md="6" lg="3">
                                <v-text-field label="Name" v-model="booking.name" :rules="[fieldRequired]" autocomplete="name" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="3">
                                <v-text-field label="Phone number" v-model="booking.phone" :rules="[fieldRequired]" autocomplete="tel" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="3">
                                <v-text-field label="Email address" v-model="booking.email" :rules="[fieldRequired, validEmail]" autocomplete="email" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="3">
                                <v-text-field label="Flight number" v-model="booking.flight_number" :rules="[fieldRequired]" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="12">
                                <v-text-field label="Notes" v-model="booking.notes" hint="Child seat, extra luggage, or anything else we should know" variant="outlined" density="comfortable" bg-color="white"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center">
                            <v-col cols="auto">
                                <v-btn size="x-large" rounded="pill" :disabled="!bookForm" @click="confirmBooking()" color="var(--color-alpine-night)" class="px-10 font-weight-bold" elevation="0" aria-label="Confirm Booking">
                                    Confirm Booking
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
                </v-expand-transition>
            </v-form>
        </div>

        <v-dialog v-model="confirm.show" persistent v-if="confirm.show" width="560">
            <v-card rounded="lg" class="pa-2">
                <v-alert :type="confirm.type" variant="tonal" rounded="lg">
                    <p class="mb-4">{{confirm.text}}</p>
                    <v-btn variant="flat" color="var(--color-alpine-night)" rounded="pill" @click="resetForms()" aria-label="OK">OK</v-btn>
                </v-alert>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
const api = useApi()
const book1 = ref(null)
const book2 = ref(null)
const formValid = ref(false)
const bookForm = ref(false)
const confirm = ref({
    type: null,
    text: null,
    show: false,
})
const showConfirm = ref(false)
const booking = ref({
    name: null,
    phone: null,
    email: null,
    pickup_date: null,
    pickup_time: null,
    return_date: null,
    return_time: null,
    pickup_location: "",
    dropoff_location: "",
    passangers: null,
    oneway: true,
    notes: null,
    flight_number: null,
    cost: 0,
})
const menu = ref({
    pickup_date: false,
    pickup_time: false,
    return_date: false,
    return_time: false
})
const formatDate = (val) => {
    return val ? new Date(val).toLocaleDateString() : ""
}
const fieldRequired = (val) => {
    return !!val || "This is a required field.";
}
const validEmail = (val) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Invalid email address.";
}
const sources = ref([])
const destinations = ref([])
const allSources = ref([
    {type: 'subheader', title: 'Airports', airport: true},
    {title: 'Sofia Airport, Bulgaria', value:'Sofia Airport, Bulgaria', airport: true},
    {title: 'Plovdiv Airport, Bulgaria', value: 'Plovdiv Airport, Bulgaria', airport: true},
    {title: 'Thessaloniki Airport, Greece', value: 'Thessaloniki Airport, Greece', airport: true},
    {title: 'Kavala Airport, Greece', value:'Kavala Airport, Greece', airport: true},
    {type: 'subheader', title: 'Resorts', airport: false},
    {title: 'Bansko', value: 'Bansko', airport: false},
    {title: 'Dobrinishte', value: 'Dobrinishte', airport: false},
    {title: 'Piring Golf', value: 'Pirin Golf', airport: false},
    {title: 'Razlog', value: 'Razlog', airport: false}
])
const allDestinations = ref([
    {type: 'subheader', title: 'Airports', airport: true},
    {title:'Sofia Airport, Bulgaria', value:'Sofia Airport, Bulgaria', airport: true},
    {title:'Plovdiv Airport, Bulgaria', value: 'Plovdiv Airport, Bulgaria', airport: true},
    {title:'Thessaloniki Airport, Greece', value: 'Thessaloniki Airport, Greece', airport: true},
    {title:'Kavala Airport, Greece', value:'Kavala Airport, Greece', airport: true},
    {type: 'subheader', title: 'Resorts', airport: false},
    {title: 'Bansko', value: 'Bansko', airport: false},
    {title: 'Dobrinishte', value: 'Dobrinishte', airport: false},
    {title: 'Piring Golf', value: 'Pirin Golf', airport: false},
    {title: 'Razlog', value: 'Razlog', airport: false}
])
const priceMap = ref([
    {source: 'Sofia Airport, Bulgaria', passangers: 8, cost: 150},
    {source: 'Sofia Airport, Bulgaria', passangers: 6, cost: 140},
    {source: 'Sofia Airport, Bulgaria', passangers: 4, cost: 95},
    {source: 'Plovdiv Airport, Bulgaria', passangers: 8 , cost: 160},
    {source: 'Plovdiv Airport, Bulgaria', passangers: 4 , cost: 110},
    {source: 'Thessaloniki Airport, Greece', passangers: 8, cost: 300},
    {source: 'Thessaloniki Airport, Greece', passangers: 4, cost: 220},
    {source: 'Kavala Airport, Greece', passangers: 8, cost: 170},
    {source: 'Kavala Airport, Greece', passangers: 4, cost: 110},
])

const updateDestinations = () => {
    if(booking.value.pickup_location != null) {
        const isAirport = allSources.value.filter(item => item.value == booking.value.pickup_location)[0]['airport']
        
        destinations.value = allSources.value.filter(item => {
            return item.airport == !isAirport
        })
    }
}

const updateSources = () => {
    if(booking.value.dropoff_location != null) {
        const isAirport = allDestinations.value.filter(item => item.value == booking.value.dropoff_location)[0]['airport']

        sources.value = allSources.value.filter(item => {
            return item.airport == !isAirport
        })
    }
}

const updatePrice = () => {
    if(formValid.value) {
        booking.value.cost = 0

        priceMap.value.forEach(item => {
            if((booking.value.dropoff_location == item.source || booking.value.pickup_location == item.source) && booking.value.passangers <= item.passangers) {
                booking.value.cost = item.cost
            }
        })

        if(booking.value.oneway == false) booking.value.cost *= 2
        showConfirm.value = true
    }
    else booking.value.cost = 0
}

const confirmBooking = async () => {
    if(bookForm.value && formValid.value) {
        const response = await api.post("book.php", {
            'booking': booking.value
        })
        
        if(response.status == 'success') {
            confirm.value.type = 'success'
            confirm.value.text = 'Thank you. Your booking has been confirmed. Your reference number is: ' + response.ref + '. You will receive a confirmation email with your reservation details.'
            confirm.value.show = true
        }
        else {
            confirm.value.type = 'error'
            confirm.value.text = 'Error. Some unexpected error has occurred. Your booking is not confirmed. Please call us to confirm your reservation.'
            confirm.value.show = true
        }
    }
}
const resetForms = () => {
    book1.value.reset()
    book2.value.reset()
    confirm.value.show = false
}

watch(() => booking.value.pickup_date, (n) => {
    if(n) menu.value.pickup_date = false
}, {deep: true})
watch(() => booking.value.return_date, (n) => {
    if(n) menu.value.return_date = false
}, {deep: true})

onMounted(() => {
    sources.value = allSources.value
    destinations.value = allDestinations.value
})
</script>
<style scoped>
.booking-form {
    position: relative;
    background: var(--color-alpine-night);
    overflow: hidden;
    border-radius: var(--radius-lg);
}
.booking-form:before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/bg.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.18;
}
.booking-form:after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(14,35,56,0.97), rgba(46,110,158,0.9));
}
.booking-form__inner {
    position: relative;
    z-index: 1;
    padding: 40px 20px;
}
:deep(.v-field--variant-outlined .v-field-label--floating) {
    color: rgba(255, 255, 255, 0.92) !important;
    background: var(--color-alpine-night);
    padding: 0 4px;
    border-radius: 2px;
}
@media (min-width: 960px) {
    .booking-form__inner { padding: 56px 64px; }
}
.reassurance {
    color: rgba(255,255,255,0.75);
    font-size: 0.85rem;
}
.price-tag {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
}
.price-tag span {
    color: var(--color-amber);
}
.price-note {
    color: rgba(255,255,255,0.8);
}
:deep(.v-field__input),
:deep(.v-label),
:deep(.v-select__selection),
:deep(.v-field__prepend-inner .v-icon) {
    color: var(--color-ink) !important;
}
:deep(.v-radio .v-label) {
    color: #fff;
}
</style>
