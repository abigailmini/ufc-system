/* global window, React */
// Layout shell — Sidebar, Topbar (with Discord live button), main App container

const { useState, useEffect } = React;
const { Icon, Logo, Avatar, useToast } = window;

function useIsMobile(breakpoint = 760){
  const getValue = () => typeof window !== 'undefined' && window.innerWidth <= breakpoint;
  const [isMobile, setIsMobile] = useState(getValue);

  useEffect(() => {
    const onResize = () => setIsMobile(getValue());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard', icon:'home' },
  { id:'elearning', label:'E-Learning', icon:'book' },
  { id:'discord',   label:'Discord Live', icon:'discord' },
  { id:'events',    label:'Upcoming Events', icon:'cal' },
  { id:'genetic',   label:'Genetic Report', icon:'dna' },
  { id:'submit',    label:'Submit UID', icon:'upload' },
  { id:'withdrawals', label:'Withdrawals', icon:'wallet' },
  { id:'leaderboard', label:'Leaderboard', icon:'trophy' },
  { id:'register',  label:'Register & Earn', icon:'rocket' },
  { id:'profile',   label:'Profile', icon:'user' },
];

// Sidebar kept as no-op for back-compat (layout is now top-nav only)
function Sidebar(){ return null; }

function Topbar({ liveOn, route, setRoute }){
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const push = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const primaryActions = (
    <>
      <button onClick={()=>setRoute('discord')}
        className={liveOn ? 'live-ring' : ''}
        style={{
          display:'flex', alignItems:'center', gap:10, height:36, padding:'0 14px',
          borderRadius:10, border: `1px solid ${liveOn ? 'rgba(239,68,68,0.5)' : 'var(--line-1)'}`,
          background: liveOn ? 'linear-gradient(180deg, rgba(239,68,68,0.18), rgba(239,68,68,0.08))' : 'var(--surf-1)',
          color: liveOn ? '#fecaca' : 'var(--t-2)',
          fontWeight:600, fontSize:13,
          maxWidth: isMobile ? '100%' : 'none',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
        <Icon name="discord" size={16}/>
        {liveOn ? (
          <>
            <span style={{display:'flex', alignItems:'center', gap:6, color:'#ef4444'}}>
              <span className="dot dot-pulse" style={{color:'#ef4444', width:7, height:7}}/>
              <span style={{fontSize:10, fontWeight:700, letterSpacing:'0.14em'}}>LIVE</span>
            </span>
            <span style={{color:'#fff'}}>Daily Live</span>
          </>
        ) : (
          <>
            <span style={{color:'var(--t-3)', fontSize:10, fontWeight:700, letterSpacing:'0.14em'}}>OFFLINE</span>
            <span>Discord</span>
          </>
        )}
      </button>

      <div style={{position:'relative'}}>
        <button className="btn btn-ghost btn-sm" style={{width:36, height:36, padding:0, position:'relative'}}
          onClick={()=>setNotifOpen(v=>!v)}>
          <Icon name="bell" size={16}/>
          <span style={{position:'absolute', top:6, right:7, width:7, height:7, borderRadius:99, background:'var(--accent)', boxShadow:'0 0 0 2px var(--bg-0)'}}/>
        </button>
        {notifOpen && <NotifPanel close={()=>setNotifOpen(false)} push={push}/>}
      </div>

      {!isMobile && (
        <>
          <button className="btn btn-ghost btn-sm" style={{width:36, height:36, padding:0}}
            onClick={()=>setRoute('elearning')}><Icon name="cal" size={16}/></button>
          <button className="btn btn-ghost btn-sm" style={{width:36, height:36, padding:0}}
            onClick={()=>setRoute('profile')}><Icon name="gear" size={16}/></button>
          <div style={{width:1, height:24, background:'var(--line-1)'}}/>
        </>
      )}

      <button onClick={()=>setRoute('profile')} style={{display:'flex', alignItems:'center', gap:10, padding:'4px 10px 4px 4px', borderRadius:99, border:'1px solid var(--line-1)'}}>
        <Avatar name={window.USER.name} size={28}/>
        {!isMobile && <span style={{fontSize:12, fontWeight:600}}>{window.USER.name.split(' ')[0]}</span>}
      </button>
    </>
  );

  return (
    <header style={{
      position:'sticky', top:0, zIndex:40,
      display:'flex', flexDirection:'column',
      background:'rgba(7,8,11,0.85)', backdropFilter:'blur(14px) saturate(160%)',
    }}>
      <div className="topbar-row" style={{
        minHeight:isMobile ? 60 : 64, display:'flex', alignItems:'center', gap:isMobile ? 10 : 16,
        padding:isMobile ? '10px 14px' : '0 28px',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <Logo size={isMobile ? 36 : 42}/>
        </div>

        <div style={{flex:1}}/>

        {isMobile ? (
          <button
            className="btn btn-ghost btn-sm"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={()=>setMobileMenuOpen(v=>!v)}
            style={{width:40, height:40, padding:0, borderRadius:12}}
          >
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={18}/>
          </button>
        ) : primaryActions}
      </div>

      {isMobile ? (
        <>
          {mobileMenuOpen && (
            <div className="mobile-menu-panel" style={{padding:'0 14px 14px'}}>
              <div style={{
                background:'linear-gradient(180deg, rgba(22,24,38,0.98), rgba(10,11,16,0.98))',
                border:'1px solid var(--line-1)', borderRadius:16,
                padding:12, display:'flex', flexDirection:'column', gap:10,
                boxShadow:'0 18px 40px rgba(0,0,0,0.35)',
              }}>
                <div style={{display:'grid', gridTemplateColumns:'1fr auto auto', gap:10, alignItems:'center'}}>
                  {primaryActions}
                </div>
                <div className="mobile-nav-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  {NAV_ITEMS.map(item => {
                    const active = route === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={()=>{ setRoute(item.id); setMobileMenuOpen(false); }}
                        style={{
                          display:'flex', alignItems:'center', gap:10,
                          minHeight:44, padding:'0 12px', textAlign:'left',
                          borderRadius:12,
                          border:`1px solid ${active ? 'var(--accent)' : 'var(--line-1)'}`,
                          background: active ? 'var(--accent-soft)' : 'var(--surf-1)',
                          color: active ? 'var(--accent)' : 'var(--t-2)',
                          fontWeight: active ? 700 : 600,
                        }}
                      >
                        <Icon name={item.icon} size={15} stroke={active ? 2 : 1.8}/>
                        <span style={{fontSize:13}}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="tabbar-rail" style={{
          display:'flex', alignItems:'flex-end', gap:0,
          maxWidth:1480, width:'100%', margin:'0 auto',
          padding:'10px 32px 0', overflowX:'auto', overflowY:'visible',
          scrollbarWidth:'none', msOverflowStyle:'none',
          position:'relative',
          marginBottom:-1,
          boxSizing:'border-box',
        }}>
          {NAV_ITEMS.map((item, i) => {
            const active = route === item.id;
            return (
              <button key={item.id}
                className={`tab-chip ${active ? 'tab-chip--active' : ''}`}
                onClick={()=>setRoute(item.id)}
                style={{
                  position:'relative',
                  height: active ? 50 : 42,
                  minWidth: 132,
                  padding:'0 22px',
                  marginRight: 2,
                  zIndex: active ? 5 : (NAV_ITEMS.length - i),
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  color: active ? 'var(--accent)' : 'var(--t-3)',
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  letterSpacing:'-0.005em',
                  whiteSpace:'nowrap',
                  background: active
                    ? 'var(--surf-1)'
                    : 'linear-gradient(180deg, rgba(20,22,30,0.55) 0%, rgba(10,11,16,0.75) 100%)',
                  borderRadius: '14px 14px 0 0',
                  borderTop: active ? '1.5px solid var(--accent)' : '1px solid var(--line-1)',
                  borderLeft: '1px solid var(--line-1)',
                  borderRight: '1px solid var(--line-1)',
                  borderBottom: 'none',
                  transition:'height .16s ease, color .12s, background .14s',
                  filter: active ? 'drop-shadow(0 -2px 12px var(--accent-glow))' : 'none',
                  marginBottom: active ? -14 : 0,
                  paddingBottom: active ? 14 : 0,
                }}
                onMouseEnter={e => !active && (e.currentTarget.style.color='var(--t-1)')}
                onMouseLeave={e => !active && (e.currentTarget.style.color='var(--t-3)')}
              >
                <Icon name={item.icon} size={14} stroke={active?2:1.6}/>
                <span>{item.label}</span>
                {active && (
                  <span style={{
                    position:'absolute', left:'50%', top:-1, transform:'translateX(-50%)',
                    width:'58%', height:2, background:'var(--accent)', borderRadius:99,
                    boxShadow:'0 0 14px var(--accent-glow), 0 0 4px var(--accent)',
                  }}/>
                )}
              </button>
            );
          })}
          <div style={{flex:1, height:1, alignSelf:'flex-end', background:'var(--line-1)'}}/>
        </div>
      )}
    </header>
  );
}

function NotifPanel({ close, push }){
  useEffect(()=>{
    const h = e => { if(!e.target.closest('[data-notif-panel]')) close(); };
    setTimeout(()=> document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, []);
  return (
    <div data-notif-panel style={{
      position:'absolute', top:'calc(100% + 8px)', right:0, width:340,
      background:'linear-gradient(180deg, var(--surf-1), var(--surf-0))',
      border:'1px solid var(--line-2)', borderRadius:12,
      boxShadow:'0 16px 40px rgba(0,0,0,0.5)', zIndex:60, overflow:'hidden',
    }}>
      <div style={{padding:'14px 16px', borderBottom:'1px solid var(--line-1)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:14}}>Notifications</div>
        <button style={{fontSize:11, color:'var(--accent)'}} onClick={()=>{ push('All marked read','ok'); close(); }}>Mark all read</button>
      </div>
      <div style={{maxHeight:380, overflowY:'auto'}}>
        {window.NOTIFS.map((n,i)=>{
          const colors = { ok:'var(--ok)', bad:'var(--bad)', info:'var(--info)', live:'var(--live)' };
          return (
            <div key={i} style={{padding:'12px 16px', display:'flex', gap:12, borderBottom:'1px dashed rgba(255,255,255,0.04)'}}>
              <div style={{width:8, height:8, borderRadius:99, background:colors[n.kind], marginTop:6, flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:600}}>{n.title}</div>
                <div style={{fontSize:12, color:'var(--t-3)', marginTop:2}}>{n.sub}</div>
              </div>
              <div style={{fontSize:11, color:'var(--t-4)'}}>{n.time}</div>
            </div>
          );
        })}
      </div>
      <div style={{padding:'10px 16px', textAlign:'center', borderTop:'1px solid var(--line-1)'}}>
        <button style={{fontSize:12, color:'var(--accent)', fontWeight:600}}>View all</button>
      </div>
    </div>
  );
}

function PageHeader({ title, sub, action, eyebrow }){
  return (
    <div className="page-header">
      <div style={{minWidth:0}}>
        {eyebrow && <div className="eyebrow-lbl">{eyebrow}</div>}
        <h1 className="section-title" style={{marginTop: eyebrow?6:0}}>{title}</h1>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, PageHeader, NAV_ITEMS });
