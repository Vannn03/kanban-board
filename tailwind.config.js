/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "color-primary": "#01959F",
                "color-surface-primary": "#f7feff",
                "color-secondary": "#FA9810",
                "color-surface-secondary": "#fffcf5",
                "color-border-secondary": "#FEEABC",
                "color-danger": "#E11428",
                "color-surface-danger": "#fffafa",
                "color-border-danger": "#F5B1B7",
                "color-success": "#43936C",
                "color-surface-success": "#f8fbf9",
                "color-border-success": "#B8DBCA",
                "color-black-primary": "#1E1F21",
                "color-black-secondary": "#404040",
                "color-black-tertiary": "#757575",
                "color-black-menu": "#333333",
                "color-white-primary": "#E0E0E0",
                "color-white-secondary": "#FAFAFA",
                "color-white-tertiary": "#ededed",
            },
            boxShadow: {
                "dialog-menu": "0px 4px 4px 0px #00000014",
                modal: "0px 4px 8px 0px #0000001A",
                "cancel-button": "0px 1px 2px 0px #0000001F",
            },
        },
    },
    plugins: [],
};
