import colors from 'tailwindcss/colors'

export const lineConf = {
  stroke: 'yellow',
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  shadowColor: '#151513',
  // shadowBlur: 10,
  // shadowOpacity: 0.5,
  shadowOffset: { x: -2, y: 0 },
}
export const lineEndConf = {
  radius: 4,
  fill: 'yellow',
  stroke: '#151513',
  strokeWidth: 1,
}
export const delimiterConf = {
  stroke: 'white',
  strokeWidth: 1,
}
export const rectConf = {
  fillLinearGradientStartPoint: { x: 50, y: 0 },
  x: 0,
  y: 0,
}
export const topRectConf = {
  fillLinearGradientColorStops: [0, '#09090b', 0.5, colors.lime['500']],
  ...rectConf,
}
export const bottomRectConf = {
  fillLinearGradientColorStops: [0.5, colors.red['500'], 1, '#09090b'],
  ...rectConf,
}

export const topText = {
  y: 0,
  width: 200,
  text: 'UP OR DOWN?\nPLACE YOUR TRADE!',
  fontSize: 18,
  fontFamily: 'Oswald',
  fill: 'yellow',
  align: 'center',
  fontStyle: 'bold',
}

export const livePriceText = {
  width: 100,
  text: 'LIVE BITCOIN',
  fontSize: 12,
  fontFamily: 'Oswald',
  fill: '#151513',
  align: 'center',
  fontStyle: 'bold',
}

export const livePriceTextRect = {
  strokeWidth: 5,
  fill: '#f4d56f',
  width: 100,
  height: 20,
  shadowColor: '#151513',
  shadowBlur: 10,
  shadowOffsetX: -2,
  shadowOffsetY: -2,
  shadowOpacity: 0.2,
  cornerRadius: 7,
}

export const livePriceRateText = {
  width: 110,
  text: '70,982.1337',
  fontSize: 21,
  fontFamily: 'Oswald',
  fill: '#f4d56f',
  align: 'center',
}

export const livePriceRateTextRect = {
  strokeWidth: 1,
  stroke: '#f4d56f',
  fill: '#151513',
  width: 110,
  height: 30,
  shadowColor: '#151513',
  shadowBlur: 10,
  shadowOffsetX: -2,
  shadowOffsetY: -2,
  shadowOpacity: 0.5,
  cornerRadius: 7,
}
