/* ============================================================
 * Singular Web-app UI kit — primitives (ui.jsx)
 * Lucide-style stroke icons + buttons, cards, badges, pills, KPIs.
 * Exports to window for use by chrome.jsx and app.jsx.
 * ============================================================ */

// ── Lucide-style icon set (24×24, stroke 2, round caps) ──
const ICON_PATHS = {
  overview: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  work: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  qa: '<rect x="8" y="6" width="8" height="13" rx="4"/><path d="M12 6V3M19 8l-3 1.5M5 8l3 1.5M19.5 13H16M8 13H4.5M19 18l-3-1.5M5 18l3-1.5"/>',
  okr: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22V15"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  filter: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
};
function Icon({ name, size = 20, style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }} aria-hidden="true" />
  );
}

// ── Button ── gradient primary | outline | ghost ──
function Button({ children, variant = 'primary', icon, onClick, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '.4rem', whiteSpace: 'nowrap',
    borderRadius: '9999px', padding: '.55rem 1.05rem', font: 'inherit', fontWeight: 500,
    fontSize: '.875rem', cursor: 'pointer', transition: 'all .18s ease', lineHeight: 1,
  };
  const variants = {
    primary: { border: 0, color: 'var(--primary-foreground)', backgroundImage: 'var(--gradient-primary)',
      boxShadow: '0 2px 6px rgb(0 0 0/.25), inset 0 1px 0 rgb(255 255 255/.2)' },
    outline: { border: '1px solid var(--button-outline-border, color-mix(in srgb, var(--primary) 55%, transparent))',
      color: 'var(--interactive)', background: 'transparent' },
    ghost: { border: 0, color: 'var(--muted-foreground)', background: 'transparent' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={16} />}{children}
    </button>
  );
}

// ── Avatar ──
function Avatar({ initials, color = 'var(--primary)', size = 26 }) {
  return (
    <span style={{ width: size, height: size, borderRadius: '9999px', background: color, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.42, fontWeight: 600, flex: 'none' }}>{initials}</span>
  );
}

// ── StatusBadge ── 5 semantic families ──
const STATUS = {
  info: '--info', success: '--success', error: '--destructive', warning: '--warning', neutral: '--muted-foreground',
};
function StatusBadge({ status = 'neutral', children }) {
  const c = STATUS[status] || STATUS.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', padding: '.14rem .58rem',
      borderRadius: '9999px', fontSize: '.72rem', fontWeight: 500,
      background: `color-mix(in srgb, var(${c}) 16%, transparent)`,
      color: status === 'neutral' ? 'var(--muted-foreground)' : `color-mix(in srgb, var(${c}) 82%, #fff)` }}>
      <span style={{ width: 6, height: 6, borderRadius: '9999px', background: `var(${c})` }} />{children}
    </span>
  );
}

// ── Card ── solid | liquid ──
function Card({ children, style, interactive, onClick }) {
  return (
    <div onClick={onClick} className={interactive ? 'card-interactive' : ''} style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)',
      ...style }}>{children}</div>
  );
}

// ── KPI tile + row ──
function KpiTile({ value, label, trend }) {
  return (
    <Card style={{ padding: '1.2rem 1.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem' }}>
        <span className="kpi-value" style={{ fontSize: '1.85rem', color: 'var(--foreground-strong)' }}>{value}</span>
        {trend && <span style={{ fontSize: '.72rem', fontWeight: 600, padding: '.12rem .45rem', borderRadius: '9999px',
          background: 'color-mix(in srgb, var(--success) 18%, transparent)', color: '#86efac' }}>▲ {trend}</span>}
      </div>
      <div style={{ fontSize: '.8rem', color: 'var(--muted-foreground)', marginTop: '.4rem' }}>{label}</div>
    </Card>
  );
}
function KpiRow({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 'var(--gap-m)' }}>
      {items.map((k, i) => <KpiTile key={i} {...k} />)}
    </div>
  );
}

// ── PillFilter row ──
function PillFilters({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {options.map((o) => {
        const sel = o === value;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            padding: '.3rem .85rem', borderRadius: '9999px', fontSize: '.85rem', font: 'inherit', cursor: 'pointer',
            border: sel ? '1px solid transparent' : '1px solid var(--border)',
            background: sel ? 'var(--primary)' : 'transparent',
            color: sel ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            transition: 'all .15s' }}>{o}</button>
        );
      })}
    </div>
  );
}

// ── SideModal (entity detail) ──
function SideModal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60,
      background: 'color-mix(in srgb, #000 55%, transparent)', backdropFilter: 'blur(3px)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 'min(460px, 92vw)', background: 'var(--sheet-content, var(--card))', borderLeft: '1px solid var(--border)',
        boxShadow: '-16px 0 40px rgb(0 0 0/.4)', padding: '1.5rem 1.6rem', overflowY: 'auto',
        animation: 'sm-in .22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <h2 className="text-modal-title" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--foreground-strong)' }}>{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" style={{ border: 0, background: 'transparent',
            color: 'var(--muted-foreground)', cursor: 'pointer', padding: 4 }}><Icon name="close" size={20} /></button>
        </div>
        <div style={{ marginTop: '1.2rem' }}>{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Button, Avatar, StatusBadge, Card, KpiTile, KpiRow, PillFilters, SideModal });
