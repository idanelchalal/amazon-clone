/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-navy': '#131921',
                'secondary-navy': '#232F3E',
                'main-cream': '#F8F1DF',
                'main-stone': '#EAEDED',
            },
        },
    },
    plugins: [],
}
