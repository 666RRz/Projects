import { el, svg } from 'redom'
import createNavHeader from '../header/navHeader'

export const navHeader = createNavHeader()

export const atmButton = navHeader.children[0].children[0].children[0]
export const accountButton = navHeader.children[0].children[1].children[0]
export const currencyButton = navHeader.children[0].children[2].children[0]
export const exitButton = navHeader.children[0].children[3].children[0]

export const header = document.getElementById('header')
export const root = document.getElementById('root')

export const headerButtons = [
	atmButton,
	accountButton,
	currencyButton,
	exitButton,
]

export const leftArrow = svg(
	'svg.leftArrow',
	{
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		svg('defs', [
			svg(
				'clipPath',
				{
					id: 'clip2_216',
				},
				[
					svg('rect', {
						id: 'basic /arrow',
						rx: 0,
						width: 23,
						height: 23,
						transform: 'translate(24.500000 0.500000) rotate(90.000000)',
						fill: 'white',
						'fill-opacity': 0,
					}),
				]
			),
		]),
		svg(
			'g',
			{
				'clip-path': 'url(#clip2_216)',
			},
			[
				svg('path', {
					id: 'coolicon',
					d: 'M7.83 11L11.4 7.41L10 6L4 12L10 18L11.4 16.59L7.83 13L20 13L20 11L7.83 11Z',
					fill: '#FFFFFF',
					'fill-opacity': 1,
					'fill-rule': 'nonzero',
				}),
			]
		),
	]
)

export const buttonPlus = svg(
	'svg.accounts__header-button-svg',
	{
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	svg('path', {
		d: 'M12 4L12 20M20 12L4 12',
		stroke: '#FFFFFF',
		'stroke-width': 2,
	})
)

export const errorSvg = svg(
	'svg.error__div-svg',
	{
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		svg(
			'defs',
			svg(
				'clipPath#clip1_901',
				svg('rect#Field/Variant25', {
					rx: 0,
					width: 23,
					height: 23,
					transform: 'translate(0.5 0.5)',
					fill: 'white',
					'fill-opacity': 0,
				})
			)
		),
		svg(
			'g',
			{
				'clip-path': 'url(#clip1_901)',
			},
			[
				svg('path#Triangle', {
					d: 'M0 22L24 22L12 2L0 22Z',
					fill: '#BA0000',
					'fill-opacity': 1,
					'fill-rule': 'nonzero',
				}),
				svg('path#Triangle', {
					d: 'M2.33 22L24 22L22.8 20L13.16 3.94L12 2L10.83 3.94L1.19 20L0 22L2.33 22ZM3.53 20L12 5.88L20.46 20L3.53 20Z',
					fill: '#BA0000',
					'fill-opacity': 1,
					'fill-rule': 'evenodd',
				}),
				svg('path#!', {
					d: 'M12 16.5L12 18M12 10L12 15',
					stroke: '#FFFFFF',
					'stroke-opacity': 1,
					'stroke-width': 2,
				}),
			]
		),
	]
)
export const successSvg = svg(
	'svg.error__div-svg',
	{
		width: 20,
		height: 20,
		viewBox: '0 0 20 20',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		svg('path', {
			d: 'M10 20C4.47 19.99 0 15.52 0 10L0 9.79C0.1 4.3 4.63 -0.08 10.13 0C15.62 0.07 20.03 4.56 19.99 10.06C19.96 15.56 15.49 19.99 10 20ZM5.41 9.58L4 11L8 15L16 7L14.59 5.58L8 12.16L5.41 9.58Z',
			fill: '#76CA66',
			'fill-opacity': 1,
			'fill-rule': 'nonzero',
		}),
	]
)

export const emailSvg = svg(
	'svg.email-svg',
	{
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		// Основной path для иконки конверта
		svg('path', {
			d: 'M20 20H4C2.89 20 2 19.1 2 18V5.91C2.04 4.84 2.92 3.99 4 4H20C21.1 4 22 4.89 22 6V18C22 19.1 21.1 20 20 20ZM4 7.86V18H20V7.86L12 13.2L4 7.86ZM4.8 6L12 10.8L19.2 6H4.8Z',
			fill: '#FFFFFF',
		}),
	]
)

export const currencyUpSvg = svg(
	'svg.currency-up-svg',
	{
		width: 20,
		height: 10,
		viewBox: '0 0 20 10',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		svg('path', {
			d: 'M20 10L10 0L0 10L20 10Z',
			fill: '#76CA66',
			fillRule: 'nonzero',
		}),
	]
)

export const currencyDownSvg = svg(
	'svg.currency-down-svg',
	{
		width: 20,
		height: 10,
		viewBox: '0 0 20 10',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
	},
	[
		svg('path', {
			d: 'M0 0L10 10L20 0L0 0Z',
			fill: '#FD4E5D',
			fillRule: 'nonzero',
		}),
	]
)

export const componentsBackground = el('.componentsBackground')

export const errorDiv = el('div.error__div', [el('p.error__div-p'), errorSvg])
export const errorP = errorDiv.children[0]
