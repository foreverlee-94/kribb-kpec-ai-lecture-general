import katex from 'katex'

function renderMath(math: string, displayMode: boolean) {
  try {
    return katex.renderToString(math, { throwOnError: false, displayMode })
  } catch {
    return math
  }
}

export function InlineMath({ math }: { math: string }) {
  return <span dangerouslySetInnerHTML={{ __html: renderMath(math, false) }} />
}

export function BlockMath({ math }: { math: string }) {
  return <span dangerouslySetInnerHTML={{ __html: renderMath(math, true) }} />
}

const MATH_SEGMENT = /\$([^$]+)\$/g

export function MixedText({ text }: { text: string }) {
  const parts = text.split(MATH_SEGMENT)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <InlineMath key={i} math={part} /> : <span key={i}>{part}</span>,
      )}
    </>
  )
}
