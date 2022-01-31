import React, { FC } from 'react'

interface PieProps {
  percentage: number
}

interface CircleProps {
  colour: string
  pct?: number
}

const cleanPercentage = (percentage: number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0
  const tooHigh = percentage > 100
  return tooLow ? 0 : tooHigh ? 100 : +percentage
}

const Circle = ({ colour, pct }: CircleProps) => {
  const r = 37.5
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - pct) * circ) / 100
  return (
    <circle
      r={r}
      cx={40}
      cy={40}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'5px'}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="square"
    ></circle>
  )
}

const Text = ({ percentage }: PieProps) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={'14px'}
      fontWeight={'600'}
    >
      {percentage.toFixed(0)}%
    </text>
  )
}

const Pie: FC<PieProps> = ({ percentage }: PieProps) => {
  const pct = cleanPercentage(percentage)
  return (
    <svg width={80} height={80}>
      <g transform={`rotate(-90 ${'40 40'})`}>
        <Circle colour="#D9DBDD" />
        <Circle colour="#0B5FEF" pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  )
}

export default Pie
