/* global window */
// Shared mock data for the UFC dashboard

const ARCHETYPES = [
  { code:'FAST', cn:'快枪手', name:'Fast Hand', tag:'Quick execution · First mover', color:'var(--arch-fast)', img:'assets/archetypes/fast.png' },
  { code:'PWLT', cn:'狙击手', name:'Sniper', tag:'Precision strike · One shot', color:'var(--arch-pwlt)', img:'assets/archetypes/pwlt.png' },
  { code:'MODL', cn:'量化师', name:'Quant', tag:'Data driven · Logic wins', color:'var(--arch-modl)', img:'assets/archetypes/modl.png' },
  { code:'ZNFM', cn:'老将', name:'Veteran', tag:'Experience wins · Steady', color:'var(--arch-znfm)', img:'assets/archetypes/znfm.png' },
  { code:'HODL', cn:'钻石手', name:'Diamond Hands', tag:'Conviction · Through cycles', color:'var(--arch-hodl)', img:'assets/archetypes/hodl.png' },
  { code:'SIZE', cn:'巨鲸', name:'Whale', tag:'Size is king · Total control', color:'var(--arch-size)', img:'assets/archetypes/size.png' },
  { code:'DEGEN', cn:'Degen', name:'Degen', tag:'High risk · High volatility', color:'var(--arch-degen)', img:'assets/archetypes/degen.png' },
  { code:'MOMO', cn:'动量手', name:'Momentum', tag:'Ride the trend · Surf the wave', color:'var(--arch-momo)', img:'assets/archetypes/momo.png' },
];

const RANKS = [
  { code:'WHITE', label:'White Trader', cls:'rank-white', from:0, to:10000 },
  { code:'YELLOW', label:'Yellow Trader', cls:'rank-yellow', from:10000, to:20000 },
  { code:'BLUE', label:'Blue Trader', cls:'rank-blue', from:20000, to:50000 },
  { code:'RED', label:'Red Trader', cls:'rank-red', from:50000, to:100000 },
  { code:'BLACK', label:'Black Trader', cls:'rank-black', from:100000, to:Infinity },
];

const PROP_FIRMS = [
  { id:'fundedxyz', name:'FundedXYZ', blurb:'Up to $200k accounts · 80/20 split', accent:'#7c3aed', subtitle:'1-step or 2-step eval', logoBg:'#1a0d2e', icon:'XYZ' },
  { id:'bitfunded', name:'BitFunded', blurb:'Crypto-native · Instant funding', accent:'#06b6d4', subtitle:'Spot + futures', logoBg:'#062533', icon:'BF' },
  { id:'propw', name:'PropW', blurb:'1-step eval · Fast payouts', accent:'#22c55e', subtitle:'Up to $100k', logoBg:'#0a2415', icon:'PW' },
];

const EXCHANGES = [
  { id:'pionex', name:'Pionex', accent:'#22c55e', icon:'P' },
  { id:'mycryptofund', name:'MyCryptoFund', accent:'#3b82f6', icon:'MCF' },
  { id:'bybit', name:'Bybit', accent:'#f59e0b', icon:'B' },
];

// User
const USER = {
  name: 'khongming kok',
  uid: 'BD395A',
  ref: 'N/A',
  rank: 'WHITE',
  vip: 1,
  archetype: 'PWLT',
  archetype_name: 'Disciplined Sniper',
  rarity: 'Mythic',
  rarity_pct: 3.1,
  withdrawn: 5300,
  withdrawal_goal: 10000,
  est_pass_rate: 67,
  actual_pass_rate: 71,
  last_7: ['W','W','L','W','W','L','W'],
  highest_streak: 9,
  jackpots: 2,
  jackpot_total: 4800,
  livestream_pct: 100,
  events: 5,
  first_5k: true,
  seven_day: true,
  gene_unlock: true,
};

// User submitted UIDs
const ACCOUNTS = [
  { firm:'fundedxyz', uids:[
    { id:'79133595', status:'verified', funded:50000 },
    { id:'20068467', status:'verified', funded:25000 },
    { id:'78316425', status:'verified', funded:50000 },
    { id:'95441187', status:'pending', funded:null },
  ]},
  { firm:'bitfunded', uids:[
    { id:'22379', status:'verified', funded:100000 },
    { id:'22382', status:'verified', funded:100000 },
    { id:'20990', status:'verified', funded:50000 },
    { id:'20991', status:'verified', funded:50000 },
    { id:'19923', status:'verified', funded:25000 },
    { id:'20192', status:'verified', funded:25000 },
    { id:'12610', status:'verified', funded:25000 },
    { id:'12613', status:'verified', funded:25000 },
    { id:'20638', status:'pending', funded:null },
    { id:'21770', status:'verified', funded:25000 },
  ]},
  { firm:'propw', uids:[] },
];

// Withdrawal history
const WITHDRAWALS = [
  { date:'May 02, 2026', source:'fundedxyz', uid:'79133595', amount:1250, status:'paid' },
  { date:'Apr 28, 2026', source:'bitfunded', uid:'22379',    amount:980,  status:'paid' },
  { date:'Apr 21, 2026', source:'fundedxyz', uid:'20068467', amount:720,  status:'paid' },
  { date:'Apr 14, 2026', source:'bitfunded', uid:'20990',    amount:1100, status:'paid' },
  { date:'Apr 07, 2026', source:'fundedxyz', uid:'78316425', amount:540,  status:'paid' },
  { date:'Mar 31, 2026', source:'bitfunded', uid:'22382',    amount:870,  status:'paid' },
  { date:'Mar 24, 2026', source:'fundedxyz', uid:'79133595', amount:610,  status:'paid' },
  { date:'Mar 17, 2026', source:'bitfunded', uid:'20991',    amount:430,  status:'paid' },
  { date:'Mar 10, 2026', source:'bitfunded', uid:'19923',    amount:280,  status:'paid' },
  { date:'Mar 03, 2026', source:'fundedxyz', uid:'20068467', amount:410,  status:'pending' },
  { date:'Feb 24, 2026', source:'bitfunded', uid:'12610',    amount:520,  status:'paid' },
  { date:'Feb 17, 2026', source:'bitfunded', uid:'12613',    amount:380,  status:'paid' },
];

// Leaderboard traders
const LEADERS = [
  { name:'Kwek Wei Sheng', avatar:'KW', rank:'BLACK', archetype:'PWLT', total:179600, jackpots:14, streak:21, monthly:18200 },
  { name:'Gan Jia Wei',    avatar:'GJ', rank:'BLACK', archetype:'MODL', total:114880, jackpots:9,  streak:14, monthly:12100 },
  { name:'LittleMax',      avatar:'LM', rank:'BLACK', archetype:'SIZE', total:108800, jackpots:11, streak:18, monthly:9800 },
  { name:'Mike Chan',      avatar:'MC', rank:'BLACK', archetype:'FAST', total:105700, jackpots:6,  streak:9,  monthly:7600 },
  { name:'Jerry',          avatar:'JR', rank:'BLACK', archetype:'HODL', total:105700, jackpots:5,  streak:11, monthly:6900 },
  { name:'Edmund798',      avatar:'ED', rank:'RED',   archetype:'PWLT', total:87100,  jackpots:4,  streak:7,  monthly:5400 },
  { name:'topmix',         avatar:'TM', rank:'RED',   archetype:'MODL', total:85700,  jackpots:5,  streak:8,  monthly:6100 },
  { name:'aqxuan10',       avatar:'AQ', rank:'RED',   archetype:'DEGEN',total:85400,  jackpots:8,  streak:6,  monthly:8200 },
  { name:'anthony9388',    avatar:'AN', rank:'RED',   archetype:'MOMO', total:76700,  jackpots:3,  streak:5,  monthly:4100 },
  { name:'PpENG',          avatar:'PP', rank:'RED',   archetype:'ZNFM', total:74700,  jackpots:2,  streak:4,  monthly:3600 },
  { name:'William T.',     avatar:'WT', rank:'RED',   archetype:'PWLT', total:69100,  jackpots:3,  streak:4,  monthly:3000 },
  { name:'GOHJOEL8676',    avatar:'GJ', rank:'RED',   archetype:'SIZE', total:62780,  jackpots:2,  streak:3,  monthly:2400 },
  { name:'khongming kok',  avatar:'KK', rank:'WHITE', archetype:'PWLT', total:5300,   jackpots:2,  streak:9,  monthly:1980, isMe:true },
];

// E-Learning courses
const COURSES = [
  { id:'c1', title:'Reading the Order Book', tag:'Foundations', minutes:42, lessons:8, level:'Beginner', progress:100, instructor:'Coach Liu', color:'#06b6d4' },
  { id:'c2', title:'Risk Frame for Prop Traders', tag:'Foundations', minutes:54, lessons:6, level:'Beginner', progress:100, instructor:'Coach Sara', color:'#22c55e' },
  { id:'c3', title:'Sniper Setups: PWLT Playbook', tag:'Archetype', minutes:78, lessons:10, level:'Intermediate', progress:64, instructor:'Coach K', color:'#14b8a6', featured:true },
  { id:'c4', title:'Surviving the Drawdown', tag:'Psychology', minutes:36, lessons:5, level:'Intermediate', progress:33, instructor:'Coach Mira', color:'#f97316' },
  { id:'c5', title:'Funding Phase 1: Pass the Eval', tag:'Prop Firm', minutes:62, lessons:9, level:'Beginner', progress:88, instructor:'Coach Dion', color:'#f5c518' },
  { id:'c6', title:'Quant Edges in 2026', tag:'Archetype', minutes:95, lessons:12, level:'Advanced', progress:0, instructor:'Coach Vlad', color:'#a855f7' },
  { id:'c7', title:'Position Sizing Deep Dive', tag:'Risk', minutes:48, lessons:7, level:'Intermediate', progress:0, instructor:'Coach Sara', color:'#ef4444' },
  { id:'c8', title:'BitFunded SOP Walkthrough', tag:'Prop Firm', minutes:28, lessons:4, level:'Beginner', progress:0, instructor:'Coach Dion', color:'#3b82f6' },
  { id:'c9', title:'Whale Mindset: Scaling Up', tag:'Psychology', minutes:51, lessons:7, level:'Advanced', progress:0, instructor:'Coach K', color:'#3b82f6' },
];

// Discord live schedule
const LIVE_SCHEDULE = [
  { day:'Mon', host:'Coach K',    topic:'Weekly market open',     time:'09:00 SGT', live:true },
  { day:'Tue', host:'Coach Sara', topic:'Risk lab',               time:'21:00 SGT' },
  { day:'Wed', host:'Coach Liu',  topic:'Order flow live trade',  time:'09:00 SGT' },
  { day:'Thu', host:'Coach Mira', topic:'Mindset clinic',         time:'21:00 SGT' },
  { day:'Fri', host:'Coach Dion', topic:'Prop firm Q&A',          time:'21:00 SGT' },
];

// Achievements
const ACHIEVEMENTS = [
  { id:'live100', label:'Livestream', sub:'100h watched',     img:'assets/badge-1.png?v=4', color:'#ef4444', unlocked:true,  rarity:'rare' },
  { id:'events',  label:'Events',     sub:'5 events joined',  img:'assets/badge-2.png?v=4', color:'#3b82f6', unlocked:true,  rarity:'common' },
  { id:'first5k', label:'First $5K',  sub:'Withdrawal',       img:'assets/badge-3.png?v=4', color:'#f5c518', unlocked:true,  rarity:'rare' },
  { id:'streak',  label:'7-day streak',sub:'Discipline',      img:'assets/badge-4.png?v=4', color:'#22c55e', unlocked:true,  rarity:'rare' },
  { id:'gene',    label:'Gene unlock',sub:'Took the test',    img:'assets/badge-5.png?v=4', color:'#a855f7', unlocked:true,  rarity:'mythic' },
  { id:'locked1', label:'Locked',     sub:'Keep going',       img:'assets/badge-6.png?v=4', color:'#3a3f4d', unlocked:false, rarity:'common' },
];

// Notifications
const NOTIFS = [
  { time:'2m ago', title:'New jackpot · $342', sub:'BitFunded UID 22382', kind:'ok' },
  { time:'1h ago', title:'UID 20638 verified', sub:'BitFunded · 25K account', kind:'info' },
  { time:'3h ago', title:'Coach K is live', sub:'Weekly market open', kind:'live' },
  { time:'1d ago', title:'Withdrawal $980 paid', sub:'BitFunded · UID 22379', kind:'ok' },
  { time:'2d ago', title:'Course progress saved', sub:'Sniper Setups · 64%', kind:'info' },
];

const helpers = {
  fmtUsd: (n) => '$' + (n||0).toLocaleString('en-US'),
  fmtK: (n) => n >= 1000 ? '$'+ (n/1000).toFixed(n%1000?1:0) +'K' : '$'+n,
  rankBy: (code) => RANKS.find(r=>r.code===code) || RANKS[0],
  archBy: (code) => ARCHETYPES.find(a=>a.code===code) || ARCHETYPES[0],
  firmBy: (id) => PROP_FIRMS.find(f=>f.id===id) || EXCHANGES.find(e=>e.id===id) || { name:id, accent:'#888', icon:'?' },
};

Object.assign(window, {
  ARCHETYPES, RANKS, PROP_FIRMS, EXCHANGES, USER, ACCOUNTS, WITHDRAWALS,
  LEADERS, COURSES, LIVE_SCHEDULE, ACHIEVEMENTS, NOTIFS, helpers
});
