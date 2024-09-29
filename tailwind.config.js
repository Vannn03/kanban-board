/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "color-primary": "#01959F",
                "color-secondary": "#FA9810",
                "color-danger": "#E11428",
                "color-success": "#43936C",
                "color-black": "#1E1F21",
            },
            boxShadow: {
                "dialog-menu": "0px 4px 4px 0px #00000014",
            },
        },
    },
    plugins: [],
};
