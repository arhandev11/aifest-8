/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			'festival-gold': '#D4AF37',
  			'festival-cream': '#F5E6D3',
  			'festival-dark': '#1a1a1a',
  			'festival-black': '#000000',
  			'festival-light-gold': '#F4E5C3'
  		},
  		fontFamily: {
  			playfair: [
  				'"Playfair Display"',
  				'serif'
  			],
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		letterSpacing: {
  			'widest-xl': '0.2em'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-countdown': 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
}
