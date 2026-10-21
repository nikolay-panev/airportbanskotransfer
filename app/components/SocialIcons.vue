<template>
    <!-- Desktop floating rail -->
    <div class="social-rail hidden-md-and-down" role="complementary" aria-label="Contact channels">
        <a v-for="item in channels" :key="item.label" :href="item.href" :target="item.target" :rel="item.rel"
           class="social-rail__btn" :aria-label="item.label" :title="item.label">
            <v-icon size="20">{{ item.icon }}</v-icon>
        </a>
    </div>

    <!-- Mobile floating action button: WhatsApp only, keeps small screens uncluttered -->
    <a href="https://wa.me/359899239723?text=" target="_blank" rel="noopener"
       class="social-fab hidden-lg-and-up" aria-label="Message us on WhatsApp">
        <v-icon size="26" color="white">mdi-whatsapp</v-icon>
    </a>
</template>

<script setup>
const channels = [
    { label: 'Call', icon: 'mdi-cellphone', href: 'tel:+359899239723' },
    { label: 'WhatsApp', icon: 'mdi-whatsapp', href: 'https://wa.me/359899239723?text=', target: '_blank', rel: 'noopener' },
    { label: 'Messenger', icon: 'mdi-facebook-messenger', href: 'https://m.me/bore.terziev1', target: '_blank', rel: 'noopener' },
    { label: 'Viber', icon: 'mdi-phone-message-outline', href: 'viber://contact?number=%2B359899239723' },
    { label: 'Facebook', icon: 'mdi-facebook', href: 'https://www.facebook.com/profile.php?id=61550512595450', target: '_blank', rel: 'noopener' },
]
</script>

<style scoped>
.social-rail {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(14, 35, 56, 0.9);
    padding: 10px 8px;
    border-radius: 999px;
    backdrop-filter: blur(4px);
}
.social-rail__btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    transition: background .2s, color .2s;
}
.social-rail__btn:hover, .social-rail__btn:focus-visible {
    background: var(--color-amber);
    color: var(--color-alpine-night);
}

.social-fab {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 9;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #25D366;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(14, 35, 56, 0.35);
}
</style>
