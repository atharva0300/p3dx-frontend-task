import React, { useMemo, useState } from "react";
import {
  Search,
  Download,
  Filter,
  FileDown,
  CheckCircle2,
  Clock3,
  XCircle,
  Ban,
  Building2,
  Globe,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  FileText,
  Lock,
  Database,
  Activity,
  Timer,
  Server,
  User,
  Landmark,
  CircleCheck,
  CircleX,
  AlertTriangle,
} from "lucide-react";

/* ==========================================================================
   TYPES
=========================================================================== */

type TransactionStatus =
  | "Completed"
  | "Pending"
  | "Failed"
  | "Cancelled";

interface TimelineEvent {
  time: string;
  title: string;
  success: boolean;
}

interface SharedFile {
  name: string;
  shared: boolean;
}

interface ComplianceItem {
  label: string;
  passed: boolean;
}

interface Transaction {
  id: string;

  type: string;

  sender: string;
  senderWorld: string;

  receiver: string;
  receiverWorld: string;

  gatewayIn: string;
  gatewayOut: string;

  consentId: string;

  timestamp: string;

  duration: string;

  payload: string;

  status: TransactionStatus;

  reason?: string;

  senderLocker: string;
  senderOwner: string;

  purpose: string;
  requester: string;

  expiry: string;

  policyVersion: string;

  encryption: string;

  hash: string;

  auditHash: string;

  events: TimelineEvent[];

  files: SharedFile[];

  compliance: ComplianceItem[];
}

/* ==========================================================================
   KPI DATA
=========================================================================== */

const stats = [
  {
    title: "Total Transactions",
    value: "84,291",
    icon: Database,
    color: "#2563eb",
    bg: "#eff6ff",
  },

  {
    title: "Successful",
    value: "82,936",
    icon: CheckCircle2,
    color: "#16a34a",
    bg: "#f0fdf4",
  },

  {
    title: "Pending",
    value: "481",
    icon: Clock3,
    color: "#d97706",
    bg: "#fff7ed",
  },

  {
    title: "Failed",
    value: "874",
    icon: XCircle,
    color: "#dc2626",
    bg: "#fef2f2",
  },

  {
    title: "Avg Gateway Latency",
    value: "28 ms",
    icon: Timer,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },

  {
    title: "Data Shared Today",
    value: "18.4 GB",
    icon: Activity,
    color: "#0891b2",
    bg: "#ecfeff",
  },
];

/* ==========================================================================
   TRANSACTIONS
=========================================================================== */

const transactions: Transaction[] = [
  {
    id: "TX-2026-8841",

    type: "Degree Verification",

    sender: "IIT Bangalore",

    senderWorld: "India / Karnataka",

    receiver: "SAP Germany",

    receiverWorld: "Germany / Bavaria",

    gatewayIn: "IN-GW-01",

    gatewayOut: "EU-GW-03",

    consentId: "CST-4421",

    timestamp: "18 Jul 2026 • 14:32 UTC",

    duration: "842 ms",

    payload: "3.4 MB",

    status: "Completed",

    senderLocker: "Degree Locker",

    senderOwner: "Rahul Sharma",

    purpose: "Employment Verification",

    requester: "HR Department",

    expiry: "22 Aug 2026",

    policyVersion: "v2.4",

    encryption: "TLS 1.3",

    hash: "SHA-256",

    auditHash: "0xA871B34D92A991",

    events: [
      {
        time: "14:32:01",
        title: "Consent Verified",
        success: true,
      },
      {
        time: "14:32:02",
        title: "Identity Authenticated",
        success: true,
      },
      {
        time: "14:32:03",
        title: "Policy Validation",
        success: true,
      },
      {
        time: "14:32:04",
        title: "Gateway Validation",
        success: true,
      },
      {
        time: "14:32:06",
        title: "Payload Encrypted",
        success: true,
      },
      {
        time: "14:32:08",
        title: "Delivered Successfully",
        success: true,
      },
    ],

    files: [
      {
        name: "Degree Certificate",
        shared: true,
      },
      {
        name: "Transcript",
        shared: true,
      },
      {
        name: "Identity Proof",
        shared: true,
      },
      {
        name: "Medical Record",
        shared: false,
      },
      {
        name: "Employment History",
        shared: false,
      },
    ],

    compliance: [
      {
        label: "GDPR",
        passed: true,
      },
      {
        label: "DPDP",
        passed: true,
      },
      {
        label: "Cross-border Policy",
        passed: true,
      },
      {
        label: "Retention Policy",
        passed: true,
      },
      {
        label: "Data Residency",
        passed: true,
      },
    ],
  },

  {
    id: "TX-2026-8840",

    type: "Medical Record Request",

    sender: "AIIMS Delhi",

    senderWorld: "India / Delhi",

    receiver: "Munich Hospital",

    receiverWorld: "Germany / Bavaria",

    gatewayIn: "IN-GW-02",

    gatewayOut: "EU-GW-01",

    consentId: "CST-4418",

    timestamp: "18 Jul 2026 • 13:15 UTC",

    duration: "Pending",

    payload: "6.8 MB",

    status: "Pending",

    senderLocker: "Medical Locker",

    senderOwner: "Aditi Sharma",

    purpose: "Emergency Treatment",

    requester: "Dr. Klaus Meyer",

    expiry: "01 Sep 2026",

    policyVersion: "v2.4",

    encryption: "TLS 1.3",

    hash: "SHA-256",

    auditHash: "0xB11F991AFD88",

    events: [
      {
        time: "13:15:01",
        title: "Consent Verified",
        success: true,
      },
      {
        time: "13:15:02",
        title: "Identity Authenticated",
        success: true,
      },
      {
        time: "13:15:05",
        title: "Waiting for EU Gateway Approval",
        success: true,
      },
    ],

    files: [
      {
        name: "Medical Record",
        shared: true,
      },
      {
        name: "Lab Reports",
        shared: true,
      },
      {
        name: "Insurance Card",
        shared: true,
      },
      {
        name: "Employment History",
        shared: false,
      },
    ],

    compliance: [
      {
        label: "GDPR",
        passed: true,
      },
      {
        label: "DPDP",
        passed: true,
      },
      {
        label: "Cross-border Policy",
        passed: true,
      },
      {
        label: "Retention Policy",
        passed: true,
      },
      {
        label: "Data Residency",
        passed: true,
      },
    ],
  },

  {
    id: "TX-2026-8839",

    type: "Research Data Share",

    sender: "IISc Bangalore",

    senderWorld: "India / Karnataka",

    receiver: "CERN Geneva",

    receiverWorld: "Switzerland",

    gatewayIn: "IN-GW-01",

    gatewayOut: "EU-GW-05",

    consentId: "CST-4409",

    timestamp: "18 Jul 2026 • 11:48 UTC",

    duration: "1.82 sec",

    payload: "5.8 MB",

    status: "Failed",

    reason: "Gateway Timeout",

    senderLocker: "Research Locker",

    senderOwner: "Prof. Raghavan",

    purpose: "Particle Physics Collaboration",

    requester: "Research Team",

    expiry: "10 Aug 2026",

    policyVersion: "v2.3",

    encryption: "TLS 1.3",

    hash: "SHA-256",

    auditHash: "0x99181AB88",

    events: [
      {
        time: "11:48:01",
        title: "Consent Verified",
        success: true,
      },
      {
        time: "11:48:03",
        title: "Gateway Validation",
        success: true,
      },
      {
        time: "11:48:05",
        title: "Gateway Timeout",
        success: false,
      },
    ],

    files: [
      {
        name: "Research Dataset",
        shared: true,
      },
      {
        name: "Simulation Files",
        shared: true,
      },
      {
        name: "Medical Record",
        shared: false,
      },
    ],

    compliance: [
      {
        label: "GDPR",
        passed: true,
      },
      {
        label: "DPDP",
        passed: true,
      },
      {
        label: "Cross-border Policy",
        passed: true,
      },
      {
        label: "Retention Policy",
        passed: true,
      },
      {
        label: "Data Residency",
        passed: true,
      },
    ],
  },
];

/* ==========================================================================
   STATUS COLORS
=========================================================================== */

const STATUS_CONFIG = {
  Completed: {
    bg: "#ecfdf5",
    color: "#16a34a",
    border: "#bbf7d0",
    icon: CheckCircle2,
  },

  Pending: {
    bg: "#fff7ed",
    color: "#d97706",
    border: "#fed7aa",
    icon: Clock3,
  },

  Failed: {
    bg: "#fef2f2",
    color: "#dc2626",
    border: "#fecaca",
    icon: XCircle,
  },

  Cancelled: {
    bg: "#f3f4f6",
    color: "#6b7280",
    border: "#d1d5db",
    icon: Ban,
  },
};

/* ==========================================================================
   STATUS BADGE
=========================================================================== */

const StatusBadge = ({
  status,
}: {
  status: TransactionStatus;
}) => {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 999,
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <Icon size={15} />
      {status}
    </div>
  );
};

/* ==========================================================================
   KPI CARD
=========================================================================== */

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: any) => {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 22,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={24} color={color} />
      </div>
    </div>
  );
};

/* ==========================================================================
   FILTER BAR
=========================================================================== */

const FilterBar = () => {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 260,
          position: "relative",
        }}
      >
        <Search
          size={18}
          style={{
            position: "absolute",
            left: 12,
            top: 11,
            color: "#9ca3af",
          }}
        />

        <input
          placeholder="Search Transaction ID..."
          style={{
            width: "100%",
            padding: "10px 14px 10px 40px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            outline: "none",
          }}
        />
      </div>

      {[
        "Status",
        "World",
        "Gateway",
        "Institution",
        "Date Range",
      ].map((item) => (
        <select
          key={item}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "#fff",
          }}
        >
          <option>{item}</option>
        </select>
      ))}

      <button
        style={{
          padding: "10px 18px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

/* ==========================================================================
   TIMELINE CARD
=========================================================================== */

interface TimelineCardProps {
  transaction: Transaction;
  selected: boolean;
  onClick: () => void;
}

const TimelineCard = ({
  transaction,
  selected,
  onClick,
}: TimelineCardProps) => {
  const color = STATUS_CONFIG[transaction.status].color;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        paddingLeft: 36,
        cursor: "pointer",
        marginBottom: 30,
      }}
    >
      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 0,
          bottom: -30,
          width: 2,
          background: "#d1d5db",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 2,
          top: 20,
          width: 18,
          height: 18,
          borderRadius: 999,
          background: color,
          border: "4px solid white",
          boxShadow: "0 0 0 2px rgba(229,231,235,1)",
        }}
      />

      <div
        style={{
          background: selected ? "#eff6ff" : "#fff",

          border: selected
            ? "2px solid #2563eb"
            : "1px solid #e5e7eb",

          borderRadius: 14,

          padding: 20,

          transition: ".2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StatusBadge status={transaction.status} />

          <div
            style={{
              color: "#6b7280",
              fontSize: 13,
            }}
          >
            {transaction.timestamp}
          </div>
        </div>

        <h3
          style={{
            marginTop: 18,
            marginBottom: 6,
            fontSize: 20,
          }}
        >
          {transaction.id}
        </h3>

        <div
          style={{
            fontWeight: 600,
            color: "#374151",
            marginBottom: 18,
          }}
        >
          {transaction.type}
        </div>

        {/* Sender */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Building2 size={18} />

          <div>
            <div
              style={{
                fontWeight: 600,
              }}
            >
              {transaction.sender}
            </div>

            <div
              style={{
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              {transaction.senderWorld}
            </div>
          </div>
        </div>

        <div
          style={{
            marginLeft: 9,
            marginTop: 10,
            marginBottom: 10,
            width: 2,
            height: 24,
            background: "#d1d5db",
          }}
        />

        {/* Gateway */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          <Server size={18} />
          {transaction.gatewayIn}

          <ArrowRight size={16} />

          {transaction.gatewayOut}
        </div>

        <div
          style={{
            marginLeft: 9,
            marginTop: 10,
            marginBottom: 10,
            width: 2,
            height: 24,
            background: "#d1d5db",
          }}
        />

        {/* Receiver */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Landmark size={18} />

          <div>
            <div
              style={{
                fontWeight: 600,
              }}
            >
              {transaction.receiver}
            </div>

            <div
              style={{
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              {transaction.receiverWorld}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
            marginTop: 24,
          }}
        >
          <InfoItem
            label="Consent"
            value={transaction.consentId}
          />

          <InfoItem
            label="Duration"
            value={transaction.duration}
          />

          <InfoItem
            label="Payload"
            value={transaction.payload}
          />
        </div>

        {transaction.reason && (
          <div
            style={{
              marginTop: 18,
              padding: 14,
              borderRadius: 10,
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            <strong>Reason:</strong> {transaction.reason}
          </div>
        )}

        <button
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   INFO ITEM
=========================================================================== */

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <div
      style={{
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 4,
      }}
    >
      {label}
    </div>

    <div
      style={{
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  </div>
);

/* ==========================================================================
   TRANSACTIONS PAGE
=========================================================================== */

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction>(transactions[0]);

  return (
    <div
      style={{
        padding: 32,
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 32,
              margin: 0,
              fontWeight: 700,
            }}
          >
            Transactions
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: 8,
              fontSize: 15,
            }}
          >
            Complete immutable audit trail of cross-border data
            exchanges across all worlds.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <FileDown size={18} />
            Export Audit
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Download size={18} />
            Download CSV
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* ==========================================================
          KPI GRID
      ========================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 20,
          marginBottom: 28,
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* ==========================================================
          FILTERS
      ========================================================== */}

      <FilterBar />

      {/* ==========================================================
          MAIN LAYOUT
      ========================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr",
          gap: 24,
          marginTop: 28,
          alignItems: "start",
        }}
      >
        {/* ======================================================
            LEFT TIMELINE
        ====================================================== */}

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 28,
            }}
          >
            Audit Timeline
          </h2>

          {transactions.map((transaction) => (
            <TimelineCard
              key={transaction.id}
              transaction={transaction}
              selected={
                selectedTransaction.id === transaction.id
              }
              onClick={() =>
                setSelectedTransaction(transaction)
              }
            />
          ))}
        </div>

        {/* ======================================================
            DETAILS PANEL
        ====================================================== */}

        <div
          style={{
            position: "sticky",
            top: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              padding: 24,
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              Transaction Details
            </h2>

            {/* Summary */}

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gap: 18,
              }}
            >
              <InfoItem
                label="Transaction ID"
                value={selectedTransaction.id}
              />

              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 6,
                  }}
                >
                  Status
                </div>

                <StatusBadge
                  status={selectedTransaction.status}
                />
              </div>

              <InfoItem
                label="Exchange Type"
                value={selectedTransaction.type}
              />

              <InfoItem
                label="Gateway"
                value={`${selectedTransaction.gatewayIn} ↔ ${selectedTransaction.gatewayOut}`}
              />

              <InfoItem
                label="Payload"
                value={selectedTransaction.payload}
              />

              <InfoItem
                label="Duration"
                value={selectedTransaction.duration}
              />
            </div>

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            {/* Sender */}

            <h3>Sender</h3>

            <InfoItem
              label="Institution"
              value={selectedTransaction.sender}
            />

            <InfoItem
              label="World"
              value={selectedTransaction.senderWorld}
            />

            <InfoItem
              label="Locker"
              value={selectedTransaction.senderLocker}
            />

            <InfoItem
              label="Owner"
              value={selectedTransaction.senderOwner}
            />

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            {/* Receiver */}

            <h3>Receiver</h3>

            <InfoItem
              label="Institution"
              value={selectedTransaction.receiver}
            />

            <InfoItem
              label="World"
              value={selectedTransaction.receiverWorld}
            />

            <InfoItem
              label="Purpose"
              value={selectedTransaction.purpose}
            />

            <InfoItem
              label="Requester"
              value={selectedTransaction.requester}
            />

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            {/* Consent */}

            <h3>Consent</h3>

            <InfoItem
              label="Consent ID"
              value={selectedTransaction.consentId}
            />

            <InfoItem
              label="Expiry"
              value={selectedTransaction.expiry}
            />

            <InfoItem
              label="Policy Version"
              value={selectedTransaction.policyVersion}
            />

            <InfoItem
              label="Digital Signature"
              value="Verified"
            />

            {/* ======================================================
                GATEWAY ROUTE
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3
              style={{
                marginBottom: 18,
              }}
            >
              Gateway Route
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                {
                  icon: Building2,
                  label: selectedTransaction.sender,
                },
                {
                  icon: Server,
                  label: selectedTransaction.gatewayIn,
                },
                {
                  icon: Lock,
                  label: "Encrypted TLS 1.3 Tunnel",
                },
                {
                  icon: Server,
                  label: selectedTransaction.gatewayOut,
                },
                {
                  icon: Landmark,
                  label: selectedTransaction.receiver,
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <React.Fragment key={step.label}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        background: "#f9fafb",
                      }}
                    >
                      <Icon size={18} color="#2563eb" />

                      <span
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>

                    {index !== 4 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ArrowRight size={18} color="#9ca3af" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ======================================================
                TIMELINE EVENTS
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3>Timeline Events</h3>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {selectedTransaction.events.map((event) => (
                <div
                  key={event.time + event.title}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                  }}
                >
                  {event.success ? (
                    <CircleCheck size={18} color="#16a34a" />
                  ) : (
                    <CircleX size={18} color="#dc2626" />
                  )}

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {event.title}
                    </div>

                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: 13,
                      }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ======================================================
                SECURITY
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3>Security Metadata</h3>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              <InfoItem
                label="Encryption"
                value={selectedTransaction.encryption}
              />

              <InfoItem
                label="Hash"
                value={selectedTransaction.hash}
              />

              <InfoItem
                label="Audit Hash"
                value={selectedTransaction.auditHash}
              />

              <InfoItem label="Ledger" value="Recorded" />
            </div>

            {/* ======================================================
                SHARED DATA
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3>Data Shared</h3>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {selectedTransaction.files.map((file) => (
                <div
                  key={file.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <FileText size={18} />

                    {file.name}
                  </div>

                  {file.shared ? (
                    <CircleCheck color="#16a34a" size={18} />
                  ) : (
                    <CircleX color="#dc2626" size={18} />
                  )}
                </div>
              ))}
            </div>

            {/* ======================================================
                COMPLIANCE
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3>Compliance</h3>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gap: 12,
              }}
            >
              {selectedTransaction.compliance.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: "12px 16px",
                  }}
                >
                  {item.label}

                  {item.passed ? (
                    <CircleCheck color="#16a34a" size={18} />
                  ) : (
                    <AlertTriangle color="#f59e0b" size={18} />
                  )}
                </div>
              ))}
            </div>

            {/* ======================================================
                ACTIONS
            ====================================================== */}

            <hr
              style={{
                margin: "28px 0",
                border: "none",
                borderTop: "1px solid #e5e7eb",
              }}
            />

            <h3>Quick Actions</h3>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                "View Payload",
                "Replay Transaction",
                "Verify Signature",
                "Export Audit",
                "Download PDF",
                "Raise Dispute",
              ].map((action) => (
                <button
                  key={action}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background:
                      action === "Raise Dispute"
                        ? "#fef2f2"
                        : "#fff",
                    color:
                      action === "Raise Dispute"
                        ? "#dc2626"
                        : "#111827",
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
      </div>

      {/* ==========================================================
          ANALYTICS
      ========================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 32,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 24,
            minHeight: 320,
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Transactions by Hour
          </h2>

          <div
            style={{
              height: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#9ca3af",
              fontSize: 15,
            }}
          >
            Line Chart Placeholder
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 24,
            minHeight: 320,
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Transactions by Status
          </h2>

          <div
            style={{
              height: 240,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#9ca3af",
              fontSize: 15,
            }}
          >
            Donut Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}