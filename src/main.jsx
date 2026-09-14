import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  LayoutDashboard, Users, Flag, ShieldBan, BarChart3, UsersRound,
  SlidersHorizontal, KeyRound, BookOpen, RefreshCw, ChevronDown,
  Server, Activity, Swords, Gem, MoreHorizontal, Search, Plus,
  Newspaper, Terminal, Bot, Settings, LogOut, CheckCircle2, Clock3
} from 'lucide-react';
import './style.css';

const players = [
  {name:'Testeur', rank:'Joueur', status:'En ligne', ping:'32 ms'},
  {name:'lima037', rank:'Joueur', status:'En ligne', ping:'48 ms'},
  {name:'kayo', rank:'Modérateur', status:'En ligne', ping:'25 ms'},
  {name:'Enzolerole', rank:'Owner', status:'En ligne', ping:'18 ms'},
  {name:'Alexis', rank:'Joueur', status:'Hors ligne', ping:'—'},
];

function App(){
  const [page,setPage]=useState('Dashboard');
  const [role,setRole]=useState('Owner');
  const [refresh,setRefresh]=useState(false);

  const nav = [
    ['Dashboard', LayoutDashboard],
    ['Joueurs', Users],
    ['Signalements', Flag],
    ['Casier / Sanctions', ShieldBan],
    ['Statistiques', BarChart3],
  ];
  const staff = [
    ['Équipe Staff', UsersRound],
    ['Permissions commandes', SlidersHorizontal],
    ['Codes Staff', KeyRound],
    ['Journal', BookOpen],
  ];
  const owner = [
    ['Actualités', Newspaper],
    ['Commandes personnalisées', Terminal],
    ['Discord', Bot],
    ['Configuration', Settings],
  ];

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="logo">L</div><div><b>LUCKY<span>SMP</span></b><small>CONTROL PANEL</small></div></div>
      <div className="server-pill"><span className="dot"/> Serveur en ligne <em>1.21.11</em></div>
      <Nav title="" items={nav} page={page} setPage={setPage}/>
      <div className="section-title">STAFF</div>
      <Nav items={staff} page={page} setPage={setPage}/>
      {role==='Owner' && <><div className="section-title">OWNER</div><Nav items={owner} page={page} setPage={setPage}/></>}
      <div className="role-box">
        <small>APERÇU DU GRADE</small>
        <button onClick={()=>setRole(role==='Owner'?'Staff':'Owner')}>{role}<ChevronDown size={16}/></button>
      </div>
      <div className="profile"><div className="avatar">E</div><div><b>Enzolerole</b><small>{role}</small></div><MoreHorizontal size={18}/></div>
    </aside>

    <main className="main">
      <header>
        <div><div className="crumb">LuckySMP / <b>{page}</b></div><small>Centre de contrôle du serveur</small></div>
        <div className="header-actions">
          <button className="icon-btn" onClick={()=>{setRefresh(true);setTimeout(()=>setRefresh(false),500)}}><RefreshCw size={17} className={refresh?'spin':''}/></button>
          <div className="online"><span className="dot"/> 12 joueurs en ligne</div>
        </div>
      </header>

      {page==='Dashboard' && <Dashboard setPage={setPage}/>}
      {page==='Joueurs' && <Players/>}
      {page==='Signalements' && <Reports/>}
      {page==='Casier / Sanctions' && <Sanctions/>}
      {page==='Statistiques' && <Stats/>}
      {page==='Équipe Staff' && <Staff/>}
      {page==='Permissions commandes' && <Commands/>}
      {page==='Codes Staff' && <Codes/>}
      {page==='Journal' && <Journal/>}
      {page==='Actualités' && <News/>}
      {page==='Commandes personnalisées' && <CustomCommands/>}
      {page==='Discord' && <Discord/>}
      {page==='Configuration' && <Config/>}
    </main>
  </div>
}

function Nav({items,page,setPage}){return <>{items.map(([name,Icon])=><button key={name} className={'nav '+(page===name?'active':'')} onClick={()=>setPage(name)}><Icon size={16}/><span>{name}</span>{name==='Signalements'&&<b className="badge">2</b>}</button>)}</>}

function PageTitle({title,desc,action}){return <div className="page-title"><div><h1>{title}</h1><p>{desc}</p></div>{action}</div>}

function Dashboard({setPage}){
 return <div className="content">
  <section className="hero"><div><label>LUCKYSMP • ADMINISTRATION</label><h1>Bienvenue sur <span>LuckySMP</span></h1><p>Gère ton serveur Minecraft depuis un seul endroit.</p></div><button onClick={()=>setPage('Joueurs')}>Voir les joueurs →</button></section>
  <div className="cards">
   <Card icon={Users} label="Joueurs en ligne" value="12" suffix="/ 100"/>
   <Card icon={Clock3} label="Jours depuis ouverture" value="42"/>
   <Card icon={Swords} label="Kills" value="1 284"/>
   <Card icon={Gem} label="Économie totale" value="4,8M"/>
  </div>
  <div className="grid2">
   <Panel title="État du serveur"><div className="status"><span><span className="dot"/> En ligne</span><b>Stable</b></div><Rows rows={[['Version','Paper 1.21.11'],['Mémoire','3,2 / 8 Go'],['TPS','20.0']]}/></Panel>
   <Panel title="Activité récente"><div className="activity">{[['18:45','Nouveau signalement de lima037'],['18:42','kayo a sanctionné lima037'],['18:31','Enzolerole a modifié un grade'],['17:55','Testeur s’est connecté']].map(x=><div key={x[0]}><time>{x[0]}</time><i/> <span>{x[1]}</span></div>)}</div></Panel>
  </div>
 </div>
}
function Card({icon:Icon,label,value,suffix}){return <div className="card"><div className="card-icon"><Icon size={16}/></div><small>{label}</small><strong>{value}<em>{suffix}</em></strong></div>}
function Panel({title,children}){return <section className="panel"><div className="panel-head"><h3>{title}</h3><MoreHorizontal size={17}/></div>{children}</section>}
function Rows({rows}){return <div className="rows">{rows.map(r=><div key={r[0]}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>}

function Players(){return <div className="content"><PageTitle title="Joueurs" desc="Liste des joueurs et état de connexion." action={<button className="primary"><Search size={16}/> Rechercher</button>}/><Panel title="Joueurs (12 en ligne)"><div className="table">{players.map(p=><div className="tr" key={p.name}><div><div className="mini-avatar">{p.name[0]}</div><b>{p.name}</b></div><span>{p.rank}</span><span className={p.status==='En ligne'?'green':''}>{p.status}</span><span>{p.ping}</span><button className="ghost">Voir</button></div>)}</div></Panel></div>}
function Reports(){return <div className="content"><PageTitle title="Signalements" desc="Les signalements envoyés par les joueurs." action={<button className="primary"><Flag size={16}/> Nouveau</button>}/><Panel title="Signalements ouverts"><div className="report"><span className="priority">URGENT</span><b>lima037</b><span>Comportement / triche suspecte</span><time>Il y a 8 min</time><button className="ghost">Traiter</button></div><div className="report"><span className="priority normal">NORMAL</span><b>Alexis</b><span>Message inapproprié dans le chat</span><time>Il y a 26 min</time><button className="ghost">Traiter</button></div></Panel></div>}
function Sanctions(){return <div className="content"><PageTitle title="Casier / Sanctions" desc="Historique des sanctions. Un joueur ne voit que son propre casier."/><Panel title="Sanctions récentes"><div className="table"><div className="tr head"><span>Joueur</span><span>Type</span><span>Motif</span><span>Date</span><span></span></div>{[['lima037','Mute','Spam','Aujourd’hui'],['Noob77','Warn','Insulte','Hier'],['Testeur','Kick','AFK prolongé','12/09']].map(x=><div className="tr" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><span>{x[2]}</span><span>{x[3]}</span><span/></div>)}</div></Panel></div>}
function Stats(){return <div className="content"><PageTitle title="Statistiques" desc="Vue globale de l’activité du serveur."/><div className="cards"><Card icon={Users} label="Joueurs uniques" value="684"/><Card icon={Activity} label="Temps de jeu" value="1 284h"/><Card icon={Swords} label="Kills" value="1 284"/><Card icon={Server} label="Uptime" value="99,4%"/></div><Panel title="Activité des joueurs"><div className="fake-chart"><div/><div/><div/><div/><div/><div/><div/><div/></div></Panel></div>}
function Staff(){return <div className="content"><PageTitle title="Équipe Staff" desc="Grades et membres de l’équipe." action={<button className="primary"><Plus size={16}/> Ajouter</button>}/><Panel title="Membres"><div className="table">{[['Enzolerole','Owner'],['kayo','Modérateur'],['ModoTest','Helper']].map(x=><div className="tr" key={x[0]}><div><div className="mini-avatar">{x[0][0]}</div><b>{x[0]}</b></div><span className="tag">{x[1]}</span><span className="green">Actif</span><button className="ghost">Gérer</button></div>)}</div></Panel></div>}
function Commands(){return <div className="content"><PageTitle title="Permissions commandes" desc="Gestion des commandes et permissions des grades."/><Panel title="Permissions"><Rows rows={[['luckysmp.report','Joueur+'],['luckysmp.vanish','Staff+'],['luckysmp.vanish.staff','Staff+'],['luckysmp.admin','Owner'],['luckysmp.panel.admin','Owner']]}/></Panel></div>}
function Codes(){return <div className="content"><PageTitle title="Codes Staff" desc="Codes temporaires pour accéder aux outils staff." action={<button className="primary"><Plus size={16}/> Créer un code</button>}/><Panel title="Codes actifs"><Rows rows={[['STAFF-7K2P','Actif'],['MOD-19XA','Utilisé 1 fois'],['HELP-55QZ','Actif']]}/></Panel></div>}
function Journal(){return <div className="content"><PageTitle title="Journal" desc="Historique des actions importantes du panel."/><Panel title="Dernières actions"><div className="activity">{['Enzolerole a modifié un grade','kayo a traité un signalement','Le serveur est passé en ligne','Configuration Discord modifiée'].map((x,i)=><div key={x}><time>{['18:31','18:20','17:55','17:42'][i]}</time><i/><span>{x}</span></div>)}</div></Panel></div>}
function News(){return <div className="content"><PageTitle title="Actualités" desc="Publie les nouveautés visibles par les joueurs." action={<button className="primary"><Plus size={16}/> Nouvelle actualité</button>}/><Panel title="Publications"><Rows rows={[['Bienvenue sur LuckySMP','Publiée'],['Maintenance du serveur','Brouillon'],['Nouveau système de récompenses','Publiée']]}/></Panel></div>}
function CustomCommands(){return <div className="content"><PageTitle title="Commandes personnalisées" desc="Ajoute une commande sans modifier le code du site." action={<button className="primary"><Plus size={16}/> Ajouter</button>}/><Panel title="Commandes configurées"><Rows rows={[['/fly','luckysmp.fly • Staff'],['/home','luckysmp.home • Joueur+'],['/event','luckysmp.event • Staff+']]}/></Panel></div>}
function Discord(){return <div className="content"><PageTitle title="Discord" desc="Configuration du panneau et du message Discord."/><Panel title="Message serveur"><Rows rows={[['Webhook','Configuré'],['Message ID','Auto-géré'],['Mise à jour','Toutes les 60 secondes'],['Vanish joueur','Masqué'],['Vanish staff','Owner uniquement']]}/></Panel></div>}
function Config(){return <div className="content"><PageTitle title="Configuration" desc="Paramètres généraux du serveur et de l’API."/><Panel title="Serveur"><Rows rows={[['Adresse','play.luckysmp.fr'],['Version','Paper 1.21.11'],['API','En attente de connexion'],['Maintenance','Désactivée']]}/></Panel></div>}

createRoot(document.getElementById('root')).render(<App/>);
