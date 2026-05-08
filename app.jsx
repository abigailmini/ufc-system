/* global window, React, ReactDOM */
// App entry — router, layout, tweaks panel

const { useState, useEffect } = React;
const {
  Sidebar, Topbar, ToastProvider,
  Dashboard, GeneticReport, SubmitUID, Withdrawals, ELearning, Register, Leaderboard, Discord, Profile, Events,
  TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect,
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "background": "grid",
  "density": "regular",
  "sidebar": "expanded",
  "discordLive": true,
  "accent": "#f5c518"
}/*EDITMODE-END*/;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRouteState] = useState(()=>{
    const h = window.location.hash.replace('#','');
    return h && window.NAV_ITEMS.some(i=>i.id===h) ? h : 'dashboard';
  });
  const [sidebarExpanded, setSidebarExpanded] = useState(t.sidebar === 'expanded');

  useEffect(()=>{ setSidebarExpanded(t.sidebar === 'expanded'); }, [t.sidebar]);

  const setRoute = (r) => {
    setRouteState(r);
    window.location.hash = r;
    window.scrollTo(0, 0);
  };

  useEffect(()=>{
    const onHash = ()=>{
      const h = window.location.hash.replace('#','');
      if(h && window.NAV_ITEMS.some(i=>i.id===h)) setRouteState(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Apply theme attr
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', t.theme);
    if(t.theme === 'default'){
      document.documentElement.style.setProperty('--accent', t.accent);
      document.documentElement.style.setProperty('--accent-2',
        t.accent === '#f5c518' ? '#ffd84d' : t.accent);
      document.documentElement.style.setProperty('--accent-soft', t.accent + '24');
      document.documentElement.style.setProperty('--accent-glow', t.accent + '70');
    }
  }, [t.theme, t.accent]);

  const bgClass = `bg-${t.background}`;
  const compactStyle = t.density === 'compact' ? { fontSize: 13 } : {};

  return (
    <ToastProvider>
      <div data-screen-label={route} className={bgClass}
        style={{minHeight:'100vh', display:'flex', flexDirection:'column', ...compactStyle}}>
        <main style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
          <Topbar liveOn={t.discordLive} route={route} setRoute={setRoute}/>
          <div className="app-shell" style={{padding: t.density==='compact' ? '0 22px 20px' : '0 32px 28px', maxWidth: 1480, width:'100%', margin:'0 auto', minWidth:0}}>
            {route==='dashboard' && <Dashboard setRoute={setRoute}/>}
            {route==='genetic' && <GeneticReport setRoute={setRoute}/>}
            {route==='submit' && <SubmitUID/>}
            {route==='withdrawals' && <Withdrawals/>}
            {route==='leaderboard' && <Leaderboard/>}
            {route==='elearning' && <ELearning/>}
            {route==='register' && <Register/>}
            {route==='discord' && <Discord liveOn={t.discordLive} setLiveOn={(v)=>setTweak('discordLive', typeof v==='function'?v(t.discordLive):v)}/>}
            {route==='events' && <Events/>}
            {route==='profile' && <Profile/>}
          </div>
        </main>

        <TweaksPanel>
          <TweakSection label="Theme"/>
          <TweakRadio label="Mood" value={t.theme} options={['default','cyber','crimson']}
            onChange={(v)=>setTweak('theme', v)}/>
          <TweakColor label="Accent" value={t.accent}
            options={['#f5c518','#22c55e','#3b82f6','#ef4444','#a855f7','#06b6d4']}
            onChange={(v)=>setTweak('accent', v)}/>
          <TweakRadio label="Background" value={t.background} options={['solid','grid','aurora']}
            onChange={(v)=>setTweak('background', v)}/>

          <TweakSection label="Layout"/>
          <TweakRadio label="Density" value={t.density} options={['compact','regular']}
            onChange={(v)=>setTweak('density', v)}/>

          <TweakSection label="Live"/>
          <TweakToggle label="Discord live indicator" value={t.discordLive}
            onChange={(v)=>setTweak('discordLive', v)}/>
        </TweaksPanel>
      </div>
    </ToastProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
