/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            screens: {
                touch: { raw: '(hover: none)' },
                hoverable: { raw: '(hover: hover)' },
            },
        },
    },
}
