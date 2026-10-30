import { useEffect, useState } from 'react'

const measure = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: window.devicePixelRatio,
})

function ViewportPage() {
  const [size, setSize] = useState(measure)

  useEffect(() => {
    const update = () => setSize(measure())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', gap: 8 }}>
      <div style={{ fontSize: 48, fontWeight: 700 }}>{size.width} × {size.height}</div>
      <div style={{ fontSize: 18, color: '#666' }}>CSS 뷰포트 (px) · DPR {size.dpr}</div>
      <div style={{ fontSize: 14, color: '#999' }}>물리 해상도 {Math.round(size.width * size.dpr)} × {Math.round(size.height * size.dpr)}</div>
    </div>
  )
}

export default ViewportPage
