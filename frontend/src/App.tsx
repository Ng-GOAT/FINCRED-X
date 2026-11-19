import { useEffect, useState } from 'react'

type ApiStatus = 'checking' | 'connected' | 'offline'

const upcomingModules = [
  {
    number: '02',
    title: 'Data intelligence',
    description: 'Documented dataset, reproducible exploration and quality checks.',
  },
  {
    number: '04',
    title: 'Credit risk engine',
    description: 'Evaluated models with meaningful risk estimates and transparent metrics.',
  },
  {
    number: '06',
    title: 'Scenario lab',
    description: 'Controlled financial what-if analysis with clear limitations.',
  },
]

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function checkApi() {
      try {
        const response = await fetch('/api/health', { signal: controller.signal })
        if (!response.ok) throw new Error('API unavailable')

        const result: { status: string } = await response.json()
        setApiStatus(result.status === 'ok' ? 'connected' : 'offline')
      } catch {
        if (!controller.signal.aborted) setApiStatus('offline')
      }
    }

    void checkApi()
    return () => controller.abort()
  }, [])

  const statusLabel = {
    checking: 'Connecting to API',
    connected: 'API connected',
    offline: 'API offline',
  }[apiStatus]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F<span>X</span></div>
          <div className="brand-text"><strong>FINCRED X</strong><small>FINANCIAL INTELLIGENCE</small></div>
        </div>
        <nav className="navigation" aria-label="Main navigation">
          <span className="nav-label">WORKSPACE</span>
          <a className="nav-link active" href="#overview"><span className="nav-symbol">◈</span> Overview</a>
          <span className="nav-link locked"><span className="nav-symbol">◉</span> Risk analysis <em>soon</em></span>
          <span className="nav-link locked"><span className="nav-symbol">◇</span> Scenario lab <em>soon</em></span>
          <span className="nav-link locked"><span className="nav-symbol">▥</span> Model insights <em>soon</em></span>
        </nav>
        <div className="sidebar-foot">STAGE 01 <span>PROJECT FOUNDATION</span></div>
      </aside>

      <main className="main" id="overview">
        <header className="topbar">
          <span className="breadcrumb">Workspace <span>/</span> Overview</span>
          <span className={`system-status ${apiStatus}`} role="status">
            <span className="status-dot" />{statusLabel}
          </span>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">FINCRED X / ENGINEERING PREVIEW</span>
            <h1>Financial intelligence,<br /><em>built on evidence.</em></h1>
            <p>We are laying the foundation for an explainable credit-risk platform. Predictions, model explanations and financial scenarios will be added in verified stages.</p>
            <div className="hero-actions">
              <a className="primary-link" href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">Explore API documentation <span>↗</span></a>
              <span className="hero-meta">Version 0.1.0 · Development</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="visual-core">FX</div>
            <div className="orbital-tag tag-one">MODELS</div>
            <div className="orbital-tag tag-two">INSIGHTS</div>
          </div>
        </section>

        <section className="section-heading">
          <div><span className="eyebrow">PLATFORM ROADMAP</span><h2>Engineered to grow</h2></div>
          <span className="section-note">Features are planned, not yet trained or deployed</span>
        </section>

        <section className="module-grid">
          {upcomingModules.map((item) => (
            <article className="module-card" key={item.number}>
              <div className="card-top"><span className="module-number">{item.number}</span><span className="planned-label">PLANNED</span></div>
              <h3>{item.title}</h3><p>{item.description}</p>
              <div className="card-bottom">UPCOMING MODULE <span>↗</span></div>
            </article>
          ))}
        </section>
        <footer className="page-footer">FINCRED X · EDUCATIONAL RISK ANALYTICS · NOT A LENDING DECISION SYSTEM</footer>
      </main>
    </div>
  )
}

export default App
