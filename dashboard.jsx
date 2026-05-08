/* global window, React */
// Dashboard page — main hub view

const { useState } = React;
const { Icon, Avatar, Sparkline, WLStrip, RankChip, HexBadge, Card, FirmIcon, useToast, Modal } = window;

function Dashboard({ setRoute }){
  const u = window.USER;
  const arch = window.helpers.archBy(u.archetype);
  const ranks = window.RANKS;
  const pct = u.withdrawn / u.withdrawal_goal * 100;
  const push = useToast();
  const [reveal, setReveal] = useState(false);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>

      {/* Hero row: profile card (left) + genetic card (right) */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16}}>
        {/* Profile card */}
        <Card padding={false}>
          <div style={{padding:'20px 22px', display:'flex', flexDirection:'column', gap:18}}>
            {/* Identity row */}
            <div style={{display:'flex', alignItems:'center', gap:16}}>
              <div style={{position:'relative'}}>
                <div style={{
                  width:72, height:72, borderRadius:14,
                  background:`center/cover url(${arch.img})`,
                  border:`2px solid ${arch.color}`,
                  boxShadow:`0 6px 20px -6px ${arch.color}`,
                }}/>
                <div style={{position:'absolute', bottom:-6, right:-6, padding:'2px 6px', borderRadius:5, background:'var(--accent)', color:'#0a0a0a', fontSize:9, fontWeight:800, fontFamily:'var(--font-display)'}}>VIP {u.vip}</div>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:4}}>
                  <div className="eyebrow-lbl">Welcome back</div>
                  <RankChip code={u.rank}/>
                  <span className="pill pill-warn"><span className="dot" style={{background:'var(--accent)'}}/>VIP {u.vip}</span>
                </div>
                <div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:24, letterSpacing:'-0.01em'}}>{u.name}</div>
                <div style={{display:'flex', gap:8, marginTop:6}}>
                  <span className="pill mono">UID {u.uid}</span>
                  <span className="pill mono">REF {u.ref}</span>
                </div>
              </div>
            </div>

            {/* Archetype banner */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px', borderRadius:12,
              background:`linear-gradient(90deg, ${arch.color}22, transparent)`,
              border:`1px solid ${arch.color}33`,
            }}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{
                  fontFamily:'var(--font-display)', fontWeight:800, fontSize:14, letterSpacing:'0.02em',
                  color:arch.color, padding:'3px 8px', borderRadius:6, background:`${arch.color}22`, border:`1px solid ${arch.color}55`,
                }}>{u.archetype}-D</div>
                <div style={{fontWeight:600}}>{u.archetype_name}</div>
                <div className="cjk" style={{color:'var(--t-3)', fontSize:13}}>{arch.cn}</div>
              </div>
              <span className="pill pill-mythic">★ {u.rarity}</span>
            </div>

            {/* Quick action tiles */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <button onClick={()=>setRoute('submit')} style={{
                display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderRadius:11,
                background:'linear-gradient(180deg, rgba(245,197,24,0.16), rgba(245,197,24,0.04))',
                border:'1px solid rgba(245,197,24,0.28)', textAlign:'left',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:9, background:'rgba(245,197,24,0.22)',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)',
                }}><Icon name="upload" size={18}/></div>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>Submit UID</div>
                  <div style={{fontSize:11, color:'var(--t-3)'}}>Add new exchange account</div>
                </div>
              </button>
              <button onClick={()=>setRoute('elearning')} style={{
                display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderRadius:11,
                background:'var(--surf-1)', border:'1px solid var(--line-1)', textAlign:'left',
              }}>
                <div style={{
                  width:36, height:36, borderRadius:9, background:'rgba(96,165,250,0.16)',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'#60a5fa',
                }}><Icon name="play" size={16}/></div>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>Watch tutorial</div>
                  <div style={{fontSize:11, color:'var(--t-3)'}}>e-Learning library</div>
                </div>
              </button>
            </div>

            {/* Withdrawal progress */}
            <div>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                  <div className="eyebrow-lbl">Withdrawal progress</div>
                  <span style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, color:'var(--accent)'}}>${(u.withdrawn/1000).toFixed(1)}K</span>
                  <span style={{fontSize:12, color:'var(--t-3)'}}>/ ${(u.withdrawal_goal/1000).toFixed(0)}K</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--t-3)'}}>
                  <Icon name="arrow-right" size={12}/> Yellow
                </div>
              </div>
              <div className="bar" style={{height:10}}>
                <div className="bar-fill" style={{width: `${pct}%`}}/>
                {ranks.slice(1).map((r,i)=>{
                  const left = ((i+1)/(ranks.length-1))*100;
                  return <div key={r.code} className="bar-tick" style={{left:`${left}%`}}/>;
                })}
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', marginTop:10, fontSize:10, fontWeight:700, letterSpacing:'0.12em'}}>
                {ranks.map((r,i)=>(
                  <div key={r.code} style={{
                    textAlign: i===0?'left':i===ranks.length-1?'right':'center',
                    color: i===0 ? 'var(--accent)' : 'var(--t-4)',
                  }}>{r.code}</div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
                <div className="eyebrow-lbl">Achievements</div>
                <button onClick={()=>setRoute('profile')} style={{fontSize:12, color:'var(--accent)', fontWeight:600, display:'flex', alignItems:'center', gap:4}}>View all <Icon name="arrow-right" size={12}/></button>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:8}}>
                {window.ACHIEVEMENTS.map(a=> <window.Badge key={a.id} a={a} size={96}/>)}
              </div>
            </div>
          </div>
        </Card>

        {/* Genetic card */}
        <Card padding={false}>
          <div style={{padding:14, display:'flex', flexDirection:'column', gap:12, height:'100%'}}>
            <div style={{
              position:'relative', borderRadius:12, overflow:'hidden',
              background:`center/cover url(${arch.img})`,
              border:'2px solid var(--accent)',
              aspectRatio:'9/12',
              boxShadow:'0 0 0 1px rgba(245,197,24,0.2), 0 14px 40px -10px var(--accent-glow)',
            }}>
              {/* Top label */}
              <div style={{position:'absolute', top:10, left:14, fontFamily:'var(--font-display)', fontWeight:800, fontSize:34, color:arch.color, letterSpacing:'0.02em', mixBlendMode:'multiply'}}>{u.archetype}</div>
              <div className="cjk" style={{position:'absolute', top:48, left:14, fontWeight:700, fontSize:20, color:arch.color}}>{arch.cn}</div>
              {/* Bottom strip */}
              <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'8px 12px', background:'linear-gradient(180deg, transparent, rgba(0,0,0,0.85))', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <span className="pill pill-mythic">★ {u.rarity} {u.rarity_pct}%</span>
                <button onClick={()=>setReveal(true)} style={{fontSize:10, fontWeight:700, color:'var(--accent)', letterSpacing:'0.1em'}}>TAP TO REVEAL STATS →</button>
              </div>
            </div>

            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 4px'}}>
              <div style={{fontSize:11, color:'var(--t-3)', textTransform:'uppercase', letterSpacing:'0.12em'}}>Share <span style={{color:'var(--t-2)'}}>your gene…</span></div>
              <div style={{display:'flex', gap:6}}>
                {['instagram','whatsapp','twitter','link'].map(ic => (
                  <button key={ic} onClick={()=>push(`Copied gene link · ${ic}`,'ok')} className="btn btn-ghost btn-sm" style={{width:30, height:30, padding:0, color:'var(--t-2)'}}><Icon name={ic} size={14}/></button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Player stats */}
      <Card eyebrow="ITS PLAYER STATS" title={<span>Your trading <span style={{color:'var(--accent)'}}>performance</span></span>}
        action={<span className="pill pill-ok"><span className="dot" style={{background:'var(--ok)'}}/>Active</span>}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:10}}>
          <StatTile label="Est. pass rate" value={`${u.est_pass_rate}%`} sub={`your archetype: ${u.archetype}-D`} color="#06b6d4"/>
          <StatTile label="Actual pass rate" value={`${u.actual_pass_rate}%`} sub={`+${u.actual_pass_rate-u.est_pass_rate}% above est.`} color="#22c55e"/>
          <StatTile label="Last 7 days" value={<WLStrip data={u.last_7}/>} sub={`${u.last_7.filter(x=>x==='W').length}W / ${u.last_7.filter(x=>x==='L').length}L`}/>
          <StatTile label="Highest streak" value={<span style={{display:'flex',alignItems:'center',gap:8}}><Icon name="fire" size={22} style={{color:'#f97316'}}/>{u.highest_streak} <span style={{fontSize:12, color:'var(--t-3)'}}>wins</span></span>} sub={`${u.jackpots} jackpots · $${u.jackpot_total.toLocaleString()} total`}/>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <button onClick={()=>setRoute('register')} style={shortcutTileStyle}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background:'rgba(124,58,237,0.18)', display:'flex', alignItems:'center', justifyContent:'center', color:'#a78bfa', fontFamily:'var(--font-display)', fontWeight:700, fontSize:11}}>XYZ</div>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:600, fontSize:13}}>FundedXYZ</div>
                <div style={{fontSize:11, color:'var(--t-3)'}}>Register account →</div>
              </div>
            </div>
            <Icon name="ext" size={14} style={{color:'var(--t-3)'}}/>
          </button>
          <button style={shortcutTileStyle}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:32, borderRadius:8, background:'rgba(96,165,250,0.18)', display:'flex', alignItems:'center', justifyContent:'center', color:'#60a5fa'}}><Icon name="check" size={16}/></div>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:600, fontSize:13}}>Application form</div>
                <div style={{fontSize:11, color:'var(--t-3)'}}>Google Form →</div>
              </div>
            </div>
            <Icon name="ext" size={14} style={{color:'var(--t-3)'}}/>
          </button>
        </div>
      </Card>

      {/* My accounts */}
      <Card eyebrow="MY ACCOUNTS" title={`${window.ACCOUNTS.reduce((a,g)=>a+g.uids.length,0)} UIDs across ${window.ACCOUNTS.filter(g=>g.uids.length).length} firms`}
        action={<button className="btn btn-primary btn-sm" onClick={()=>setRoute('submit')}><Icon name="plus" size={14}/>Submit UID</button>}>
        <AccountsList/>
      </Card>

      {/* Register & earn (compact) */}
      <Card eyebrow="REGISTER & EARN" title="Sign up for new accounts">
        <RegisterStrip setRoute={setRoute}/>
      </Card>

      {/* Withdrawal history (compact preview) */}
      <Card eyebrow="WITHDRAWAL HISTORY"
        title={<span style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:600}}>${(window.WITHDRAWALS.filter(w=>w.status==='paid').reduce((a,w)=>a+w.amount,0)).toLocaleString()} <span style={{color:'var(--t-3)', fontSize:13, fontWeight:500}}>paid · ${window.WITHDRAWALS.filter(w=>w.status==='pending').reduce((a,w)=>a+w.amount,0).toLocaleString()} pending</span></span>}
        action={
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-sm"><Icon name="plus" size={14}/>Submit Withdrawal</button>
            <button className="btn btn-sm"><Icon name="dl" size={14}/>Export CSV</button>
            <button className="btn btn-sm"><Icon name="filter" size={14}/>Filter</button>
          </div>
        }>
        <div className="tbl-wrap"><WithdrawalsTable rows={window.WITHDRAWALS.slice(0,6)} compact/></div>
        <div style={{textAlign:'center', marginTop:10}}>
          <button onClick={()=>setRoute('withdrawals')} style={{fontSize:12, color:'var(--accent)', fontWeight:600, display:'inline-flex', alignItems:'center', gap:4}}>
            View full history <Icon name="arrow-right" size={12}/>
          </button>
        </div>
      </Card>

      <Modal open={reveal} onClose={()=>setReveal(false)} title="Genetic stats" size="lg">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {[
            ['Patience', 92, '#14b8a6'],
            ['Discipline', 88, '#22c55e'],
            ['Speed', 41, '#ef4444'],
            ['Conviction', 76, '#a855f7'],
            ['Risk tolerance', 38, '#f97316'],
            ['Adaptability', 64, '#3b82f6'],
          ].map(([k,v,c])=>(
            <div key={k}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                <span style={{fontWeight:600, fontSize:13}}>{k}</span>
                <span className="mono" style={{color:c, fontWeight:700}}>{v}</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${v}%`, background:c}}/></div>
            </div>
          ))}
        </div>
        <div style={{marginTop:18, display:'flex', justifyContent:'flex-end', gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>setReveal(false)}>Close</button>
          <button className="btn btn-primary btn-sm" onClick={()=>{setReveal(false); setRoute('genetic');}}>Open full report <Icon name="arrow-right" size={14}/></button>
        </div>
      </Modal>
    </div>
  );
}

const shortcutTileStyle = {
  display:'flex', alignItems:'center', justifyContent:'space-between',
  padding:'12px 14px', borderRadius:11,
  background:'var(--surf-1)', border:'1px solid var(--line-1)', textAlign:'left',
};

function StatTile({ label, value, sub, color }){
  return (
    <div style={{padding:'14px 14px', borderRadius:11, background:'var(--surf-1)', border:'1px solid var(--line-1)'}}>
      <div className="eyebrow-lbl">{label}</div>
      <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:600, marginTop:8, color: color || 'var(--t-1)', display:'flex', alignItems:'center'}}>{value}</div>
      {sub && <div style={{fontSize:11, color:'var(--t-3)', marginTop:6}}>{sub}</div>}
    </div>
  );
}

function AccountsList(){
  const [open, setOpen] = useState({fundedxyz:true, bitfunded:true});
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      {window.ACCOUNTS.map(g => {
        const f = window.helpers.firmBy(g.firm);
        const isOpen = open[g.firm];
        const empty = g.uids.length === 0;
        return (
          <div key={g.firm} style={{borderRadius:11, background:'var(--surf-1)', border:'1px solid var(--line-1)', overflow:'hidden'}}>
            <button onClick={()=>setOpen(o=>({...o, [g.firm]: !o[g.firm]}))} style={{
              width:'100%', padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
            }}>
              <FirmIcon id={g.firm}/>
              <div style={{display:'flex', alignItems:'center', gap:8, flex:1, justifyContent:'flex-start'}}>
                <span style={{fontWeight:600}}>{f.name}</span>
                {empty
                  ? <span className="pill" style={{background:'transparent'}}>NOT LINKED</span>
                  : <span className="pill mono">{g.uids.length}</span>
                }
              </div>
              <Icon name={empty?'chev-right':isOpen?'chev-down':'chev-right'} size={16} style={{color:'var(--t-3)'}}/>
            </button>
            {!empty && isOpen && (
              <div style={{padding:'4px 14px 12px', borderTop:'1px dashed rgba(255,255,255,0.04)'}}>
                {g.uids.map(uid=>(
                  <div key={uid.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px dashed rgba(255,255,255,0.03)'}}>
                    <span className="mono" style={{color:'var(--t-2)', fontSize:13}}>{uid.id}</span>
                    {uid.status==='verified'
                      ? <span style={{color:'var(--ok)', fontSize:12, display:'flex', alignItems:'center', gap:4}}><Icon name="check" size={14}/>verified</span>
                      : <span style={{color:'var(--t-3)', fontSize:12}}>pending</span>
                    }
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RegisterStrip({ setRoute }){
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
        <span className="pill">PROP FIRM</span>
        <span style={{fontSize:11, color:'var(--t-3)'}}>funded challenges & evals</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
        {window.PROP_FIRMS.map(f => (
          <div key={f.id} style={{
            position:'relative', padding:'14px 14px 12px', borderRadius:12,
            background:'var(--surf-1)', border:'1px solid var(--line-1)', overflow:'hidden',
          }}>
            <div style={{position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:`radial-gradient(circle, ${f.accent}22, transparent 70%)`}}/>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10, position:'relative'}}>
              <div style={{
                width:40, height:40, borderRadius:9, background:`${f.accent}22`, border:`1px solid ${f.accent}55`,
                display:'flex', alignItems:'center', justifyContent:'center', color:f.accent,
                fontFamily:'var(--font-display)', fontWeight:800, fontSize:13,
              }}>{f.icon}</div>
              <div>
                <div style={{fontWeight:700, fontSize:14}}>{f.name}</div>
                <div style={{fontSize:11, color:'var(--t-3)'}}>{f.subtitle}</div>
              </div>
            </div>
            <div style={{fontSize:12, color:'var(--t-2)', minHeight:36, marginBottom:10}}>{f.blurb}</div>
            <button onClick={()=>setRoute('register')} className="btn btn-sm" style={{width:'100%', justifyContent:'space-between', borderColor:`${f.accent}55`, color:f.accent}}>
              <span><Icon name="plus" size={12}/> REGISTER</span>
              <Icon name="arrow-right" size={14}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function WithdrawalsTable({ rows, compact }){
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>Date</th><th>Source</th><th>UID</th><th style={{textAlign:'right'}}>Amount</th><th style={{textAlign:'right'}}>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((w,i)=>{
          const f = window.helpers.firmBy(w.source);
          return (
            <tr key={i}>
              <td style={{color:'var(--t-2)'}}>{w.date}</td>
              <td><div style={{display:'flex', alignItems:'center', gap:10}}><FirmIcon id={w.source} size={26}/>{f.name}</div></td>
              <td className="mono" style={{color:'var(--t-2)'}}>{w.uid}</td>
              <td style={{textAlign:'right', fontFamily:'var(--font-display)', fontWeight:600}}>${w.amount.toLocaleString()}</td>
              <td style={{textAlign:'right'}}>
                {w.status==='paid'
                  ? <span className="pill pill-ok"><Icon name="check" size={11}/>PAID</span>
                  : <span className="pill pill-warn">PENDING</span>
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Object.assign(window, { Dashboard, WithdrawalsTable });
