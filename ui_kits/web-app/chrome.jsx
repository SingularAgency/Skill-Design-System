/* ============================================================
 * Singular Web-app UI kit — chrome (chrome.jsx)
 * Floating rail + frosted header well + big-pill tabs + footer.
 * The product's signature navigation shell.
 * ============================================================ */

const chromeGlass = {
  background: 'color-mix(in srgb, var(--header-well-bg) 60%, transparent)',
  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 10px 24px rgb(0 0 0/.22)',
};

// ── Floating rail: logo chip toggle + icon nav ──
function RailDock({ items, active, onNavigate, onToggleSidebar }) {
  return (
    <div style={{ position: 'fixed', left: '2rem', top: '2rem', zIndex: 40,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
      <button onClick={onToggleSidebar} title="Singular" aria-label="Home" style={{
        width: 58, height: 58, borderRadius: 18, border: 0, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', ...chromeGlass }}>
        <span style={{ width: 28, height: 28, borderRadius: 9, backgroundImage: 'var(--gradient-primary)' }} />
      </button>
      <nav aria-label="Producto" style={{ display: 'flex', flexDirection: 'column', width: 68,
        padding: '.85rem .4rem', gap: '.15rem', borderRadius: 18, ...chromeGlass }}>
        {items.map((it) => {
          const on = it.key === active;
          return (
            <a key={it.key} href="#" onClick={(e) => { e.preventDefault(); onNavigate(it.key); }}
              aria-current={on ? 'page' : undefined} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.18rem',
              padding: '.6rem .25rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', cursor: 'pointer',
              background: on ? 'var(--sidebar-nav-active)' : 'transparent',
              color: on ? 'var(--sidebar-primary)' : 'color-mix(in srgb, var(--sidebar-foreground) 60%, transparent)',
              transition: 'background-color .2s, color .2s' }}>
              <Icon name={it.icon} size={20} />
              <span style={{ fontSize: '.625rem', fontWeight: 500, lineHeight: 1.1 }}>{it.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// ── Header well: search pill + big-pill tabs + action cluster ──
function HeaderWell({ tabs, activeTab, onTab, onSearch, theme, onTheme }) {
  return (
    <header style={{ position: 'fixed', left: '9rem', right: '2rem', top: '2rem', zIndex: 30,
      display: 'flex', alignItems: 'center', gap: '.75rem', height: 60, padding: '0 1.1rem 0 1.4rem',
      borderRadius: 18, ...chromeGlass, boxShadow: '0 10px 24px rgb(0 0 0/.18)' }}>
      <SearchPill onClick={onSearch} />
      <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
        {tabs && <BigPillTabs tabs={tabs} active={activeTab} onChange={onTab} />}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
        <IconBtn label="Tema" onClick={onTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></IconBtn>
        <IconBtn label="Notificaciones" badge="6"><Icon name="bell" /></IconBtn>
        <Avatar initials="SS" color="color-mix(in srgb, var(--primary) 26%, transparent)" size={36} />
      </div>
    </header>
  );
}

function SearchPill({ onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      aria-label="Buscar" style={{
      display: 'inline-flex', alignItems: 'center', height: 40, width: hover ? '14rem' : 40,
      padding: '0 .65rem', overflow: 'hidden', borderRadius: '9999px', cursor: 'pointer', whiteSpace: 'nowrap',
      border: '1px solid var(--header-search-border)', background: 'var(--header-search-bg)',
      color: 'var(--muted-foreground)', transition: 'width .2s ease-out' }}>
      <Icon name="search" size={16} style={{ flex: 'none' }} />
      <span style={{ fontSize: '.875rem', opacity: hover ? 1 : 0, marginLeft: hover ? '.5rem' : 0,
        transition: 'opacity .15s, margin .15s' }}>Jump to…&nbsp;&nbsp;<kbd style={{ fontSize: '.7rem',
        opacity: .7, fontFamily: 'var(--font-mono)' }}>⌘K</kbd></span>
    </button>
  );
}

function BigPillTabs({ tabs, active, onChange }) {
  return (
    <nav aria-label="Vistas" style={{ display: 'inline-flex', gap: '.25rem', padding: '.25rem',
      borderRadius: '9999px', background: 'color-mix(in srgb, var(--muted) 85%, transparent)',
      border: '1px solid color-mix(in srgb, var(--border) 40%, transparent)',
      backdropFilter: 'blur(20px)', boxShadow: '0 6px 16px rgb(0 0 0/.14)' }}>
      {tabs.map((t) => {
        const on = t === active;
        return (
          <a key={t} href="#" onClick={(e) => { e.preventDefault(); onChange(t); }} aria-current={on ? 'page' : undefined}
            style={{ display: 'inline-flex', alignItems: 'center', minHeight: 36, padding: '0 1rem',
            borderRadius: '9999px', fontSize: '.875rem', fontWeight: on ? 600 : 500, lineHeight: 1,
            whiteSpace: 'nowrap', textDecoration: 'none', cursor: 'pointer', transition: 'all .2s',
            background: on ? 'var(--sidebar-nav-active)' : 'transparent',
            color: on ? 'var(--sidebar-primary)' : 'var(--muted-foreground)' }}>{t}</a>
        );
      })}
    </nav>
  );
}

function IconBtn({ children, label, badge, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} aria-label={label} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 40, height: 40, border: 0, borderRadius: '9999px', cursor: 'pointer',
      color: 'var(--sidebar-foreground)', background: h ? 'var(--sidebar-nav-hover)' : 'transparent',
      transition: 'background-color .2s' }}>
      {children}
      {badge && <span style={{ position: 'absolute', top: -2, right: -2, minWidth: 18, height: 18, padding: '0 4px',
        borderRadius: '9999px', background: '#ef4444', color: '#fff', fontSize: '.625rem', fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{badge}</span>}
    </button>
  );
}

// ── Powered by Singular footer ──
function PoweredBy() {
  return (
    <div style={{ position: 'fixed', bottom: '2.5rem', left: '2rem', zIndex: 30,
      display: 'flex', flexDirection: 'column', gap: '.3rem', pointerEvents: 'none' }}>
      <span style={{ fontSize: '.625rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em',
        color: 'color-mix(in srgb, var(--muted-foreground) 55%, transparent)' }}>Powered by</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontWeight: 700,
        color: 'var(--foreground-strong)' }}>
        <span style={{ width: 18, height: 18, borderRadius: 5, backgroundImage: 'var(--gradient-primary)' }} /> Singular
      </span>
    </div>
  );
}

// ── Command palette (⌘K) overlay ──
function CommandPalette({ open, onClose }) {
  if (!open) return null;
  const cmds = ['Nueva Story', 'Ir a Sprints', 'Ver OKRs', 'Cola de QA', 'Buscar contributor…', 'Configuración'];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 70,
      background: 'color-mix(in srgb, #000 50%, transparent)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '14vh' }}>
      <div onClick={(e) => e.stopPropagation()} className="glass" style={{ width: 'min(540px, 92vw)',
        borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', animation: 'sm-in .18s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.9rem 1.1rem',
          borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
          <Icon name="search" size={18} />
          <input autoFocus placeholder="Buscar comandos, stories, personas…" style={{ flex: 1, border: 0,
            background: 'transparent', color: 'var(--foreground)', font: 'inherit', fontSize: '.95rem', outline: 'none' }} />
          <kbd style={{ fontSize: '.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-foreground)' }}>esc</kbd>
        </div>
        <div style={{ padding: '.4rem' }}>
          {cmds.map((c, i) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.6rem .7rem',
              borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--foreground)',
              background: i === 0 ? 'var(--accent)' : 'transparent' }}>
              <Icon name="chevron" size={15} style={{ color: 'var(--muted-foreground)' }} />{c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RailDock, HeaderWell, PoweredBy, CommandPalette });
