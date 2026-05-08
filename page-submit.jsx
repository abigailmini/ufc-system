/* global window, React */
// Submit UID page

const { useState } = React;
const { Icon, Card, FirmIcon, useToast } = window;

function SubmitUID(){
  const [firm, setFirm] = useState('bitfunded');
  const [uid, setUid] = useState('');
  const [funded, setFunded] = useState('25000');
  const [proof, setProof] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const push = useToast();

  const allFirms = [...window.PROP_FIRMS, ...window.EXCHANGES];

  const submit = (e) => {
    e.preventDefault();
    if(!uid){ push('UID required','bad'); return; }
    setSubmitting(true);
    setTimeout(()=>{
      setSubmitting(false);
      push(`UID ${uid} submitted for review`,'ok');
      setUid('');
      setProof(null);
    }, 900);
  };

  const f = window.helpers.firmBy(firm);

  return (
    <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, alignItems:'flex-start'}}>
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        <Card eyebrow="STEP 1 OF 3" title="Pick the firm or exchange">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
            {allFirms.map(opt => {
              const sel = firm === opt.id;
              return (
                <button key={opt.id} onClick={()=>setFirm(opt.id)} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:11,
                  background: sel ? `linear-gradient(180deg, ${opt.accent}14, transparent)` : 'var(--surf-1)',
                  border: `1px solid ${sel ? opt.accent : 'var(--line-1)'}`,
                  textAlign:'left',
                }}>
                  <FirmIcon id={opt.id}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontWeight:600, fontSize:13}}>{opt.name}</div>
                    <div style={{fontSize:11, color:'var(--t-3)'}}>{opt.subtitle || (opt.id===firm?'Selected':'')}</div>
                  </div>
                  {sel && <div style={{width:20, height:20, borderRadius:99, background:opt.accent, color:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center'}}><Icon name="check" size={12}/></div>}
                </button>
              );
            })}
          </div>
        </Card>

        <Card eyebrow="STEP 2 OF 3" title="Account details">
          <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:14}}>
            <div>
              <label className="eyebrow-lbl">UID / Account number</label>
              <input className="input mono" value={uid} onChange={e=>setUid(e.target.value)} placeholder="e.g. 22379" style={{marginTop:6}}/>
              <div style={{fontSize:11, color:'var(--t-3)', marginTop:6, display:'flex', alignItems:'center', gap:6}}>
                <Icon name="help" size={12}/>
                Find your UID in {f.name} → Profile → Account info
              </div>
            </div>

            <div>
              <label className="eyebrow-lbl">Funded amount</label>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:6, marginTop:6}}>
                {['10000','25000','50000','100000','200000'].map(v=>(
                  <button type="button" key={v} onClick={()=>setFunded(v)} style={{
                    height:36, borderRadius:8, fontSize:12, fontWeight:600,
                    background: funded===v ? 'var(--accent-soft)' : 'var(--bg-1)',
                    border: funded===v ? '1px solid var(--accent)' : '1px solid var(--line-1)',
                    color: funded===v ? 'var(--accent)' : 'var(--t-2)',
                  }}>${(v/1000)}K</button>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow-lbl">Proof of account (screenshot)</label>
              <label style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                border:'1.5px dashed var(--line-2)', borderRadius:11, padding:'18px 14px', marginTop:6,
                cursor:'pointer', background: proof ? 'rgba(34,197,94,0.06)' : 'transparent',
                borderColor: proof ? 'rgba(34,197,94,0.4)' : 'var(--line-2)',
              }}>
                <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>setProof(e.target.files?.[0]?.name||null)}/>
                <Icon name={proof?'check':'upload'} size={18} style={{color: proof?'var(--ok)':'var(--t-3)'}}/>
                <div style={{textAlign:'center'}}>
                  <div style={{fontWeight:600, fontSize:13}}>{proof || 'Drop or click to upload'}</div>
                  <div style={{fontSize:11, color:'var(--t-3)'}}>PNG, JPG up to 10 MB · Optional but speeds approval</div>
                </div>
              </label>
            </div>

            <div>
              <label className="eyebrow-lbl">Notes (optional)</label>
              <textarea className="input" rows="2" placeholder="Anything we should know?" style={{marginTop:6}}/>
            </div>

            <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:6}}>
              <button type="button" className="btn btn-ghost" onClick={()=>{setUid(''); setProof(null);}}>Reset</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : <>Submit for review <Icon name="arrow-right" size={14}/></>}
              </button>
            </div>
          </form>
        </Card>
      </div>

      {/* Sidebar — guide + recent */}
      <div style={{display:'flex', flexDirection:'column', gap:16, position:'sticky', top:80}}>
        <Card eyebrow="STEP 3 OF 3" title="What happens next">
          <ol style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14}}>
            {[
              ['Auto-match', 'We check your UID against our affiliate registry within minutes.'],
              ['Manual verify', 'Edge cases get reviewed by a coach within 24 hours.'],
              ['Live tracking', 'Verified UIDs start appearing on your dashboard and the leaderboard.'],
              ['Withdrawals', 'Once you hit a payout, submit it via Withdrawals → Submit Withdrawal.'],
            ].map(([t, d], i)=>(
              <li key={i} style={{display:'flex', gap:12}}>
                <div style={{
                  width:26, height:26, borderRadius:99, flexShrink:0,
                  background: i===0?'var(--accent-soft)':'var(--surf-2)',
                  border: '1px solid '+(i===0?'var(--accent)':'var(--line-1)'),
                  color: i===0?'var(--accent)':'var(--t-2)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, fontFamily:'var(--font-display)',
                }}>{i+1}</div>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>{t}</div>
                  <div style={{fontSize:12, color:'var(--t-3)', marginTop:2}}>{d}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card eyebrow="RECENTLY SUBMITTED" title="Your queue">
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {window.ACCOUNTS.flatMap(g=>g.uids.map(u=>({...u, firm:g.firm}))).slice(0,5).map(uid=>(
              <div key={uid.id+uid.firm} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'10px 12px', borderRadius:9, border:'1px solid var(--line-1)', background:'var(--surf-1)',
              }}>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <FirmIcon id={uid.firm} size={28}/>
                  <div>
                    <div className="mono" style={{fontSize:13}}>{uid.id}</div>
                    <div style={{fontSize:10, color:'var(--t-3)'}}>{window.helpers.firmBy(uid.firm).name}</div>
                  </div>
                </div>
                {uid.status==='verified'
                  ? <span className="pill pill-ok"><Icon name="check" size={11}/>Verified</span>
                  : <span className="pill pill-warn">Pending</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { SubmitUID });
