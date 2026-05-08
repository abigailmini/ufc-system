/* global window, React */
// Discord Live page + Profile/Settings page

const { useState } = React;
const { Icon, Card, Avatar, useToast } = window;

// ─── DISCORD ───────────────────────────────────────────────────────
function Discord({ liveOn, setLiveOn }){
  const live = window.LIVE_SCHEDULE.find(s=>s.live);
  const push = useToast();

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* Live banner */}
      <Card padding={false}>
        <div className="discord-hero-grid" style={{
          padding:'24px 28px', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:24, alignItems:'center',
          background: liveOn
            ? 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(239,68,68,0.18), transparent 70%), linear-gradient(180deg, var(--surf-1), var(--surf-0))'
            : 'linear-gradient(180deg, var(--surf-1), var(--surf-0))',
          borderRadius:16,
          border: liveOn ? '1px solid rgba(239,68,68,0.3)' : '1px solid var(--line-1)',
          position:'relative', overflow:'hidden',
        }}>
          {/* Decorative background */}
          <svg className="discord-hero-art" style={{position:'absolute', right:-20, top:-20, opacity:0.12, pointerEvents:'none', width:'min(280px, 72vw)', height:'auto', maxWidth:'100%'}} width="280" height="280" viewBox="0 0 100 100">
            <path d="M30 30 h40 a8 8 0 0 1 8 8 v24 a8 8 0 0 1-8 8 h-30 l-12 8 v-8 a8 8 0 0 1-8-8 v-24 a8 8 0 0 1 8-8 z" fill="#5865f2"/>
          </svg>

          <div style={{position:'relative'}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
              {liveOn ? (
                <>
                  <span className="dot dot-pulse" style={{color:'#ef4444', width:10, height:10}}/>
                  <span style={{fontSize:11, fontWeight:800, letterSpacing:'0.18em', color:'#ef4444'}}>LIVE NOW</span>
                </>
              ) : (
                <span className="pill"><span className="dot" style={{background:'var(--t-4)'}}/>Offline</span>
              )}
              <span style={{fontSize:12, color:'var(--t-3)'}}>· {live?.host} hosting</span>
            </div>
            <h1 className="section-title" style={{fontSize:36, lineHeight:1.1}}>
              {liveOn ? <>Daily Live · <span style={{color:'#ef4444'}}>{live?.topic}</span></> : 'Catch the next Daily Live'}
            </h1>
            <p className="section-sub" style={{fontSize:14, marginTop:8, maxWidth:540}}>
              UFC's Discord is where coaches walk live trades, run risk drills, and answer questions in voice channels.
              Join 2,400+ traders.
            </p>
            <div className="discord-hero-actions" style={{display:'flex', gap:10, marginTop:18}}>
              <button onClick={()=>push('Opening Discord…','info')} className="btn btn-primary btn-lg" style={{
                background: liveOn ? 'linear-gradient(180deg, #ef4444, #c41a1a)' : undefined,
                color: liveOn ? '#fff' : undefined,
                boxShadow: liveOn ? '0 8px 24px -8px rgba(239,68,68,0.6)' : undefined,
              }}>
                <Icon name="discord" size={16}/>
                {liveOn ? 'Join the live now' : 'Open UFC Discord'}
              </button>
              <button onClick={()=>setLiveOn(v=>!v)} className="btn btn-lg btn-ghost">
                <Icon name="bell" size={14}/>{liveOn?'Pause live alert':'Notify when live'}
              </button>
            </div>
          </div>

          <div style={{position:'relative'}}>
            <div style={{
              position:'relative', borderRadius:14, padding:'18px 18px 16px',
              background:'rgba(0,0,0,0.4)', backdropFilter:'blur(8px)',
              border:'1px solid var(--line-2)',
            }}>
              <div className="eyebrow-lbl">Stream stats</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:10}}>
                <DiscordStat label="In voice" value={liveOn?'248':'—'} icon="user"/>
                <DiscordStat label="Watchers" value={liveOn?'612':'—'} icon="eye"/>
                <DiscordStat label="Members" value="2,418" icon="user"/>
                <DiscordStat label="Today's calls" value="14" icon="target"/>
              </div>
              <div style={{marginTop:14, padding:'10px 12px', borderRadius:9, border:'1px dashed var(--line-2)', display:'flex', alignItems:'center', gap:10}}>
                <Icon name="link" size={14} style={{color:'var(--t-3)'}}/>
                <span className="mono" style={{fontSize:12, color:'var(--t-2)', flex:1}}>discord.gg/unity-fund</span>
                <button className="btn btn-sm btn-ghost" style={{height:26, padding:'0 8px'}} onClick={()=>push('Invite copied','ok')}><Icon name="copy" size={12}/></button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* This week */}
      <Card eyebrow="THIS WEEK'S SCHEDULE" title="Daily Live calendar"
        action={<button className="btn btn-sm" onClick={()=>push('Calendar synced','ok')}><Icon name="cal" size={13}/>Add to calendar</button>}>
        <div className="discord-schedule-grid" style={{display:'grid', gridTemplateColumns:'repeat(5, minmax(0, 1fr))', gap:10}}>
          {window.LIVE_SCHEDULE.map(s => (
            <div key={s.day} style={{
              padding:'14px 14px', borderRadius:12,
              background: s.live ? 'linear-gradient(180deg, rgba(239,68,68,0.15), transparent)' : 'var(--surf-1)',
              border: s.live ? '1px solid rgba(239,68,68,0.4)' : '1px solid var(--line-1)',
              position:'relative',
            }}>
              {s.live && <div style={{position:'absolute', top:10, right:10, display:'flex', alignItems:'center', gap:4}}>
                <span className="dot dot-pulse" style={{color:'#ef4444', width:6, height:6}}/>
                <span style={{fontSize:9, fontWeight:800, color:'#ef4444', letterSpacing:'0.14em'}}>LIVE</span>
              </div>}
              <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color: s.live?'#ef4444':'var(--accent)'}}>{s.day}</div>
              <div style={{fontSize:11, color:'var(--t-3)', marginBottom:10}}>{s.time}</div>
              <div style={{fontWeight:600, fontSize:13}}>{s.topic}</div>
              <div style={{display:'flex', alignItems:'center', gap:6, marginTop:8}}>
                <Avatar name={s.host} size={22}/>
                <span style={{fontSize:11, color:'var(--t-2)'}}>{s.host}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Discord channels overview */}
      <div className="discord-content-grid" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:16}}>
        <Card eyebrow="CHANNELS" title="Where the action is">
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            {[
              ['📣','announcements','Coach K · 14m ago','Daily Live starts in 30 min',true],
              ['🎯','live-calls','aqxuan10 · 2m ago','BTC long 67200 stop 66800',true],
              ['🧬','genetic-archetypes','Sara · 1h ago','Took the test — got MODL!',false],
              ['💰','withdrawal-flex','LittleMax · 5h ago','Just hit $108K total 🎉',false],
              ['🏆','leaderboard-chat','Mike Chan · 1d ago','Top 4 baby',false],
              ['❓','help','Newbie · 8m ago','How do I link BitFunded?',false],
            ].map(([icon, name, sub, last, hot]) => (
              <div key={name} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:9, background: hot?'rgba(239,68,68,0.05)':'transparent', border: '1px solid '+(hot?'rgba(239,68,68,0.18)':'transparent')}}>
                <div style={{fontSize:18}}>{icon}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span style={{fontWeight:600, fontSize:13}}># {name}</span>
                    {hot && <span style={{padding:'1px 6px', borderRadius:5, background:'#ef4444', color:'#fff', fontSize:9, fontWeight:700}}>HOT</span>}
                  </div>
                  <div style={{fontSize:12, color:'var(--t-3)', marginTop:1}}>{last}</div>
                </div>
                <div style={{fontSize:10, color:'var(--t-4)'}}>{sub.split('·')[1]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card eyebrow="JOIN VOICE" title="Active rooms">
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {[
              ['🎙 Coach K — Daily Live', 248, true],
              ['🎙 Free chat #1', 36, false],
              ['🎙 Asia session', 14, false],
              ['🎙 Quiet study', 4, false],
            ].map(([name, count, live])=>(
              <div key={name} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:9, border:'1px solid '+(live?'rgba(239,68,68,0.4)':'var(--line-1)'), background:'var(--surf-1)'}}>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>{name}</div>
                  <div style={{fontSize:11, color:'var(--t-3)', marginTop:2}}>{count} listening</div>
                </div>
                <button className="btn btn-sm" style={{
                  background: live?'#ef4444':undefined,
                  color: live?'#fff':undefined,
                  borderColor: live?'#ef4444':undefined,
                }}>{live?'Join live':'Join'}</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DiscordStat({ label, value, icon }){
  return (
    <div style={{padding:'10px 12px', borderRadius:9, background:'rgba(255,255,255,0.03)', border:'1px solid var(--line-1)'}}>
      <div className="eyebrow-lbl">{label}</div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6}}>
        <Icon name={icon} size={14} style={{color:'var(--t-3)'}}/>
        <span style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:700}}>{value}</span>
      </div>
    </div>
  );
}

// ─── PROFILE ───────────────────────────────────────────────────────
function Profile(){
  const u = window.USER;
  const arch = window.helpers.archBy(u.archetype);
  const push = useToast();
  const [tab, setTab] = useState('account');

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* Identity hero */}
      <Card padding={false}>
        <div className="profile-hero" style={{padding:'24px 26px', display:'flex', alignItems:'center', gap:20}}>
          <div style={{
            width:88, height:88, borderRadius:18, position:'relative',
            background:`center/cover url(${arch.img})`,
            border:`2px solid ${arch.color}`, flexShrink:0,
            boxShadow:`0 8px 26px -8px ${arch.color}`,
          }}>
            <div style={{position:'absolute', bottom:-8, right:-8, padding:'2px 7px', borderRadius:5, background:'var(--accent)', color:'#0a0a0a', fontSize:10, fontWeight:800}}>VIP {u.vip}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
              <h1 style={{fontFamily:'var(--font-display)', fontSize:28, fontWeight:600, margin:0}}>{u.name}</h1>
              <button className="btn btn-sm btn-ghost" onClick={()=>push('Profile editor opened','info')}>Edit</button>
            </div>
            <div style={{display:'flex', gap:8}}>
              <span className="pill mono">UID {u.uid}</span>
              <span className="rank rank-white">{window.helpers.rankBy(u.rank).label}</span>
              <span className="pill" style={{color:arch.color, borderColor:`${arch.color}55`}}>{u.archetype}-D · {u.archetype_name}</span>
              <span className="pill pill-mythic">★ {u.rarity}</span>
            </div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn"><Icon name="share" size={14}/>Share profile</button>
          </div>
        </div>
        <div style={{display:'flex', borderTop:'1px solid var(--line-1)'}}>
          {['account','security','notifications','preferences','team'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{
              flex:1, padding:'14px 0', textTransform:'capitalize', fontWeight:600, fontSize:13,
              color: tab===t ? 'var(--accent)' : 'var(--t-3)',
              borderBottom: tab===t ? '2px solid var(--accent)' : '2px solid transparent',
            }}>{t}</button>
          ))}
        </div>
      </Card>

      {tab==='account' && <AccountTab push={push}/>}
      {tab==='security' && <SecurityTab push={push}/>}
      {tab==='notifications' && <NotifTab push={push}/>}
      {tab==='preferences' && <PrefsTab push={push}/>}
      {tab==='team' && <TeamTab/>}
    </div>
  );
}

function AccountTab({ push }){
  const u = window.USER;
  return (
    <div className="account-tab-grid" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, alignItems:'flex-start'}}>
      <Card eyebrow="ACCOUNT INFO" title="Personal details">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <Field label="Display name" value={u.name}/>
          <Field label="Email" value="khong@unitycrypto.com"/>
          <Field label="UFC UID" value={u.uid} mono/>
          <Field label="Referrer" value={u.ref}/>
          <Field label="Country" value="Singapore 🇸🇬"/>
          <Field label="Time zone" value="GMT+8 SGT"/>
        </div>
        <div style={{marginTop:14, padding:'12px 14px', borderRadius:11, background:'var(--surf-1)', border:'1px solid var(--line-1)', display:'flex', alignItems:'center', gap:12}}>
          <Icon name="sparkles" size={18} style={{color:'var(--accent)'}}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:13}}>Your referral link is active</div>
            <div className="mono" style={{fontSize:12, color:'var(--t-3)', marginTop:2}}>ufc.unitycrypto.com/r/{u.uid}</div>
          </div>
          <button className="btn btn-sm" onClick={()=>push('Referral link copied','ok')}><Icon name="copy" size={13}/>Copy</button>
        </div>
      </Card>
      <Card eyebrow="LINKED ACCOUNTS" title="Exchanges & firms">
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {[...window.PROP_FIRMS, ...window.EXCHANGES].map(f => {
            const linked = window.ACCOUNTS.find(g=>g.firm===f.id)?.uids?.length || 0;
            return (
              <div key={f.id} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:9, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
                <window.FirmIcon id={f.id} size={32}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, fontSize:13}}>{f.name}</div>
                  <div style={{fontSize:11, color: linked ? 'var(--ok)':'var(--t-3)'}}>{linked ? `${linked} UIDs · linked` : 'Not linked'}</div>
                </div>
                <button className="btn btn-sm">{linked?'Manage':'Link'}</button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function SecurityTab({ push }){
  return (
    <Card eyebrow="SECURITY" title="Account protection">
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {[
          ['Password','Last changed 12 days ago','Change'],
          ['Two-factor (TOTP)','Enabled · Authy','Reset'],
          ['Active sessions','3 sessions across 2 devices','Manage'],
          ['Withdrawal address (USDT)','TRC-20 · ending in 4j2K','Update'],
        ].map(([t,d,a]) => (
          <div key={t} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderRadius:9, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
            <div>
              <div style={{fontWeight:600, fontSize:13}}>{t}</div>
              <div style={{fontSize:12, color:'var(--t-3)', marginTop:2}}>{d}</div>
            </div>
            <button className="btn btn-sm" onClick={()=>push(`${t} updated`,'ok')}>{a}</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NotifTab({ push }){
  const [s, setS] = useState({live:true, jackpot:true, withdrawal:true, leaderboard:false, weekly:true, marketing:false});
  return (
    <Card eyebrow="NOTIFICATIONS" title="What you'd like to hear about">
      <div style={{display:'flex', flexDirection:'column', gap:6}}>
        {[
          ['live','Daily Live going on Discord'],
          ['jackpot','Jackpot wins on your UIDs'],
          ['withdrawal','Withdrawal status changes'],
          ['leaderboard','Leaderboard rank changes'],
          ['weekly','Weekly community digest'],
          ['marketing','New courses, partner promos'],
        ].map(([k,t]) => (
          <label key={k} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderRadius:9, background:'var(--surf-1)', border:'1px solid var(--line-1)', cursor:'pointer'}}>
            <span style={{fontSize:13}}>{t}</span>
            <Toggle on={s[k]} onChange={v=>setS(p=>({...p,[k]:v}))}/>
          </label>
        ))}
      </div>
    </Card>
  );
}

function PrefsTab({ push }){
  return (
    <Card eyebrow="PREFERENCES" title="Display & data">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <Field label="Currency display" value="USD"/>
        <Field label="Number format" value="1,234.56"/>
        <Field label="Default landing page" value="Dashboard"/>
        <Field label="Sound effects" value="Off"/>
      </div>
      <div style={{marginTop:14, fontSize:12, color:'var(--t-3)'}}>Want more visual control? Open the <strong style={{color:'var(--accent)'}}>Tweaks</strong> panel from the toolbar to play with theme, density, and sidebar.</div>
    </Card>
  );
}

function TeamTab(){
  return (
    <Card eyebrow="TEAM" title="The coaches you train with">
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
        {['Coach K','Coach Sara','Coach Liu','Coach Mira','Coach Dion','Coach Vlad'].map(n => (
          <div key={n} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:11, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
            <Avatar name={n} size={42}/>
            <div>
              <div style={{fontWeight:600, fontSize:13}}>{n}</div>
              <div style={{fontSize:11, color:'var(--t-3)'}}>Mentor · UFC</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Field({ label, value, mono }){
  return (
    <div style={{padding:'10px 12px', borderRadius:9, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
      <div className="eyebrow-lbl">{label}</div>
      <div className={mono?'mono':''} style={{marginTop:4, fontSize:14, fontWeight:600}}>{value}</div>
    </div>
  );
}

function Toggle({ on, onChange }){
  return (
    <button onClick={()=>onChange(!on)} style={{
      width:36, height:20, borderRadius:99,
      background: on ? 'var(--accent)' : 'var(--surf-3)',
      position:'relative', transition:'.15s',
    }}>
      <div style={{
        position:'absolute', top:2, left: on?18:2, width:16, height:16, borderRadius:99,
        background:'#0a0a0a', transition:'.15s',
      }}/>
    </button>
  );
}

Object.assign(window, { Discord, Profile });
