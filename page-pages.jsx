/* global window, React */
// E-Learning Library, Register & Earn, Leaderboard pages

const { useState } = React;
const { Icon, Card, Avatar, FirmIcon, RankChip, useToast, Modal } = window;

// ─── E-LEARNING ────────────────────────────────────────────────────
function ELearning(){
  const [tag, setTag] = useState('All');
  const [open, setOpen] = useState(null);
  const all = window.COURSES;
  const tags = ['All', ...new Set(all.map(c=>c.tag))];
  const filtered = tag==='All' ? all : all.filter(c=>c.tag===tag);
  const featured = all.find(c=>c.featured) || all[0];
  const inProgress = all.filter(c => c.progress>0 && c.progress<100);
  const minutesLearned = all.reduce((a,c)=> a + c.minutes*c.progress/100, 0);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* Featured */}
      <Card padding={false}>
        <div style={{
          padding:'28px 32px', display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'center',
          background:`linear-gradient(120deg, ${featured.color}1f, transparent 60%)`, borderRadius:16,
        }}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
              <span className="pill" style={{background:`${featured.color}22`, color:featured.color, borderColor:`${featured.color}55`}}>FEATURED</span>
              <span className="pill">{featured.tag}</span>
              <span className="pill"><Icon name="play" size={11}/>{featured.lessons} lessons · {featured.minutes} min</span>
            </div>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:32, fontWeight:600, margin:'0 0 8px', letterSpacing:'-0.01em'}}>{featured.title}</h2>
            <div style={{color:'var(--t-3)', fontSize:14, maxWidth:560}}>Built for the {window.USER.archetype}-D mind. Coach K walks through a year of sniper-style entries and what to skip.</div>
            <div style={{display:'flex', gap:10, marginTop:16}}>
              <button className="btn btn-primary"><Icon name="play" size={14}/>Resume — {featured.progress}%</button>
              <button className="btn btn-ghost">Course outline</button>
            </div>
          </div>
          <div style={{
            width:200, height:240, borderRadius:14, position:'relative', overflow:'hidden',
            background:`linear-gradient(135deg, ${featured.color}55, #0a0a0a)`,
            border:`1px solid ${featured.color}55`,
          }}>
            <div style={{position:'absolute', inset:0, background:`radial-gradient(circle at 30% 30%, ${featured.color}33, transparent 60%)`}}/>
            <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div style={{width:60, height:60, borderRadius:99, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', paddingLeft:4}}>
                <Icon name="play" size={28}/>
              </div>
            </div>
            <div style={{position:'absolute', bottom:12, left:14, right:14}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'rgba(255,255,255,0.55)'}}>NEXT UP</div>
              <div style={{fontSize:13, fontWeight:600}}>Lesson 7 · Reading the trap</div>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI strip */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
        <MiniStat label="Watch time" value={`${Math.round(minutesLearned/60)}h`} sub={`${Math.round(minutesLearned)} minutes`} icon="cal"/>
        <MiniStat label="In progress" value={inProgress.length} sub={`${all.filter(c=>c.progress===100).length} completed`} icon="play"/>
        <MiniStat label="Coach hours" value="24" sub="Across 5 coaches" icon="user"/>
        <MiniStat label="Cert. earned" value="3" sub="of 9 available" icon="star"/>
      </div>

      {/* In progress strip */}
      {inProgress.length > 0 && (
        <Card eyebrow="CONTINUE WATCHING" title="Pick up where you left off">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
            {inProgress.map(c => <CourseCard key={c.id} c={c} compact onClick={()=>setOpen(c)}/>)}
          </div>
        </Card>
      )}

      {/* Library */}
      <Card eyebrow="LIBRARY" title={`${all.length} courses`}
        action={
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {tags.map(t => (
              <button key={t} onClick={()=>setTag(t)} className="pill" style={{
                cursor:'pointer',
                background: tag===t ? 'var(--accent-soft)' : 'rgba(255,255,255,0.04)',
                color: tag===t ? 'var(--accent)' : 'var(--t-2)',
                borderColor: tag===t ? 'var(--accent)' : 'var(--line-1)',
              }}>{t}</button>
            ))}
          </div>}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
          {filtered.map(c => <CourseCard key={c.id} c={c} onClick={()=>setOpen(c)}/>)}
        </div>
      </Card>

      <Modal open={!!open} onClose={()=>setOpen(null)} title={open?.title || ''} size="lg">
        {open && <CourseDetail c={open}/>}
      </Modal>
    </div>
  );
}

function CourseCard({ c, compact, onClick }){
  return (
    <button onClick={onClick} style={{
      textAlign:'left', display:'flex', flexDirection:'column', borderRadius:12,
      background:'var(--surf-1)', border:'1px solid var(--line-1)', overflow:'hidden',
      transition:'transform .12s, border-color .12s',
    }} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color+'55';}}
       onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line-1)';}}>
      <div style={{
        height: compact?70:100, position:'relative', overflow:'hidden',
        background:`linear-gradient(135deg, ${c.color}55, ${c.color}11)`,
      }}>
        <div style={{position:'absolute', inset:0, background:`radial-gradient(circle at 30% 60%, ${c.color}66, transparent 70%)`}}/>
        <div style={{position:'absolute', top:10, right:10, padding:'2px 7px', borderRadius:5, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', fontSize:10, fontWeight:700, letterSpacing:'0.1em', color:'#fff'}}>{c.level}</div>
        <div style={{position:'absolute', left:14, bottom:10, fontFamily:'var(--font-display)', fontWeight:800, fontSize: compact?20:28, color:c.color, letterSpacing:'-0.02em', mixBlendMode:'overlay'}}>{c.tag.toUpperCase()}</div>
      </div>
      <div style={{padding:'12px 14px 14px'}}>
        <div style={{fontWeight:600, fontSize:13}}>{c.title}</div>
        <div style={{display:'flex', alignItems:'center', gap:10, marginTop:6, fontSize:11, color:'var(--t-3)'}}>
          <span><Icon name="user" size={11} style={{verticalAlign:-1}}/> {c.instructor}</span>
          <span><Icon name="play" size={11} style={{verticalAlign:-1}}/> {c.lessons} · {c.minutes}m</span>
        </div>
        {c.progress > 0 && (
          <div style={{marginTop:10}}>
            <div className="bar" style={{height:4}}><div className="bar-fill" style={{width:`${c.progress}%`, background:c.color}}/></div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:5, fontSize:10}}>
              <span style={{color:'var(--t-3)'}}>{c.progress===100?'Completed':`${c.progress}% complete`}</span>
              <span style={{color:c.color, fontWeight:600}}>{c.progress<100?'Resume →':'Watch again →'}</span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function CourseDetail({ c }){
  return (
    <div>
      <div style={{display:'flex', gap:8, marginBottom:10}}>
        <span className="pill" style={{background:`${c.color}22`, color:c.color, borderColor:`${c.color}55`}}>{c.tag}</span>
        <span className="pill">{c.level}</span>
        <span className="pill">{c.minutes} min · {c.lessons} lessons</span>
      </div>
      <div style={{color:'var(--t-2)', fontSize:14, marginBottom:12}}>Taught by {c.instructor}. A focused module on {c.title.toLowerCase()} — short videos, real chart playback, and practice drills.</div>
      <div className="bar" style={{height:6}}><div className="bar-fill" style={{width:`${c.progress}%`, background:c.color}}/></div>
      <div style={{fontSize:12, color:'var(--t-3)', marginTop:6}}>{c.progress}% complete</div>
      <div style={{display:'flex', gap:8, marginTop:14}}>
        <button className="btn btn-primary"><Icon name="play" size={14}/>{c.progress>0?'Resume':'Start course'}</button>
        <button className="btn btn-ghost">Add to plan</button>
      </div>
    </div>
  );
}

function MiniStat({ label, value, sub, icon }){
  return (
    <Card padding={false}>
      <div style={{padding:'14px 16px', display:'flex', alignItems:'center', gap:12}}>
        <div style={{width:38, height:38, borderRadius:9, background:'var(--accent-soft)', color:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center'}}><Icon name={icon} size={18}/></div>
        <div>
          <div className="eyebrow-lbl">{label}</div>
          <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:600, marginTop:2}}>{value}</div>
          <div style={{fontSize:11, color:'var(--t-3)'}}>{sub}</div>
        </div>
      </div>
    </Card>
  );
}

// ─── REGISTER & EARN ───────────────────────────────────────────────
function Register(){
  const push = useToast();
  const allFirms = [...window.PROP_FIRMS, ...window.EXCHANGES];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      <Card padding={false}>
        <div style={{padding:'28px 32px', display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'center', background:'linear-gradient(120deg, rgba(245,197,24,0.1), transparent)', borderRadius:16}}>
          <div>
            <div className="eyebrow-lbl">Affiliate Hub</div>
            <h1 className="section-title" style={{marginTop:6}}>Register through UFC. Earn rebates, bonuses & a place in the leaderboard.</h1>
            <p className="section-sub" style={{maxWidth:600}}>Every link below is bound to your UID <span className="mono" style={{color:'var(--accent)'}}>{window.USER.uid}</span>. New accounts auto-link to the dashboard within 24 hours.</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="eyebrow-lbl">Your share rate</div>
            <div style={{fontFamily:'var(--font-display)', fontSize:48, fontWeight:700, color:'var(--accent)', lineHeight:1}}>10%</div>
            <div style={{fontSize:12, color:'var(--t-3)'}}>on every referral</div>
          </div>
        </div>
      </Card>

      <Card eyebrow="PROP FIRMS" title="Funded challenges & evals">
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
          {window.PROP_FIRMS.map(f => <FirmRegisterCard key={f.id} f={f} push={push}/>)}
        </div>
      </Card>

      <Card eyebrow="EXCHANGES" title="Spot & futures trading">
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
          {window.EXCHANGES.map(f => <FirmRegisterCard key={f.id} f={{...f, blurb:'Direct trading, fee rebate · UID auto-binds'}} push={push}/>)}
        </div>
      </Card>

      <Card eyebrow="HOW IT WORKS" title="From sign-up to first payout">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
          {[
            ['1','Pick a firm','Choose any partner — your UFC link is pre-bound.','rocket'],
            ['2','Register','Use the registration link to create your account.','user'],
            ['3','Submit UID','Add your UID via the Submit UID page.','upload'],
            ['4','Start trading','Trades and payouts surface back here.','target'],
          ].map(([n,t,d,ic],i)=>(
            <div key={i} style={{padding:'16px 16px 18px', borderRadius:12, border:'1px solid var(--line-1)', background:'var(--surf-1)'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                <div style={{fontFamily:'var(--font-display)', fontWeight:800, fontSize:24, color:'var(--accent)'}}>{n}</div>
                <Icon name={ic} size={16} style={{color:'var(--t-3)'}}/>
              </div>
              <div style={{fontWeight:600}}>{t}</div>
              <div style={{fontSize:12, color:'var(--t-3)', marginTop:4}}>{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FirmRegisterCard({ f, push }){
  return (
    <div style={{
      padding:'18px 18px 14px', borderRadius:13, border:`1px solid var(--line-1)`,
      background:'var(--surf-1)', position:'relative', overflow:'hidden',
    }}>
      <div style={{position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${f.accent}22, transparent 70%)`}}/>
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:14, position:'relative'}}>
        <FirmIcon id={f.id} size={44}/>
        <div>
          <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:16}}>{f.name}</div>
          <div style={{fontSize:11, color:'var(--t-3)'}}>{f.subtitle}</div>
        </div>
      </div>
      <div style={{fontSize:13, color:'var(--t-2)', marginBottom:14, minHeight:38}}>{f.blurb}</div>
      <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, background:'rgba(245,197,24,0.06)', border:'1px solid rgba(245,197,24,0.2)', marginBottom:12}}>
        <Icon name="sparkles" size={14} style={{color:'var(--accent)'}}/>
        <div style={{fontSize:12, color:'var(--accent-2)', fontWeight:600}}>10% rebate · auto-applied</div>
      </div>
      <div style={{display:'flex', gap:6}}>
        <button className="btn btn-primary btn-sm" style={{flex:1}}>
          <Icon name="ext" size={13}/>Register
        </button>
        <button className="btn btn-sm" style={{width:36, padding:0}} onClick={()=>push('Affiliate link copied','ok')}><Icon name="copy" size={13}/></button>
      </div>
    </div>
  );
}

// ─── LEADERBOARD ───────────────────────────────────────────────────
function Leaderboard(){
  const [view, setView] = useState('total');
  const [period, setPeriod] = useState('YTD');
  const sortKey = view==='total'? 'total' : view==='monthly'? 'monthly' : view==='jackpots'? 'jackpots' : 'streak';
  const sorted = [...window.LEADERS].sort((a,b)=>b[sortKey]-a[sortKey]);
  const top3 = sorted.slice(0,3);

  // Sprint progress
  const targetMonth = 2_000_000;
  const monthSoFar = 126_559;
  const tiers = window.RANKS;
  const tierCounts = { WHITE:573, YELLOW:29, BLUE:16, RED:11, BLACK:5 };

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* Sprint hero */}
      <Card padding={false}>
        <div style={{padding:'24px 26px', background:'linear-gradient(120deg, rgba(245,197,24,0.08), transparent)', borderRadius:16}}>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:24, marginBottom:20}}>
            <div>
              <div className="eyebrow-lbl">Monthly Sprint Challenge</div>
              <h1 className="section-title" style={{marginTop:6}}>May 2026 Target: <span style={{color:'var(--accent)'}}>${(targetMonth/1_000_000).toFixed(1)}M</span></h1>
              <div className="section-sub">Combined jackpots + prop firm withdrawals · Updated daily</div>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <span className="pill"><Icon name="trophy" size={11}/>Jackpot wins · 12</span>
                <span className="pill"><Icon name="fire" size={11}/>New funded · 41</span>
              </div>
            </div>
            <div style={{display:'flex', gap:8}}>
              {['23','16','14'].map((v,i)=>(
                <div key={i} style={{minWidth:50, padding:'10px 8px', borderRadius:9, background:'var(--surf-2)', border:'1px solid var(--line-1)', textAlign:'center'}}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'var(--accent)', lineHeight:1}}>{v}</div>
                  <div style={{fontSize:10, color:'var(--t-3)', marginTop:4}}>{['DAYS','HRS','MIN'][i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:8}}>
            <div style={{fontFamily:'var(--font-display)', fontSize:32, fontWeight:700, color:'var(--accent)'}}>${monthSoFar.toLocaleString()}</div>
            <div style={{color:'var(--t-3)', fontSize:13}}>Goal: ${targetMonth.toLocaleString()}</div>
          </div>
          <div className="bar" style={{height:8}}>
            <div className="bar-fill" style={{width:`${(monthSoFar/targetMonth*100)}%`}}/>
            {[100_000, 250_000, 500_000, 750_000].map(v=>{
              const left = v/targetMonth*100;
              return <div key={v} className="bar-tick" style={{left:`${left}%`}}/>;
            })}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', marginTop:8, fontSize:10, color:'var(--t-4)', fontWeight:700, letterSpacing:'0.12em'}}>
            <span>$0</span><span style={{textAlign:'center'}}>$100K</span><span style={{textAlign:'center'}}>$250K</span><span style={{textAlign:'center'}}>$500K</span><span style={{textAlign:'right'}}>$2M</span>
          </div>
        </div>
      </Card>

      {/* Trader rank stat row */}
      <Card eyebrow="TRADER RANK SYSTEM" title="Community at a glance">
        <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:10}}>
          {tiers.map(r => (
            <div key={r.code} style={{padding:'16px 16px', borderRadius:11, border:'1px solid var(--line-1)', background:'var(--surf-1)', textAlign:'center', position:'relative', overflow:'hidden'}}>
              <div style={{height:3, position:'absolute', left:0, right:0, top:0, background: getRankColor(r.code)}}/>
              <div className="eyebrow-lbl" style={{color: getRankColor(r.code)}}>{r.label}</div>
              <div style={{fontSize:10, color:'var(--t-3)', marginTop:4}}>${r.from.toLocaleString()} — {r.to===Infinity?'∞':'$'+r.to.toLocaleString()}</div>
              <div style={{fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, marginTop:10}}>{tierCounts[r.code]}</div>
              <div style={{fontSize:10, color:'var(--t-3)'}}>traders</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Podium */}
      <Card eyebrow={`TOP 3 — ${view.toUpperCase()}`} title="Podium">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.2fr 1fr', gap:12, alignItems:'flex-end'}}>
          {[top3[1], top3[0], top3[2]].map((t,i)=>{
            if(!t) return null;
            const place = [2,1,3][i];
            const a = window.helpers.archBy(t.archetype);
            const heights = [110, 140, 90];
            return (
              <div key={t.name} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10}}>
                <div style={{position:'relative'}}>
                  <Avatar name={t.name} size={place===1?64:50}/>
                  {place===1 && <div style={{position:'absolute', top:-18, left:'50%', transform:'translateX(-50%)', color:'var(--accent)'}}><Icon name="crown" size={22}/></div>}
                </div>
                <div style={{textAlign:'center'}}>
                  <div style={{fontWeight:600, fontSize:place===1?14:13}}>{t.name}</div>
                  <div style={{fontSize:11, color:a.color, marginTop:2}}>{t.archetype} · {window.helpers.rankBy(t.rank).label}</div>
                </div>
                <div style={{
                  width:'100%', height:heights[i], borderRadius:'10px 10px 0 0',
                  background: place===1 ? 'linear-gradient(180deg, var(--accent), rgba(245,197,24,0.2))' : 'linear-gradient(180deg, var(--surf-3), var(--surf-1))',
                  border: place===1 ? 'none' : '1px solid var(--line-1)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', paddingTop:14,
                  color: place===1?'#0a0a0a':'var(--t-1)',
                }}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, lineHeight:1}}>{place}</div>
                  <div style={{fontFamily:'var(--font-display)', fontSize:14, fontWeight:700, marginTop:6}}>${t[sortKey].toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard table */}
      <Card eyebrow="TOTAL WITHDRAWAL LEADERBOARD" title="Live UFC ranking"
        action={
          <div style={{display:'flex', gap:8}}>
            <div style={{display:'flex', background:'var(--surf-1)', border:'1px solid var(--line-1)', borderRadius:9, padding:3}}>
              {['total','monthly','jackpots','streak'].map(k=>(
                <button key={k} onClick={()=>setView(k)} style={{padding:'6px 11px', borderRadius:6, fontSize:11, fontWeight:600, textTransform:'capitalize', background: view===k?'var(--surf-3)':'transparent', color: view===k?'var(--t-1)':'var(--t-3)'}}>{k}</button>
              ))}
            </div>
            <div style={{display:'flex', background:'var(--surf-1)', border:'1px solid var(--line-1)', borderRadius:9, padding:3}}>
              {['YTD','90D','30D','7D'].map(k=>(
                <button key={k} onClick={()=>setPeriod(k)} style={{padding:'6px 10px', borderRadius:6, fontSize:11, fontWeight:600, background: period===k?'var(--surf-3)':'transparent', color: period===k?'var(--t-1)':'var(--t-3)'}}>{k}</button>
              ))}
            </div>
          </div>
        }>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width:36}}>#</th><th>Trader</th><th>Archetype</th>
              <th style={{textAlign:'right'}}>Streak</th>
              <th style={{textAlign:'right'}}>Jackpots</th>
              <th style={{textAlign:'right'}}>Monthly</th>
              <th style={{textAlign:'right'}}>{view==='total'?'Total':view.charAt(0).toUpperCase()+view.slice(1)}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t,i)=>{
              const a = window.helpers.archBy(t.archetype);
              return (
                <tr key={t.name} style={t.isMe?{background:'rgba(245,197,24,0.06)', boxShadow:'inset 3px 0 0 var(--accent)'}:{}}>
                  <td style={{fontFamily:'var(--font-display)', fontWeight:700, color: i<3?'var(--accent)':'var(--t-3)'}}>#{i+1}</td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                      <Avatar name={t.name} size={28}/>
                      <div>
                        <div style={{fontWeight:600}}>{t.name} {t.isMe && <span style={{color:'var(--accent)', fontSize:10, marginLeft:6}}>YOU</span>}</div>
                        <div style={{display:'flex', gap:6, marginTop:2}}><RankChip code={t.rank}/></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div style={{width:24, height:24, borderRadius:6, background:`center/cover url(${a.img})`, border:`1px solid ${a.color}55`}}/>
                      <span style={{fontFamily:'var(--font-display)', fontWeight:700, color:a.color, fontSize:12}}>{t.archetype}</span>
                    </div>
                  </td>
                  <td style={{textAlign:'right'}}><Icon name="fire" size={12} style={{color:'#f97316', verticalAlign:-2}}/> {t.streak}</td>
                  <td style={{textAlign:'right', color:'var(--t-2)'}}>{t.jackpots}</td>
                  <td style={{textAlign:'right', color:'var(--t-2)'}}>${t.monthly.toLocaleString()}</td>
                  <td style={{textAlign:'right', fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, color: i<3?'var(--accent)':'var(--t-1)'}}>${t[sortKey].toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function getRankColor(code){
  return ({WHITE:'#e7eaf2',YELLOW:'#f5c518',BLUE:'#3b82f6',RED:'#ef4444',BLACK:'#cfcfcf'})[code];
}

// ─── UPCOMING EVENTS ───────────────────────────────────────────────
function Events(){
  const push = useToast();
  const [filter, setFilter] = useState('All');
  const events = [
    { id:1, date:'May 17', time:'15:00 SGT', dow:'SAT', title:'Monthly Sprint Recap & Awards Night', host:'UFC Team', venue:'Marina Bay Sands · Sapphire Ballroom', city:'Singapore', type:'Meetup', tag:'Community', mins:240, joined:312, capacity:400 },
    { id:2, date:'May 24', time:'19:00 SGT', dow:'SAT', title:'Black Traders Dinner — Invite Only', host:'Wei Sheng · Jia Wei · LittleMax', venue:'Burnt Ends, Dempsey', city:'Singapore', type:'Dinner', tag:'VIP', mins:180, joined:24, capacity:32 },
    { id:3, date:'Jun 07', time:'10:00 MYT', dow:'SAT', title:'KL Trader Bootcamp — PWLT Sniper Setup Lab', host:'Coach Edmund', venue:'Sunway Resort, Selangor', city:'Kuala Lumpur', type:'Workshop', tag:'Education', mins:480, joined:64, capacity:80 },
    { id:4, date:'Jun 14', time:'09:00 SGT', dow:'SAT', title:'UFC Founders Brunch — Coffee & Charts', host:'Founder Circle', venue:'Atlas Bar, Parkview Square', city:'Singapore', type:'Meetup', tag:'Community', mins:180, joined:46, capacity:60 },
    { id:5, date:'Jun 21', time:'10:00 SGT', dow:'SAT', title:'Prop Firm Expo — Meet FundedXYZ · BitFunded · PropW', host:'UFC × Partners', venue:'Suntec Convention, Hall 401', city:'Singapore', type:'Expo', tag:'Partners', mins:360, joined:721, capacity:1500 },
    { id:6, date:'Jul 12', time:'09:00 SGT', dow:'SAT', title:'Annual Summit 2026 — Two Days, One Edge', host:'UFC Team', venue:'Capella Sentosa', city:'Sentosa Island', type:'Summit', tag:'Flagship', mins:2880, joined:198, capacity:300 },
    { id:7, date:'Aug 02', time:'10:00 HKT', dow:'SAT', title:'HK Hands-on: MODL Quant Lab', host:'Coach Aqxuan10', venue:'Cyberport, Pokfulam', city:'Hong Kong', type:'Workshop', tag:'Education', mins:360, joined:38, capacity:60 },
  ];
  const types = ['All','Meetup','Workshop','Expo','Summit','Dinner'];
  const filtered = filter==='All' ? events : events.filter(e=>e.type===filter);
  const next = events[0];

  const typeColor = {
    Meetup:'#3b82f6', Workshop:'#22c55e', Expo:'#a855f7', Summit:'#f5c518', Dinner:'#ef4444'
  };

  return (
    <div>
      <PageHeader
        eyebrow="IN-PERSON MEETUPS · WORKSHOPS · SUMMITS"
        title={<>Upcoming <span style={{color:'var(--accent)'}}>events</span></>}
        sub="Offline gatherings only — for online sessions, head to Discord Live. RSVP to lock your seat."
        action={
          <button className="btn btn-primary btn-sm" onClick={()=>push('Calendar exported','ok')}>
            <Icon name="cal" size={14}/> Add to calendar
          </button>
        }
      />

      {/* Featured next event */}
      <Card style={{marginBottom:24, padding:0, overflow:'hidden', background:'linear-gradient(135deg, rgba(245,197,24,0.08), rgba(239,68,68,0.06) 60%, var(--surf-1))'}}>
        <div style={{display:'grid', gridTemplateColumns:'170px 1fr auto', gap:24, padding:24, alignItems:'center'}}>
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:'18px 14px', background:'rgba(0,0,0,0.35)',
            border:'1px solid var(--line-1)', borderRadius:14,
          }}>
            <div style={{fontSize:11, fontWeight:700, color:typeColor[next.type], letterSpacing:'0.16em'}}>NEXT UP</div>
            <div style={{fontFamily:'var(--font-display)', fontSize:42, fontWeight:800, color:'var(--accent)', lineHeight:1, marginTop:6}}>
              {next.date.split(' ')[1]}
            </div>
            <div style={{fontSize:13, fontWeight:600, color:'var(--t-2)', marginTop:2}}>{next.date.split(' ')[0]} · {next.dow}</div>
            <div style={{fontSize:11, color:'var(--t-3)', marginTop:8, fontFamily:'var(--font-mono)'}}>{next.time}</div>
          </div>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
              <span style={{
                fontSize:10, fontWeight:700, letterSpacing:'0.14em',
                padding:'4px 10px', borderRadius:6,
                background:`${typeColor[next.type]}22`, color:typeColor[next.type],
                border:`1px solid ${typeColor[next.type]}55`,
              }}>{next.type.toUpperCase()}</span>
              <span style={{fontSize:11, color:'var(--t-3)'}}>{next.tag} · {next.joined}/{next.capacity} seats</span>
            </div>
            <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, lineHeight:1.2, marginBottom:6}}>
              {next.title}
            </div>
            <div style={{fontSize:13, color:'var(--t-3)', marginBottom:4}}>
              <Icon name="map-pin" size={12} style={{display:'inline', verticalAlign:'-2px', marginRight:4}}/>
              <span style={{color:'var(--t-1)', fontWeight:600}}>{next.venue}</span> · {next.city}
            </div>
            <div style={{fontSize:13, color:'var(--t-3)'}}>Hosted by <span style={{color:'var(--t-1)', fontWeight:600}}>{next.host}</span></div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <button className="btn btn-primary" onClick={()=>push('RSVP confirmed. See you there!','ok')}>
              <Icon name="check" size={14}/> RSVP
            </button>
            <button className="btn btn-ghost btn-sm" onClick={()=>push('Reminder set','ok')}>
              <Icon name="bell" size={13}/> Remind me
            </button>
          </div>
        </div>
      </Card>

      {/* Filter chips */}
      <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>
        {types.map(t=>(
          <button key={t} onClick={()=>setFilter(t)} style={{
            padding:'7px 14px', fontSize:12, fontWeight:600,
            borderRadius:99,
            border:`1px solid ${filter===t ? 'var(--accent)' : 'var(--line-1)'}`,
            background: filter===t ? 'rgba(245,197,24,0.12)' : 'var(--surf-1)',
            color: filter===t ? 'var(--accent)' : 'var(--t-2)',
          }}>{t}</button>
        ))}
        <div style={{flex:1}}/>
        <div style={{fontSize:11, color:'var(--t-4)', alignSelf:'center'}}>{filtered.length} events</div>
      </div>

      {/* Events list */}
      <Card padding={false}>
        <div>
          {filtered.map((e, i) => (
            <div key={e.id} style={{
              display:'grid', gridTemplateColumns:'90px 1fr auto auto', gap:20, alignItems:'center',
              padding:'16px 20px',
              borderBottom: i < filtered.length-1 ? '1px dashed rgba(255,255,255,0.05)' : 'none',
            }}>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:10, fontWeight:700, color:'var(--t-4)', letterSpacing:'0.14em'}}>{e.dow}</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'var(--t-1)', lineHeight:1.1, marginTop:2}}>{e.date.split(' ')[1]}</div>
                <div style={{fontSize:10, color:'var(--t-3)', fontFamily:'var(--font-mono)', marginTop:4}}>{e.time.split(' ')[0]}</div>
              </div>
              <div>
                <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:4}}>
                  <span style={{
                    fontSize:9, fontWeight:700, letterSpacing:'0.14em',
                    padding:'3px 8px', borderRadius:5,
                    background:`${typeColor[e.type]}22`, color:typeColor[e.type],
                  }}>{e.type.toUpperCase()}</span>
                  <span style={{fontSize:11, color:'var(--t-4)'}}>{e.tag}</span>
                </div>
                <div style={{fontSize:14, fontWeight:600, color:'var(--t-1)', marginBottom:2}}>{e.title}</div>
                <div style={{fontSize:11, color:'var(--t-3)'}}>
                  <Icon name="map-pin" size={10} style={{display:'inline', verticalAlign:'-1px', marginRight:3}}/>
                  {e.venue} · {e.city} · {e.joined}/{e.capacity} seats
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={()=>push('Reminder set','ok')}>
                <Icon name="bell" size={12}/>
              </button>
              <button className="btn btn-primary btn-sm" onClick={()=>push('RSVP confirmed','ok')}>RSVP</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { ELearning, Register, Leaderboard, Events });
