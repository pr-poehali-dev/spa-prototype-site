import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1780525788618017215.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: { '2xl': '1400px' }
		},
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'Georgia', 'serif'],
				body:    ['Mulish', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input:  'hsl(var(--input))',
				ring:   'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground:  'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				c: {
					white:   '#FFFFFF',
					snow:    '#FDFBF9',
					blush:   '#F9F3EF',
					petal:   '#F3E9E3',
					rose:    '#E8C9BA',
					'rose-d':'#C9957E',
					taupe:   '#9C8077',
					brown:   '#5C3D30',
					espresso:'#2E1A12',
					gold:    '#C8A97A',
					'gold-l':'#E2CBА4',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'4xl': '2rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to:   { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to:   { height: '0' }
				},
				'rise': {
					'0%':   { opacity: '0', transform: 'translateY(28px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'appear': {
					'0%':   { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%':      { transform: 'translateY(-8px)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up':   'accordion-up 0.2s ease-out',
				'rise':   'rise 0.85s cubic-bezier(0.22,1,0.36,1) forwards',
				'appear': 'appear 0.7s ease forwards',
				'float':  'float 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
