/* ============================================================
 * Singular Web-app UI kit — app (app.jsx)
 * Assembles the chrome + pages into an interactive "Singular
 * Stories" dashboard. Fake data; cosmetic interactions only.
 * ============================================================ */

const STORIES = [
  { story: 'Auth refactor', who: 'Camila', ini: 'CA', c: '#2E82D6', status: 'info', label: 'in-progress', kr: 'Reduce login friction', sp: 8 },
  { story: 'Billing webhook', who: 'Alonso', ini: 'AL', c: '#9333B1', status: 'success', label: 'completed', kr: 'Automate invoicing', sp: 5 },
  { story: 'QA queue triage', who: 'César', ini: 'CE', c: '#F78104', status: 'error', label: 'blocked', kr: 'Cut QA backlog', sp: 3 },
  { story: 'Onboarding wizard', who: 'Luis', ini: 'LU', c: '#57B886', status: 'info', label: 'testing', kr: 'Activate new clients', sp: 13 },
  { story: 'Agent memory store', who: 'Mara', ini: 'MA', c: '#D6457E', status: 'info', label: 'in-progress', kr: 'Persist context', sp: 8 },
  { story: 'Slack connector v2', who: 'Tomás', ini: 'TO', c: '#0E9F8E', status: 'success', label: 'completed', kr: 'Expand integrations', sp: 5 },
];
const FILTERS = ['All', 'Active', 'In review', 'Blocked', 'Done'];
const matchFilter = (s, f) => f === 'All' ||
  (f === 'Active' && s.label === 'in-progress') || (f === 'Blocked' && s.label === 'blocked') ||
  (f === 'In review' && s.label === 'testing') || (f === 'Done' && s.label === 'completed');

function PageHead({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
      marginBottom: 'var(--gap-l)' }}>
      <div>
        <h1 className="page-title" style={{ margin: 0, color: 'var(--foreground-strong)' }}>{title}</h1>
        <p className="page-subtitle" style={{ margin: '.35rem 0 0' }}>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StoriesTable({ rows, onPick }) {
  const th = { textAlign: 'left', padding: '.65rem .9rem', color: 'var(--muted-foreground)', fontWeight: 500,
    textTransform: 'uppercase', fontSize: '.68rem', letterSpacing: '.04em', borderBottom: '1px solid var(--border)' };
  const td = { padding: '.7rem .9rem', borderBottom: '1px solid var(--border)' };
  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.88rem' }}>
        <thead><tr>
          <th style={th}>Story</th><th style={th}>Owner</th><th style={th}>Status</th>
          <th style={th}>KR</th><th style={{ ...th, textAlign: 'right' }}>SP</th>
        </tr></thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={i} onClick={() => onPick(s)} className="row" style={{ cursor: 'pointer' }}>
              <td style={{ ...td, fontWeight: 500 }}>{s.story}</td>
              <td style={td}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem' }}>
                <Avatar initials={s.ini} color={s.c} size={26} /> {s.who}</span></td>
              <td style={td}><StatusBadge status={s.status}>{s.label}</StatusBadge></td>
              <td style={{ ...td, color: 'var(--muted-foreground)' }}>{s.kr}</td>
              <td style={{ ...td, fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{s.sp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function SprintBoard() {
  const cols = [
    { t: 'To do', items: ['Agent memory store', 'Rate limiter', 'Audit log export'] },
    { t: 'In progress', items: ['Auth refactor', 'Onboarding wizard'] },
    { t: 'In review', items: ['Slack connector v2'] },
    { t: 'Done', items: ['Billing webhook', 'SSO setup', 'Webhooks retry'] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap-m)' }}>
      {cols.map((c) => (
        <div key={c.t} className="stack-s">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--muted-foreground)', padding: '0 .2rem' }}>
            <span>{c.t}</span><span>{c.items.length}</span>
          </div>
          {c.items.map((it) => (
            <Card key={it} interactive style={{ padding: '.85rem .9rem', fontSize: '.85rem' }}>
              {it}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.6rem', alignItems: 'center' }}>
                <Avatar initials="SS" color="color-mix(in srgb, var(--primary) 40%, transparent)" size={22} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--muted-foreground)' }}>
                  {Math.ceil(Math.random() * 8 + 2)} SP</span>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function OkrPage() {
  const okrs = [
    { o: 'Activate new clients faster', p: 72, krs: ['Onboarding < 1 day', 'Time-to-value −40%'] },
    { o: 'Cut operational toil', p: 58, krs: ['−62% manual tasks', 'Automate 3 workflows'] },
    { o: 'Scale agent reliability', p: 41, krs: ['99.5% uptime', '< 2% error rate'] },
  ];
  return (
    <div className="stack-m">
      {okrs.map((k) => (
        <Card key={k.o} style={{ padding: '1.2rem 1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--foreground-strong)' }}>{k.o}</h3>
            <span className="kpi-value" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>{k.p}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: 'var(--muted)', overflow: 'hidden', margin: '.8rem 0' }}>
            <div style={{ width: `${k.p}%`, height: '100%', backgroundImage: 'var(--gradient-primary)' }} />
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {k.krs.map((x) => <span key={x} style={{ fontSize: '.78rem', color: 'var(--muted-foreground)',
              border: '1px solid var(--border)', borderRadius: 99, padding: '.2rem .6rem' }}>{x}</span>)}
          </div>
        </Card>
      ))}
    </div>
  );
}

function App() {
  const [theme, setTheme] = React.useState('dark');
  const [page, setPage] = React.useState('work');
  const [tab, setTab] = React.useState('Stories');
  const [filter, setFilter] = React.useState('All');
  const [picked, setPicked] = React.useState(null);
  const [cmd, setCmd] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  React.useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmd(true); }
      if (e.key === 'Escape') { setCmd(false); setPicked(null); } };
    addEventListener('keydown', h); return () => removeEventListener('keydown', h);
  }, []);

  const railItems = [
    { key: 'overview', icon: 'overview', label: 'Overview' },
    { key: 'work', icon: 'work', label: 'Work' },
    { key: 'qa', icon: 'qa', label: 'QA' },
    { key: 'okr', icon: 'okr', label: 'OKRs' },
  ];
  const rows = STORIES.filter((s) => matchFilter(s, filter));

  return (
    <div className="app brand-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="brand-bg__stars" aria-hidden="true" />
      <RailDock items={railItems} active={page} onNavigate={setPage} onToggleSidebar={() => {}} />
      <HeaderWell tabs={page === 'work' ? ['Stories', 'Sprints', 'Backlog'] : null} activeTab={tab} onTab={setTab}
        onSearch={() => setCmd(true)} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <PoweredBy />

      <main style={{ padding: '116px 2.5rem 4rem 7.25rem', position: 'relative', minWidth: 0 }}>
        {page === 'overview' && (
          <>
            <PageHead title="Overview" subtitle="El pulso del producto en una vista. Velocidad, calidad y foco del equipo."
              action={<Button icon="plus">New Story</Button>} />
            <div className="stack-l">
              <KpiRow items={[
                { value: '16', label: 'Stories en desarrollo activo', trend: '12%' },
                { value: '111', label: 'Story points en el sprint' },
                { value: '8', label: 'Contributors asignados' },
                { value: '94%', label: 'QA pass rate', trend: '4%' },
              ]} />
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--gap-m)' }}>
                <Card style={{ padding: '1.3rem 1.5rem' }}>
                  <div className="section-title" style={{ color: 'var(--foreground-strong)', marginBottom: '1rem' }}>Velocity</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.7rem', height: 150 }}>
                    {[45, 62, 55, 78, 90, 100].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '6px 6px 0 0',
                        backgroundImage: 'var(--gradient-primary)', opacity: .55 + i * 0.075 }} />
                    ))}
                  </div>
                </Card>
                <OkrMini />
              </div>
            </div>
          </>
        )}

        {page === 'work' && (
          <>
            <PageHead title={tab === 'Stories' ? 'Active Stories' : tab}
              subtitle={tab === 'Stories' ? 'Stories en curso. Tomá trabajo, empujá progreso, pasá a QA.'
                : tab === 'Sprints' ? 'Sprint actual — arrastrá entre columnas (cosmético).' : 'El backlog priorizado del equipo.'}
              action={<Button icon="plus">New Story</Button>} />
            {tab === 'Stories' && (
              <div className="stack-l">
                <KpiRow items={[
                  { value: '16', label: 'Stories en desarrollo activo', trend: '12%' },
                  { value: '111', label: 'Story points en esta vista' },
                  { value: '8', label: 'Contributors asignados' },
                ]} />
                <div className="stack-l">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
                    <PillFilters options={FILTERS} value={filter} onChange={setFilter} />
                    <span style={{ position: 'relative', marginLeft: 'auto' }}>
                      <Icon name="search" size={16} style={{ position: 'absolute', left: 10, top: '50%',
                        transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                      <input placeholder="Buscar stories…" style={{ background: 'var(--muted)',
                        border: '1px solid var(--input)', color: 'var(--foreground)', borderRadius: 'var(--radius-md)',
                        padding: '.45rem .75rem .45rem 2rem', font: 'inherit', minWidth: 220 }} />
                    </span>
                  </div>
                  <StoriesTable rows={rows} onPick={setPicked} />
                </div>
              </div>
            )}
            {tab === 'Sprints' && <SprintBoard />}
            {tab === 'Backlog' && <StoriesTable rows={STORIES} onPick={setPicked} />}
          </>
        )}

        {page === 'qa' && (
          <>
            <PageHead title="QA Queue" subtitle="Cola de revisión. Bugs, severidad y tiempo en cola."
              action={<Button variant="outline" icon="filter">Filtros</Button>} />
            <div className="stack-l">
              <KpiRow items={[
                { value: '23', label: 'En cola de QA' },
                { value: '4', label: 'Bloqueados', },
                { value: '1.8d', label: 'Tiempo medio en cola' },
              ]} />
              <StoriesTable rows={STORIES.slice(0, 4)} onPick={setPicked} />
            </div>
          </>
        )}

        {page === 'okr' && (
          <>
            <PageHead title="OKRs" subtitle="Objetivos del trimestre y su progreso real."
              action={<Button icon="plus">New OKR</Button>} />
            <OkrPage />
          </>
        )}
      </main>

      <SideModal open={!!picked} onClose={() => setPicked(null)} title={picked?.story}>
        {picked && (
          <div className="stack-m">
            <div style={{ display: 'flex', gap: '.5rem' }}><StatusBadge status={picked.status}>{picked.label}</StatusBadge>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.8rem', color: 'var(--muted-foreground)',
                alignSelf: 'center' }}>{picked.sp} SP</span></div>
            <Field label="Owner"><span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
              <Avatar initials={picked.ini} color={picked.c} size={26} /> {picked.who}</span></Field>
            <Field label="Key result">{picked.kr}</Field>
            <Field label="Descripción"><span style={{ color: 'var(--muted-foreground)', lineHeight: 1.6,
              fontFamily: 'var(--font-body)' }}>Trabajo en curso para el agente. Conecta con los sistemas del cliente
              y respeta permisos por rol. Sin reemplazar el stack existente.</span></Field>
            <div style={{ display: 'flex', gap: '.6rem', marginTop: '.4rem' }}>
              <Button icon="check">Mover a QA</Button>
              <Button variant="outline">Reasignar</Button>
            </div>
          </div>
        )}
      </SideModal>

      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="stack-xs">
      <span className="eyebrow">{label}</span>
      <div style={{ fontSize: '.9rem', color: 'var(--foreground)' }}>{children}</div>
    </div>
  );
}

function OkrMini() {
  const items = [['Activate clients', 72], ['Cut toil', 58], ['Reliability', 41]];
  return (
    <Card style={{ padding: '1.3rem 1.5rem' }}>
      <div className="section-title" style={{ color: 'var(--foreground-strong)', marginBottom: '1rem' }}>OKR progress</div>
      <div className="stack-m">
        {items.map(([t, p]) => (
          <div key={t}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem', marginBottom: '.35rem' }}>
              <span>{t}</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}>{p}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 99, background: 'var(--muted)', overflow: 'hidden' }}>
              <div style={{ width: `${p}%`, height: '100%', backgroundImage: 'var(--gradient-primary)' }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
