import colors from 'tailwindcss/colors'

export const lineConf = {
  stroke: 'yellow',
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  shadowColor: 'white',
  shadowBlur: 10,
  shadowOffset: { x: -10, y: 0 },
  shadowOpacity: 0.5,
}
export const lineEndConf = {
  radius: 4,
  fill: 'yellow',
  stroke: 'black',
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
  fillLinearGradientColorStops: [0, '#09090b', 1, colors.lime['500']],
  ...rectConf,
}
export const bottomRectConf = {
  fillLinearGradientColorStops: [0, colors.red['500'], 1, '#09090b'],
  ...rectConf,
}
