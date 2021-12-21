module.exports = {
    basePath: '',
    future: {
        webpack5: true,
    },
    publicRuntimeConfig: {
        apiBase: process.env.API_BASE,
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        placesApiKey: process.env.PLACES_API_KEY,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    }
}