/* global window, React */
// Shared UI primitives — Icon, Avatar, Sparkline, Modal, Toasts, RankChip, etc.

const { useState, useEffect, useRef, createContext, useContext } = React;

// ─── Icon system: outline 24px stroke icons ───
function Icon({ name, size=18, stroke=1.6, className='', style }){
  const sw = stroke;
  const props = { width:size, height:size, viewBox:'0 0 24 24', fill:'none',
    stroke:'currentColor', strokeWidth:sw, strokeLinecap:'round', strokeLinejoin:'round',
    className, style };
  switch(name){
    case 'home': return <svg {...props}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>;
    case 'dna': return <svg {...props}><path d="M5 4c4 3 10 3 14 0"/><path d="M5 20c4-3 10-3 14 0"/><path d="M6 8c4 0 8 8 12 8"/><path d="M6 16c4 0 8-8 12-8"/></svg>;
    case 'upload': return <svg {...props}><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></svg>;
    case 'wallet': return <svg {...props}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1"/></svg>;
    case 'book': return <svg {...props}><path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16h14"/></svg>;
    case 'rocket': return <svg {...props}><path d="M12 15c-3-3-3-7 0-12 3 5 3 9 0 12z"/><path d="m9 12-3 1 1 5 4-2"/><path d="m15 12 3 1-1 5-4-2"/><circle cx="12" cy="9" r="1"/></svg>;
    case 'trophy': return <svg {...props}><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M5 5H3v2a3 3 0 0 0 3 3"/><path d="M19 5h2v2a3 3 0 0 1-3 3"/><path d="M9 14h6v3H9z"/><path d="M8 20h8"/></svg>;
    case 'discord': return <svg {...props}><path d="M7 7h10c1 0 2 1 2 2v8l-3-2H8c-1 0-2-1-2-2V9c0-1 1-2 1-2z"/><circle cx="10" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 16V11a6 6 0 0 1 12 0v5l1 2H5z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case 'gear': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.1-1.2L14 3.4h-4l-.5 2.3a7 7 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.1 1.2L10 20.6h4l.5-2.3a7 7 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>;
    case 'cal': return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></svg>;
    case 'map-pin': return <svg {...props}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'fire': return <svg {...props}><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-3 2-6 1 2 2 2 3-4z"/></svg>;
    case 'check': return <svg {...props}><path d="m5 12 4 4 10-10"/></svg>;
    case 'x': return <svg {...props}><path d="M5 5l14 14M19 5 5 19"/></svg>;
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left': return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'arrow-up': return <svg {...props}><path d="m5 14 7-7 7 7"/></svg>;
    case 'arrow-down': return <svg {...props}><path d="m5 10 7 7 7-7"/></svg>;
    case 'chev-down': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chev-right': return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'play': return <svg {...props}><path d="M7 5v14l12-7z"/></svg>;
    case 'pause': return <svg {...props}><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>;
    case 'crown': return <svg {...props}><path d="M3 8l4 5 5-7 5 7 4-5v9H3z"/><path d="M3 19h18"/></svg>;
    case 'target': return <svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/></svg>;
    case 'share': return <svg {...props}><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/></svg>;
    case 'copy': return <svg {...props}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'filter': return <svg {...props}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>;
    case 'dl': return <svg {...props}><path d="M12 3v14"/><path d="m7 12 5 5 5-5"/><path d="M5 21h14"/></svg>;
    case 'link': return <svg {...props}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>;
    case 'instagram': return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>;
    case 'whatsapp': return <svg {...props}><path d="M4 20l1.6-4A8 8 0 1 1 9 19.5z"/><path d="M9 11c.5 1.5 1.5 2.5 3 3l1-1.2 2 1-.8 1.4c-.5.5-1.4.6-2.7.2A6 6 0 0 1 8 9.4c-.4-1.3-.3-2.2.2-2.7l1.4-.8 1 2z" fill="currentColor"/></svg>;
    case 'twitter': return <svg {...props}><path d="M4 4l7 9-7 7h2l6-6 5 6h4l-8-10 7-7h-2l-6 6-4-6z" fill="currentColor"/></svg>;
    case 'lock': return <svg {...props}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case 'logout': return <svg {...props}><path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M15 12H9"/><path d="m13 8 4 4-4 4"/></svg>;
    case 'star': return <svg {...props}><path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6L12 16.8 6.6 19.6l1-6L3.3 9.4l6-.9z"/></svg>;
    case 'sparkles': return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M5 19l3-3"/></svg>;
    case 'menu': return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'ext': return <svg {...props}><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M20 14v6H4V4h6"/></svg>;
    case 'eye': return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'help': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5"/><path d="M12 17v.01" strokeWidth="2.5"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// ─── Avatar with gradient fallback ───
function Avatar({ name, size=32, color, src }){
  const initials = (name||'?').split(' ').filter(Boolean).slice(0,2).map(s=>s[0]).join('').toUpperCase();
  const hue = (name||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0) % 360;
  const bg = color || `hsl(${hue}, 65%, 32%)`;
  const fg = color ? '#fff' : `hsl(${hue}, 80%, 80%)`;
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background: src ? `center/cover no-repeat url(${src}), ${bg}` : bg,
      color:fg, display:'inline-flex', alignItems:'center', justifyContent:'center',
      fontWeight:700, fontSize: size*0.36, fontFamily:'var(--font-display)',
      flexShrink:0, border:'1px solid rgba(255,255,255,0.08)',
    }}>{!src && initials}</div>
  );
}

// ─── Sparkline ───
function Sparkline({ data, w=80, h=24, color='var(--accent)', fill=true }){
  if(!data||!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max-min||1;
  const step = w/(data.length-1);
  const pts = data.map((v,i)=>[i*step, h - ((v-min)/range)*(h-2) - 1]);
  const d = pts.map((p,i)=> (i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(' ');
  const area = d + ` L${w},${h} L0,${h} Z`;
  return (
    <svg className="spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {fill && <path d={area} fill={color} opacity={0.18}/>}
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Win/Loss strip ───
function WLStrip({ data, size=18 }){
  return (
    <div style={{display:'flex', gap:4}}>
      {data.map((r,i)=>(
        <div key={i} style={{
          width:size, height:size, borderRadius:5,
          background: r==='W' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
          border: `1px solid ${r==='W' ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)'}`,
          color: r==='W' ? '#5eead4' : '#fca5a5',
          fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center',
        }}>{r}</div>
      ))}
    </div>
  );
}

// ─── Rank chip ───
function RankChip({ code, size='sm' }){
  const r = window.helpers.rankBy(code);
  const cls = `rank ${r.cls}`;
  return <span className={cls}>{r.label}</span>;
}

// ─── Gamified hex achievement badges (chiseled metal + glow) ───
// hexagon (pointy-top) on a 100×100 viewBox
const HEX_PATH = "M50 4 L92 28 L92 76 L50 100 L8 76 L8 28 Z";
const HEX_INNER = "M50 16 L82 34 L82 70 L50 88 L18 70 L18 34 Z";

function BadgeIcon({ name, color }){
  const c = color;
  switch(name){
    case 'stopwatch': return (
      <g fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="52" r="14" fill={`${c}22`}/>
        <path d="M50 52 L50 44"/>
        <path d="M50 52 L57 56"/>
        <path d="M44 36 L56 36"/>
        <path d="M50 36 L50 38"/>
      </g>
    );
    case 'calendar': return (
      <g fill="none" stroke={c} strokeWidth="2.4" strokeLinejoin="round">
        <rect x="34" y="38" width="32" height="26" rx="3" fill={`${c}22`}/>
        <path d="M34 46 L66 46"/>
        <path d="M40 34 L40 40 M60 34 L60 40" strokeLinecap="round"/>
        <circle cx="42" cy="54" r="1.5" fill={c}/>
        <circle cx="50" cy="54" r="1.5" fill={c}/>
        <circle cx="58" cy="54" r="1.5" fill={c}/>
        <circle cx="42" cy="60" r="1.5" fill={c}/>
        <circle cx="50" cy="60" r="1.5" fill={c}/>
      </g>
    );
    case 'coin': return (
      <g>
        <circle cx="50" cy="48" r="13" fill={`${c}33`} stroke={c} strokeWidth="2.4"/>
        <text x="50" y="54" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="16" fill={c}>$</text>
      </g>
    );
    case 'reticle': return (
      <g fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round">
        <circle cx="50" cy="48" r="11"/>
        <circle cx="50" cy="48" r="2" fill={c}/>
        <path d="M50 33 L50 39 M50 57 L50 63 M35 48 L41 48 M59 48 L65 48"/>
      </g>
    );
    case 'dna': return (
      <g fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round">
        <path d="M40 34 C60 44 40 56 60 66"/>
        <path d="M60 34 C40 44 60 56 40 66"/>
        <path d="M42 38 L58 38 M44 46 L56 46 M44 54 L56 54 M42 62 L58 62" opacity="0.7"/>
      </g>
    );
    case 'lock': return (
      <g fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="38" y="46" width="24" height="20" rx="2.5" fill={`${c}22`}/>
        <path d="M43 46 L43 40 C43 34 47 31 50 31 C53 31 57 34 57 40 L57 46"/>
        <circle cx="50" cy="56" r="2" fill={c}/>
      </g>
    );
    default: return null;
  }
}

function Badge({ a, size=96 }){
  const u = a.unlocked;
  const c = u ? a.color : '#4a5160';
  const rarity = a.rarity || 'common';
  return (
    <div className="badge-cell" style={{opacity: u?1:0.55}}>
      <div className="badge-wrap" style={{width:size, height:size}}>
        {u && (
          <div className="badge-halo" style={{
            background:`radial-gradient(circle at 50% 55%, ${c}55 0%, ${c}1f 38%, transparent 70%)`,
          }}/>
        )}
        {u && rarity === 'mythic' && <div className="badge-sparkle" style={{borderColor:`${c}88`}}/>}
        <img src={a.img} alt={a.label}
          style={{
            position:'relative', width:size, height:size, objectFit:'contain',
            filter: u ? `drop-shadow(0 6px 18px ${c}55)` : 'grayscale(0.5) brightness(0.8)',
          }}/>
      </div>
      <div style={{fontSize:11, fontWeight:700, color:'var(--t-1)', marginTop:6, letterSpacing:'0.01em'}}>{a.label}</div>
      <div style={{fontSize:10, color:'var(--t-3)', marginTop:1}}>{a.sub}</div>
    </div>
  );
}

// shade hex by amount (1=same, >1 lighter, <1 darker)
function shade(hex, amt){
  const h = hex.replace('#','');
  const n = parseInt(h.length===3 ? h.split('').map(c=>c+c).join('') : h, 16);
  let r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  if(amt > 1){
    const t = (amt-1);
    r = Math.round(r + (255-r)*Math.min(t,1));
    g = Math.round(g + (255-g)*Math.min(t,1));
    b = Math.round(b + (255-b)*Math.min(t,1));
  } else {
    r = Math.round(r*amt); g = Math.round(g*amt); b = Math.round(b*amt);
  }
  return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

// keep HexBadge as alias for back-compat
const HexBadge = Badge;

// ─── Toast system ───
const ToastCtx = createContext(null);
function ToastProvider({ children }){
  const [toasts, setToasts] = useState([]);
  const push = (msg, kind='info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, msg, kind }]);
    setTimeout(()=> setToasts(ts => ts.filter(t=>t.id!==id)), 3200);
  };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <Icon name={t.kind==='ok'?'check':t.kind==='bad'?'x':'sparkles'} size={16}
              style={{color: t.kind==='ok'?'var(--ok)':t.kind==='bad'?'var(--bad)':'var(--accent)'}}/>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

// ─── Modal ───
function Modal({ open, onClose, title, children, footer, size }){
  useEffect(()=>{
    if(!open) return;
    const onKey = e => e.key==='Escape' && onClose && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if(!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={size==='lg'?{maxWidth:680}:{}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid var(--line-1)'}}>
          <div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:16}}>{title}</div>
          <button className="btn btn-sm btn-ghost" onClick={onClose} style={{height:28, width:28, padding:0}}><Icon name="x" size={14}/></button>
        </div>
        <div style={{padding:'18px 22px'}}>{children}</div>
        {footer && <div style={{padding:'12px 22px', borderTop:'1px solid var(--line-1)', display:'flex', justifyContent:'flex-end', gap:8}}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── Card primitive ───
function Card({ eyebrow, title, action, children, padding=true, style, className='' }){
  return (
    <div className={`card ${className}`} style={style}>
      {(eyebrow || title || action) && (
        <div className="card-hd">
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            {title && <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, marginTop: eyebrow?6:0}}>{title}</div>}
          </div>
          {action}
        </div>
      )}
      <div className={padding?'card-bd':''}>{children}</div>
    </div>
  );
}

// ─── Logo ───
function Logo({ size=34 }){
  return (
    <div style={{display:'flex', alignItems:'center', gap:0, height:size}}>
      <img src="assets/unityfund-logo.png" alt="Unity Fund Challenge"
        style={{height:size, width:'auto', display:'block', filter:'drop-shadow(0 2px 8px rgba(245,197,24,0.25))'}}/>
    </div>
  );
}

// ─── Firm icon ───
function FirmIcon({ id, size=36 }){
  const f = window.helpers.firmBy(id);
  return (
    <div style={{
      width:size, height:size, borderRadius:9, flexShrink:0,
      background: `linear-gradient(135deg, ${f.accent}33, ${f.accent}11)`,
      border: `1px solid ${f.accent}55`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:f.accent, fontFamily:'var(--font-display)', fontWeight:700, fontSize: f.icon.length>2?11:14,
    }}>{f.icon}</div>
  );
}

Object.assign(window, {
  Icon, Avatar, Sparkline, WLStrip, RankChip, HexBadge, Badge,
  ToastProvider, useToast, Modal, Card, Logo, FirmIcon,
});
