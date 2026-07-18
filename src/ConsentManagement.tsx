import { useState } from "react";

import {
  ShieldCheck,
  Clock3,
  Ban,
  Calendar,
  Users,
  Activity,
  Download,
  Plus,
  FileText,
  Lock,
  Building2,
  CheckCircle2,
  Eye,
  ArrowRight,
} from "lucide-react";

type ConsentStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Revoked"
  | "Expired";

interface Consent {
  id: number;

  consentId: string;

  requester: string;

  owner: string;

  purpose: string;

  duration: string;

  sourceWorld: string;

  destinationWorld: string;

  status: ConsentStatus;

  expires: string;

  permission: string;
}



const consents: Consent[] = [
  {
    id: 1,
    consentId: "CNS-1001",
    requester: "SAP Germany",
    owner: "Rahul Sharma",
    purpose: "Employment Verification",
    duration: "30 Days",
    sourceWorld: "India",
    destinationWorld: "Germany",
    status: "Approved",
    expires: "22 Aug 2026",
    permission: "Read Only",
  },

  {
    id: 2,
    consentId: "CNS-1002",
    requester: "Apollo Hospital",
    owner: "Rahul Sharma",
    purpose: "Medical Research",
    duration: "60 Days",
    sourceWorld: "India",
    destinationWorld: "United Kingdom",
    status: "Pending",
    expires: "15 Sep 2026",
    permission: "Read Only",
  },

  {
    id: 3,
    consentId: "CNS-1003",
    requester: "Canada Immigration",
    owner: "Rahul Sharma",
    purpose: "Identity Verification",
    duration: "14 Days",
    sourceWorld: "India",
    destinationWorld: "Canada",
    status: "Revoked",
    expires: "Expired",
    permission: "Read Only",
  },
];

const stats = [
  {
    title: "Active Consents",
    value: "2,148",
    icon: ShieldCheck,
    color: "#16a34a",
    bg: "#f0fdf4",
  },

  {
    title: "Pending Approval",
    value: "184",
    icon: Clock3,
    color: "#d97706",
    bg: "#fff7ed",
  },

  {
    title: "Revoked",
    value: "73",
    icon: Ban,
    color: "#dc2626",
    bg: "#fef2f2",
  },

  {
    title: "Expiring This Week",
    value: "96",
    icon: Calendar,
    color: "#ea580c",
    bg: "#fff7ed",
  },

  {
    title: "Active Data Owners",
    value: "842",
    icon: Users,
    color: "#2563eb",
    bg: "#eff6ff",
  },

  {
    title: "Requests Today",
    value: "318",
    icon: Activity,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];


function StatusBadge({
  status,
}: {
  status: ConsentStatus;
}) {
  const colors = {
    Pending: {
      bg: "#fef3c7",
      color: "#92400e",
    },

    Approved: {
      bg: "#dcfce7",
      color: "#15803d",
    },

    Rejected: {
      bg: "#fee2e2",
      color: "#dc2626",
    },

    Revoked: {
      bg: "#fee2e2",
      color: "#dc2626",
    },

    Expired: {
      bg: "#f1f5f9",
      color: "#64748b",
    },
  };

  return (
    <span
      style={{
        background: colors[status].bg,
        color: colors[status].color,
        padding: "5px 12px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}


function StatCard({
  stat,
}: {
  stat: (typeof stats)[0];
}) {
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
          width: 42,
          height: 42,
          borderRadius: 10,
          background: stat.bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Icon
          size={18}
          color={stat.color}
        />
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {stat.value}
      </div>

      <div
        style={{
          marginTop: 5,
          color: "#64748b",
          fontSize: 12,
        }}
      >
        {stat.title}
      </div>
    </div>
  );
}


function PermissionToggle({
  enabled,
}: {
  enabled: boolean;
}) {
  return (
    <div
      style={{
        width: 42,
        height: 22,
        borderRadius: 999,
        background: enabled
          ? "#16a34a"
          : "#cbd5e1",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 2,
          left: enabled ? 22 : 2,
        }}
      />
    </div>
  );
}

export default function ConsentManagement() {
  const [selectedConsent, setSelectedConsent] =
    useState(consents[0]);

  return (
    <main
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 24,
      }}
    >

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  }}
>
  <div>
    <div
      style={{
        fontSize: 24,
        fontWeight: 700,
        color: "#0f172a",
      }}
    >
      Consent Management
    </div>

    <div
      style={{
        marginTop: 5,
        fontSize: 13,
        color: "#64748b",
      }}
    >
      Review, approve, reject and revoke permissions for secure cross-border
      data sharing.
    </div>
  </div>

  <div
    style={{
      display: "flex",
      gap: 10,
    }}
  >
    <button
      style={{
        padding: "9px 14px",
        border: "1px solid var(--border)",
        background: "#fff",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
      }}
    >
      <Download size={15} />
      Export
    </button>

    <button
      style={{
        padding: "9px 14px",
        border: "1px solid var(--border)",
        background: "#fff",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
      }}
    >
      <FileText size={15} />
      Policy Templates
    </button>

    <button
      style={{
        padding: "9px 14px",
        border: "none",
        background: "#2563eb",
        color: "#fff",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      <Plus size={15} />
      New Consent
    </button>
  </div>
</div>


      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
    marginBottom: 28,
  }}
>
  {stats.map((stat) => (
    <StatCard
      key={stat.title}
      stat={stat}
    />
  ))}
</div>

      <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>

  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  }}
>
  <div>
    <div
      style={{
        fontSize: 18,
        fontWeight: 700,
      }}
    >
      Consent Lifecycle
    </div>

    <div
      style={{
        marginTop: 4,
        color: "#64748b",
        fontSize: 13,
      }}
    >
      Current approval workflow for the selected consent request.
    </div>
  </div>

  <StatusBadge status={selectedConsent.status} />
</div>

        <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>

        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  }}
>
  <CheckCircle2
    size={28}
    color="#16a34a"
  />

  <div
    style={{
      fontWeight: 600,
      fontSize: 13,
    }}
  >
    Request Created
  </div>
</div>

<div
  style={{
    flex: 1,
    height: 3,
    background: "#22c55e",
    borderRadius: 999,
  }}
/>

          <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  }}
>
  <CheckCircle2
    size={28}
    color="#16a34a"
  />

  <div
    style={{
      fontWeight: 600,
      fontSize: 13,
    }}
  >
    Owner Review
  </div>
</div>

<div
  style={{
    flex: 1,
    height: 3,
    background:
      selectedConsent.status === "Approved"
        ? "#22c55e"
        : "#dbeafe",
    borderRadius: 999,
  }}
/>

          <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  }}
>
  {selectedConsent.status === "Approved" ? (
    <CheckCircle2
      size={28}
      color="#16a34a"
    />
  ) : (
    <Clock3
      size={28}
      color="#2563eb"
    />
  )}

  <div
    style={{
      fontWeight: 600,
      fontSize: 13,
    }}
  >
    Approved
  </div>
</div>

<div
  style={{
    flex: 1,
    height: 3,
    background:
      selectedConsent.status === "Approved"
        ? "#22c55e"
        : "#e2e8f0",
    borderRadius: 999,
  }}
/>


          <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  }}
>
  <ShieldCheck
    size={28}
    color={
      selectedConsent.status === "Approved"
        ? "#16a34a"
        : "#94a3b8"
    }
  />

  <div
    style={{
      fontWeight: 600,
      fontSize: 13,
    }}
  >
    Active
  </div>
</div>


          <div
  style={{
    flex: 1,
    height: 3,
    background: "#e2e8f0",
    borderRadius: 999,
  }}
/>

          
          <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  }}
>
  <Ban
    size={28}
    color="#94a3b8"
  />

  <div
    style={{
      fontWeight: 600,
      fontSize: 13,
      textAlign: "center",
    }}
  >
    Revoked / Expired
  </div>
</div>

       </div>

</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 24,
    marginBottom: 24,
  }}
>

        
        <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>

     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  }}
>
  <div>
    <div
      style={{
        fontSize: 18,
        fontWeight: 700,
      }}
    >
      Active Consent Flow
    </div>

    <div
      style={{
        marginTop: 4,
        color: "#64748b",
        fontSize: 13,
      }}
    >
      Secure permission flow across trusted gateways.
    </div>
  </div>

  <StatusBadge status={selectedConsent.status} />
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 10,
  }}
>

  <div
  style={{
    minWidth: 160,
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 18,
    textAlign: "center",
  }}
>
  <Users
    size={28}
    color="#2563eb"
  />

  <div
    style={{
      marginTop: 10,
      fontWeight: 700,
    }}
  >
    Rahul Sharma
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#64748b",
    }}
  >
    Data Owner
  </div>
</div>


  <ArrowRight
  size={22}
  color="#94a3b8"
/>

  
   <div
  style={{
    minWidth: 160,
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 18,
    textAlign: "center",
  }}
>
  <Lock
    size={28}
    color="#16a34a"
  />

  <div
    style={{
      marginTop: 10,
      fontWeight: 700,
    }}
  >
    Degree Locker
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#64748b",
    }}
  >
    Digital Asset
  </div>
</div>

<ArrowRight
  size={22}
  color="#94a3b8"
/>

  
  <div
  style={{
    minWidth: 170,
    border: "2px solid #2563eb",
    background: "#eff6ff",
    borderRadius: 12,
    padding: 18,
    textAlign: "center",
  }}
>
  <ShieldCheck
    size={28}
    color="#2563eb"
  />

  <div
    style={{
      marginTop: 10,
      fontWeight: 700,
    }}
  >
    India Gateway
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#64748b",
    }}
  >
    Trusted Gateway
  </div>
</div>

<div
  style={{
    minWidth: 200,
    textAlign: "center",
  }}
>
  <div
    style={{
      color: "#2563eb",
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 10,
    }}
  >
    Secure Permission
  </div>

  <div
    style={{
      border: "2px dashed #2563eb",
      borderRadius: 12,
      padding: 14,
      background: "#eff6ff",
    }}
  >
    <div><strong>Purpose</strong> : Employment Verification</div>

    <div
      style={{
        marginTop: 6,
      }}
    >
      <strong>Duration</strong> : 30 Days
    </div>

    <div
      style={{
        marginTop: 6,
      }}
    >
      <strong>Permission</strong> : Read Only
    </div>

    <div
      style={{
        marginTop: 6,
      }}
    >
      <strong>Status</strong> : Approved
    </div>
  </div>
</div>

<ArrowRight
  size={22}
  color="#94a3b8"
/>


  <div
  style={{
    minWidth: 170,
    border: "2px solid #16a34a",
    background: "#f0fdf4",
    borderRadius: 12,
    padding: 18,
    textAlign: "center",
  }}
>
  <ShieldCheck
    size={28}
    color="#16a34a"
  />

  <div
    style={{
      marginTop: 10,
      fontWeight: 700,
    }}
  >
    Germany Gateway
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#64748b",
    }}
  >
    Destination Gateway
  </div>
</div>

  
  <ArrowRight
  size={22}
  color="#94a3b8"
/>


  <div
  style={{
    minWidth: 170,
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 18,
    textAlign: "center",
  }}
>
  <Building2
    size={28}
    color="#2563eb"
  />

  <div
    style={{
      marginTop: 10,
      fontWeight: 700,
    }}
  >
    SAP Germany
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#64748b",
    }}
  >
    Employment Verification
  </div>
</div>

</div>

</div>


    <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>

<div
  style={{
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 22,
  }}
>
  Consent Details
</div>

      <div
  style={{
    display: "grid",
    rowGap: 16,
    fontSize: 13,
  }}
>

<div><strong>Consent ID</strong><br />{selectedConsent.consentId}</div>

<div><strong>Requester</strong><br />{selectedConsent.requester}</div>

<div><strong>Owner</strong><br />{selectedConsent.owner}</div>

<div><strong>Purpose</strong><br />{selectedConsent.purpose}</div>

<div><strong>Requested</strong><br />18 Jul 2026</div>

<div><strong>Expiry</strong><br />{selectedConsent.expires}</div>

<div><strong>Source World</strong><br />{selectedConsent.sourceWorld}</div>

<div><strong>Destination World</strong><br />{selectedConsent.destinationWorld}</div>

<div><strong>Permission</strong><br />{selectedConsent.permission}</div>

<div><strong>Retention</strong><br />90 Days</div>

<div><strong>Legal Basis</strong><br />GDPR + DPDP</div>

<div><strong>Policy</strong><br />Employment Verification Policy</div>


        </div>

</div>

</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 24,
    marginBottom: 24,
  }}
>
        <div>

<div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>


  <div
  style={{
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  }}
>
  Shared Data
</div>

  {[
  "Degree Certificate",
  "University Transcript",
  "Student Identity",
  "Graduation Date",
  "Digital Signature",
  "Institution Verification",
].map((asset) => (
  <div
    key={asset}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid #f1f5f9",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <FileText
        size={18}
        color="#2563eb"
      />

      <div>

        <div
          style={{
            fontWeight: 600,
          }}
        >
          {asset}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#64748b",
          }}
        >
          AES-256 Encrypted
        </div>

      </div>
    </div>

    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      <StatusBadge status="Approved" />

      <span
        style={{
          background: "#eff6ff",
          color: "#2563eb",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        Read Only
      </span>
    </div>
  </div>
))}


  </div>

        
  <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>

    <div
  style={{
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  }}
>
  Permission Matrix
</div>
    

    
    <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  }}
>

    <thead>

<tr>

<th align="left">Asset</th>

<th>Read</th>

<th>Download</th>

<th>Forward</th>

<th>Share</th>

<th>Delete</th>

</tr>

</thead>

      
     <tbody>

{[
"Degree Certificate",
"Transcript",
"Identity",
"Medical Record",
"Employment Record",
].map((row)=>(
<tr key={row}>

<td
style={{
padding:"16px 0",
fontWeight:600,
}}
>

{row}

</td>

<td><PermissionToggle enabled /></td>

<td><PermissionToggle enabled={false} /></td>

<td><PermissionToggle enabled={false} /></td>

<td><PermissionToggle enabled={false} /></td>

<td><PermissionToggle enabled={false} /></td>

</tr>
))}

</tbody>

</table>

    </div>

        
    </div>

      <div>

        
  <div
style={{
background:"#fff",
border:"1px solid var(--border)",
borderRadius:14,
padding:24,
boxShadow:"0 2px 6px rgba(0,0,0,.04)"
}}
>

    <div
style={{
fontWeight:700,
fontSize:18,
marginBottom:20,
}}
>

Pending Requests

</div>

    {consents
.filter(c=>c.status==="Pending")
.map((consent)=>(

<div
key={consent.id}
style={{
paddingBottom:18,
marginBottom:18,
borderBottom:"1px solid #f1f5f9",
}}
>

<div
style={{
fontWeight:700,
marginBottom:6,
}}
>

{consent.requester}

</div>

<div
style={{
fontSize:13,
color:"#64748b",
marginBottom:4,
}}
>

Purpose : {consent.purpose}

</div>

<div
style={{
fontSize:13,
color:"#64748b",
marginBottom:16,
}}
>

Duration : {consent.duration}

</div>

<div
style={{
display:"flex",
gap:8,
}}
>

<button
style={{
flex:1,
background:"#16a34a",
color:"#fff",
border:"none",
padding:"10px",
borderRadius:8,
cursor:"pointer",
fontWeight:600,
}}
>

Approve

</button>

<button
style={{
flex:1,
background:"#dc2626",
color:"#fff",
border:"none",
padding:"10px",
borderRadius:8,
cursor:"pointer",
fontWeight:600,
}}
>

Reject

</button>

<button
style={{
flex:1,
background:"#fff",
border:"1px solid var(--border)",
padding:"10px",
borderRadius:8,
cursor:"pointer",
fontWeight:600,
}}
>

<Eye size={15}/>

</button>

</div>

</div>

))}

    
  </div>

     <div
style={{
marginTop:24,
background:"#fff",
border:"1px solid var(--border)",
borderRadius:14,
padding:24,
boxShadow:"0 2px 6px rgba(0,0,0,.04)"
}}
>

<div
style={{
fontWeight:700,
fontSize:18,
marginBottom:18,
}}
>

Quick Summary

</div>

<div
style={{
display:"grid",
rowGap:16,
fontSize:13,
}}
>

<div>

<strong>Approval Rate</strong>

<br/>

98.2%

</div>

<div>

<strong>Average Approval Time</strong>

<br/>

4 mins

</div>

<div>

<strong>Most Requested Data</strong>

<br/>

Degree Certificate

</div>

<div>

<strong>Average Duration</strong>

<br/>

32 Days

</div>

</div>

</div>

    </div>

      </div>
  
          
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 24,
    marginTop: 24,
  }}
>

            <div>

              <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 20,
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: 18,
      }}
    >
      Active Consents
    </h3>

    <span
      style={{
        color: "#64748b",
        fontSize: 13,
      }}
    >
      {consents.length} Records
    </span>
  </div>

  {consents.map((consent) => (
    <div
      key={consent.id}
      onClick={() => setSelectedConsent(consent)}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 16,
        marginBottom: 14,
        cursor: "pointer",
        background:
          selectedConsent.id === consent.id
            ? "#eff6ff"
            : "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
            }}
          >
            {consent.requester}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#64748b",
            }}
          >
            {consent.purpose}
          </div>
        </div>

        <StatusBadge status={consent.status} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          marginTop: 14,
          gap: 12,
          fontSize: 12,
        }}
      >
        <div>
          <strong>Owner</strong>
          <br />
          {consent.owner}
        </div>

        <div>
          <strong>Permission</strong>
          <br />
          {consent.permission}
        </div>

        <div>
          <strong>World</strong>
          <br />
          {consent.destinationWorld}
        </div>

        <div>
          <strong>Expiry</strong>
          <br />
          {consent.expires}
        </div>
      </div>
    </div>
  ))}
</div>

              <div
  style={{
    marginTop: 24,
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: 20,
      fontSize: 18,
    }}
  >
    Activity Timeline
  </h3>

  {[
    "Consent Requested",
    "Owner Approved",
    "Gateway Validation",
    "Consent Activated",
    "Transaction Completed",
  ].map((item, i) => (
    <div
      key={item}
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 18,
      }}
    >
      <CheckCircle2
        size={18}
        color="#16a34a"
      />

      <div>
        <div
          style={{
            fontWeight: 600,
          }}
        >
          {item}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#64748b",
          }}
        >
          {`18 Jul 2026 • ${10 + i}:30 UTC`}
        </div>
      </div>
    </div>
  ))}
</div>

              </div>

            <div>

              <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: 20,
      fontSize: 18,
    }}
  >
    Policy Validation
  </h3>

  {[
    "GDPR",
    "DPDP",
    "Cross-border Rules",
    "Data Residency",
    "Institution Policy",
  ].map((policy) => (
    <div
      key={policy}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <span>{policy}</span>

      <span
        style={{
          color: "#16a34a",
          fontWeight: 600,
        }}
      >
        ✔ Passed
      </span>
    </div>
  ))}

  <hr
    style={{
      margin: "18px 0",
    }}
  />

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <strong>Risk Score</strong>

    <span
      style={{
        background: "#dcfce7",
        color: "#15803d",
        padding: "4px 12px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 12,
      }}
    >
      LOW
    </span>
  </div>
</div>

              <div
  style={{
    marginTop: 24,
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: 20,
      fontSize: 18,
    }}
  >
    Quick Actions
  </h3>

  {[
    "Create Consent",
    "Import Policy",
    "Export Audit",
    "View Notifications",
  ].map((action) => (
    <button
      key={action}
      style={{
        width: "100%",
        marginBottom: 10,
        padding: "11px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "#fff",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {action}
    </button>
  ))}
</div>

              </div>

</div>
      
        

    </main>
  );
}




