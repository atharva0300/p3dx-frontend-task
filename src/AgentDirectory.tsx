import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  UserCircle,
  Globe,
  Building2,
  Briefcase,
  Lock,
  Plug,
  Activity,
  ArrowRight,
  Users,
  Database,
  ShieldCheck,
  Wifi,
  Eye,
} from "lucide-react";

type AgentStatus = "Active" | "Offline" | "Running";

interface Agent {
  id: number;
  name: string;
  role: string;
  world: string;
  institution: string;
  department: string;
  lockers: number;
  endpoints: number;
  connections: number;
  status: AgentStatus;
}


const agents: Agent[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Citizen",
    world: "India",
    institution: "IIT Bangalore",
    department: "Computer Science",
    lockers: 2,
    endpoints: 1,
    connections: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "University Administrator",
    role: "Administrator",
    world: "India",
    institution: "IIT Bangalore",
    department: "Administration",
    lockers: 5,
    endpoints: 2,
    connections: 6,
    status: "Active",
  },
  {
    id: 3,
    name: "SAP HR",
    role: "Employer",
    world: "European Union",
    institution: "SAP Germany",
    department: "Human Resources",
    lockers: 1,
    endpoints: 1,
    connections: 4,
    status: "Active",
  },
  {
    id: 4,
    name: "AI Verification Agent",
    role: "AI Agent",
    world: "European Union",
    institution: "SAP Germany",
    department: "AI Division",
    lockers: 1,
    endpoints: 5,
    connections: 18,
    status: "Running",
  },
  {
    id: 5,
    name: "Apollo Health",
    role: "Hospital",
    world: "India",
    institution: "Apollo Hospital",
    department: "Medical",
    lockers: 4,
    endpoints: 3,
    connections: 8,
    status: "Active",
  },
  {
    id: 6,
    name: "Government Registry",
    role: "Government",
    world: "India",
    institution: "Government of India",
    department: "Identity",
    lockers: 8,
    endpoints: 6,
    connections: 12,
    status: "Offline",
  },
];


function StatusBadge({ status }: { status: AgentStatus }) {
  const map = {
    Active: {
      bg: "#dcfce7",
      color: "#15803d",
    },
    Running: {
      bg: "#dbeafe",
      color: "#2563eb",
    },
    Offline: {
      bg: "#fee2e2",
      color: "#dc2626",
    },
  };

  return (
    <span
      style={{
        background: map[status].bg,
        color: map[status].color,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}


const stats = [
  {
    title: "Total Agents",
    value: "12,840",
    icon: Users,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    title: "Citizens",
    value: "8,412",
    icon: UserCircle,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    title: "Organizations",
    value: "2,381",
    icon: Building2,
    color: "#9333ea",
    bg: "#faf5ff",
  },
  {
    title: "AI Agents",
    value: "512",
    icon: Activity,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    title: "Online",
    value: "9,904",
    icon: Wifi,
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    title: "Published Endpoints",
    value: "18,231",
    icon: Plug,
    color: "#0f766e",
    bg: "#f0fdfa",
  },
];



function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const Icon = stat.icon;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,.04)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          background: stat.bg,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Icon size={18} color={stat.color} />
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {stat.value}
      </div>

      <div
        style={{
          marginTop: 5,
          fontSize: 12,
          color: "#64748b",
        }}
      >
        {stat.title}
      </div>
    </div>
  );
}


export default function AgentDirectory() {

    const [selectedAgent,setSelectedAgent]=useState<Agent | null>(null);

    return (

        <main
            style={{
                padding:24,
                overflowY:"auto",
                flex:1
            }}
        >
          <div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:28
}}
>

<div>

<div
style={{
fontSize:24,
fontWeight:700,
color:"#0f172a"
}}
>
Agent Directory
</div>

<div
style={{
marginTop:5,
fontSize:13,
color:"#64748b"
}}
>
Discover and manage agents participating across governance domains.
</div>

</div>

<div
style={{
display:"flex",
gap:10
}}
>

<button
style={{
padding:"9px 14px",
border:"1px solid var(--border)",
background:"#fff",
borderRadius:8,
fontWeight:500,
display:"flex",
alignItems:"center",
gap:6,
cursor:"pointer"
}}
>
<Download size={15}/>
Export Directory
</button>

<button
style={{
padding:"9px 14px",
background:"#2563eb",
color:"#fff",
border:"none",
borderRadius:8,
fontWeight:600,
display:"flex",
alignItems:"center",
gap:6,
cursor:"pointer"
}}
>
<Plus size={15}/>
Register Agent
</button>

</div>

</div>

          <div
style={{
display:"grid",
gridTemplateColumns:"repeat(6,1fr)",
gap:12,
marginBottom:24
}}
>

{
stats.map(stat=>(
<StatCard
key={stat.title}
stat={stat}
/>
))
}

</div>

<div
style={{
background:"#fff",
border:"1px solid var(--border)",
borderRadius:12,
padding:18,
marginBottom:24,
boxShadow:"0 1px 3px rgba(0,0,0,.04)"
}}
>

<div
style={{
display:"flex",
gap:12,
alignItems:"center",
flexWrap:"wrap"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:8,
padding:"0 12px",
height:42,
border:"1px solid var(--border)",
borderRadius:8,
flex:1,
minWidth:300
}}
>

<Search
size={15}
color="#64748b"
/>

<input

placeholder="Search by agent name..."

style={{

border:"none",

outline:"none",

background:"transparent",

fontSize:13,

flex:1

}}

/>

</div>

{[
"Role",
"World",
"Institution",
"Locker Type",
"Gateway",
"Status"
].map(filter=>(

<button

key={filter}

style={{

height:42,

padding:"0 14px",

border:"1px solid var(--border)",

background:"#fff",

borderRadius:8,

display:"flex",

alignItems:"center",

gap:6,

cursor:"pointer"

}}

>

<Filter size={14}/>

{filter}

</button>

))}

<button
style={{
height:42,
padding:"0 14px",
border:"none",
background:"#eff6ff",
color:"#2563eb",
borderRadius:8,
fontWeight:600,
cursor:"pointer"
}}
>
Clear Filters
</button>

  
  
  </div>

</div>

          
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 18,
  }}
>

    {agents.map((agent) => (
  <div
    key={agent.id}
    onClick={() => setSelectedAgent(agent)}
    style={{
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: 20,
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,.04)",
      transition: ".2s",
    }}
  >

    
<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"flex-start",
marginBottom:18
}}
>

<div
style={{
display:"flex",
gap:14
}}
>

<div
style={{
width:54,
height:54,
borderRadius:"50%",
background:"#dbeafe",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<UserCircle
size={30}
color="#2563eb"
/>

</div>

<div>

<div
style={{
fontWeight:700,
fontSize:16,
color:"#0f172a"
}}
>
{agent.name}
</div>

<div
style={{
marginTop:4,
fontSize:12,
color:"#64748b"
}}
>
{agent.role}
</div>

</div>

</div>

<StatusBadge
status={agent.status}
/>

</div>


    <div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
rowGap:12,
columnGap:12,
marginBottom:18
}}
>


      <div>

<div
style={{
fontSize:11,
color:"#94a3b8",
marginBottom:3
}}
>
WORLD
</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:5,
fontSize:13,
fontWeight:500
}}
>

<Globe
size={14}
color="#2563eb"
/>

{agent.world}

</div>

</div>


      
          
<div>

<div
style={{
fontSize:11,
color:"#94a3b8",
marginBottom:3
}}
>
INSTITUTION
</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:5,
fontSize:13,
fontWeight:500
}}
>

<Building2
size={14}
color="#2563eb"
/>

{agent.institution}

</div>

</div>


      
          <div>

<div
style={{
fontSize:11,
color:"#94a3b8",
marginBottom:3
}}
>
DEPARTMENT
</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:5,
fontSize:13
}}
>

<Briefcase
size={14}
color="#2563eb"
/>

{agent.department}

</div>

</div>


      <div>

<div
style={{
fontSize:11,
color:"#94a3b8",
marginBottom:3
}}
>
CONNECTIONS
</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:5,
fontSize:13
}}
>

<Plug
size={14}
color="#2563eb"
/>

{agent.connections}

</div>

</div>

</div>


    <div
style={{
display:"flex",
justifyContent:"space-between",
padding:"14px 0",
borderTop:"1px solid #e2e8f0",
borderBottom:"1px solid #e2e8f0",
marginBottom:18
}}
>


      <div
style={{
textAlign:"center",
flex:1
}}
>

<div
style={{
fontWeight:700,
fontSize:18
}}
>
{agent.lockers}
</div>

<div
style={{
fontSize:11,
color:"#64748b"
}}
>
Lockers
</div>

</div>


      
<div
style={{
textAlign:"center",
flex:1
}}
>

<div
style={{
fontWeight:700,
fontSize:18
}}
>
{agent.endpoints}
</div>

<div
style={{
fontSize:11,
color:"#64748b"
}}
>
Endpoints
</div>

</div>


      <div
style={{
textAlign:"center",
flex:1
}}
>

<div
style={{
fontWeight:700,
fontSize:18
}}
>
{agent.connections}
</div>

<div
style={{
fontSize:11,
color:"#64748b"
}}
>
Connections
</div>

</div>

</div>


    <div
style={{
display:"flex",
gap:10
}}
>


      <button
style={{
flex:1,
height:38,
border:"1px solid var(--border)",
background:"#fff",
borderRadius:8,
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:6,
cursor:"pointer",
fontWeight:500
}}
>

<Eye
size={15}
/>

View

</button>


      
   <button
style={{
flex:1,
height:38,
border:"1px solid var(--border)",
background:"#fff",
borderRadius:8,
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:6,
cursor:"pointer",
fontWeight:500
}}
>

<Lock
size={15}
/>

Lockers

</button>


      <button
style={{
height:38,
padding:"0 14px",
background:"#2563eb",
color:"#fff",
border:"none",
borderRadius:8,
display:"flex",
alignItems:"center",
gap:6,
cursor:"pointer"
}}
>

<ArrowRight
size={14}
/>

</button>

</div>


    
   </div>
))}

</div>

      {
selectedAgent && (

<div

style={{

position:"fixed",

top:0,

right:0,

width:430,

height:"100vh",

background:"#fff",

borderLeft:"1px solid var(--border)",

boxShadow:"-8px 0 24px rgba(0,0,0,.08)",

overflowY:"auto",

zIndex:100,

padding:24

}}

>


  <div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:24

}}

>

<div>

<div

style={{

fontWeight:700,

fontSize:22

}}

>

Agent Profile

</div>

<div

style={{

fontSize:12,

color:"#64748b",

marginTop:4

}}

>

Detailed information

</div>

</div>

<button

onClick={()=>setSelectedAgent(null)}

style={{

border:"none",

background:"#f1f5f9",

width:34,

height:34,

borderRadius:8,

cursor:"pointer",

fontWeight:700

}}

>

×

</button>

</div>


  <div

style={{

display:"flex",

gap:18,

alignItems:"center",

marginBottom:24

}}

>

<div

style={{

width:72,

height:72,

borderRadius:"50%",

background:"#dbeafe",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>

<UserCircle

size={42}

color="#2563eb"

/>

</div>

<div>

<div

style={{

fontSize:20,

fontWeight:700,

marginBottom:6

}}

>

{selectedAgent.name}

</div>

<StatusBadge

status={selectedAgent.status}

/>

</div>

</div>


  <div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:18,

marginBottom:26

}}

>


    <div>

<div style={{fontSize:11,color:"#94a3b8"}}>

ROLE

</div>

<div style={{fontWeight:600}}>

{selectedAgent.role}

</div>

</div>


    <div>

<div style={{fontSize:11,color:"#94a3b8"}}>

WORLD

</div>

<div style={{fontWeight:600}}>

{selectedAgent.world}

</div>

</div>


  <div>

<div style={{fontSize:11,color:"#94a3b8"}}>

INSTITUTION

</div>

<div style={{fontWeight:600}}>

{selectedAgent.institution}

</div>

</div>


    <div>

<div style={{fontSize:11,color:"#94a3b8"}}>

DEPARTMENT

</div>

<div style={{fontWeight:600}}>

{selectedAgent.department}

</div>

</div>

</div>


  <div

style={{

marginBottom:28

}}

>

<div

style={{

fontWeight:700,

marginBottom:12

}}

>

Owned Lockers

</div>

{
[
"Degree Locker",
"Identity Locker",
"Employment Locker",
"Medical Locker"
].map(locker=>(

<div

key={locker}

style={{

display:"flex",

justifyContent:"space-between",

padding:"12px 14px",

background:"#f8fafc",

border:"1px solid #e2e8f0",

borderRadius:10,

marginBottom:10

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:8

}}

>

<Lock

size={16}

color="#2563eb"

/>

{locker}

</div>

<span

style={{

fontSize:11,

background:"#dcfce7",

color:"#15803d",

padding:"4px 10px",

borderRadius:999

}}

>

Published

</span>

</div>

))

}

</div>


  <div

style={{

marginBottom:28

}}

>

<div

style={{

fontWeight:700,

marginBottom:12

}}

>

Published Endpoints

</div>

{
[
"Degree Verification",

"Identity API",

"Employment Record"

].map(endpoint=>(

<div

key={endpoint}

style={{

padding:"12px 14px",

background:"#f8fafc",

border:"1px solid #e2e8f0",

borderRadius:10,

marginBottom:10

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between"

}}

>

<div>{endpoint}</div>

<Plug

size={16}

color="#2563eb"

/>

</div>

</div>

))

}

</div>


  <div

style={{

marginBottom:28

}}

>

<div

style={{

fontWeight:700,

marginBottom:12

}}

>

Recent Connections

</div>

<div

style={{

padding:16,

background:"#f8fafc",

borderRadius:12,

border:"1px solid #e2e8f0"

}}

>

🇮🇳 India Gateway

<br/>

↓

<br/>

🇪🇺 Germany Gateway

<br/><br/>

Employment Verification

</div>

</div>


  <div

style={{

marginBottom:28

}}

>

<div

style={{

fontWeight:700,

marginBottom:12

}}

>

Recent Transactions

</div>

{
[
"Degree Verification Completed",

"Identity Request Approved",

"Medical Record Shared"

].map(tx=>(

<div

key={tx}

style={{

display:"flex",

gap:10,

marginBottom:14

}}

>

<div

style={{

width:10,

height:10,

borderRadius:"50%",

background:"#2563eb",

marginTop:5

}}

/>

<div>

<div

style={{

fontWeight:500

}}

>

{tx}

</div>

<div

style={{

fontSize:12,

color:"#64748b"

}}

>

2 hours ago

</div>

</div>

</div>

))

}

</div>


  <div

style={{

display:"flex",

gap:10,

marginTop:24

}}

>

<button

style={{

flex:1,

height:44,

border:"1px solid var(--border)",

background:"#fff",

borderRadius:10,

fontWeight:600

}}

>

Manage Connections

</button>

<button

style={{

flex:1,

height:44,

background:"#2563eb",

color:"#fff",

border:"none",

borderRadius:10,

fontWeight:600

}}

>

View Active Consents

</button>

</div>


  </div>

)}

  
</main>

);

}
          
