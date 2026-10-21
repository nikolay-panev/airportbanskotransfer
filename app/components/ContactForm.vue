<template>
    <section id="contact" class="contact" aria-labelledby="contact-heading">
        <div class="contact__overlay"></div>
        <div class="contact__content container-narrow px-4">
            <p class="eyebrow text-center" style="color:var(--color-amber)">Get In Touch</p>
            <h2 id="contact-heading" class="text-h3 text-center text-white font-weight-bold my-4">Have a question?</h2>
            <p class="text-center contact__lead">Send us a message and we'll reply within a few hours — or call/WhatsApp us any time.</p>

            <v-card max-width="640" class="mx-auto pa-4 pa-md-10 mt-8" rounded="lg" elevation="0">
                <v-form ref="contactForm" v-model="formValid">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="contact.name" label="Your Name" :rules="[fieldRequired]" autocomplete="name" variant="outlined" density="comfortable"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="contact.email" label="Your Email" :rules="[fieldRequired, validEmail]" autocomplete="email" variant="outlined" density="comfortable"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="contact.phone" label="Your Phone" :rules="[fieldRequired]" autocomplete="tel" variant="outlined" density="comfortable"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="contact.message" label="Message" rows="3" :rules="[fieldRequired]" variant="outlined" density="comfortable"></v-textarea>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <v-btn size="x-large" rounded="pill" class="px-12 font-weight-bold" color="var(--color-alpine-night)" elevation="0" @click="sendMessage()" aria-label="Send" theme="dark">Send Message</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="alert.show">
                        <v-col cols="12">
                            <v-alert :type="alert.type" variant="tonal" rounded="lg">{{alert.text}}</v-alert>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </div>
    </section>
</template>

<script setup>
const api = useApi()
const contactForm = ref(null)
const formValid = ref(false)
const contact = ref({
    name: null,
    email: null,
    phone: null,
    message: null,
})
const alert = ref({
    show: false,
    text: null,
    type: null,
})
const fieldRequired = (val) => {
    return !!val || "This is a required field.";
}
const validEmail = (val) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Invalid email address.";
}

const sendMessage = async () => {
    if(formValid.value) {
        const response = await api.post("contact.php", {
            'contact': contact.value
        })
        console.log(response)
        if(response.status == "success") {
            alert.value.show = true
            alert.value.text = 'Your message has been sent.'
            alert.value.type = 'success'

            contactForm.value.reset()
        }
        else {
            alert.value.show = true
            alert.value.text = 'Your message has not been sent.'
            alert.value.type = 'error'
        }
    }
}
</script>

<style scoped>
.contact {
    position: relative;
    overflow: hidden;
    padding: 72px 0;
}
.contact:before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/contact.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.contact__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(14,35,56,0.94), rgba(14,35,56,0.8));
}
.contact__content {
    position: relative;
    z-index: 1;
}
.contact__lead {
    color: rgba(255,255,255,0.85);
    max-width: 480px;
    margin: 0 auto;
}
</style>
