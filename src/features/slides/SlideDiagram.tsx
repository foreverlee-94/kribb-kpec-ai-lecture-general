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
      {points.map(([x, label]) => (
        <g key={label}>
          <line x1={x} y1={73} x2={x} y2={77} stroke={LINE_DIM} strokeWidth={1} />
          <text x={x} y={92} textAnchor="middle" fill={TEXT_MUTED} fontSize={12} fontFamily={labelProps.fontFamily}>
            {label}
          </text>
        </g>
      ))}
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
    [270, 55, 'GPT-4~', 290, 44, 'start'],
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
}

export function SlideDiagram({ id }: { id: DiagramId }) {
  const Diagram = diagramMap[id]
  return <Diagram />
}
