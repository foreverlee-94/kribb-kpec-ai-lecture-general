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
        layer.flatMap((y1, i) =>
          layers[li + 1].map((y2, j) => (
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
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      {xs.map((x, i) => (
        <g key={tokens[i]}>
          <rect x={x - 25} y={150} width={50} height={36} rx={4} fill="none" stroke={LINE} strokeWidth={1.5} />
          <text x={x} y={173} textAnchor="middle" fill={TEXT} {...labelProps}>
            {tokens[i]}
          </text>
        </g>
      ))}
      <path d={`M${xs[3]},150 Q${(xs[3] + xs[1]) / 2},60 ${xs[1]},150`} fill="none" stroke={ACCENT} strokeWidth={2} />
      <path d={`M${xs[3]},150 Q${(xs[3] + xs[0]) / 2},90 ${xs[0]},150`} fill="none" stroke={LINE} strokeWidth={1.5} />
      <text x={160} y={35} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        self-attention
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
  const cell = 24
  const colAx = 20
  const colBx = 190
  const inputY = 30
  const kernelY = 118
  const outputY = 206

  const edgeWindow = [40, 40, 220, 40, 40, 220, 40, 40, 220]
  const flatWindow = [40, 40, 40, 40, 40, 40, 40, 40, 40]
  const kernelValues = [0, -1, 0, -1, 4, -1, 0, -1, 0]

  function textColorFor(v: number) {
    return v < 140 ? TEXT : '#16211d'
  }

  const rawEdge = edgeWindow.reduce((acc, v, i) => acc + v * kernelValues[i], 0)
  const rawFlat = flatWindow.reduce((acc, v, i) => acc + v * kernelValues[i], 0)
  const outEdge = Math.min(Math.abs(rawEdge), 255)
  const outFlat = Math.min(Math.abs(rawFlat), 255)

  function InputGrid({ x, window }: { x: number; window: number[] }) {
    return (
      <>
        {window.map((v, i) => {
          const r = Math.floor(i / 3)
          const c = i % 3
          return (
            <g key={i}>
              <rect
                x={x + c * cell}
                y={inputY + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill={`rgb(${v},${v},${v})`}
              />
              <text
                x={x + c * cell + (cell - 2) / 2}
                y={inputY + r * cell + (cell - 2) / 2 + 4}
                textAnchor="middle"
                fill={textColorFor(v)}
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

  function KernelGrid({ x }: { x: number }) {
    return (
      <>
        {kernelValues.map((v, i) => {
          const r = Math.floor(i / 3)
          const c = i % 3
          return (
            <g key={i}>
              <rect
                x={x + c * cell}
                y={kernelY + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
              />
              <text
                x={x + c * cell + (cell - 2) / 2}
                y={kernelY + r * cell + (cell - 2) / 2 + 4}
                textAnchor="middle"
                fill={TEXT}
                fontSize={11}
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

  const colACenter = colAx + (3 * cell - 2) / 2
  const colBCenter = colBx + (3 * cell - 2) / 2

  return (
    <svg viewBox="0 0 320 300" className="h-full w-full">
      <defs>
        <marker id="freq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      <text x={colAx} y={20} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        경계
      </text>
      <text x={colBx} y={20} fill={TEXT} fontSize={13} fontFamily={labelProps.fontFamily}>
        평평한 부분
      </text>
      <InputGrid x={colAx} window={edgeWindow} />
      <InputGrid x={colBx} window={flatWindow} />

      <line
        x1={colACenter}
        y1={inputY + 3 * cell + 4}
        x2={colACenter}
        y2={kernelY - 14}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />
      <line
        x1={colBCenter}
        y1={inputY + 3 * cell + 4}
        x2={colBCenter}
        y2={kernelY - 14}
        stroke={LINE_DIM}
        strokeWidth={1.5}
        markerEnd="url(#freq-arrow)"
      />

      <text x={colAx} y={kernelY - 4} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        고주파 통과 커널
      </text>
      <text x={colBx} y={kernelY - 4} fill={TEXT_MUTED} fontSize={11} fontFamily={labelProps.fontFamily}>
        고주파 통과 커널
      </text>
      <KernelGrid x={colAx} />
      <KernelGrid x={colBx} />

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

      <rect
        x={colACenter - 25}
        y={outputY}
        width={50}
        height={34}
        fill={`rgb(${outEdge},${outEdge},${outEdge})`}
        stroke={ACCENT}
        strokeWidth={2.5}
      />
      <text
        x={colACenter}
        y={outputY + 22}
        textAnchor="middle"
        fill={textColorFor(outEdge)}
        fontSize={14}
        fontFamily={labelProps.fontFamily}
      >
        {outEdge}
      </text>
      <rect
        x={colBCenter - 25}
        y={outputY}
        width={50}
        height={34}
        fill={`rgb(${outFlat},${outFlat},${outFlat})`}
        stroke={ACCENT}
        strokeWidth={2.5}
      />
      <text
        x={colBCenter}
        y={outputY + 22}
        textAnchor="middle"
        fill={textColorFor(outFlat)}
        fontSize={14}
        fontFamily={labelProps.fontFamily}
      >
        {outFlat}
      </text>

      <text x={160} y={268} textAnchor="middle" fill={TEXT_MUTED} fontSize={13} fontFamily={labelProps.fontFamily}>
        경계는 통과시키고, 평평한 곳은 차단합니다
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
}

export function SlideDiagram({ id }: { id: DiagramId }) {
  const Diagram = diagramMap[id]
  return <Diagram />
}
