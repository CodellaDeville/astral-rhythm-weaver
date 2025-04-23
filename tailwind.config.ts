import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom cosmic palette
				cosmic: {
					dark: '#1A1F2C',
					purple: {
						DEFAULT: '#9b87f5',
						light: '#D6BCFA',
						dark: '#7E69AB',
					},
					blue: {
						DEFAULT: '#1EAEDB',
						light: '#33C3F0',
					},
					charcoal: {
						DEFAULT: '#403E43',
						dark: '#221F26',
					}
				},
				neon: {
					purple: '#6a60d6',
					blue: '#2e1a78',
				},
				neuro: {
					green: '#2ecc71',
					blue: '#3498db',
					gold: '#f1c40f'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Space Grotesk', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '0.8' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 0 rgba(155, 135, 245, 0.5), 0 0 15px 0 rgba(155, 135, 245, 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 10px 2px rgba(155, 135, 245, 0.7), 0 0 25px 5px rgba(155, 135, 245, 0.5)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'twinkle': 'twinkle 4s ease-in-out infinite',
				'twinkle-slow': 'twinkle 6s ease-in-out infinite',
				'twinkle-fast': 'twinkle 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.5s ease-out'
			},
			backgroundImage: {
				'cosmic-gradient': 'radial-gradient(ellipse at center, rgba(46, 26, 120, 0.5) 0%, rgba(26, 31, 44, 1) 100%)',
				'neon-gradient': 'linear-gradient(225deg, #6a60d6 0%, #2e1a78 100%)',
				'purple-gradient': 'linear-gradient(90deg, rgba(155, 135, 245, 0.2) 0%, rgba(214, 188, 250, 0.2) 100%)',
				'neuro-mix-gradient': 'linear-gradient(135deg, #2ecc71, #3498db, #f1c40f)',
			},
			boxShadow: {
				'neon-glow': '0 0 5px 0 rgba(155, 135, 245, 0.5), 0 0 15px 0 rgba(155, 135, 245, 0.3)',
				'neon-glow-strong': '0 0 10px 2px rgba(155, 135, 245, 0.7), 0 0 25px 5px rgba(155, 135, 245, 0.5)',
				'inner-glow': 'inset 0 0 15px 0 rgba(155, 135, 245, 0.3)',
			},
			textShadow: {
				'neon': '0 0 5px rgba(155, 135, 245, 0.7), 0 0 15px rgba(155, 135, 245, 0.5)',
				'neon-strong': '0 0 10px rgba(155, 135, 245, 0.9), 0 0 20px rgba(155, 135, 245, 0.7), 0 0 30px rgba(155, 135, 245, 0.5)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.text-shadow-neon': {
					textShadow: '0 0 5px rgba(155, 135, 245, 0.7), 0 0 15px rgba(155, 135, 245, 0.5)',
				},
				'.text-shadow-neon-strong': {
					textShadow: '0 0 10px rgba(155, 135, 245, 0.9), 0 0 20px rgba(155, 135, 245, 0.7), 0 0 30px rgba(155, 135, 245, 0.5)',
				},
				'.backdrop-blur-cosmic': {
					backdropFilter: 'blur(10px)',
				},
				'.glass-panel': {
					background: 'rgba(26, 31, 44, 0.7)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(155, 135, 245, 0.2)',
					borderRadius: '0.75rem',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
