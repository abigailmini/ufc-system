/* global window, React */
// Withdrawals — full history page

const { useState, useMemo } = React;
const { Icon, Card, FirmIcon, Sparkline, useToast, Modal } = window;

function Withdrawals(){
  const [filter, setFilter] = useState('all');
  const [submitOpen, setSubmitOpen] = useState(false);
  const push = useToast();

  const rows = window.WITHDRAWALS;
  const totalPaid = rows.filter(w=>w.status==='paid').reduce((a,w)=>a+w.amount,0);
  const totalPending = rows.filter(w=>w.status==='pending').reduce((a,w)=>a+w.amount,0);
  const filtered = filter==='all' ? rows : rows.filter(r=>r.status===filter);

  // Synthesize a monthly trend
  const monthly = [320, 540, 880, 1240, 1680, 2100, 2680, 3320, 3960, 4280, 4670, 4890];

  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* KPI strip */}
      <div className="withdrawals-kpi-grid" style={{display:'grid', gridTemplateColumns:'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))', gap:12}}>
        <Card padding={false}>
          <div className="withdrawals-kpi-hero" style={{padding:'18px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexWrap:'wrap'}}>
            <div>
              <div className="eyebrow-lbl">Total withdrawn</div>
              <div style={{fontFamily:'var(--font-display)', fontSize:36, fontWeight:700, color:'var(--accent)', marginTop:6}}>${totalPaid.toLocaleString()}</div>
              <div style={{fontSize:12, color:'var(--t-3)', marginTop:2}}>+ ${totalPending.toLocaleString()} pending · {rows.length} payouts</div>
            </div>
            <div style={{flex:'0 0 140px'}}>
              <Sparkline data={monthly} w={140} h={56} color="var(--accent)"/>
              <div style={{fontSize:10, color:'var(--t-3)', textAlign:'center', marginTop:4}}>Last 12 months</div>
            </div>
          </div>
        </Card>
        <KPI label="Avg. payout" value={'$'+Math.round(totalPaid / rows.filter(w=>w.status==='paid').length).toLocaleString()} sub="per withdrawal"/>
        <KPI label="Best month" value="$1,250" sub="May 02, 2026"/>
        <KPI label="Rank tier" value="WHITE" sub={`${(10000-5300).toLocaleString()} to Yellow`} accent="var(--rank-white)"/>
      </div>

      <Card eyebrow="WITHDRAWAL HISTORY" title="All payouts"
        action={
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div style={{display:'flex', background:'var(--surf-1)', border:'1px solid var(--line-1)', borderRadius:9, padding:3}}>
              {['all','paid','pending'].map(k => (
                <button key={k} onClick={()=>setFilter(k)} style={{
                  padding:'6px 12px', borderRadius:6, fontSize:12, fontWeight:600, textTransform:'capitalize',
                  background: filter===k ? 'var(--surf-3)' : 'transparent',
                  color: filter===k ? 'var(--t-1)' : 'var(--t-3)',
                }}>{k}</button>
              ))}
            </div>
            <button className="btn btn-sm" onClick={()=>push('CSV exported','ok')}><Icon name="dl" size={13}/>Export CSV</button>
            <button className="btn btn-primary btn-sm" onClick={()=>setSubmitOpen(true)}><Icon name="plus" size={13}/>Submit Withdrawal</button>
          </div>
        }>
        <div className="tbl-wrap withdrawals-table-wrap"><table className="tbl withdrawals-table">
          <thead>
            <tr>
              <th>Date</th><th>Source</th><th>UID</th><th>Memo</th>
              <th style={{textAlign:'right'}}>Amount</th><th style={{textAlign:'right'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w,i)=>{
              const f = window.helpers.firmBy(w.source);
              return (
                <tr key={i}>
                  <td style={{color:'var(--t-2)'}}>{w.date}</td>
                  <td><div style={{display:'flex', alignItems:'center', gap:10}}><FirmIcon id={w.source} size={26}/>{f.name}</div></td>
                  <td className="mono" style={{color:'var(--t-2)'}}>{w.uid}</td>
                  <td style={{color:'var(--t-3)', fontSize:12}}>Profit split · weekly</td>
                  <td style={{textAlign:'right', fontFamily:'var(--font-display)', fontWeight:600, fontSize:15}}>${w.amount.toLocaleString()}</td>
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
        </table></div>
      </Card>

      <Modal open={submitOpen} onClose={()=>setSubmitOpen(false)} title="Submit a withdrawal proof"
        footer={<>
          <button className="btn btn-ghost btn-sm" onClick={()=>setSubmitOpen(false)}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={()=>{ setSubmitOpen(false); push('Withdrawal submitted for review','ok'); }}>Submit <Icon name="arrow-right" size={14}/></button>
        </>}>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div>
            <label className="eyebrow-lbl">Source</label>
            <select className="input" style={{marginTop:6}}>
              {[...window.PROP_FIRMS, ...window.EXCHANGES].map(f=><option key={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div className="withdrawals-modal-grid" style={{display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:10}}>
            <div>
              <label className="eyebrow-lbl">UID</label>
              <input className="input mono" placeholder="22379" style={{marginTop:6}}/>
            </div>
            <div>
              <label className="eyebrow-lbl">Amount (USD)</label>
              <input className="input" placeholder="980" style={{marginTop:6}}/>
            </div>
          </div>
          <div>
            <label className="eyebrow-lbl">Proof screenshot</label>
            <label style={{display:'flex', alignItems:'center', justifyContent:'center', gap:10, border:'1.5px dashed var(--line-2)', borderRadius:11, padding:'18px', marginTop:6, cursor:'pointer'}}>
              <Icon name="upload" size={18} style={{color:'var(--t-3)'}}/>
              <span style={{color:'var(--t-2)', fontSize:13}}>Drop screenshot or click to upload</span>
              <input type="file" style={{display:'none'}}/>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function KPI({ label, value, sub, accent }){
  return (
    <Card padding={false}>
      <div style={{padding:'18px 20px'}}>
        <div className="eyebrow-lbl">{label}</div>
        <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:600, marginTop:8, color: accent || 'var(--t-1)'}}>{value}</div>
        <div style={{fontSize:11, color:'var(--t-3)', marginTop:4}}>{sub}</div>
      </div>
    </Card>
  );
}

Object.assign(window, { Withdrawals });
