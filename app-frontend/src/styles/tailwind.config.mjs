/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: [
            {
              "--tw-prose-body": "var(--color-foreground)",
              "--tw-prose-headings": "var(--color-foreground)",
              h1: {
                fontWeight: "normal",
                marginBottom: "0.25em",
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: "2.5rem",
              },
              h2: {
                fontSize: "1.25rem",
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: "3.5rem",
              },
              h2: {
                fontSize: "1.5rem",
              },
            },
          ],
        },
      }),
    },
  },
};
