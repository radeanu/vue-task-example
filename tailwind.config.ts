import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
	theme: {
		colors: ({ colors }) => {
			return {
				gray: colors.gray,
				orange: colors.orange,
				primary: '#2c3e50',
				secondary: '#eb7070',
				light: '#ffffff',
				'primary-600': '#1c2936',
				'primary-700': '#141f2a',
				'secondary-600': '#C65959',
				'secondary-700': '#A93E3E'
			};
		},
		fontFamily: {
			sans: ['SyneMono-Regular', 'sans-serif'],
			arial: ['Arial', 'Helvetica', 'sans-serif']
		},
		extend: {
			boxShadow: ({ theme }) => {
				return {
					product: '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
					button: '2px 2px 0px 0px ' + theme('colors.primary'),
					'button-active':
						'3px 3px 0px 0px ' + theme('colors.primary')
				};
			},
			screens: {
				xsm: '425px'
			}
		}
	}
};
