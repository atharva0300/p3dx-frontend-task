import { useState } from "react";
import WorldExplorer from "./WorldExplorer";
import AgentDirectory from "./AgentDirectory";
import ConnectionFlow from "./ConnectionFlow";
import ConsentManagement from "./ConsentManagement";
import Transactions from "./Transactions";
import {
  Globe,
  Radio,
  Users,
  Link2,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  Map,
  UserCircle,
  Plug,
  ClipboardCheck,
  ScrollText,
  Settings,
  Search,
  Bell,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Database,
  Lock,
  Building2,
  Wifi,
  Activity,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TxStatus = "completed" | "pending" | "failed";
type ConsentStatus = "approved" | "pending" | "rejected";
type GatewayStatus = "healthy" | "degraded" | "offline";

interface Transaction {
  id: string;
  type: string;
  sender: string;
  senderWorld: string;
  receiver: string;
  receiverWorld: string;
  gateway: string;
  consent: string;
  timestamp: string;
  status: TxStatus;
}

interface ConnectionRequest {
  id: string;
  from: string;
  fromWorld: string;
  locker: string;
  requestedBy: string;
  time: string;
}

interface ConsentRequest {
  id: string;
  agent: string;
  world: string;
  locker: string;
  requestedBy: string;
  expires: string;
}

interface GatewayHealth {
  name: string;
  jurisdiction: string;
  status: GatewayStatus;
  latency: string;
  uptime: string;
  txToday: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const transactions: Transaction[] = [
  {
    id: "TX-2024-8841",
    type: "Degree Verification",
    sender: "IIIT Bangalore",
    senderWorld: "India / Karnataka",
    receiver: "SAP Germany",
    receiverWorld: "EU / Germany",
    gateway: "IN-GW-01 ↔ EU-GW-03",
    consent: "CST-4421",
    timestamp: "2026-07-18 14:32 UTC",
    status: "completed",
  },
  {
    id: "TX-2024-8842",
    type: "Medical Record Request",
    sender: "AIIMS Delhi",
    senderWorld: "India / Delhi",
    receiver: "Munich University Hospital",
    receiverWorld: "EU / Bavaria",
    gateway: "IN-GW-02 ↔ EU-GW-01",
    consent: "CST-4418",
    timestamp: "2026-07-18 13:15 UTC",
    status: "pending",
  },
  {
    id: "TX-2024-8839",
    type: "Identity Verification",
    sender: "Aadhaar Authority",
    senderWorld: "India / National",
    receiver: "Deutsche Bank",
    receiverWorld: "EU / Germany",
    gateway: "IN-GW-01 ↔ EU-GW-02",
    consent: "CST-4415",
    timestamp: "2026-07-18 11:58 UTC",
    status: "completed",
  },
  {
    id: "TX-2024-8836",
    type: "Employment Record",
    sender: "Tata Consultancy",
    senderWorld: "India / Maharashtra",
    receiver: "ABB Switzerland",
    receiverWorld: "EU / Switzerland",
    gateway: "IN-GW-03 ↔ EU-GW-04",
    consent: "CST-4411",
    timestamp: "2026-07-18 10:44 UTC",
    status: "completed",
  },
  {
    id: "TX-2024-8831",
    type: "Research Data Share",
    sender: "IISc Bangalore",
    senderWorld: "India / Karnataka",
    receiver: "CERN Geneva",
    receiverWorld: "EU / Switzerland",
    gateway: "IN-GW-01 ↔ EU-GW-05",
    consent: "CST-4409",
    timestamp: "2026-07-18 09:22 UTC",
    status: "failed",
  },
];

const connectionRequests: ConnectionRequest[] = [
  {
    id: "CR-1182",
    from: "Volkswagen AG",
    fromWorld: "EU / Germany",
    locker: "Employment Locker",
    requestedBy: "Rahul Sharma",
    time: "12 min ago",
  },
  {
    id: "CR-1181",
    from: "Philips Healthcare",
    fromWorld: "EU / Netherlands",
    locker: "Medical Locker",
    requestedBy: "Dr. Priya Nair",
    time: "38 min ago",
  },
  {
    id: "CR-1180",
    from: "Siemens Energy",
    fromWorld: "EU / Germany",
    locker: "Identity Locker",
    requestedBy: "Arjun Mehta",
    time: "1 hr ago",
  },
];

const consentRequests: ConsentRequest[] = [
  {
    id: "CST-4428",
    agent: "Priya Menon",
    world: "India / Kerala",
    locker: "Medical Locker",
    requestedBy: "St. Hedwig Hospital Berlin",
    expires: "2026-08-18",
  },
  {
    id: "CST-4427",
    agent: "IIIT Madras",
    world: "India / Tamil Nadu",
    locker: "Degree Locker",
    requestedBy: "Airbus SE",
    expires: "2026-09-01",
  },
  {
    id: "CST-4426",
    agent: "Vikram Sood",
    world: "India / Delhi",
    locker: "Identity Locker",
    requestedBy: "ING Bank NV",
    expires: "2026-07-31",
  },
];

const gatewayHealth: GatewayHealth[] = [
  {
    name: "IN-GW-01",
    jurisdiction: "India / National",
    status: "healthy",
    latency: "18ms",
    uptime: "99.98%",
    txToday: 142,
  },
  {
    name: "EU-GW-03",
    jurisdiction: "EU / Germany",
    status: "healthy",
    latency: "24ms",
    uptime: "99.95%",
    txToday: 98,
  },
  {
    name: "EU-GW-01",
    jurisdiction: "EU / France",
    status: "degraded",
    latency: "210ms",
    uptime: "97.12%",
    txToday: 31,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

type PageId =
  | "dashboard"
  | "world-explorer"
  | "agents"
  | "connections"
  | "consents"
  | "transactions"
  | "settings";

const navItems: {
  label: string;
  icon: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
  page: PageId;
}[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    page: "dashboard",
  },
  {
    label: "World Explorer",
    icon: Map,
    page: "world-explorer",
  },
  { label: "Agents", icon: UserCircle, page: "agents" },
  { label: "Connections", icon: Plug, page: "connections" },
  { label: "Consents", icon: ClipboardCheck, page: "consents" },
  {
    label: "Transactions",
    icon: ScrollText,
    page: "transactions",
  },
  { label: "Settings", icon: Settings, page: "settings" },
];

function Sidebar({
  collapsed,
  activePage,
  onNavigate,
}: {
  collapsed: boolean;
  activePage: PageId;
  onNavigate: (p: PageId) => void;
}) {
  return (
    <aside
      style={{
        width: collapsed ? 64 : 240,
        minHeight: "100vh",
        background: "var(--sidebar)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "20px 16px" : "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "var(--primary)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Globe size={16} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.02em",
              }}
            >
              P3DX
            </div>
            <div
              style={{
                color: "#475569",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Data Governance
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "12px 0",
          overflowY: "auto",
        }}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            collapsed={collapsed}
            active={activePage === item.page}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: collapsed ? "16px" : "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#1e3a5f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "#93c5fd",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              AK
            </span>
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  color: "#e2e8f0",
                  fontSize: 13,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Arjun Kumar
              </div>
              <div
                style={{
                  color: "#475569",
                  fontSize: 11,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Gateway Admin
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: (typeof navItems)[0];
  collapsed: boolean;
  active: boolean;
  onNavigate: (p: PageId) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const bg = active
    ? "rgba(37,99,235,0.18)"
    : hovered
      ? "rgba(255,255,255,0.04)"
      : "transparent";
  const color = active
    ? "#93c5fd"
    : hovered
      ? "#e2e8f0"
      : "#64748b";
  const borderLeft = active
    ? "3px solid #2563eb"
    : "3px solid transparent";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(item.page)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "10px 16px" : "10px 24px",
        margin: "1px 0",
        cursor: "pointer",
        background: bg,
        borderLeft,
        transition: "all 0.12s ease",
      }}
    >
      <Icon
        size={16}
        color={color}
        strokeWidth={active ? 2 : 1.5}
      />
      {!collapsed && (
        <span
          style={{
            color,
            fontSize: 13,
            fontWeight: active ? 500 : 400,
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
      )}
    </div>
  );
}

function TopNav({ pageLabel }: { pageLabel: string }) {
  return (
    <header
      style={{
        height: 56,
        background: "#ffffff",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flex: "0 0 auto",
        }}
      >
        <span style={{ color: "#94a3b8", fontSize: 13 }}>
          P3DX
        </span>
        <ChevronRight size={14} color="#cbd5e1" />
        <span
          style={{
            color: "#0f172a",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {pageLabel}
        </span>
      </div>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          marginLeft: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f8fafc",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "0 12px",
          height: 36,
        }}
      >
        <Search size={14} color="#94a3b8" />
        <input
          placeholder="Search worlds, agents, transactions…"
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "#0f172a",
            flex: 1,
          }}
        />
        <kbd
          style={{
            fontSize: 11,
            color: "#94a3b8",
            background: "#e2e8f0",
            padding: "1px 6px",
            borderRadius: 4,
            fontFamily: "monospace",
          }}
        >
          ⌘K
        </kbd>
      </div>

      <div style={{ flex: 1 }} />

      {/* Right icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <TopNavIcon badge={3}>
          <Bell size={16} color="#64748b" />
        </TopNavIcon>
        <TopNavIcon>
          <HelpCircle size={16} color="#64748b" />
        </TopNavIcon>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 4,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: "#1d4ed8",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            AK
          </span>
        </div>
      </div>
    </header>
  );
}

function TopNavIcon({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: hovered ? "#f1f5f9" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.12s",
      }}
    >
      {children}
      {badge ? (
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 14,
            height: 14,
            background: "#ef4444",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #fff",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 8,
              fontWeight: 700,
            }}
          >
            {badge}
          </span>
        </div>
      ) : null}
    </div>
  );
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────

const kpiData = [
  {
    label: "Total Worlds",
    value: "184",
    trend: "+12",
    up: true,
    icon: Globe,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    label: "Active Gateways",
    value: "47",
    trend: "+3",
    up: true,
    icon: Radio,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    label: "Registered Agents",
    value: "12,840",
    trend: "+284",
    up: true,
    icon: Users,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    label: "Active Connections",
    value: "3,291",
    trend: "-18",
    up: false,
    icon: Link2,
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    label: "Active Consents",
    value: "8,104",
    trend: "+41",
    up: true,
    icon: ShieldCheck,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    label: "Transactions Today",
    value: "2,378",
    trend: "+193",
    up: true,
    icon: FileText,
    color: "#ea580c",
    bg: "#fff7ed",
  },
];

function KpiCard({ kpi }: { kpi: (typeof kpiData)[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = kpi.icon;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#bfdbfe" : "var(--border)"}`,
        borderRadius: 12,
        padding: "18px 20px",
        transition: "all 0.15s ease",
        boxShadow: hovered
          ? "0 4px 16px rgba(37,99,235,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: kpi.bg,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={kpi.color} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            color: kpi.up ? "#16a34a" : "#dc2626",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {kpi.up ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {kpi.trend}
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#0f172a",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {kpi.value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#64748b",
          marginTop: 4,
          fontWeight: 400,
        }}
      >
        {kpi.label}
      </div>
    </div>
  );
}

// ─── Flow Diagram ─────────────────────────────────────────────────────────────

function FlowDiagram() {
  const nodeStyle = (
    color: string,
    bg: string,
  ): React.CSSProperties => ({
    background: bg,
    border: `1.5px solid ${color}`,
    borderRadius: 10,
    padding: "8px 14px",
    textAlign: "center",
    minWidth: 130,
  });
  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#94a3b8",
    marginBottom: 2,
  };
  const titleStyle = (color: string): React.CSSProperties => ({
    fontSize: 13,
    fontWeight: 600,
    color,
  });
  const subStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#64748b",
    marginTop: 1,
  };
  const arrowDown = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 22,
      }}
    >
      <div
        style={{
          width: 1.5,
          height: 14,
          background: "#cbd5e1",
          borderRadius: 2,
        }}
      />
      <div style={{ position: "absolute", marginTop: 12 }}>
        <ChevronRight
          size={12}
          color="#cbd5e1"
          style={{
            transform: "rotate(90deg)",
            display: "block",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          Cross-Border Exchange Flow
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#64748b",
            marginTop: 2,
          }}
        >
          Live example: IIIT Bangalore → SAP Germany degree
          verification
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 0,
          alignItems: "stretch",
        }}
      >
        {/* India side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Jurisdiction badge */}
          <div
            style={{
              background: "#fff7ed",
              border: "1.5px solid #fed7aa",
              borderRadius: 8,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16 }}>🇮🇳</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#c2410c",
                letterSpacing: "0.04em",
              }}
            >
              INDIA JURISDICTION
            </span>
          </div>
          {arrowDown}

          {/* Institution */}
          <div style={nodeStyle("#bfdbfe", "#eff6ff")}>
            <div style={labelStyle}>Institution</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Building2 size={14} color="#2563eb" />
              <span style={titleStyle("#1e40af")}>
                IIIT Bangalore
              </span>
            </div>
            <div style={subStyle}>
              Karnataka · World: IN-KA-002
            </div>
          </div>
          {arrowDown}

          {/* Locker */}
          <div style={nodeStyle("#a5f3fc", "#ecfeff")}>
            <div style={labelStyle}>Locker</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Lock size={14} color="#0891b2" />
              <span style={titleStyle("#0e7490")}>
                Degree Locker
              </span>
            </div>
            <div style={subStyle}>
              Agent: Rahul Sharma · CST-4421
            </div>
          </div>
          {arrowDown}

          {/* Gateway India */}
          <div
            style={{
              background: "#0f172a",
              border: "1.5px solid #1e3a5f",
              borderRadius: 10,
              padding: "10px 16px",
              textAlign: "center",
              minWidth: 130,
            }}
          >
            <div style={{ ...labelStyle, color: "#475569" }}>
              Gateway
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#93c5fd",
                }}
              >
                IN-GW-01
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                marginTop: 2,
              }}
            >
              National · 18ms
            </div>
          </div>
        </div>

        {/* Center exchange */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 12px",
            paddingBottom: 18,
            gap: 6,
          }}
        >
          <div
            style={{
              background: "#f0fdf4",
              border: "1.5px solid #86efac",
              borderRadius: 8,
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ArrowLeftRight size={14} color="#16a34a" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#15803d",
              }}
            >
              TLS 1.3
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            <div
              style={{
                width: 24,
                height: 1.5,
                background: "#2563eb",
              }}
            />
            <ArrowRight size={12} color="#2563eb" />
            <div style={{ width: 8 }} />
            <ArrowRight
              size={12}
              color="#2563eb"
              style={{ transform: "rotate(180deg)" }}
            />
            <div
              style={{
                width: 24,
                height: 1.5,
                background: "#2563eb",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#94a3b8",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 80,
              lineHeight: 1.4,
            }}
          >
            Secure Channel
          </div>
        </div>

        {/* EU side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              background: "#eff6ff",
              border: "1.5px solid #bfdbfe",
              borderRadius: 8,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16 }}>🇪🇺</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1d4ed8",
                letterSpacing: "0.04em",
              }}
            >
              EU JURISDICTION
            </span>
          </div>
          {arrowDown}

          {/* Institution */}
          <div style={nodeStyle("#bfdbfe", "#eff6ff")}>
            <div style={labelStyle}>Requester</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Building2 size={14} color="#2563eb" />
              <span style={titleStyle("#1e40af")}>
                SAP Germany
              </span>
            </div>
            <div style={subStyle}>
              Bavaria · World: DE-BY-009
            </div>
          </div>
          {arrowDown}

          {/* Use case */}
          <div style={nodeStyle("#d9f99d", "#f7fee7")}>
            <div style={labelStyle}>Purpose</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <CheckCircle2 size={14} color="#16a34a" />
              <span style={titleStyle("#15803d")}>
                Employment Verify
              </span>
            </div>
            <div style={subStyle}>
              HR Dept · Consent: CST-4421
            </div>
          </div>
          {arrowDown}

          {/* Gateway EU */}
          <div
            style={{
              background: "#0f172a",
              border: "1.5px solid #1e3a5f",
              borderRadius: 10,
              padding: "10px 16px",
              textAlign: "center",
              minWidth: 130,
            }}
          >
            <div style={{ ...labelStyle, color: "#475569" }}>
              Gateway
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#93c5fd",
                }}
              >
                EU-GW-03
              </span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                marginTop: 2,
              }}
            >
              Germany · 24ms
            </div>
          </div>
        </div>
      </div>

      {/* Transaction result */}
      <div
        style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CheckCircle2 size={16} color="#16a34a" />
        <div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#15803d",
            }}
          >
            Transaction TX-2024-8841 completed
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#4ade80",
              marginLeft: 8,
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#16a34a",
              marginLeft: 8,
            }}
          >
            Degree verified · Logged to immutable ledger ·
            2026-07-18 14:32 UTC
          </span>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span
            style={{
              fontSize: 11,
              background: "#dcfce7",
              color: "#15803d",
              padding: "2px 8px",
              borderRadius: 99,
              fontWeight: 600,
            }}
          >
            COMPLETED
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Right panel ──────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: GatewayStatus }) {
  const colors: Record<GatewayStatus, string> = {
    healthy: "#22c55e",
    degraded: "#f59e0b",
    offline: "#ef4444",
  };
  return (
    <div
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: colors[status],
        flexShrink: 0,
      }}
    />
  );
}

function RightPanel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 300,
        flexShrink: 0,
      }}
    >
      {/* Connection requests */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "16px 18px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Connection Requests
          </span>
          <span
            style={{
              background: "#fef3c7",
              color: "#92400e",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 99,
            }}
          >
            3 pending
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {connectionRequests.map((req) => (
            <div
              key={req.id}
              style={{
                background: "#f8fafc",
                borderRadius: 8,
                padding: "10px 12px",
                border: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#0f172a",
                  }}
                >
                  {req.from}
                </span>
                <span
                  style={{ fontSize: 11, color: "#94a3b8" }}
                >
                  {req.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  marginBottom: 6,
                }}
              >
                {req.fromWorld} · Agent: {req.requestedBy}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Lock size={10} color="#2563eb" />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#2563eb",
                      fontWeight: 500,
                    }}
                  >
                    {req.locker}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: 5,
                      padding: "2px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consent requests */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "16px 18px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Pending Consents
          </span>
          <span
            style={{
              background: "#fef2f2",
              color: "#991b1b",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 99,
            }}
          >
            3 awaiting
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {consentRequests.map((req) => (
            <div
              key={req.id}
              style={{
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#0f172a",
                  }}
                >
                  {req.agent}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "#94a3b8",
                    fontFamily: "monospace",
                  }}
                >
                  {req.id}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  marginBottom: 4,
                }}
              >
                {req.locker} → {req.requestedBy}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  style={{
                    flex: 1,
                    fontSize: 10,
                    fontWeight: 600,
                    background: "#f0fdf4",
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                    borderRadius: 5,
                    padding: "3px 0",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
                <button
                  style={{
                    flex: 1,
                    fontSize: 10,
                    fontWeight: 600,
                    background: "#fef2f2",
                    color: "#991b1b",
                    border: "1px solid #fecaca",
                    borderRadius: 5,
                    padding: "3px 0",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gateway health */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "16px 18px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <Activity size={14} color="#2563eb" />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Gateway Health
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {gatewayHealth.map((gw) => (
            <div
              key={gw.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StatusDot status={gw.status} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#0f172a",
                      fontFamily: "monospace",
                    }}
                  >
                    {gw.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color:
                        gw.status === "healthy"
                          ? "#16a34a"
                          : gw.status === "degraded"
                            ? "#d97706"
                            : "#dc2626",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {gw.status}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{ fontSize: 10, color: "#94a3b8" }}
                  >
                    {gw.latency}
                  </span>
                  <span
                    style={{ fontSize: 10, color: "#94a3b8" }}
                  >
                    ↑ {gw.uptime}
                  </span>
                  <span
                    style={{ fontSize: 10, color: "#94a3b8" }}
                  >
                    {gw.txToday} tx
                  </span>
                </div>
                {/* Uptime bar */}
                <div
                  style={{
                    marginTop: 4,
                    height: 3,
                    background: "#f1f5f9",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: gw.uptime,
                      background:
                        gw.status === "healthy"
                          ? "#22c55e"
                          : gw.status === "degraded"
                            ? "#f59e0b"
                            : "#ef4444",
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Transaction row ──────────────────────────────────────────────────────────

const statusConfig: Record<
  TxStatus,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ReactNode;
  }
> = {
  completed: {
    label: "Completed",
    color: "#15803d",
    bg: "#dcfce7",
    icon: <CheckCircle2 size={12} color="#15803d" />,
  },
  pending: {
    label: "Pending",
    color: "#92400e",
    bg: "#fef3c7",
    icon: <Clock size={12} color="#92400e" />,
  },
  failed: {
    label: "Failed",
    color: "#991b1b",
    bg: "#fef2f2",
    icon: <XCircle size={12} color="#991b1b" />,
  },
};

function TxRow({ tx }: { tx: Transaction }) {
  const s = statusConfig[tx.status];
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "14px 18px",
        display: "grid",
        gridTemplateColumns: "2fr 2fr 1.5fr 1fr 1.5fr auto",
        gap: 12,
        alignItems: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: 2,
          }}
        >
          {tx.type}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            fontFamily: "monospace",
          }}
        >
          {tx.id}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 2,
          }}
        >
          <Building2 size={11} color="#64748b" />
          <span style={{ fontSize: 12, color: "#374151" }}>
            {tx.sender}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          → {tx.receiver}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Wifi size={11} color="#2563eb" />
          <span
            style={{
              fontSize: 11,
              color: "#475569",
              fontFamily: "monospace",
            }}
          >
            {tx.gateway}
          </span>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ShieldCheck size={11} color="#16a34a" />
          <span
            style={{
              fontSize: 11,
              color: "#475569",
              fontFamily: "monospace",
            }}
          >
            {tx.consent}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#64748b" }}>
        {tx.timestamp}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: s.bg,
          color: s.color,
          padding: "3px 10px",
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {s.icon}
        {s.label}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] =
    useState<PageId>("dashboard");

  const pageLabel =
    navItems.find((n) => n.page === activePage)?.label ??
    "Dashboard";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <TopNav pageLabel={pageLabel} />

        {/* Content */}
        {activePage === "world-explorer" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <WorldExplorer />
          </div>
        )}

        {activePage === "agents" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <AgentDirectory />
          </div>
        )}

        {activePage === "connections" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <ConnectionFlow />
          </div>
        )}

        {activePage === "consents" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <ConsentManagement />
          </div>
        )}

        {activePage === "transactions" && <Transactions />}

        {activePage !== "world-explorer" &&
          activePage !== "agents" &&
          activePage !== "connections" &&
          activePage !== "consents" &&
          activePage !== "transactions" && (
            <main
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
              }}
            >
              {/* Page header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Governance Overview
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#64748b",
                      marginTop: 2,
                    }}
                  >
                    Platform-wide status · Last updated:
                    2026-07-18 14:32 UTC
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setCollapsed((v) => !v)}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#64748b",
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    {collapsed
                      ? "→ Expand sidebar"
                      : "← Collapse sidebar"}
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: 8,
                      padding: "6px 12px",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#15803d",
                      }}
                    >
                      All systems operational
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(360px,1fr))",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {kpiData.map((kpi) => (
                  <KpiCard key={kpi.label} kpi={kpi} />
                ))}
              </div>

              {/* Middle row: flow diagram + right panel */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginBottom: 20,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <FlowDiagram />
                </div>
                <RightPanel />
              </div>

              {/* Transactions */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      Recent Transactions
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                        marginLeft: 8,
                        background: "#f1f5f9",
                        padding: "2px 8px",
                        borderRadius: 99,
                      }}
                    >
                      Today · 2,378 total
                    </span>
                  </div>
                  <button
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#2563eb",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    View all <ArrowRight size={12} />
                  </button>
                </div>

                {/* Table header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "2fr 2fr 1.5fr 1fr 1.5fr auto",
                    gap: 12,
                    padding: "8px 18px",
                    marginBottom: 6,
                  }}
                >
                  {[
                    "Type / ID",
                    "Sender → Receiver",
                    "Gateway",
                    "Consent",
                    "Timestamp",
                    "Status",
                  ].map((h) => (
                    <span
                      key={h}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {transactions.map((tx) => (
                    <TxRow key={tx.id} tx={tx} />
                  ))}
                </div>
              </div>
            </main>
          )}
      </div>
    </div>
  );
}