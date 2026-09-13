import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const players = [
  {name:"Enzoleroie", role:"Owner", days:42, playtime:"8j 14h", money:"1 240 500", shards:842, kills:183, deaths:21, online:true},
  {name:"kayoo_t", role:"SuperModo", days:39, playtime:"6j 02h", money:"840 200", shards:512, kills:94, deaths:30, online:true},
  {name:"limad037", role:"Joueur", days:18, playtime:"2j 11h", money:"125 700", shards:121, kills:24, deaths:17, online:false},
  {name:"AlexCraft", role:"Modo", days:31, playtime:"4j 19h", money:"430 800", shards:344, kills:61, deaths:25, online:true},
];

const sanctions = [
  {player:"limad037", type:"BAN", staff:"kayoo_t", reason:"Cheat", date:"13/09/2026 18:42", duration:"7 jours"},
  {player:"AlexCraft", type:"WARN", staff:"Enzoleroie", reason:"Spam", date:"12/09/2026 21:16", duration:"—"},
  {player:"Testeur", type:"MUTE", staff:"kayoo_t", reason:"Insultes", date:"11/09/2026 19:04", duration:"1 heure"},
];

const reports = [
  {id:"#1042", reported:"Testeur", author:"limad037", reason:"Cheat / mouvement suspect", date:"13/09/2026 18:45", status:"Nouveau"},
  {id:"#1041", reported:"AlexCraft", author:"Steve", reason:"Spam dans le chat", date:"13/09/2026 17:32", status:"En cours"},
  {id:"#1040", reported:"Testeur", author:"kayoo_t", reason:"Comportement suspect", date:"13/09/2026 16:11", status:"Fermé"},
];

const commands = [
  ["/ban","Owner","SuperModo","—","—"],
  ["/kick","Owner","SuperModo","Modo","—"],
  ["/mute","Owner","SuperModo","Modo","—"],
  ["/warn","Owner","SuperModo","Modo","Helper"],
  ["/invsee","Owner","SuperModo","—","—"],
  ["/tp","Owner","SuperModo","Modo","Helper"],
  ["/gamemode","Owner","SuperModo","—","—"],
  ["/give","Owner","—","—","—"],
  ["/report","Owner","SuperModo","Modo","Helper"],
];

function App(){
  const [page,setPage] = useState("dashboard");
  const [role,setRole] = useState("Owner");
  const [query,setQuery] = useState("");
  const [selected,setSelected] = useState(players[0]);
  const [toast,setToast] = useState("");

  const filtered = useMemo(
    ()=>players.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const go = p => setPage(p);
  const notify = text => { setToast(text); setTimeout(()=>setToast(""),2500); };

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brandMark">L</div><div><b>LUCKY<span>SMP</span></b><small>CONTROL PANEL</small></div></div>
      <div className="serverState"><i/> Serveur en ligne <span>1.21.11</span></div>

      <nav>
        <button className={page==="dashboard"?"active":""} onClick={()=>go("dashboard")}><span>⌂</span> Dashboard</button>
        <button className={page==="players"?"active":""} onClick={()=>go("players")}><span>♙</span> Joueurs</button>
        <button className={page==="reports"?"active":""} onClick={()=>go("reports")}><span>⚑</span> Signalements <em>2</em></button>
        <button className={page==="sanctions"?"active":""} onClick={()=>go("sanctions")}><span>▣</span> Casier / Sanctions</button>
        <button className={page==="stats"?"active":""} onClick={()=>go("stats")}><span>◈</span> Statistiques</button>
        {role !== "Joueur" && <div className="sectionTitle">STAFF</div>}
        {role !== "Joueur" && <button className={page==="staff"?"active":""} onClick={()=>go("staff")}><span>♜</span> Équipe Staff</button>}
        {role === "Owner" && <button className={page==="commands"?"active":""} onClick={()=>go("commands")}><span>⌘</span> Permissions commandes</button>}
        {role === "Owner" && <button className={page==="activation"?"active":""} onClick={()=>go("activation")}><span>✦</span> Codes Staff</button>}
        {role !== "Joueur" && <button className={page==="logs"?"active":""} onClick={()=>go("logs")}><span>☷</span> Journal</button>}
      </nav>

      <div className="sidebarBottom">
        <div className="demoRole"><small>APERÇU DU GRADE</small><select value={role} onChange={e=>setRole(e.target.value)}><option>Owner</option><option>SuperModo</option><option>Modo</option><option>Helper</option><option>Joueur</option></select></div>
        <div className="userMini"><div className="avatar">E</div><div><b>Enzoleroie</b><small>{role}</small></div><span>⋮</span></div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><div className="breadcrumb">LuckySMP / <b>{title(page)}</b></div><small>Centre de contrôle du serveur</small></div>
        <div className="topActions"><button onClick={()=>notify("Actualisation effectuée ✓")}>↻</button><div className="topOnline"><i/> 12 joueurs en ligne</div></div>
      </header>

      <div className="content">
        {page==="dashboard" && <Dashboard go={go}/>}
        {page==="players" && <Players query={query} setQuery={setQuery} filtered={filtered} select={p=>{setSelected(p);go("player")}}/>}
        {page==="player" && <PlayerDetail player={selected} role={role} notify={notify}/>}
        {page==="reports" && <Reports notify={notify}/>}
        {page==="sanctions" && <Sanctions role={role} notify={notify}/>}
        {page==="stats" && <Stats/>}
        {page==="staff" && <Staff role={role} notify={notify}/>}
        {page==="commands" && <Commands/>}
        {page==="activation" && <Activation notify={notify}/>}
        {page==="logs" && <Logs/>}
      </div>
    </main>
    {toast && <div className="toast">{toast}</div>}
  </div>
}

function title(p){return {dashboard:"Dashboard",players:"Joueurs",player:"Fiche joueur",reports:"Signalements",sanctions:"Casier / Sanctions",stats:"Statistiques",staff:"Équipe Staff",commands:"Permissions",activation:"Codes Staff",logs:"Journal"}[p]}

function Dashboard({go}){
 return <><div className="welcome"><div><div className="eyebrow">LUCKYSMP • ADMINISTRATION</div><h1>Bienvenue sur <span>LuckySMP</span></h1><p>Gère ton serveur Minecraft depuis un seul endroit.</p></div><button onClick={()=>go("players")} className="primary">Voir les joueurs →</button></div>
 <div className="cards"><Card icon="♙" label="Joueurs en ligne" value="12" extra="/ 100"/><Card icon="◷" label="Jours depuis ouverture" value="42"/><Card icon="⚔" label="Kills" value="1 284"/><Card icon="◈" label="Économie totale" value="4,8M"/></div>
 <div className="two"><Panel title="État du serveur"><div className="bigStatus"><i/> En ligne <span>Stable</span></div><Row k="Version" v="Paper 1.21.11"/><Row k="Mémoire" v="3,2 / 8 Go"/><Row k="TPS" v="20.0"/></Panel>
 <Panel title="Activité récente"><Activity t="18:45" text="Nouveau signalement de limad037"/><Activity t="18:42" text="kayoo_t a sanctionné limad037"/><Activity t="18:31" text="Enzoleroie a modifié un grade"/><Activity t="17:55" text="Testeur s'est connecté"/></Panel></div></>
}
function Card({icon,label,value,extra}){return <div className="card"><div className="cardIcon">{icon}</div><small>{label}</small><strong>{value}<span>{extra}</span></strong></div>}
function Panel({title,children}){return <section className="panel"><div className="panelHead"><h2>{title}</h2><span>•••</span></div>{children}</section>}
function Row({k,v}){return <div className="row"><span>{k}</span><b>{v}</b></div>}
function Activity({t,text}){return <div className="activity"><span>{t}</span><div><i/> {text}</div></div>}

function Players({query,setQuery,filtered,select}){
 return <Panel title="Joueurs LuckySMP"><div className="toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="⌕  Rechercher un joueur..."/><button>Filtrer</button></div>
 <table><thead><tr><th>JOUEUR</th><th>GRADE</th><th>JOURS</th><th>TEMPS DE JEU</th><th>ARGENT</th><th>KILLS</th><th>ÉTAT</th></tr></thead><tbody>{filtered.map(p=><tr key={p.name} onClick={()=>select(p)}><td><b>{p.name}</b></td><td><Role r={p.role}/></td><td>{p.days}</td><td>{p.playtime}</td><td>{p.money}</td><td>{p.kills}</td><td><span className={p.online?"status online":"status"}>{p.online?"En ligne":"Hors ligne"}</span></td></tr>)}</tbody></table></Panel>
}
function Role({r}){return <span className={"role "+r.toLowerCase()}>{r}</span>}

function PlayerDetail({player,role,notify}){
 return <><div className="back" onClick={()=>history.back()}>← Fiche joueur</div><div className="profileHead"><div className="profileAvatar">{player.name[0]}</div><div><h1>{player.name}</h1><Role r={player.role}/><p>Compte Minecraft associé • {player.online?"Actuellement en ligne":"Hors ligne"}</p></div>{role==="Owner"&&<button className="danger" onClick={()=>notify("Action administrative protégée")}>Actions Owner</button>}</div>
 <div className="cards"><Card icon="◷" label="Jours" value={player.days}/><Card icon="⌁" label="Temps de jeu" value={player.playtime}/><Card icon="◈" label="Argent" value={player.money}/><Card icon="⚔" label="Kills" value={player.kills}/></div>
 <div className="two"><Panel title="Informations"><Row k="Pseudo" v={player.name}/><Row k="Grade" v={player.role}/><Row k="Shards" v={player.shards}/><Row k="Morts" v={player.deaths}/></Panel><Panel title="Historique récent">{sanctions.filter(s=>s.player===player.name).map(s=><div className="miniSanction"><b>{s.type}</b><span>{s.reason}</span><small>{s.date}</small></div>)}<div className="muted">Toutes les actions seront synchronisées avec le serveur.</div></Panel></div></>
}

function Reports({notify}){
 return <Panel title="Signalements"><div className="notice">La commande Minecraft prévue est <b>/report &lt;joueur&gt; &lt;raison&gt;</b>. Les nouveaux signalements apparaîtront ici automatiquement.</div><div className="reportList">{reports.map(r=><div className="report"><div className="reportTop"><b>{r.id} • {r.reported}</b><span className={"badge "+r.status.replace(" ","").toLowerCase()}>{r.status}</span></div><p>{r.reason}</p><small>Par {r.author} • {r.date}</small><div className="reportActions"><button onClick={()=>notify("Signalement pris en charge")}>Prendre en charge</button><button onClick={()=>notify("Signalement fermé")}>Fermer</button></div></div>)}</div></Panel>
}

function Sanctions({role,notify}){
 return <Panel title="Casier / sanctions"><div className="notice">Historique centralisé : qui a sanctionné, quand, pourquoi et pour combien de temps.</div><table><thead><tr><th>JOUEUR</th><th>ACTION</th><th>STAFF</th><th>RAISON</th><th>DATE</th><th>DURÉE</th>{role==="Owner"&&<th></th>}</tr></thead><tbody>{sanctions.map((s,i)=><tr key={i}><td><b>{s.player}</b></td><td><span className={"action "+s.type.toLowerCase()}>{s.type}</span></td><td>{s.staff}</td><td>{s.reason}</td><td>{s.date}</td><td>{s.duration}</td>{role==="Owner"&&<td><button className="iconBtn" onClick={()=>notify("Entrée supprimée du casier")}>⌫</button></td>}</tr>)}</tbody></table></Panel>
}

function Stats(){return <><div className="cards"><Card icon="♙" label="Joueurs uniques" value="248"/><Card icon="◷" label="Temps de jeu total" value="128j"/><Card icon="⚔" label="Kills" value="1 284"/><Card icon="◈" label="Shards" value="28 441"/></div><div className="two"><Panel title="Activité"><div className="chart">{[35,54,48,70,62,82,75,90,78,96,84,100].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div></Panel><Panel title="Top joueurs"><Row k="1. Enzoleroie" v="183 kills"/><Row k="2. kayoo_t" v="94 kills"/><Row k="3. AlexCraft" v="61 kills"/></Panel></div></>}
function Staff({role,notify}){return <Panel title="Équipe Staff"><div className="staffGrid">{players.filter(p=>p.role!=="Joueur").map(p=><div className="staffCard"><div className="profileAvatar small">{p.name[0]}</div><div><b>{p.name}</b><Role r={p.role}/></div><span className="status online">● En ligne</span>{role==="Owner"&&<button onClick={()=>notify("Éditeur de grade prêt")}>Modifier</button>}</div>)}</div></Panel>}
function Commands(){return <Panel title="Permissions des commandes"><div className="notice">Les permissions affichées ici devront être synchronisées avec LuckPerms. Seul un <b>Owner</b> pourra modifier les grades.</div><table><thead><tr><th>COMMANDE</th><th>OWNER</th><th>SUPERMODO</th><th>MODO</th><th>HELPER</th></tr></thead><tbody>{commands.map(c=><tr>{c.map((v,i)=><td key={i}>{i===0?<b>{v}</b>:v==="—"?"—":"✓ "+v}</td>)}</tr>)}</tbody></table></Panel>}
function Activation({notify}){return <><div className="cards"><Card icon="✦" label="Codes actifs" value="3"/><Card icon="✓" label="Comptes Staff" value="4"/><Card icon="◷" label="Expiration" value="24h"/></div><Panel title="Créer un code Staff"><p className="muted">Un Owner génère un code unique. Le membre du staff l'utilise pour créer son compte et associer son pseudo Minecraft.</p><div className="codeBox">LSMP-7KQ4-29AX</div><button className="primary" onClick={()=>notify("Nouveau code généré : LSMP-XXXX-XXXX")}>Générer un nouveau code</button></Panel></>}
function Logs(){return <Panel title="Journal des actions"><div className="logLine"><b>18:42</b> kayoo_t → /ban limad037 • Cheat</div><div className="logLine"><b>18:31</b> Enzoleroie → grade kayoo_t : Modo → SuperModo</div><div className="logLine"><b>18:12</b> Enzoleroie → suppression d'une entrée du casier</div><div className="logLine"><b>17:55</b> kayoo_t → /kick Testeur</div></Panel>}

createRoot(document.getElementById("root")).render(<App/>);
