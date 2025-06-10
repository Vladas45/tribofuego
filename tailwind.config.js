/** @type {import('tailwindcss').Config} */
tailwind.exports = {
    content: [
        "./index.html",       // načítá všechny HTML soubory v kořenové složce
        "./**/*.html"     // pro jistotu i v podsložkách
    ],
    theme: {
        extend: {
            colors: {
                'fireRed': '#D90623',       // hlavní červená barva
                'darkRed': '#621F1D',       // tmavší červená pro nadpisy
                'mediumRed': '#9D191F'      // další barva z původního stylu
            },
            fontFamily: {
                sans: ['Tahoma', 'sans-serif'],
                georgia: ['Georgia', 'serif']
            },
            backgroundImage: {
                'site': "url('/images/bg-site.gif')",
                'content': "url('/images/bg-content.gif')",
                'inner': "url('/images/bg-inner.gif')",
                'logo': "url('/images/logo.gif')",
                'logo2': "url('/images/logo2.gif')",
                'ramecek': "url('/images/ramecek.png')"
            },
            backgroundPosition: {
                'logo': '0px 10px',
                'logo2': '0px 0px'
            },
            spacing: {
                '70px': '70px',
                '346px': '346px',
                '450px': '450px',
                '700px': '700px'
            },
            zIndex: {
                '1': '1',
                '2': '2',
                '9999': '9999'
            }
        }
    },
    plugins: []
}