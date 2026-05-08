/* global window, React */
// Genetic Report — full archetype results page

const { useState } = React;
const { Icon, Card, useToast } = window;

function GeneticReport({ setRoute }){
  const u = window.USER;
  const arch = window.helpers.archBy(u.archetype);
  const push = useToast();
  const stats = [
    ['Patience', 92, '#14b8a6'],
    ['Discipline', 88, '#22c55e'],
    ['Speed', 41, '#ef4444'],
    ['Conviction', 76, '#a855f7'],
    ['Risk tolerance', 38, '#f97316'],
    ['Adaptability', 64, '#3b82f6'],
  ];
  const compat = [
    { code:'PWLT', value:96, why:'Mirror archetype — your core' },
    { code:'MODL', value:74, why:'Quant logic complements precision' },
    { code:'HODL', value:69, why:'Both reward patience' },
    { code:'ZNFM', value:62, why:'Veteran calm pairs with sniper focus' },
    { code:'SIZE', value:48, why:'Different timeframe assumptions' },
    { code:'MOMO', value:34, why:'Speed is your weak edge' },
    { code:'FAST', value:22, why:'Rhythm clash' },
    { code:'DEGEN',value:14, why:'Direct opposite' },
  ];

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>

      {/* Hero strip */}
      <Card padding={false}>
        <div className="genetic-hero-grid" style={{
          padding:'24px 28px',
          background:`linear-gradient(120deg, ${arch.color}1a, transparent 60%)`,
          borderRadius:16,
          display:'grid', gridTemplateColumns:'auto 1fr auto', gap:24, alignItems:'center',
        }}>
          <div style={{
            width:140, height:200, borderRadius:14, overflow:'hidden',
            background:`center/cover url(${arch.img})`,
            border:`2px solid ${arch.color}`,
            boxShadow:`0 18px 40px -10px ${arch.color}`,
          }}/>
          <div>
            <div className="eyebrow-lbl">Your archetype</div>
            <div style={{display:'flex', alignItems:'baseline', gap:14, marginTop:6}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:48, fontWeight:700, letterSpacing:'-0.02em', color:arch.color, lineHeight:1}}>{u.archetype}-D</div>
              <div className="cjk" style={{fontSize:24, color:'var(--t-2)'}}>{arch.cn}</div>
            </div>
            <div style={{fontSize:18, fontWeight:600, marginTop:8}}>{u.archetype_name}</div>
            <div style={{fontSize:13, color:'var(--t-3)', marginTop:4}}>{arch.tag}</div>
            <div style={{display:'flex', gap:8, marginTop:14}}>
              <span className="pill pill-mythic">★ {u.rarity} · {u.rarity_pct}% of community</span>
              <span className="pill"><Icon name="cal" size={11}/>Test taken Apr 12, 2026</span>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <button className="btn btn-primary" onClick={()=>push('Report saved as PDF','ok')}><Icon name="dl" size={14}/>Download report</button>
            <button className="btn btn-ghost" onClick={()=>push('Test reset queued','info')}><Icon name="sparkles" size={14}/>Retake test</button>
          </div>
        </div>
      </Card>

      {/* Stat radar */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <Card eyebrow="GENETIC TRAITS" title="What makes you tick">
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {stats.map(([k,v,c])=>(
              <div key={k}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6}}>
                  <span style={{fontWeight:600}}>{k}</span>
                  <span className="mono" style={{color:c, fontWeight:700}}>{v}<span style={{color:'var(--t-3)', fontSize:11}}>/100</span></span>
                </div>
                <div className="bar"><div className="bar-fill" style={{width:`${v}%`, background:c}}/></div>
              </div>
            ))}
          </div>
        </Card>

        <Card eyebrow="ARCHETYPE RADAR" title="Your trader DNA">
          <RadarChart values={stats}/>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:12, padding:'12px 14px', borderRadius:10, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
            <Stat lbl="Strength" val={stats.reduce((a,s)=>Math.max(a,s[1]),0)+''} sub="Patience peak"/>
            <Stat lbl="Weakness" val={stats.reduce((a,s)=>Math.min(a,s[1]),100)+''} sub="Risk tolerance"/>
            <Stat lbl="Balance" val={(stats.reduce((a,s)=>a+s[1],0)/stats.length).toFixed(0)+''} sub="Composite"/>
          </div>
        </Card>
      </div>

      {/* Playbook */}
      <Card eyebrow="PWLT-D PLAYBOOK" title="How to trade your archetype">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          <PlaybookCard color={arch.color} icon="target" title="Setups that fit you" items={[
            'Range failure / liquidity sweep on 15m',
            'Daily-S/R retest with momentum confirmation',
            'Single high-R reversal trade per session',
          ]}/>
          <PlaybookCard color="#ef4444" icon="x" title="Avoid these" items={[
            'Scalping high tick rate — speed is low',
            'Chasing breakouts after 2nd candle',
            'Position-stacking inside congestion',
          ]}/>
          <PlaybookCard color="#22c55e" icon="check" title="Discipline goals" items={[
            'Max 2 trades / session',
            '1.5R minimum target — no exceptions',
            'Sit out the first 30 min of NY open',
          ]}/>
        </div>
      </Card>

      {/* Compatibility */}
      <Card eyebrow="COMMUNITY COMPATIBILITY" title="Who you trade well with">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
          {compat.map(c => {
            const a = window.helpers.archBy(c.code);
            return (
              <div key={c.code} style={{
                padding:'14px 14px', borderRadius:12, border:'1px solid var(--line-1)',
                background:`linear-gradient(180deg, ${a.color}10, transparent)`,
              }}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <div style={{width:32, height:32, borderRadius:8, background:`center/cover url(${a.img})`, border:`1px solid ${a.color}`}}/>
                  <div>
                    <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, color:a.color}}>{c.code}</div>
                    <div className="cjk" style={{fontSize:11, color:'var(--t-3)'}}>{a.cn}</div>
                  </div>
                  <div style={{flex:1, textAlign:'right', fontFamily:'var(--font-display)', fontWeight:700, fontSize:18, color:a.color}}>{c.value}<span style={{color:'var(--t-3)', fontSize:10}}>%</span></div>
                </div>
                <div className="bar" style={{height:4}}><div className="bar-fill" style={{width:`${c.value}%`, background:a.color}}/></div>
                <div style={{fontSize:11, color:'var(--t-3)', marginTop:8}}>{c.why}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* All archetypes overview */}
      <Card eyebrow="THE 8 ARCHETYPES" title="Trader DNA library"
        action={<button onClick={()=>push('Sharing your gene…','ok')} className="btn btn-sm"><Icon name="share" size={14}/>Share my archetype</button>}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
          {window.ARCHETYPES.map(a => {
            const isMe = a.code === u.archetype;
            return (
              <div key={a.code} style={{
                position:'relative', borderRadius:12, overflow:'hidden',
                border:`1px solid ${isMe ? a.color : 'var(--line-1)'}`,
                background:`var(--surf-1)`,
                boxShadow: isMe ? `0 0 0 1px ${a.color}55, 0 12px 28px -12px ${a.color}` : 'none',
              }}>
                {isMe && <div style={{position:'absolute', top:8, right:8, zIndex:2, padding:'2px 7px', borderRadius:5, background:a.color, color:'#0a0a0a', fontSize:9, fontWeight:800, letterSpacing:'0.1em'}}>YOU</div>}
                <div style={{aspectRatio:'9/12', background:`center/cover url(${a.img})`}}/>
                <div style={{padding:'10px 12px', background:`linear-gradient(0deg, ${a.color}10, transparent)`}}>
                  <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                    <span style={{fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:a.color}}>{a.code}</span>
                    <span className="cjk" style={{fontSize:13, color:'var(--t-2)'}}>{a.cn}</span>
                  </div>
                  <div style={{fontSize:11, color:'var(--t-3)', marginTop:3}}>{a.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Stat({ lbl, val, sub }){
  return (
    <div>
      <div className="eyebrow-lbl">{lbl}</div>
      <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, marginTop:4}}>{val}</div>
      <div style={{fontSize:11, color:'var(--t-3)'}}>{sub}</div>
    </div>
  );
}

function PlaybookCard({ color, icon, title, items }){
  return (
    <div style={{padding:'14px 16px', borderRadius:12, border:'1px solid var(--line-1)', background:'var(--surf-1)'}}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
        <div style={{width:30, height:30, borderRadius:8, background:`${color}22`, border:`1px solid ${color}55`, display:'flex', alignItems:'center', justifyContent:'center', color}}><Icon name={icon} size={14}/></div>
        <div style={{fontWeight:600}}>{title}</div>
      </div>
      <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8}}>
        {items.map((it,i)=>(
          <li key={i} style={{fontSize:12, color:'var(--t-2)', display:'flex', gap:8}}>
            <span style={{color, marginTop:2}}>—</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RadarChart({ values }){
  const cx = 150, cy = 150, R = 110;
  const labels = values.map(v=>v[0]);
  const data = values.map(v=>v[1]/100);
  const points = data.map((v,i)=>{
    const ang = (i / data.length) * Math.PI*2 - Math.PI/2;
    return [cx + Math.cos(ang)*R*v, cy + Math.sin(ang)*R*v];
  });
  const path = points.map((p,i)=>(i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(' ') + 'Z';
  return (
    <svg viewBox="0 0 300 300" width="100%" style={{maxWidth:340, display:'block', margin:'0 auto'}}>
      {[0.25,0.5,0.75,1].map(r=>(
        <polygon key={r} points={data.map((_,i)=>{
          const ang = (i/data.length)*Math.PI*2 - Math.PI/2;
          return `${cx+Math.cos(ang)*R*r},${cy+Math.sin(ang)*R*r}`;
        }).join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      ))}
      {data.map((_,i)=>{
        const ang = (i/data.length)*Math.PI*2 - Math.PI/2;
        return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(ang)*R} y2={cy+Math.sin(ang)*R} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>;
      })}
      <path d={path} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2"/>
      {points.map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--accent)"/>))}
      {labels.map((l,i)=>{
        const ang = (i/data.length)*Math.PI*2 - Math.PI/2;
        const x = cx + Math.cos(ang)*(R+22);
        const y = cy + Math.sin(ang)*(R+22) + 4;
        return <text key={i} x={x} y={y} fontSize="10" fill="var(--t-2)" textAnchor="middle" fontFamily="var(--font-body)">{l}</text>;
      })}
    </svg>
  );
}

Object.assign(window, { GeneticReport });
