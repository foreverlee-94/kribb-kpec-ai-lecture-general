import katex from 'katex'
import type { DiagramId } from '@/types/slide'

const ACCENT = '#ff7759'
const LINE = '#cfe8e2'
const LINE_DIM = '#5f8a80'
const GRID = 'rgba(255,255,255,0.14)'
const TEXT = '#f2fbf9'
const TEXT_MUTED = 'rgba(242,251,249,0.62)'

const labelProps = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 16,
}

function SvgFormula({
  x,
  y,
  math,
  anchor = 'start',
  color = TEXT_MUTED,
  fontSize = 14,
  width = 160,
  height = 26,
}: {
  x: number
  y: number
  math: string
  anchor?: 'start' | 'middle' | 'end'
  color?: string
  fontSize?: number
  width?: number
  height?: number
}) {
  let html: string
  try {
    html = katex.renderToString(math, { throwOnError: false, displayMode: false })
  } catch {
    html = math
  }
  const boxX = anchor === 'end' ? x - width : anchor === 'middle' ? x - width / 2 : x
  return (
    <foreignObject x={boxX} y={y - height / 2} width={width} height={height} style={{ overflow: 'visible' }}>
      <div
        style={{
          color,
          fontSize,
          lineHeight: 1,
          display: 'flex',
          justifyContent: anchor === 'end' ? 'flex-end' : anchor === 'middle' ? 'center' : 'flex-start',
          alignItems: 'center',
          height: '100%',
          whiteSpace: 'nowrap',
          overflow: 'visible',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </foreignObject>
  )
}

function Timeline() {
  const points: [number, string, number, number][] = [
    [10, '1950s', 10, 55],
    [53, '1960s', 53, 35],
    [95, '1970s', 95, 75],
    [138, '1980s', 138, 45],
    [181, '1990s', 181, 75],
    [224, '2000s', 224, 55],
    [267, '2010s', 267, 25],
    [310, '2020s', 310, 8],
  ]
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[2]},${p[3]}`).join(' ')

  return (
    <svg viewBox="0 0 320 100" className="h-full w-full">
      <line x1={10} y1={75} x2={310} y2={75} stroke={GRID} strokeWidth={1} />
      {points.map(([x, label], i) => {
        const labelX = i === 0 ? x + 7 : i === points.length - 1 ? x - 7 : x
        return (
          <g key={label}>
            <line x1={x} y1={73} x2={x} y2={77} stroke={LINE_DIM} strokeWidth={1} />
            <text x={labelX} y={92} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
              {label}
            </text>
          </g>
        )
      })}
      <path d={path} fill="none" stroke={LINE} strokeWidth={1.5} />
      {points.map(([, label, x, y]) => (
        <circle key={`${label}-dot`} cx={x} cy={y} r={2.5} fill={ACCENT} />
      ))}
      <text x={10} y={18} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        관심 · 투자 · 성능 (개념도)
      </text>
    </svg>
  )
}

function Perceptron() {
  const inputs = [
    { y: 60, label: 'x1' },
    { y: 140, label: 'x2' },
    { y: 220, label: 'x3' },
  ]
  return (
    <svg viewBox="0 0 320 280" className="h-full w-full">
      {inputs.map((inp) => (
        <g key={inp.label}>
          <line x1={55} y1={inp.y} x2={155} y2={140} stroke={LINE_DIM} strokeWidth={1.5} />
          <circle cx={40} cy={inp.y} r={16} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={40} y={inp.y + 5} textAnchor="middle" fill={TEXT} {...labelProps}>
            {inp.label}
          </text>
        </g>
      ))}
      <circle cx={170} cy={140} r={22} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={170} y={147} textAnchor="middle" fill={TEXT} fontSize={18} fontFamily={labelProps.fontFamily}>
        &#x3a3;
      </text>
      <line x1={192} y1={140} x2={260} y2={140} stroke={LINE_DIM} strokeWidth={1.5} />
      <circle cx={278} cy={140} r={16} fill="none" stroke={LINE} strokeWidth={2} />
      <text x={278} y={145} textAnchor="middle" fill={TEXT} {...labelProps}>
        y
      </text>
      <text x={170} y={255} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        input -&gt; weighted sum -&gt; output
      </text>
    </svg>
  )
}

function Winter() {
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <line x1={30} y1={30} x2={30} y2={270} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={270} x2={290} y2={270} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={80} x2={290} y2={80} stroke={LINE_DIM} strokeWidth={1} strokeDasharray="4 4" />
      <path
        d="M40,80 L110,90 L150,235 L220,248 L280,244"
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <circle cx={40} cy={80} r={4} fill={ACCENT} />
      <circle cx={150} cy={235} r={4} fill={ACCENT} />
      <text x={34} y={20} fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        관심 · 투자 수준
      </text>
      <text x={44} y={50} fill={TEXT} {...labelProps}>
        1969 · 낙관론 정점
      </text>
      <text x={178} y={198} fill={TEXT} {...labelProps}>
        자금 축소
      </text>
      <text x={280} y={288} textAnchor="middle" fill={TEXT_MUTED} {...labelProps}>
        1974
      </text>
      <text x={198} y={288} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        시간
      </text>
    </svg>
  )
}

function ExpertSystem() {
  const rows = [
    { y: 20, text: 'IF 발열 = 예', bright: false },
    { y: 110, text: 'IF 기침 = 예', bright: false },
    { y: 200, text: 'THEN 진단: 감기', bright: true },
  ]
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      {rows.map((row, i) => (
        <g key={row.text}>
          <rect
            x={40}
            y={row.y}
            width={240}
            height={60}
            rx={4}
            fill="none"
            stroke={row.bright ? ACCENT : LINE}
            strokeWidth={row.bright ? 2.5 : 2}
          />
          <text x={160} y={row.y + 36} textAnchor="middle" fill={TEXT} {...labelProps}>
            {row.text}
          </text>
          {i < rows.length - 1 && (
            <line x1={160} y1={row.y + 60} x2={160} y2={row.y + 90} stroke={LINE_DIM} strokeWidth={1.5} />
          )}
        </g>
      ))}
    </svg>
  )
}

function SvmMargin() {
  const classA = [
    [60, 60],
    [90, 100],
    [50, 120],
    [100, 60],
  ]
  const classB = [
    [220, 180],
    [250, 220],
    [200, 240],
    [260, 150],
  ]
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <line x1={20} y1={260} x2={300} y2={20} stroke={GRID} strokeWidth={1.5} strokeDasharray="5 5" />
      <line x1={45} y1={260} x2={325} y2={20} stroke={ACCENT} strokeWidth={2} />
      <line x1={-5} y1={260} x2={275} y2={20} stroke={GRID} strokeWidth={1.5} strokeDasharray="5 5" />
      {classA.map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r={7} fill="none" stroke={LINE} strokeWidth={2} />
      ))}
      {classB.map(([x, y], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r={7} fill={LINE} />
      ))}
      <text x={30} y={40} fill={TEXT} {...labelProps}>
        class A
      </text>
      <text x={210} y={280} fill={TEXT} {...labelProps}>
        class B
      </text>
      <text x={200} y={90} textAnchor="middle" fill={TEXT} {...labelProps}>
        margin
      </text>
      <SvgFormula x={195} y={45} math={'w \\cdot x + b = 0'} width={110} height={24} fontSize={14} />
    </svg>
  )
}

function ComputeData() {
  const bars = [30, 55, 85, 125, 180]
  const gap = 50
  const startX = 40
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <line x1={30} y1={220} x2={290} y2={220} stroke={GRID} strokeWidth={1} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={startX + i * gap}
          y={220 - h}
          width={30}
          height={h}
          fill="none"
          stroke={i === bars.length - 1 ? ACCENT : LINE}
          strokeWidth={2}
        />
      ))}
      <text x={30} y={242} fill={TEXT_MUTED} {...labelProps}>
        2000
      </text>
      <text x={270} y={242} textAnchor="end" fill={TEXT_MUTED} {...labelProps}>
        2009
      </text>
      <text x={30} y={30} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        데이터 · 연산량 (개념도)
      </text>
    </svg>
  )
}

function DeepNet() {
  const layers = [
    [60, 140, 220],
    [130, 90, 190, 250],
    [200, 90, 190, 250],
    [270, 120, 220],
  ]
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <SvgFormula x={160} y={26} math={'a = f\\left(\\sum wx + b\\right)'} anchor="middle" width={200} height={26} fontSize={14} />
      {layers.slice(0, -1).map((layer, li) =>
        layer.slice(1).flatMap((y1, i) =>
          layers[li + 1].slice(1).map((y2, j) => (
            <line
              key={`${li}-${i}-${j}`}
              x1={layer[0]}
              y1={y1}
              x2={layers[li + 1][0]}
              y2={y2}
              stroke={GRID}
              strokeWidth={1}
            />
          )),
        ),
      )}
      {layers.map((layer, li) =>
        layer.slice(1).map((y, i) => (
          <circle
            key={`n-${li}-${i}`}
            cx={layer[0]}
            cy={y}
            r={9}
            fill="none"
            stroke={li === layers.length - 1 ? ACCENT : LINE}
            strokeWidth={2}
          />
        )),
      )}
      <text x={60} y={285} textAnchor="middle" fill={TEXT} {...labelProps}>
        input
      </text>
      <text x={270} y={285} textAnchor="middle" fill={TEXT} {...labelProps}>
        output
      </text>
    </svg>
  )
}

function Attention() {
  const tokens = ['그', '고양이', '는', '잤다']
  const xs = [40, 120, 200, 270]
  const boxY = 175
  const boxH = 34
  const boxW = 56

  const pairs: [number, number, number][] = [
    [0, 1, 0.6],
    [0, 2, 0.2],
    [0, 3, 0.25],
    [1, 2, 0.7],
    [1, 3, 0.9],
    [2, 3, 0.35],
  ]

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <text x={160} y={20} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        Self-Attention
      </text>

      {pairs.map(([a, b, w], i) => {
        const xa = xs[a]
        const xb = xs[b]
        const dist = Math.abs(xb - xa)
        const controlY = boxY - (dist * 0.4 + 20)
        return (
          <path
            key={`arc-${i}`}
            d={`M${xa},${boxY} Q${(xa + xb) / 2},${controlY} ${xb},${boxY}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1 + w * 3.5}
            opacity={0.2 + w * 0.6}
            strokeLinecap="round"
          />
        )
      })}

      {xs.map((x, i) => (
        <g key={tokens[i]}>
          <rect
            x={x - boxW / 2}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={5}
            fill="#003c33"
            stroke={LINE}
            strokeWidth={1.5}
          />
          <text x={x} y={boxY + 22} textAnchor="middle" fill={TEXT} {...labelProps}>
            {tokens[i]}
          </text>
          <circle cx={x} cy={boxY} r={3} fill={ACCENT} />
        </g>
      ))}

      <text x={160} y={228} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        선이 굵을수록 강하게 연관됩니다
      </text>
    </svg>
  )
}

function ScalingCurve() {
  const points: [number, number, string, number, number, 'start' | 'middle' | 'end'][] = [
    [40, 240, 'GPT-1', 38, 206, 'start'],
    [130, 200, 'GPT-2', 100, 182, 'end'],
    [205, 130, 'GPT-3', 175, 108, 'end'],
    [270, 55, 'GPT-4~', 312, 44, 'end'],
  ]
  return (
    <svg viewBox="0 0 320 280" className="h-full w-full">
      <line x1={30} y1={20} x2={30} y2={260} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={260} x2={300} y2={260} stroke={GRID} strokeWidth={1} />
      <path d="M40,240 C110,235 150,210 205,130 S255,75 270,55" fill="none" stroke={LINE} strokeWidth={2} />
      {points.map(([x, y, label, lx, ly, anchor]) => (
        <g key={label}>
          <circle cx={x} cy={y} r={4} fill={ACCENT} />
          <text x={lx} y={ly} textAnchor={anchor} fill={TEXT} {...labelProps}>
            {label}
          </text>
        </g>
      ))}
      <text x={38} y={14} fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        모델 규모
      </text>
      <text x={300} y={276} textAnchor="end" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        시간
      </text>
    </svg>
  )
}

function AgentLoop() {
  const center = { x: 160, y: 150 }
  const radius = 28
  const stages = [
    { x: 160, y: 40, label: '계획' },
    { x: 280, y: 150, label: '행동' },
    { x: 160, y: 260, label: '관찰' },
    { x: 40, y: 150, label: '판단' },
  ]

  function pointToward(from: { x: number; y: number }, toward: { x: number; y: number }, distance: number) {
    const dx = toward.x - from.x
    const dy = toward.y - from.y
    const len = Math.sqrt(dx * dx + dy * dy)
    return { x: from.x + (dx / len) * distance, y: from.y + (dy / len) * distance }
  }

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <defs>
        <marker id="agent-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE} />
        </marker>
      </defs>
      {stages.map((s, i) => {
        const next = stages[(i + 1) % stages.length]
        const midX = (s.x + next.x) / 2
        const midY = (s.y + next.y) / 2
        const control = { x: center.x + (midX - center.x) * 1.35, y: center.y + (midY - center.y) * 1.35 }
        const start = pointToward(s, control, radius + 6)
        const end = pointToward(next, control, radius + 14)
        return (
          <path
            key={`arc-${i}`}
            d={`M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`}
            fill="none"
            stroke={LINE}
            strokeWidth={2}
            markerEnd="url(#agent-arrow)"
          />
        )
      })}
      {stages.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r={radius} fill="#003c33" stroke={ACCENT} strokeWidth={2} />
          <text x={s.x} y={s.y + 6} textAnchor="middle" fill={TEXT} {...labelProps}>
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Roadmap() {
  const boxes = [
    { x: 5, label: '컴퓨터', accent: false },
    { x: 115, label: '이미지', accent: false },
    { x: 225, label: 'AI', accent: true },
  ]
  const boxWidth = 90
  const boxY = 30
  const boxHeight = 50
  return (
    <svg viewBox="0 0 320 120" className="h-full w-full">
      <defs>
        <marker id="roadmap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>
      {boxes.map((b) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y={boxY}
            width={boxWidth}
            height={boxHeight}
            rx={8}
            fill="none"
            stroke={b.accent ? ACCENT : LINE}
            strokeWidth={b.accent ? 2.5 : 2}
          />
          <text x={b.x + boxWidth / 2} y={boxY + boxHeight / 2 + 6} textAnchor="middle" fill={TEXT} {...labelProps}>
            {b.label}
          </text>
        </g>
      ))}
      <line x1={95} y1={55} x2={113} y2={55} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#roadmap-arrow)" />
      <line x1={205} y1={55} x2={223} y2={55} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#roadmap-arrow)" />
      <text x={160} y={105} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        오늘 하루, 이 순서로 살펴봅니다
      </text>
    </svg>
  )
}

function BinaryData() {
  const groups = [
    { x: 20, label: '텍스트' },
    { x: 120, label: '이미지' },
    { x: 220, label: '소리' },
  ]
  return (
    <svg viewBox="0 0 320 280" className="h-full w-full">
      <text x={30} y={60} fill={TEXT} fontSize={30} fontFamily={labelProps.fontFamily}>
        13
      </text>
      <line x1={80} y1={50} x2={140} y2={50} stroke={LINE_DIM} strokeWidth={1.5} />
      <path d="M136,45 L144,50 L136,55 Z" fill={LINE_DIM} />
      <text x={155} y={60} fill={ACCENT} fontSize={30} fontFamily={labelProps.fontFamily}>
        1101
      </text>
      <text x={160} y={95} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        10진수 13 → 2진수 1101
      </text>

      {groups.map((g) => (
        <g key={g.label}>
          <rect x={g.x} y={140} width={80} height={40} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={g.x + 40} y={165} textAnchor="middle" fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
            {g.label}
          </text>
          <line x1={g.x + 40} y1={180} x2={g.x + 40} y2={205} stroke={LINE_DIM} strokeWidth={1.5} />
        </g>
      ))}

      <rect x={20} y={210} width={280} height={40} rx={6} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={160} y={235} textAnchor="middle" fill={TEXT} fontSize={15} fontFamily={labelProps.fontFamily}>
        0 1 0 0 1 1 0 1 0 0 1 0 ...
      </text>
      <text x={160} y={265} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        결국 모든 데이터는 0과 1로 표현됩니다
      </text>
    </svg>
  )
}

function AlgorithmFlow() {
  const steps = [
    { y: 15, text: '재료 준비', accent: false },
    { y: 85, text: '순서대로 조리', accent: false },
    { y: 155, text: '맛 확인', accent: false },
    { y: 225, text: '완성!', accent: true },
  ]
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <defs>
        <marker id="algo-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>
      {steps.map((s, i) => (
        <g key={s.text}>
          <rect
            x={70}
            y={s.y}
            width={180}
            height={45}
            rx={6}
            fill="none"
            stroke={s.accent ? ACCENT : LINE}
            strokeWidth={s.accent ? 2.5 : 2}
          />
          <text x={160} y={s.y + 28} textAnchor="middle" fill={TEXT} fontSize={15} fontFamily={labelProps.fontFamily}>
            {s.text}
          </text>
          {i < steps.length - 1 && (
            <line
              x1={160}
              y1={s.y + 45}
              x2={160}
              y2={steps[i + 1].y}
              stroke={LINE_DIM}
              strokeWidth={1.5}
              markerEnd="url(#algo-arrow)"
            />
          )}
        </g>
      ))}
      <path
        d="M250,177 C285,177 285,107 253,107"
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#algo-arrow)"
      />
      <text x={261} y={145} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        부족하면
      </text>
      <text x={261} y={158} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        반복
      </text>
    </svg>
  )
}

function PixelGrid() {
  const cols = 6
  const rows = 6
  const cell = 25
  const startX = 20
  const startY = 30
  const tones = [LINE, ACCENT, LINE_DIM, 'rgba(255,255,255,0.22)']
  const calloutRow = 2
  const calloutCol = 4
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={startX + c * cell}
            y={startY + r * cell}
            width={cell - 2}
            height={cell - 2}
            fill={tones[(r + c) % tones.length]}
          />
        )),
      )}
      <line
        x1={startX + (calloutCol + 1) * cell}
        y1={startY + calloutRow * cell + cell / 2}
        x2={startX + cols * cell + 30}
        y2={startY + calloutRow * cell + cell / 2}
        stroke={TEXT_MUTED}
        strokeWidth={1}
      />
      <text
        x={startX + cols * cell + 34}
        y={startY + calloutRow * cell + cell / 2 - 8}
        fill={TEXT}
        fontSize={13}
        fontFamily={labelProps.fontFamily}
      >
        픽셀 1개 =
      </text>
      <text
        x={startX + cols * cell + 34}
        y={startY + calloutRow * cell + cell / 2 + 10}
        fill={TEXT}
        fontSize={13}
        fontFamily={labelProps.fontFamily}
      >
        R·G·B 숫자 3개
      </text>
      <text x={160} y={startY + rows * cell + 30} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        사진을 확대하면 결국 이런 숫자 격자입니다
      </text>
    </svg>
  )
}

function ImageFilter() {
  const cell = 32
  const cols = 4
  const rows = 3
  const gridY = 36
  const panel1X = 16
  const panel2X = 176

  const originalRow = [40, 40, 220, 220]
  const blurredRow = [40, 100, 160, 220]

  function textColorFor(v: number) {
    return v < 140 ? TEXT : '#16211d'
  }

  function Panel({ x, values, blurred }: { x: number; values: number[]; blurred?: boolean }) {
    return (
      <g>
        <g filter={blurred ? 'url(#image-blur)' : undefined}>
          {Array.from({ length: rows }).flatMap((_, r) =>
            values.map((v, c) => (
              <rect
                key={`${r}-${c}`}
                x={x + c * cell}
                y={gridY + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill={`rgb(${v},${v},${v})`}
              />
            )),
          )}
        </g>
        {Array.from({ length: rows }).flatMap((_, r) =>
          values.map((v, c) => (
            <text
              key={`t-${r}-${c}`}
              x={x + c * cell + (cell - 2) / 2}
              y={gridY + r * cell + (cell - 2) / 2 + 4}
              textAnchor="middle"
              fill={textColorFor(v)}
              fontSize={10}
              fontFamily={labelProps.fontFamily}
            >
              {v}
            </text>
          )),
        )}
        <rect
          x={x + cell - 2}
          y={gridY - 2}
          width={2 * cell + 2}
          height={rows * cell + 2}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2}
        />
      </g>
    )
  }

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <filter id="image-blur">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <marker id="filter-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={panel1X} y={24} fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
        원본
      </text>
      <text x={panel2X} y={24} fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
        블러 처리
      </text>

      <Panel x={panel1X} values={originalRow} />
      <Panel x={panel2X} values={blurredRow} blurred />

      <line
        x1={panel1X + cols * cell + 4}
        y1={gridY + (rows * cell) / 2}
        x2={panel2X - 8}
        y2={gridY + (rows * cell) / 2}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#filter-arrow)"
      />

      <text
        x={panel1X + (cols * cell) / 2}
        y={gridY + rows * cell + 20}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={12}
        fontFamily={labelProps.fontFamily}
      >
        40 ↔ 220
      </text>
      <text
        x={panel1X + (cols * cell) / 2}
        y={gridY + rows * cell + 35}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={12}
        fontFamily={labelProps.fontFamily}
      >
        차이 180
      </text>
      <text
        x={panel2X + (cols * cell) / 2}
        y={gridY + rows * cell + 20}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={12}
        fontFamily={labelProps.fontFamily}
      >
        100 ↔ 160
      </text>
      <text
        x={panel2X + (cols * cell) / 2}
        y={gridY + rows * cell + 35}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={12}
        fontFamily={labelProps.fontFamily}
      >
        차이 60
      </text>

      <text x={160} y={203} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        블러는 경계의 값 차이를 줄입니다
      </text>
    </svg>
  )
}

function DataStructures() {
  const arrayItems = ['A', 'B', 'C', 'D']
  const arrayCell = 38
  const arrayStartX = 20
  const arrayY = 60

  const kv = [
    { k: 'name', v: '"Amy"' },
    { k: 'age', v: '17' },
    { k: 'active', v: 'true' },
  ]
  const kvY = 60
  const kvRowH = 40
  const kvX = 190
  const kvWidth = 110

  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <text x={20} y={30} fill={TEXT} fontSize={15} fontFamily={labelProps.fontFamily}>
        배열(Array)
      </text>
      {arrayItems.map((v, i) => (
        <g key={v}>
          <rect
            x={arrayStartX + i * arrayCell}
            y={arrayY}
            width={arrayCell - 4}
            height={44}
            fill="none"
            stroke={i === 0 ? ACCENT : LINE}
            strokeWidth={i === 0 ? 2.5 : 2}
          />
          <text
            x={arrayStartX + i * arrayCell + (arrayCell - 4) / 2}
            y={arrayY + 27}
            textAnchor="middle"
            fill={TEXT}
            {...labelProps}
          >
            {v}
          </text>
          <text
            x={arrayStartX + i * arrayCell + (arrayCell - 4) / 2}
            y={arrayY + 62}
            textAnchor="middle"
            fill={TEXT_MUTED}
            fontSize={12}
            fontFamily={labelProps.fontFamily}
          >
            {i}
          </text>
        </g>
      ))}
      <text x={20} y={155} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        순서(인덱스)로 값을 찾음
      </text>

      <text x={kvX} y={30} fill={TEXT} fontSize={15} fontFamily={labelProps.fontFamily}>
        키-값 구조
      </text>
      {kv.map((row, i) => (
        <g key={row.k}>
          <rect x={kvX} y={kvY + i * kvRowH} width={kvWidth} height={kvRowH - 8} rx={4} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={kvX + 8} y={kvY + i * kvRowH + 21} fill={ACCENT} fontSize={13} fontFamily={labelProps.fontFamily}>
            {row.k}
          </text>
          <text x={kvX + 62} y={kvY + i * kvRowH + 21} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
            {row.v}
          </text>
        </g>
      ))}
      <text x={kvX} y={kvY + kv.length * kvRowH + 20} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        키로 값을 찾음
      </text>

      <text x={160} y={230} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        자료구조에 따라 값을 찾는 방법이 달라집니다
      </text>
    </svg>
  )
}

function Convolution() {
  const cell = 28
  const gridX = 20
  const gridY = 44
  const cols = 5
  const rows = 5
  const kernelStartRow = 1
  const kernelStartCol = 1
  const kernelSize = 3

  const colValues = [40, 40, 40, 220, 220]
  const kernelValues = [1, 2, 1, 2, 4, 2, 1, 2, 1]
  const kernelSum = kernelValues.reduce((a, b) => a + b, 0)
  const windowValues: number[] = []
  for (let r = 0; r < kernelSize; r++) {
    for (let c = 0; c < kernelSize; c++) {
      windowValues.push(colValues[kernelStartCol + c])
    }
  }
  const weightedSum = windowValues.reduce((acc, v, i) => acc + v * kernelValues[i], 0)
  const outputValue = Math.round(weightedSum / kernelSum)

  function textColorFor(v: number) {
    return v < 140 ? TEXT : '#16211d'
  }

  const kernelX = 205
  const kernelY = 64
  const kernelCell = 26

  const highlightCx = gridX + (kernelStartCol + kernelSize / 2) * cell
  const highlightCy = gridY + (kernelStartRow + kernelSize / 2) * cell
  const kernelCx = kernelX + (kernelSize * kernelCell) / 2
  const kernelCy = kernelY + (kernelSize * kernelCell) / 2

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <defs>
        <marker id="conv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={gridX} y={gridY - 16} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        입력 이미지
      </text>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = colValues[c]
          const inWindow =
            r >= kernelStartRow &&
            r < kernelStartRow + kernelSize &&
            c >= kernelStartCol &&
            c < kernelStartCol + kernelSize
          return (
            <g key={`in-${r}-${c}`}>
              <rect
                x={gridX + c * cell}
                y={gridY + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill={`rgb(${v},${v},${v})`}
              />
              {inWindow && (
                <text
                  x={gridX + c * cell + (cell - 2) / 2}
                  y={gridY + r * cell + (cell - 2) / 2 + 4}
                  textAnchor="middle"
                  fill={textColorFor(v)}
                  fontSize={10}
                  fontFamily={labelProps.fontFamily}
                >
                  {v}
                </text>
              )}
            </g>
          )
        }),
      )}
      <rect
        x={gridX + kernelStartCol * cell - 2}
        y={gridY + kernelStartRow * cell - 2}
        width={kernelSize * cell}
        height={kernelSize * cell}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.5}
      />

      <line
        x1={highlightCx}
        y1={highlightCy}
        x2={kernelCx}
        y2={kernelCy}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#conv-arrow)"
      />

      <text x={kernelX} y={kernelY - 16} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        커널(kernel)
      </text>
      {kernelValues.map((v, i) => {
        const r = Math.floor(i / 3)
        const c = i % 3
        return (
          <g key={i}>
            <rect
              x={kernelX + c * kernelCell}
              y={kernelY + r * kernelCell}
              width={kernelCell - 2}
              height={kernelCell - 2}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.5}
            />
            <text
              x={kernelX + c * kernelCell + (kernelCell - 2) / 2}
              y={kernelY + r * kernelCell + (kernelCell - 2) / 2 + 5}
              textAnchor="middle"
              fill={TEXT}
              fontSize={13}
              fontFamily={labelProps.fontFamily}
            >
              {v}
            </text>
          </g>
        )
      })}

      <line
        x1={kernelCx}
        y1={kernelY + kernelSize * kernelCell + 4}
        x2={kernelCx}
        y2={234}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#conv-arrow)"
      />
      <text x={kernelCx} y={228} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        새 픽셀 값
      </text>
      <rect
        x={kernelCx - 25}
        y={242}
        width={50}
        height={38}
        fill={`rgb(${outputValue},${outputValue},${outputValue})`}
        stroke={ACCENT}
        strokeWidth={2.5}
      />
      <text
        x={kernelCx}
        y={266}
        textAnchor="middle"
        fill={textColorFor(outputValue)}
        fontSize={15}
        fontFamily={labelProps.fontFamily}
      >
        {outputValue}
      </text>

      <text x={160} y={290} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        결과: ({weightedSum} ÷ {kernelSum}) = {outputValue}
      </text>
    </svg>
  )
}

function GradientDescent() {
  const k = 0.00878
  const cx = 175
  const base = 210
  function y(x: number) {
    return base - k * (x - cx) * (x - cx)
  }
  const curveXs = [40, 70, 100, 130, 160, 175, 190, 220, 250, 280, 300]
  const curvePath = curveXs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${y(x).toFixed(1)}`).join(' ')

  const stepXs = [40, 80, 115, 145, 165, 175]
  const steps = stepXs.map((x) => [x, y(x)] as [number, number])

  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <defs>
        <marker id="gd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>
      <line x1={30} y1={20} x2={30} y2={230} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={230} x2={300} y2={230} stroke={GRID} strokeWidth={1} />
      <path d={curvePath} fill="none" stroke={LINE} strokeWidth={2} />
      {steps.slice(0, -1).map(([x, yy], i) => {
        const [nx, ny] = steps[i + 1]
        return (
          <line
            key={`step-${i}`}
            x1={x}
            y1={yy}
            x2={nx}
            y2={ny}
            stroke={ACCENT}
            strokeWidth={1.5}
            markerEnd="url(#gd-arrow)"
          />
        )
      })}
      {steps.map(([x, yy], i) => (
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={yy}
          r={i === steps.length - 1 ? 6 : 4}
          fill={i === steps.length - 1 ? ACCENT : LINE}
        />
      ))}
      <text x={34} y={16} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        손실(loss)
      </text>
      <text x={300} y={246} textAnchor="end" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        가중치
      </text>
      <text x={cx} y={y(cx) + 34} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        최소값
      </text>
      <SvgFormula x={296} y={40} math={'\\theta \\leftarrow \\theta - \\eta \\nabla L(\\theta)'} anchor="end" width={180} height={24} fontSize={13} />
    </svg>
  )
}

function OverfitCurve() {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <line x1={30} y1={20} x2={30} y2={230} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={230} x2={300} y2={230} stroke={GRID} strokeWidth={1} />
      <path d="M40,60 C90,140 140,190 300,205" fill="none" stroke={LINE} strokeWidth={2} />
      <path d="M40,70 C90,150 150,175 220,150 S280,60 300,30" fill="none" stroke={ACCENT} strokeWidth={2} />
      <line x1={210} y1={30} x2={210} y2={230} stroke={LINE_DIM} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={214} y={45} fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        여기서부터
      </text>
      <text x={214} y={60} fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        과적합 시작
      </text>
      <circle cx={46} cy={26} r={4} fill={LINE} />
      <text x={56} y={30} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        학습 데이터 오차
      </text>
      <circle cx={46} cy={42} r={4} fill={ACCENT} />
      <text x={56} y={46} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        검증 데이터 오차
      </text>
      <text x={300} y={246} textAnchor="end" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        학습 반복 (epoch)
      </text>
    </svg>
  )
}

function ActivationFunctions() {
  const p1 = { left: 15, right: 135, top: 70, bottom: 170 }
  const p2 = { left: 185, right: 305, top: 70, bottom: 170 }
  const reluOriginX = p1.left + ((0 + 4) / 8) * (p1.right - p1.left)
  const reluTopX = p1.right
  const sigOriginX = p2.left + ((0 + 4) / 8) * (p2.right - p2.left)

  function sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x))
  }
  const sigXs = [-4, -3, -2, -1, -0.5, 0, 0.5, 1, 2, 3, 4]
  const sigPath = sigXs
    .map((x, i) => {
      const sx = p2.left + ((x + 4) / 8) * (p2.right - p2.left)
      const sy = p2.bottom - sigmoid(x) * (p2.bottom - p2.top)
      return `${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <text x={p1.left} y={30} fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
        ReLU
      </text>
      <line x1={p1.left} y1={p1.bottom} x2={p1.right} y2={p1.bottom} stroke={GRID} strokeWidth={1} />
      <line x1={reluOriginX} y1={p1.bottom} x2={reluOriginX} y2={p1.top} stroke={GRID} strokeWidth={1} />
      <path
        d={`M${p1.left},${p1.bottom} L${reluOriginX},${p1.bottom} L${reluTopX},${p1.top}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <circle cx={reluOriginX} cy={p1.bottom} r={3.5} fill={ACCENT} />
      <text x={p1.left} y={p1.bottom + 14} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        -4
      </text>
      <text x={p1.right} y={p1.bottom + 14} textAnchor="end" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        4
      </text>
      <text
        x={reluOriginX}
        y={p1.bottom + 14}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        0
      </text>
      <text
        x={reluOriginX - 8}
        y={p1.top + 4}
        textAnchor="end"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        4
      </text>

      <text x={p2.left} y={30} fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
        Sigmoid
      </text>
      <line x1={p2.left} y1={p2.bottom} x2={p2.right} y2={p2.bottom} stroke={GRID} strokeWidth={1} />
      <line x1={sigOriginX} y1={p2.bottom} x2={sigOriginX} y2={p2.top} stroke={GRID} strokeWidth={1} />
      <line
        x1={p2.left}
        y1={p2.top}
        x2={p2.right}
        y2={p2.top}
        stroke={LINE_DIM}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <path d={sigPath} fill="none" stroke={LINE} strokeWidth={2} />
      <circle cx={sigOriginX} cy={(p2.top + p2.bottom) / 2} r={3.5} fill={ACCENT} />
      <text x={p2.left} y={p2.bottom + 14} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        -4
      </text>
      <text x={p2.right} y={p2.bottom + 14} textAnchor="end" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        4
      </text>
      <text
        x={sigOriginX}
        y={p2.bottom + 14}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        0
      </text>
      <text
        x={sigOriginX - 8}
        y={p2.top + 4}
        textAnchor="end"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        1
      </text>
      <text
        x={sigOriginX - 8}
        y={(p2.top + p2.bottom) / 2 + 4}
        textAnchor="end"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        0.5
      </text>

      <SvgFormula
        x={(p1.left + p1.right) / 2}
        y={225}
        math={'\\text{ReLU}(x) = \\max(0, x)'}
        anchor="middle"
        width={150}
        height={46}
        fontSize={12}
      />
      <SvgFormula
        x={230}
        y={225}
        math={'\\sigma(x) = \\dfrac{1}{1+e^{-x}}'}
        anchor="middle"
        width={150}
        height={46}
        fontSize={12}
      />

      <text x={160} y={272} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        출력을 눌러 담는 방식이 서로 다릅니다
      </text>
    </svg>
  )
}

function MinimaLandscape() {
  const points: [number, number][] = [
    [40, 70],
    [70, 115],
    [100, 155],
    [130, 115],
    [160, 75],
    [190, 130],
    [220, 210],
    [250, 165],
    [280, 115],
    [300, 95],
  ]
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')

  function landscapeY(x: number) {
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i]
      const [x2, y2] = points[i + 1]
      if (x >= x1 && x <= x2) {
        return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1)
      }
    }
    return points[points.length - 1][1]
  }
  const stepXs = [40, 55, 70, 85, 100]
  const steps = stepXs.map((x) => [x, landscapeY(x)] as [number, number])

  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <defs>
        <marker id="minima-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>
      <line x1={30} y1={20} x2={30} y2={230} stroke={GRID} strokeWidth={1} />
      <line x1={30} y1={230} x2={300} y2={230} stroke={GRID} strokeWidth={1} />
      <path d={path} fill="none" stroke={LINE} strokeWidth={2} />

      <path d="M100,155 Q160,30 220,210" fill="none" stroke={LINE_DIM} strokeWidth={1.5} strokeDasharray="4 3" />

      {steps.slice(0, -1).map(([x, y], i) => {
        const [nx, ny] = steps[i + 1]
        return (
          <line
            key={`step-${i}`}
            x1={x}
            y1={y}
            x2={nx}
            y2={ny}
            stroke={ACCENT}
            strokeWidth={1.5}
            markerEnd="url(#minima-arrow)"
          />
        )
      })}
      {steps.slice(0, -1).map(([x, y], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={3} fill={LINE} />
      ))}

      <circle cx={100} cy={155} r={5} fill={ACCENT} />
      <circle cx={220} cy={210} r={6} fill="none" stroke={LINE} strokeWidth={2.5} />

      <text x={34} y={16} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        손실(loss)
      </text>
      <circle cx={46} cy={40} r={4} fill={ACCENT} />
      <text x={56} y={44} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        지역 최소값 — 여기서 멈춤
      </text>
      <circle cx={46} cy={58} r={4} fill="none" stroke={LINE} strokeWidth={2} />
      <text x={56} y={62} fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        전역 최소값 — 더 낮은 지점
      </text>

      <text x={300} y={246} textAnchor="end" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        가중치
      </text>
    </svg>
  )
}

function FrequencyFilters() {
  const cell = 22
  const inputX = 127
  const colAx = 20
  const colBx = 190
  const inputY = 20
  const kernelY = 140
  const outputY = 232

  const edgeWindow = [40, 40, 220, 40, 40, 220, 40, 40, 220]
  const lowPassKernel = [1, 2, 1, 2, 4, 2, 1, 2, 1]
  const highPassKernel = [0, -1, 0, -1, 4, -1, 0, -1, 0]

  function textColorFor(v: number) {
    return v < 140 ? TEXT : '#16211d'
  }

  function convolveSamePad(input: number[], kernel: number[]) {
    const at = (r: number, c: number) => (r >= 0 && r < 3 && c >= 0 && c < 3 ? input[r * 3 + c] : 0)
    const out: number[] = []
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            sum += kernel[(dr + 1) * 3 + (dc + 1)] * at(r + dr, c + dc)
          }
        }
        out.push(sum)
      }
    }
    return out
  }

  const lowPassSum = lowPassKernel.reduce((a, b) => a + b, 0)
  const lowPassOut = convolveSamePad(edgeWindow, lowPassKernel).map((v) => Math.round(v / lowPassSum))
  const highPassOut = convolveSamePad(edgeWindow, highPassKernel).map((v) => Math.min(Math.abs(v), 255))

  function Grid({
    x,
    y,
    values,
    filled,
  }: {
    x: number
    y: number
    values: number[]
    filled: boolean
  }) {
    return (
      <>
        {values.map((v, i) => {
          const r = Math.floor(i / 3)
          const c = i % 3
          return (
            <g key={i}>
              <rect
                x={x + c * cell}
                y={y + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill={filled ? `rgb(${v},${v},${v})` : 'none'}
                stroke={filled ? 'none' : ACCENT}
                strokeWidth={filled ? 0 : 1.5}
              />
              <text
                x={x + c * cell + (cell - 2) / 2}
                y={y + r * cell + (cell - 2) / 2 + 4}
                textAnchor="middle"
                fill={filled ? textColorFor(v) : TEXT}
                fontSize={10}
                fontFamily={labelProps.fontFamily}
              >
                {v}
              </text>
            </g>
          )
        })}
      </>
    )
  }

  const inputCenter = inputX + (3 * cell - 2) / 2
  const colACenter = colAx + (3 * cell - 2) / 2
  const colBCenter = colBx + (3 * cell - 2) / 2

  return (
    <svg viewBox="0 0 320 335" className="h-full w-full">
      <defs>
        <marker id="freq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={inputX} y={12} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        경계 (입력)
      </text>
      <Grid x={inputX} y={inputY} values={edgeWindow} filled />

      <path
        d={`M${inputCenter},${inputY + 3 * cell + 4} L${colACenter},${kernelY - 14}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />
      <path
        d={`M${inputCenter},${inputY + 3 * cell + 4} L${colBCenter},${kernelY - 14}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />

      <text x={colAx} y={kernelY - 4} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        저주파 통과(블러)
      </text>
      <text x={colBx} y={kernelY - 4} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        고주파 통과(엣지)
      </text>
      <Grid x={colAx} y={kernelY} values={lowPassKernel} filled={false} />
      <Grid x={colBx} y={kernelY} values={highPassKernel} filled={false} />

      <line
        x1={colACenter}
        y1={kernelY + 3 * cell + 4}
        x2={colACenter}
        y2={outputY - 4}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />
      <line
        x1={colBCenter}
        y1={kernelY + 3 * cell + 4}
        x2={colBCenter}
        y2={outputY - 4}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />

      <Grid x={colAx} y={outputY} values={lowPassOut} filled />
      <Grid x={colBx} y={outputY} values={highPassOut} filled />

      <text x={160} y={outputY + 3 * cell + 20} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        저주파는 경계를 뭉개고, 고주파는 경계를 드러냅니다
      </text>
    </svg>
  )
}

function RnnSequence() {
  const rowY = { y: 34, h: 97, x: 160 }
  const r = { rolled: 15, unrolled: 13 }
  const rolledCx = 40
  const cols = [150, 205, 260]

  function Node({
    cx,
    cy,
    radius,
    label,
    accent,
  }: {
    cx: number
    cy: number
    radius: number
    label: string
    accent?: boolean
  }) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={accent ? ACCENT : LINE} strokeWidth={2} />
        <text x={cx} y={cy + 4} textAnchor="middle" fill={TEXT} fontSize={10} fontFamily={labelProps.fontFamily}>
          {label}
        </text>
      </g>
    )
  }

  function VArrow({ cx, cyTop, cyBottom, radius }: { cx: number; cyTop: number; cyBottom: number; radius: number }) {
    return (
      <line
        x1={cx}
        y1={cyBottom - radius}
        x2={cx}
        y2={cyTop + radius}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#rnn-arrow)"
      />
    )
  }

  return (
    <svg viewBox="0 0 320 225" className="h-full w-full">
      <defs>
        <marker id="rnn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={rolledCx} y={12} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        축약형
      </text>
      <Node cx={rolledCx} cy={rowY.y} radius={r.rolled} label="Yt" />
      <Node cx={rolledCx} cy={rowY.h} radius={r.rolled} label="h" accent />
      <Node cx={rolledCx} cy={rowY.x} radius={r.rolled} label="Xt" />
      <VArrow cx={rolledCx} cyTop={rowY.h} cyBottom={rowY.x} radius={r.rolled} />
      <VArrow cx={rolledCx} cyTop={rowY.y} cyBottom={rowY.h} radius={r.rolled} />
      <path
        d={`M${rolledCx + 13},${rowY.h - 9} C ${rolledCx + 34},${rowY.h - 9} ${rolledCx + 34},${rowY.h + 9} ${rolledCx + 13},${rowY.h + 9}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.5}
        markerEnd="url(#rnn-arrow)"
      />

      <text x={95} y={rowY.h + 6} textAnchor="middle" fill={TEXT} fontSize={20} fontFamily={labelProps.fontFamily}>
        =
      </text>

      <text
        x={(cols[0] + cols[2]) / 2}
        y={12}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={11}
        fontFamily={labelProps.fontFamily}
      >
        시간에 따라 펼친 모습
      </text>
      {cols.map((cx, i) => (
        <g key={`col-${i}`}>
          <Node cx={cx} cy={rowY.y} radius={r.unrolled} label={`Y${i}`} />
          <Node cx={cx} cy={rowY.h} radius={r.unrolled} label={`h${i}`} accent />
          <Node cx={cx} cy={rowY.x} radius={r.unrolled} label={`X${i}`} />
          <VArrow cx={cx} cyTop={rowY.h} cyBottom={rowY.x} radius={r.unrolled} />
          <VArrow cx={cx} cyTop={rowY.y} cyBottom={rowY.h} radius={r.unrolled} />
        </g>
      ))}
      {cols.slice(0, -1).map((cx, i) => (
        <line
          key={`hh-${i}`}
          x1={cx + r.unrolled}
          y1={rowY.h}
          x2={cols[i + 1] - r.unrolled}
          y2={rowY.h}
          stroke={LINE_DIM}
          strokeWidth={1.5}
          markerEnd="url(#rnn-arrow)"
        />
      ))}

      <line x1={137} y1={195} x2={283} y2={195} stroke={GRID} strokeWidth={1} markerEnd="url(#rnn-arrow)" />
      <text x={290} y={199} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        시간
      </text>

      <text x={160} y={215} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        같은 셀 h가 매 시점 반복해서 사용됩니다
      </text>
    </svg>
  )
}

function CnnLayers() {
  const tones = [LINE, 'rgba(255,255,255,0.22)', LINE_DIM]
  const inputCell = 9
  const inputX = 15
  const inputY = 90

  const convBase = { x: 95, y: 93, size: 34 }
  const convOffsets: [number, number][] = [
    [12, -12],
    [6, -6],
    [0, 0],
  ]
  const poolBase = { x: 170, y: 98, size: 22 }
  const poolOffsets: [number, number][] = [
    [8, -8],
    [4, -4],
    [0, 0],
  ]
  const fcX = 250
  const fcYs = [90, 110, 130]

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <marker id="cnn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      {Array.from({ length: 4 }).flatMap((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <rect
            key={`px-${r}-${c}`}
            x={inputX + c * inputCell}
            y={inputY + r * inputCell}
            width={inputCell - 1}
            height={inputCell - 1}
            fill={tones[(r + c) % tones.length]}
          />
        )),
      )}

      {convOffsets.map(([dx, dy], i) => (
        <rect
          key={`conv-${i}`}
          x={convBase.x + dx}
          y={convBase.y + dy}
          width={convBase.size}
          height={convBase.size}
          fill="#003c33"
          stroke={LINE}
          strokeWidth={1.5}
        />
      ))}

      {poolOffsets.map(([dx, dy], i) => (
        <rect
          key={`pool-${i}`}
          x={poolBase.x + dx}
          y={poolBase.y + dy}
          width={poolBase.size}
          height={poolBase.size}
          fill="#003c33"
          stroke={ACCENT}
          strokeWidth={1.5}
        />
      ))}

      <text x={215} y={112} textAnchor="middle" fill={TEXT_MUTED} fontSize={14} fontFamily={labelProps.fontFamily}>
        ...
      </text>

      {fcYs.map((y, i) => (
        <circle key={`fc-${i}`} cx={fcX} cy={y} r={6} fill="none" stroke={LINE} strokeWidth={1.5} />
      ))}

      <line
        x1={inputX + 4 * inputCell + 3}
        y1={108}
        x2={convBase.x + convOffsets[0][0] - 3}
        y2={108}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#cnn-arrow)"
      />
      <line
        x1={convBase.x + convOffsets[0][0] + convBase.size + 3}
        y1={108}
        x2={poolBase.x + poolOffsets[0][0] - 3}
        y2={108}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#cnn-arrow)"
      />
      <line
        x1={poolBase.x + poolOffsets[0][0] + poolBase.size + 3}
        y1={108}
        x2={202}
        y2={108}
        stroke={LINE_DIM}
        strokeWidth={1.5}
      />
      <line x1={228} y1={108} x2={fcX - 10} y2={108} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#cnn-arrow)" />
      <line x1={fcX + 6} y1={110} x2={290} y2={110} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#cnn-arrow)" />

      <text x={33} y={155} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        입력
      </text>
      <text x={118} y={155} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        합성곱
      </text>
      <text x={185} y={155} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        풀링
      </text>
      <text x={250} y={155} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        완전연결
      </text>
      <text x={292} y={114} fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        출력
      </text>

      <text x={160} y={195} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        합성곱·풀링을 반복해 특징을 압축합니다
      </text>
    </svg>
  )
}

function LstmCell() {
  const lineY = 28
  const opForgetX = 65
  const opInputX = 155
  const branchX = 245

  const gateY = 130
  const gateH = 26
  const gateW = 46
  const mainGates = [
    { cx: 65, label: '망각', sub: 'σ', inX: 50 },
    { cx: 125, label: '입력', sub: 'σ', inX: 110 },
    { cx: 185, label: '후보', sub: 'tanh', inX: 170 },
  ]
  const outputInX = 230
  const inputLineY = 200

  return (
    <svg viewBox="0 0 320 270" className="h-full w-full">
      <defs>
        <marker id="lstm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <rect
        x={35}
        y={18}
        width={250}
        height={167}
        rx={16}
        fill="rgba(255,255,255,0.03)"
        stroke={LINE_DIM}
        strokeWidth={1.5}
      />

      <text x={34} y={16} textAnchor="end" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        C(t-1)
      </text>
      <text x={288} y={16} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        C(t)
      </text>
      <line x1={20} y1={lineY} x2={300} y2={lineY} stroke={LINE_DIM} strokeWidth={3} />

      <circle cx={opForgetX} cy={lineY} r={9} fill="#003c33" stroke={ACCENT} strokeWidth={2} />
      <text
        x={opForgetX}
        y={lineY + 4}
        textAnchor="middle"
        fill={TEXT}
        fontSize={12}
        fontFamily={labelProps.fontFamily}
      >
        &#215;
      </text>
      <circle cx={opInputX} cy={lineY} r={9} fill="#003c33" stroke={ACCENT} strokeWidth={2} />
      <text x={opInputX} y={lineY + 4} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        +
      </text>
      <circle cx={branchX} cy={lineY} r={4} fill={ACCENT} />

      <line
        x1={opForgetX}
        y1={gateY}
        x2={opForgetX}
        y2={lineY + 11}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />

      <line x1={mainGates[1].cx} y1={gateY} x2={148} y2={97} stroke={LINE_DIM} strokeWidth={1.5} />
      <line x1={mainGates[2].cx} y1={gateY} x2={162} y2={97} stroke={LINE_DIM} strokeWidth={1.5} />
      <circle cx={opInputX} cy={91} r={7} fill="#003c33" stroke={ACCENT} strokeWidth={1.5} />
      <text x={opInputX} y={95} textAnchor="middle" fill={TEXT} fontSize={10} fontFamily={labelProps.fontFamily}>
        &#215;
      </text>
      <line
        x1={opInputX}
        y1={84}
        x2={opInputX}
        y2={lineY + 11}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />

      {mainGates.map((g) => (
        <g key={g.label}>
          <rect
            x={g.cx - gateW / 2}
            y={gateY}
            width={gateW}
            height={gateH}
            rx={6}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2}
          />
          <text
            x={g.cx}
            y={gateY + 16}
            textAnchor="middle"
            fill={TEXT}
            fontSize={12}
            fontFamily={labelProps.fontFamily}
          >
            {g.sub}
          </text>
          <text
            x={g.cx}
            y={gateY + gateH + 12}
            textAnchor="middle"
            fill={TEXT_MUTED}
            fontSize={10}
            fontFamily={labelProps.fontFamily}
          >
            {g.label}
          </text>
          <line
            x1={g.inX}
            y1={inputLineY}
            x2={g.inX}
            y2={gateY + gateH + 2}
            stroke={LINE_DIM}
            strokeWidth={1.5}
            markerEnd="url(#lstm-arrow)"
          />
        </g>
      ))}

      <line x1={branchX} y1={lineY + 4} x2={branchX} y2={52} stroke={LINE_DIM} strokeWidth={1.5} />
      <rect x={branchX - 20} y={52} width={40} height={22} rx={5} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={branchX} y={67} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
        tanh
      </text>
      <line
        x1={branchX}
        y1={74}
        x2={branchX}
        y2={100}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />
      <circle cx={branchX} cy={108} r={8} fill="#003c33" stroke={ACCENT} strokeWidth={2} />
      <text x={branchX} y={112} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
        &#215;
      </text>
      <line
        x1={branchX}
        y1={gateY}
        x2={branchX}
        y2={117}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />
      <rect x={branchX - gateW / 2} y={gateY} width={gateW} height={gateH} rx={6} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={branchX} y={gateY + 16} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        σ
      </text>
      <text
        x={branchX}
        y={gateY + gateH + 12}
        textAnchor="middle"
        fill={TEXT_MUTED}
        fontSize={10}
        fontFamily={labelProps.fontFamily}
      >
        출력
      </text>
      <line
        x1={outputInX}
        y1={inputLineY}
        x2={outputInX}
        y2={gateY + gateH + 2}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />

      <line
        x1={branchX + 8}
        y1={108}
        x2={300}
        y2={108}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#lstm-arrow)"
      />
      <text x={288} y={100} fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
        h(t)
      </text>

      <line x1={40} y1={inputLineY} x2={268} y2={inputLineY} stroke={GRID} strokeWidth={1} />
      <text x={20} y={inputLineY + 16} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        h(t-1), x(t) — 이전 은닉 상태와 지금 입력
      </text>

      <text x={160} y={252} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        게이트가 셀 상태를 갱신하고 출력을 만듭니다
      </text>
    </svg>
  )
}

function XorProblem() {
  const s = 100
  const oy = 55
  const leftOx = 25
  const rightOx = 195

  function cornerPos(ox: number, x: number, y: number): [number, number] {
    return [ox + x * s, oy + (1 - y) * s]
  }

  function Axes({ ox }: { ox: number }) {
    return (
      <>
        <line x1={ox} y1={oy + s + 14} x2={ox} y2={oy - 14} stroke={GRID} strokeWidth={1} />
        <line x1={ox - 14} y1={oy + s} x2={ox + s + 14} y2={oy + s} stroke={GRID} strokeWidth={1} />
        <text x={ox + s + 14} y={oy + s - 14} textAnchor="end" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
          x1
        </text>
        <text x={ox} y={oy - 18} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
          x2
        </text>
      </>
    )
  }

  function Points({ ox }: { ox: number }) {
    const pts: [number, number, number][] = [
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 0],
    ]
    return (
      <>
        {pts.map(([x, y, cls]) => {
          const [cx, cy] = cornerPos(ox, x, y)
          return (
            <g key={`${ox}-${x}-${y}`}>
              {cls === 1 ? (
                <circle cx={cx} cy={cy} r={7} fill={ACCENT} />
              ) : (
                <circle cx={cx} cy={cy} r={7} fill="none" stroke={LINE} strokeWidth={2} />
              )}
              <text x={cx + 11} y={cy + 4} textAnchor="start" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
                {cls}
              </text>
            </g>
          )
        })}
      </>
    )
  }

  return (
    <svg viewBox="0 0 320 230" className="h-full w-full">
      <text x={leftOx + s / 2} y={22} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        직선 하나로는 분리 불가
      </text>
      <Axes ox={leftOx} />
      <line
        x1={leftOx - 16}
        y1={oy + s / 2}
        x2={leftOx + s + 16}
        y2={oy + s / 2}
        stroke={LINE_DIM}
        strokeWidth={2}
        strokeDasharray="5 4"
      />
      <Points ox={leftOx} />

      <text x={rightOx + s / 2} y={22} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        경계 2개(은닉층)로 해결
      </text>
      <Axes ox={rightOx} />
      <path d="M209,41 L309,141 L281,169 L181,69 Z" fill={ACCENT} fillOpacity={0.16} stroke={ACCENT} strokeWidth={1.5} />
      <Points ox={rightOx} />

      <text x={leftOx + s / 2} y={oy + s + 40} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        어느 쪽에도 0과 1이 섞임
      </text>
      <text x={rightOx + s / 2} y={oy + s + 40} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        띠 안쪽에만 정답 1이 모임
      </text>
    </svg>
  )
}

function XorNetwork() {
  const x1 = { x: 40, y: 70 }
  const x2 = { x: 40, y: 230 }
  const h1 = { x: 170, y: 70 }
  const h2 = { x: 170, y: 230 }
  const y = { x: 280, y: 150 }

  const edges: [{ x: number; y: number }, { x: number; y: number }][] = [
    [x1, h1],
    [x1, h2],
    [x2, h1],
    [x2, h2],
  ]

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <text x={160} y={18} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        모든 입력 → 은닉 가중치 = 1
      </text>

      {edges.map((edge, i) => (
        <line
          key={`in-${i}`}
          x1={edge[0].x}
          y1={edge[0].y}
          x2={edge[1].x}
          y2={edge[1].y}
          stroke={GRID}
          strokeWidth={1.5}
        />
      ))}
      <line x1={h1.x} y1={h1.y} x2={y.x} y2={y.y} stroke={LINE} strokeWidth={2} />
      <line x1={h2.x} y1={h2.y} x2={y.x} y2={y.y} stroke={LINE} strokeWidth={2} />

      <text x={225} y={97} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        w=+1
      </text>
      <text x={225} y={193} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        w=-1
      </text>

      <circle cx={x1.x} cy={x1.y} r={16} fill="none" stroke={LINE} strokeWidth={2} />
      <text x={x1.x} y={x1.y + 5} textAnchor="middle" fill={TEXT} {...labelProps}>
        x1
      </text>
      <circle cx={x2.x} cy={x2.y} r={16} fill="none" stroke={LINE} strokeWidth={2} />
      <text x={x2.x} y={x2.y + 5} textAnchor="middle" fill={TEXT} {...labelProps}>
        x2
      </text>

      <circle cx={h1.x} cy={h1.y} r={20} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={h1.x} y={h1.y + 5} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        h1
      </text>
      <text x={h1.x} y={h1.y + 34} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        b=-0.5
      </text>

      <circle cx={h2.x} cy={h2.y} r={20} fill="none" stroke={ACCENT} strokeWidth={2} />
      <text x={h2.x} y={h2.y + 5} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        h2
      </text>
      <text x={h2.x} y={h2.y + 34} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        b=-1.5
      </text>

      <circle cx={y.x} cy={y.y} r={20} fill="none" stroke={ACCENT} strokeWidth={2.5} />
      <text x={y.x} y={y.y + 5} textAnchor="middle" fill={TEXT} fontSize={14} fontFamily={labelProps.fontFamily}>
        y
      </text>
      <text x={y.x} y={y.y + 34} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        b=-0.5
      </text>

      <text x={40} y={290} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        입력
      </text>
      <text x={170} y={290} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        은닉층
      </text>
      <text x={280} y={290} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        출력
      </text>
    </svg>
  )
}

function BackpropGraph() {
  const boxY = 90
  const boxH = 42
  const boxW = 72
  const boxes = [
    { cx: 60, label: 'z = wx+b' },
    { cx: 160, label: 'a = f(z)' },
    { cx: 260, label: 'L(a,y)' },
  ]

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <marker id="bp-fwd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
        <marker id="bp-bwd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>

      <text x={160} y={22} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        순전파(forward) →
      </text>

      {boxes.map((b) => (
        <g key={b.cx}>
          <rect x={b.cx - boxW / 2} y={boxY - boxH / 2} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={b.cx} y={boxY + 4} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
            {b.label}
          </text>
        </g>
      ))}

      <line
        x1={boxes[0].cx + boxW / 2}
        y1={boxY}
        x2={boxes[1].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bp-fwd-arrow)"
      />
      <line
        x1={boxes[1].cx + boxW / 2}
        y1={boxY}
        x2={boxes[2].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bp-fwd-arrow)"
      />

      <line
        x1={boxes[1].cx - boxW / 2}
        y1={150}
        x2={boxes[0].cx + boxW / 2}
        y2={150}
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#bp-bwd-arrow)"
      />
      <line
        x1={boxes[2].cx - boxW / 2}
        y1={150}
        x2={boxes[1].cx + boxW / 2}
        y2={150}
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#bp-bwd-arrow)"
      />

      <text x={110} y={140} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        ∂a/∂z
      </text>
      <text x={210} y={140} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        ∂L/∂a
      </text>

      <text x={160} y={175} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        ← 역전파(기울기 전달)
      </text>

      <text x={160} y={210} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        ∂L/∂w = (∂L/∂a)·(∂a/∂z)·(∂z/∂w)
      </text>
    </svg>
  )
}

function BackpropNumeric() {
  const boxY = 75
  const boxH = 40
  const boxW = 72
  const boxes = [
    { cx: 60, label: 'z = 1.0' },
    { cx: 160, label: 'a = 0.731' },
    { cx: 260, label: 'L = 0.036' },
  ]

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <marker id="bpn-fwd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
        <marker id="bpn-bwd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>

      <text x={160} y={16} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        x=2, w=0.5, b=0, 목표값 y=1
      </text>

      {boxes.map((b) => (
        <g key={b.cx}>
          <rect x={b.cx - boxW / 2} y={boxY - boxH / 2} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={b.cx} y={boxY + 4} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
            {b.label}
          </text>
        </g>
      ))}

      <line
        x1={boxes[0].cx + boxW / 2}
        y1={boxY}
        x2={boxes[1].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bpn-fwd-arrow)"
      />
      <line
        x1={boxes[1].cx + boxW / 2}
        y1={boxY}
        x2={boxes[2].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bpn-fwd-arrow)"
      />

      <line
        x1={boxes[1].cx - boxW / 2}
        y1={130}
        x2={boxes[0].cx + boxW / 2}
        y2={130}
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#bpn-bwd-arrow)"
      />
      <line
        x1={boxes[2].cx - boxW / 2}
        y1={130}
        x2={boxes[1].cx + boxW / 2}
        y2={130}
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#bpn-bwd-arrow)"
      />

      <text x={110} y={120} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        ∂a/∂z=0.197
      </text>
      <text x={210} y={120} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        ∂L/∂a=-0.269
      </text>

      <text x={160} y={155} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        ← 역전파(기울기 전달)
      </text>

      <text x={160} y={190} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
        ∂L/∂w = -0.269×0.197×2 = -0.106
      </text>
      <text x={160} y={212} textAnchor="middle" fill={ACCENT} fontSize={11} fontFamily={labelProps.fontFamily}>
        w ← 0.5 - 0.1×(-0.106) = 0.511
      </text>
    </svg>
  )
}

function TransformerArchitecture() {
  const encX = 75
  const decX = 245
  const boxW = 130
  const boxH = 36

  function Box({ cx, cy, label, fontSize = 11 }: { cx: number; cy: number; label: string; fontSize?: number }) {
    return (
      <g>
        <rect x={cx - boxW / 2} y={cy - boxH / 2} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
        <text x={cx} y={cy + 4} textAnchor="middle" fill={TEXT} fontSize={fontSize} fontFamily={labelProps.fontFamily}>
          {label}
        </text>
      </g>
    )
  }

  function VArrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
    return <line x1={x} y1={y1} x2={x} y2={y2} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#tf-arrow)" />
  }

  return (
    <svg viewBox="0 0 320 390" className="h-full w-full">
      <defs>
        <marker id="tf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
        <marker id="tf-cross-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>

      <text x={encX} y={15} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        인코더
      </text>
      <text x={decX} y={15} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        디코더
      </text>

      <text x={decX} y={48} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
        출력 확률
      </text>

      <Box cx={decX} cy={95} label="Linear + Softmax" fontSize={10} />
      <Box cx={decX} cy={150} label="Feed Forward" />
      <Box cx={encX} cy={205} label="Feed Forward" />
      <Box cx={decX} cy={205} label="Encoder-Decoder Attn" fontSize={9} />
      <Box cx={encX} cy={260} label="Self-Attention" />
      <Box cx={decX} cy={260} label="Masked Self-Attn" fontSize={10} />

      <text x={encX} y={298} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        ×N
      </text>
      <text x={decX} y={298} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        ×N
      </text>

      <text x={encX} y={330} textAnchor="middle" fill={TEXT_MUTED} fontSize={9} fontFamily={labelProps.fontFamily}>
        입력 임베딩+위치 인코딩
      </text>
      <text x={decX} y={330} textAnchor="middle" fill={TEXT_MUTED} fontSize={9} fontFamily={labelProps.fontFamily}>
        출력 임베딩+위치 인코딩
      </text>

      <text x={encX} y={368} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        입력 문장
      </text>
      <text x={decX} y={368} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        출력 문장(한 칸 밀림)
      </text>

      <VArrow x={encX} y1={361} y2={337} />
      <VArrow x={decX} y1={361} y2={337} />
      <VArrow x={encX} y1={323} y2={281} />
      <VArrow x={decX} y1={323} y2={281} />
      <VArrow x={encX} y1={239} y2={226} />
      <VArrow x={decX} y1={239} y2={226} />
      <VArrow x={decX} y1={184} y2={171} />
      <VArrow x={decX} y1={129} y2={116} />
      <VArrow x={decX} y1={74} y2={55} />

      <line
        x1={encX + boxW / 2}
        y1={205}
        x2={decX - boxW / 2}
        y2={205}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd="url(#tf-cross-arrow)"
      />
      <text x={160} y={196} textAnchor="middle" fill={TEXT_MUTED} fontSize={9} fontFamily={labelProps.fontFamily}>
        인코더 출력
      </text>
    </svg>
  )
}

function EncodeDecodeAnalogy() {
  const boxY = 72
  const boxH = 40
  const boxW = 80
  const boxes = [
    { cx: 50, category: '원본 메시지', label: 'HELLO' },
    { cx: 160, category: '인코딩된 표현', label: 'KHOOR' },
    { cx: 270, category: '복원된 메시지', label: 'HELLO' },
  ]

  return (
    <svg viewBox="0 0 320 190" className="h-full w-full">
      <defs>
        <marker id="ed-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      {boxes.map((b) => (
        <g key={b.cx}>
          <text x={b.cx} y={38} textAnchor="middle" fill={TEXT_MUTED} fontSize={9} fontFamily={labelProps.fontFamily}>
            {b.category}
          </text>
          <rect x={b.cx - boxW / 2} y={boxY - boxH / 2} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={b.cx} y={boxY + 5} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
            {b.label}
          </text>
        </g>
      ))}

      <line
        x1={boxes[0].cx + boxW / 2}
        y1={boxY}
        x2={boxes[1].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#ed-arrow)"
      />
      <line
        x1={boxes[1].cx + boxW / 2}
        y1={boxY}
        x2={boxes[2].cx - boxW / 2}
        y2={boxY}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#ed-arrow)"
      />

      <text x={105} y={107} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        인코딩(+3)
      </text>
      <text x={215} y={107} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        디코딩(-3)
      </text>

      <text x={160} y={150} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        오토인코더·트랜스포머도 이 구조를 씁니다
      </text>
    </svg>
  )
}

function OutputLayerCompare() {
  const cardW = 280
  const cardH = 95
  const cardX = 20

  function Card({
    y,
    title,
    lines,
  }: {
    y: number
    title: string
    lines: string[]
  }) {
    return (
      <g>
        <rect x={cardX} y={y} width={cardW} height={cardH} rx={8} fill="none" stroke={LINE} strokeWidth={2} />
        <text x={cardX + 14} y={y + 24} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
          {title}
        </text>
        {lines.map((line, i) => (
          <text
            key={i}
            x={cardX + 14}
            y={y + 46 + i * 20}
            fill={TEXT_MUTED}
            fontSize={11}
            fontFamily={labelProps.fontFamily}
          >
            {line}
          </text>
        ))}
      </g>
    )
  }

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <Card
        y={20}
        title="회귀 (Regression)"
        lines={['활성화: 없음(항등함수)', '출력: 실수 값 하나 (예: 가격, 온도)', '손실 함수: MSE']}
      />
      <Card
        y={130}
        title="분류 (Classification)"
        lines={['활성화: 시그모이드(이진) / 소프트맥스(다중)', '출력: 클래스별 확률(합 = 1)', '손실 함수: Cross-Entropy']}
      />
    </svg>
  )
}

function SoftmaxExample() {
  const logits = [
    { x: 80, z: 'z1=2.0', p: 0.659 },
    { x: 160, z: 'z2=1.0', p: 0.242 },
    { x: 240, z: 'z3=0.1', p: 0.099 },
  ]
  const baseline = 230
  const maxBarHeight = 110
  const barW = 50

  return (
    <svg viewBox="0 0 320 280" className="h-full w-full">
      <defs>
        <marker id="softmax-arrow" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,0 L5,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={160} y={18} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        소프트맥스: 로짓을 확률로
      </text>
      <SvgFormula
        x={160}
        y={50}
        anchor="middle"
        math={'\\text{softmax}(z_i) = \\dfrac{e^{z_i}}{\\sum_j e^{z_j}}'}
        width={260}
        height={34}
        fontSize={13}
      />

      {logits.map((l) => (
        <text key={l.x} x={l.x} y={92} textAnchor="middle" fill={TEXT} {...labelProps}>
          {l.z}
        </text>
      ))}

      <line x1={160} y1={100} x2={160} y2={130} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#softmax-arrow)" />
      <text x={176} y={120} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        softmax
      </text>

      {logits.map((l, i) => {
        const barH = l.p * maxBarHeight
        const top = baseline - barH
        return (
          <g key={l.x}>
            <rect
              x={l.x - barW / 2}
              y={top}
              width={barW}
              height={barH}
              fill={i === 0 ? ACCENT : 'none'}
              stroke={i === 0 ? 'none' : LINE}
              strokeWidth={i === 0 ? 0 : 2}
            />
            <text x={l.x} y={top - 8} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
              {l.p.toFixed(3)}
            </text>
            <text x={l.x} y={baseline + 18} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
              {['A', 'B', 'C'][i]}
            </text>
          </g>
        )
      })}

      <line x1={40} y1={baseline} x2={280} y2={baseline} stroke={GRID} strokeWidth={1} />

      <text x={160} y={266} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        합계 = 1.000
      </text>
    </svg>
  )
}

function OnehotVector() {
  const cols = [
    { x: 80, label: 'A' },
    { x: 160, label: 'B' },
    { x: 240, label: 'C' },
  ]
  const predicted = [0.659, 0.242, 0.099]
  const trueLabel = [1, 0, 0]
  const boxW = 70
  const boxH = 40

  return (
    <svg viewBox="0 0 320 260" className="h-full w-full">
      <text x={160} y={20} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        예측 확률 (softmax 출력)
      </text>
      {cols.map((c, i) => (
        <g key={`pred-${c.x}`}>
          <rect
            x={c.x - boxW / 2}
            y={35}
            width={boxW}
            height={boxH}
            rx={6}
            fill="none"
            stroke={i === 0 ? ACCENT : LINE}
            strokeWidth={2}
          />
          <text x={c.x} y={59} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
            {predicted[i].toFixed(3)}
          </text>
          <text x={c.x} y={95} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
            {c.label}
          </text>
        </g>
      ))}

      <text x={160} y={130} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
        정답 (원핫 벡터)
      </text>
      {cols.map((c, i) => (
        <g key={`true-${c.x}`}>
          <rect
            x={c.x - boxW / 2}
            y={145}
            width={boxW}
            height={boxH}
            rx={6}
            fill={trueLabel[i] === 1 ? ACCENT : 'none'}
            stroke={trueLabel[i] === 1 ? 'none' : LINE}
            strokeWidth={trueLabel[i] === 1 ? 0 : 2}
          />
          <text
            x={c.x}
            y={169}
            textAnchor="middle"
            fill={trueLabel[i] === 1 ? '#16211d' : TEXT}
            fontSize={15}
            fontFamily={labelProps.fontFamily}
          >
            {trueLabel[i]}
          </text>
          <text x={c.x} y={205} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
            {c.label}
          </text>
        </g>
      ))}

      <text x={160} y={235} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        Cross-Entropy = -log(0.659) ≈ 0.417
      </text>
      <text x={160} y={252} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        나머지 항은 정답이 0이라 모두 사라짐
      </text>
    </svg>
  )
}

function TokenizerExample() {
  const tokens = [
    { cx: 65, label: 'un', id: '403' },
    { cx: 160, label: 'believ', id: '12891' },
    { cx: 255, label: 'ably', id: '2295' },
  ]
  const boxW = 85
  const boxH = 40

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <marker id="tok-arrow" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,0 L5,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={160} y={20} textAnchor="middle" fill={TEXT} fontSize={15} fontFamily={labelProps.fontFamily}>
        "unbelievably"
      </text>

      <line x1={160} y1={32} x2={160} y2={65} stroke={LINE_DIM} strokeWidth={1.5} markerEnd="url(#tok-arrow)" />
      <text x={185} y={53} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        토크나이저 (BPE)
      </text>

      {tokens.map((t) => (
        <g key={t.cx}>
          <rect x={t.cx - boxW / 2} y={80} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={t.cx} y={104} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
            {t.label}
          </text>
          <text x={t.cx} y={140} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
            {t.id}
          </text>
        </g>
      ))}

      <text x={160} y={175} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        토큰 ID 배열: [403, 12891, 2295]
      </text>
      <text x={160} y={195} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        (실제 조각·번호는 토크나이저마다 다른 예시입니다)
      </text>
    </svg>
  )
}

function BertMlm() {
  const tokens = [
    { cx: 45, label: '나는' },
    { cx: 120, label: '[MASK]' },
    { cx: 195, label: '를' },
    { cx: 270, label: '좋아한다' },
  ]
  const boxW = 65
  const boxH = 40
  const boxY = 70

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <marker id="bert-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={160} y={20} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        BERT: 마스크된 토큰 예측 (MLM)
      </text>

      {tokens.map((t, i) => (
        <g key={t.cx}>
          <rect
            x={t.cx - boxW / 2}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={6}
            fill="none"
            stroke={i === 1 ? ACCENT : LINE}
            strokeWidth={i === 1 ? 2.5 : 2}
          />
          <text x={t.cx} y={boxY + 24} textAnchor="middle" fill={TEXT} fontSize={11} fontFamily={labelProps.fontFamily}>
            {t.label}
          </text>
        </g>
      ))}

      <path
        d={`M${tokens[0].cx},${boxY + boxH + 5} Q${(tokens[0].cx + tokens[1].cx) / 2},${boxY + boxH + 38} ${tokens[1].cx},${boxY + boxH + 5}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bert-arrow)"
      />
      <path
        d={`M${tokens[3].cx},${boxY + boxH + 5} Q${(tokens[3].cx + tokens[1].cx) / 2},${boxY + boxH + 38} ${tokens[1].cx},${boxY + boxH + 5}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#bert-arrow)"
      />

      <text x={160} y={165} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        양방향 문맥(왼쪽+오른쪽)으로 [MASK] 예측
      </text>
      <text x={160} y={190} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        예측: 고양이
      </text>
      <text x={160} y={208} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        (GPT는 왼쪽 문맥만 보고 다음 토큰을 예측)
      </text>
    </svg>
  )
}

function Gpt1Clm() {
  const known = [
    { cx: 55, label: '나는' },
    { cx: 150, label: '고양이를' },
  ]
  const predicted = { cx: 255, label: '좋아한다' }
  const boxW = 80
  const boxH = 40
  const boxY = 70

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <marker id="gpt1-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={160} y={20} textAnchor="middle" fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        GPT-1: 다음 토큰 예측으로 사전학습 (CLM)
      </text>

      {known.map((t) => (
        <g key={t.cx}>
          <rect x={t.cx - boxW / 2} y={boxY} width={boxW} height={boxH} rx={6} fill="none" stroke={LINE} strokeWidth={2} />
          <text x={t.cx} y={boxY + 24} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
            {t.label}
          </text>
        </g>
      ))}
      <rect
        x={predicted.cx - boxW / 2}
        y={boxY}
        width={boxW}
        height={boxH}
        rx={6}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeDasharray="5 3"
      />
      <text x={predicted.cx} y={boxY + 24} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        {predicted.label}
      </text>

      <path
        d={`M${known[0].cx},${boxY + boxH + 5} Q${(known[0].cx + predicted.cx) / 2},${boxY + boxH + 38} ${predicted.cx},${boxY + boxH + 5}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#gpt1-arrow)"
      />
      <path
        d={`M${known[1].cx},${boxY + boxH + 5} Q${(known[1].cx + predicted.cx) / 2},${boxY + boxH + 22} ${predicted.cx},${boxY + boxH + 5}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#gpt1-arrow)"
      />

      <text x={160} y={165} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        왼쪽 문맥만 보고 다음 토큰 예측 (인과적/Causal)
      </text>
      <text x={160} y={190} textAnchor="middle" fill={TEXT} fontSize={12} fontFamily={labelProps.fontFamily}>
        예측: 좋아한다
      </text>
      <text x={160} y={208} textAnchor="middle" fill={TEXT_MUTED} fontSize={10} fontFamily={labelProps.fontFamily}>
        (BERT는 양방향 문맥을 모두 사용)
      </text>
    </svg>
  )
}

function GptScaleCompare() {
  const cardW = 280
  const cardH = 75
  const cardX = 20

  function Card({
    y,
    title,
    lines,
    accent = false,
  }: {
    y: number
    title: string
    lines: string[]
    accent?: boolean
  }) {
    return (
      <g>
        <rect
          x={cardX}
          y={y}
          width={cardW}
          height={cardH}
          rx={8}
          fill="none"
          stroke={accent ? ACCENT : LINE}
          strokeWidth={accent ? 2.5 : 2}
        />
        <text x={cardX + 14} y={y + 22} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
          {title}
        </text>
        {lines.map((line, i) => (
          <text
            key={i}
            x={cardX + 14}
            y={y + 42 + i * 20}
            fill={TEXT_MUTED}
            fontSize={11}
            fontFamily={labelProps.fontFamily}
          >
            {line}
          </text>
        ))}
      </g>
    )
  }

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <Card y={15} title="GPT-1 (2018)" lines={['파라미터: 약 1.17억 개', '미세조정 필요 (작업마다 추가 학습)']} />
      <Card y={100} title="GPT-2 (2019)" lines={['파라미터: 약 15억 개', '제로샷 — 미세조정 없이 다양한 작업']} />
      <Card
        y={185}
        title="GPT-3 (2020)"
        lines={['파라미터: 약 1,750억 개', '퓨샷 인컨텍스트 러닝 (예시만으로 수행)']}
        accent
      />
      <text x={160} y={285} textAnchor="middle" fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        모델이 커질수록 학습 없이 할 수 있는 일이 늘어남
      </text>
    </svg>
  )
}

const diagramMap: Record<DiagramId, () => React.JSX.Element> = {
  timeline: Timeline,
  perceptron: Perceptron,
  winter: Winter,
  'expert-system': ExpertSystem,
  'svm-margin': SvmMargin,
  'compute-data': ComputeData,
  'deep-net': DeepNet,
  attention: Attention,
  'scaling-curve': ScalingCurve,
  'agent-loop': AgentLoop,
  roadmap: Roadmap,
  'binary-data': BinaryData,
  'algorithm-flow': AlgorithmFlow,
  'pixel-grid': PixelGrid,
  'image-filter': ImageFilter,
  'data-structures': DataStructures,
  convolution: Convolution,
  'gradient-descent': GradientDescent,
  'overfit-curve': OverfitCurve,
  'activation-functions': ActivationFunctions,
  'minima-landscape': MinimaLandscape,
  'frequency-filters': FrequencyFilters,
  'rnn-sequence': RnnSequence,
  'cnn-layers': CnnLayers,
  'lstm-cell': LstmCell,
  'xor-problem': XorProblem,
  'xor-network': XorNetwork,
  'backprop-graph': BackpropGraph,
  'backprop-numeric': BackpropNumeric,
  'transformer-architecture': TransformerArchitecture,
  'encode-decode-analogy': EncodeDecodeAnalogy,
  'output-layer-compare': OutputLayerCompare,
  'softmax-example': SoftmaxExample,
  'onehot-vector': OnehotVector,
  'tokenizer-example': TokenizerExample,
  'bert-mlm': BertMlm,
  'gpt1-clm': Gpt1Clm,
  'gpt-scale-compare': GptScaleCompare,
}

export function SlideDiagram({ id }: { id: DiagramId }) {
  const Diagram = diagramMap[id]
  return <Diagram />
}
