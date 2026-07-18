import { useState } from "react";
import {
  ArrowRight,
  Activity,
  Download,
  Plus,
  Globe,
  Lock,
  ShieldCheck,
  Wifi,
  CheckCircle2,
  Clock3,
  PauseCircle,
  XCircle,
  Building2,
  UserCircle,
  ArrowLeftRight,
} from "lucide-react";


type ConnectionStatus =
  | "Requested"
  | "Pending"
  | "Established"
  | "Suspended"
  | "Expired";

interface Connection {
  id: number;
  name: string;
  sourceWorld: string;
  destinationWorld: string;
  sourceAgent: string;
  destinationAgent: string;
  sourceGateway: string;
  destinationGateway: string;
  sourceLocker: string;
  status: ConnectionStatus;
  transactions: number;
  lastActivity: string;
}

const connections: Connection[] = [
  {
    id: 1,
    name: "Degree Verification",
    sourceWorld: "India",
    destinationWorld: "Germany",
    sourceAgent: "Rahul Sharma",
    destinationAgent: "SAP HR",
    sourceGateway: "India Gateway",
    destinationGateway: "Germany Gateway",
    sourceLocker: "Degree Locker",
    status: "Established",
    transactions: 14,
    lastActivity: "2 hrs ago",
  },
  {
    id: 2,
    name: "Medical Record Exchange",
    sourceWorld: "India",
    destinationWorld: "United Kingdom",
    sourceAgent: "Apollo Hospital",
    destinationAgent: "NHS UK",
    sourceGateway: "India Gateway",
    destinationGateway: "UK Gateway",
    sourceLocker: "Medical Locker",
    status: "Pending",
    transactions: 8,
    lastActivity: "5 mins ago",
  },
  {
    id: 3,
    name: "Identity Verification",
    sourceWorld: "India",
    destinationWorld: "Canada",
    sourceAgent: "Government Registry",
    destinationAgent: "Immigration Canada",
    sourceGateway: "India Gateway",
    destinationGateway: "Canada Gateway",
    sourceLocker: "Identity Locker",
    status: "Requested",
    transactions: 2,
    lastActivity: "12 mins ago",
  },
];


const stats = [
  {
    title: "Active Connections",
    value: "1,284",
    icon: ArrowLeftRight,
    color: "#2563eb",
    bg: "#eff6ff",
  },

  {
    title: "Pending Requests",
    value: "218",
    icon: Clock3,
    color: "#ea580c",
    bg: "#fff7ed",
  },

  {
    title: "Trusted Gateways",
    value: "42",
    icon: ShieldCheck,
    color: "#16a34a",
    bg: "#f0fdf4",
  },

  {
    title: "Transactions Today",
    value: "18,942",
    icon: Activity,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];


function StatusBadge({
  status,
}: {
  status: ConnectionStatus;
}) {
  const map = {
    Requested: {
      bg: "#fef3c7",
      color: "#92400e",
    },

    Pending: {
      bg: "#dbeafe",
      color: "#2563eb",
    },

    Established: {
      bg: "#dcfce7",
      color: "#15803d",
    },

    Suspended: {
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
        background: map[status].bg,
        color: map[status].color,
        padding: "5px 12px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 11,
      }}
    >
      {status}
    </span>
  );
}


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
          width: 42,
          height: 42,
          background: stat.bg,
          borderRadius: 10,
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
          fontSize: 12,
          color: "#64748b",
        }}
      >
        {stat.title}
      </div>
    </div>
  );
}

function WorkflowNode({
  icon,
  title,
  subtitle,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        minWidth: 150,
        background: active ? "#eff6ff" : "#fff",
        border: active
          ? "2px solid #2563eb"
          : "1px solid var(--border)",
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
        boxShadow: active
          ? "0 8px 24px rgba(37,99,235,.12)"
          : "0 2px 6px rgba(0,0,0,.04)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "#f8fafc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto 12px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 4,
          fontSize: 12,
          color: "#64748b",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}



export default function ConnectionFlow() {
  const [selectedConnection, setSelectedConnection] =
    useState(connections[0]);

  return (
    <main
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 24,
      }}
    >

      {/* Next batch starts here */}

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
      Connection Flow
    </div>

    <div
      style={{
        marginTop: 5,
        fontSize: 13,
        color: "#64748b",
      }}
    >
      Visualize secure cross-border connections established through trusted
      Gateways.
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
      New Connection
    </button>
  </div>
</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 16,
    marginBottom: 24,
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
    marginBottom: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  }}
>


        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  }}
>
  <div>
    <div
      style={{
        fontSize: 18,
        fontWeight: 700,
      }}
    >
      Connection Status
    </div>

    <div
      style={{
        marginTop: 4,
        color: "#64748b",
        fontSize: 13,
      }}
    >
      Lifecycle of the selected cross-border request
    </div>
  </div>

  <StatusBadge status={selectedConnection.status} />
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
    Requested
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
    Pending
  </div>
</div>

          <div
  style={{
    flex: 1,
    height: 3,
    background:
      selectedConnection.status === "Established"
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
  {selectedConnection.status === "Established" ? (
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
    Established
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
    marginBottom: 24,
    boxShadow: "0 2px 6px rgba(0,0,0,.04)",
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
        fontSize: 18,
        fontWeight: 700,
      }}
    >
      Active Workflow
    </div>

    <div
      style={{
        marginTop: 4,
        fontSize: 13,
        color: "#64748b",
      }}
    >
      Live visualization of the currently selected connection.
    </div>
  </div>

  <StatusBadge status={selectedConnection.status} />
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
          <WorkflowNode
            icon={<Building2 size={22} color="#2563eb" />}
            title={selectedConnection.destinationAgent}
            subtitle="Requester"
          />

          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            →
          </div>

          <WorkflowNode
            icon={<ShieldCheck size={22} color="#16a34a" />}
            title={selectedConnection.destinationGateway}
            subtitle="Requester Gateway"
          />

          <div
            style={{
              minWidth: 170,
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#2563eb",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              ⇄ Secure Tunnel ⇄
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "#64748b",
              }}
            >
              TLS Encrypted Cross-border Channel
            </div>
          </div>

          <WorkflowNode
            active
            icon={<ShieldCheck size={22} color="#16a34a" />}
            title={selectedConnection.sourceGateway}
            subtitle="Source Gateway"
          />

          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            →
          </div>

          <WorkflowNode
            icon={<UserCircle size={22} color="#2563eb" />}
            title={selectedConnection.sourceAgent}
            subtitle="Data Owner"
          />

          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            →
          </div>

          <WorkflowNode
            icon={<Lock size={22} color="#2563eb" />}
            title={selectedConnection.sourceLocker}
            subtitle="Degree Locker"
          />

          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            →
          </div>

          <WorkflowNode
            icon={<ShieldCheck size={22} color="#16a34a" />}
            title="Consent Verified"
            subtitle="Authorization"
          />

          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            →
          </div>

          <WorkflowNode
            icon={<CheckCircle2 size={22} color="#16a34a" />}
            title="Credential Shared"
            subtitle="Transaction Complete"
          />
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
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 22,
  }}
>
Active Connections
</div>

              {connections.map((connection) => (
  <div
    key={connection.id}
    onClick={() => setSelectedConnection(connection)}
    style={{
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      padding: 18,
      marginBottom: 16,
      cursor: "pointer",
      transition: ".2s",
      background:
        selectedConnection.id === connection.id
          ? "#eff6ff"
          : "#fff",
    }}
  >

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  }}
>
  <div>
    <div
      style={{
        fontWeight: 700,
      }}
    >
      {connection.name}
    </div>

    <div
      style={{
        marginTop: 4,
        color: "#64748b",
        fontSize: 13,
      }}
    >
      {connection.sourceWorld}
      {" → "}
      {connection.destinationWorld}
    </div>
  </div>

  <StatusBadge status={connection.status} />
</div>

    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 12,
    marginBottom: 16,
    fontSize: 13,
  }}
>
  <div>
    <strong>Transactions</strong>

    <br />

    {connection.transactions}
  </div>

  <div>
    <strong>Source</strong>

    <br />

    {connection.sourceGateway}
  </div>

  <div>
    <strong>Destination</strong>

    <br />

    {connection.destinationGateway}
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
      flex: 1,
      height: 38,
      border: "1px solid var(--border)",
      background: "#fff",
      borderRadius: 8,
    }}
  >
    View Flow
  </button>

  <button
    style={{
      flex: 1,
      height: 38,
      border: "1px solid var(--border)",
      background: "#fff",
      borderRadius: 8,
    }}
  >
    Pause
  </button>

  <button
    style={{
      flex: 1,
      height: 38,
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 8,
    }}
  >
    Disconnect
  </button>
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

              <div
  style={{
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
  }}
>
Gateway Health
</div>

              <div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12,
    }}
  >
    <strong>India Gateway</strong>

    <Wifi
      color="#16a34a"
      size={18}
    />
  </div>

  <div
    style={{
      fontSize: 13,
      color: "#64748b",
      lineHeight: 1.8,
    }}
  >
    Response Time: 41 ms

    <br />

    Connected Worlds: 18

    <br />

    Requests Today: 2,341

    <br />

    Security: Healthy
  </div>
</div>

              </div>

            </div>

          </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  }}
>

        <div
  style={{
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 24,
  }}
>

          <div
  style={{
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  }}
>
Connection Timeline
</div>

          {[
  "Connection Requested",
  "Consent Verified",
  "Gateway Authentication",
  "Secure Tunnel Established",
  "Degree Verified",
  "Transaction Completed",
].map((item, index) => (
  <div
    key={item}
    style={{
      display: "flex",
      gap: 14,
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
        {`10:${45 + index} AM`}
      </div>
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
  }}
>

          <div
  style={{
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  }}
>
Recent Requests
</div>

          {[
  "Rahul Sharma → SAP Germany",
  "Apollo Hospital → NHS UK",
  "Government Registry → Canada",
].map((request) => (
  <div
    key={request}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid #e2e8f0",
    }}
  >
    <div>
      <div
        style={{
          fontWeight: 600,
        }}
      >
        {request}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#64748b",
        }}
      >
        Requested 5 mins ago
      </div>
    </div>

    <button
      style={{
        padding: "6px 12px",
        border: "1px solid var(--border)",
        background: "#fff",
        borderRadius: 8,
      }}
    >
      View
    </button>
  </div>
))}

          </div>

        </div>

      

    </main>
  );
}


