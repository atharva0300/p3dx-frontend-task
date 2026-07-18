import { useState } from 'react'
import {
  Globe,
  Building2,
  ChevronRight,
  ChevronDown,
  Radio,
  Lock,
  Users,
  Link2,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
  ArrowLeftRight,
  GraduationCap,
  Heart,
  Briefcase,
  User,
  Bot,
  Shield,
  Wifi,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = 'jurisdiction' | 'institution' | 'department'
type GatewayStatus = 'healthy' | 'degraded' | 'offline'
type TxStatus = 'completed' | 'pending' | 'failed'
type AgentStatus = 'online' | 'offline' | 'running'

interface WorldNode {
  id: string
  name: string
  type: NodeType
  agents: number
  gatewayStatus: GatewayStatus
  children?: WorldNode[]
}

interface AgentData {
  id: string
  name: string
  role: string
  lockers: number
  status: AgentStatus
  avatar: string
}

interface LockerData {
  id: string
  name: string
  type: string
  owner: string
  endpoint: string
  status: 'active' | 'inactive'
  icon: React.ReactNode
}

interface ConnectionData {
  id: string
  from: string
  to: string
  status: 'established' | 'pending' | 'closed'
  purpose: string
  since: string
}

interface TxData {
  id: string
  type: string
  sender: string
  receiver: string
  gateway: string
  consent: string
  time: string
  status: TxStatus
}

// ─── Mock world data ──────────────────────────────────────────────────────────

const worldTree: WorldNode[] = [
  {
    id: 'india',
    name: 'India',
    type: 'jurisdiction',
    agents: 4820,
    gatewayStatus: 'healthy',
    children: [
      {
        id: 'iiit-bangalore',
        name: 'IIIT Bangalore',
        type: 'institution',
        agents: 312,
        gatewayStatus: 'healthy',
        children: [
          { id: 'cs-dept', name: 'Computer Science Dept.', type: 'department', agents: 84, gatewayStatus: 'healthy' },
          { id: 'admin-dept', name: 'Administration Dept.', type: 'department', agents: 22, gatewayStatus: 'healthy' },
          { id: 'research-lab', name: 'Research Laboratory', type: 'department', agents: 38, gatewayStatus: 'healthy' },
        ],
      },
      {
        id: 'apollo-hospital',
        name: 'Apollo Hospital',
        type: 'institution',
        agents: 540,
        gatewayStatus: 'healthy',
        children: [
          { id: 'cardiology', name: 'Cardiology Department', type: 'department', agents: 92, gatewayStatus: 'healthy' },
          { id: 'oncology', name: 'Oncology Department', type: 'department', agents: 74, gatewayStatus: 'degraded' },
        ],
      },
      {
        id: 'gov-india',
        name: 'Government of India',
        type: 'institution',
        agents: 1820,
        gatewayStatus: 'healthy',
        children: [
          { id: 'ministry-it', name: 'Ministry of IT', type: 'department', agents: 210, gatewayStatus: 'healthy' },
        ],
      },
    ],
  },
  {
    id: 'eu',
    name: 'European Union',
    type: 'jurisdiction',
    agents: 6210,
    gatewayStatus: 'healthy',
    children: [
      {
        id: 'sap-germany',
        name: 'SAP Germany',
        type: 'institution',
        agents: 892,
        gatewayStatus: 'healthy',
        children: [
          { id: 'hr-dept', name: 'HR Department', type: 'department', agents: 44, gatewayStatus: 'healthy' },
          { id: 'ai-div', name: 'AI Division', type: 'department', agents: 118, gatewayStatus: 'healthy' },
          { id: 'security-office', name: 'Security Office', type: 'department', agents: 28, gatewayStatus: 'healthy' },
        ],
      },
      {
        id: 'tu-munich',
        name: 'TU Munich',
        type: 'institution',
        agents: 620,
        gatewayStatus: 'degraded',
        children: [
          { id: 'comp-sci-tum', name: 'Computer Science', type: 'department', agents: 140, gatewayStatus: 'degraded' },
        ],
      },
      {
        id: 'deutsche-bank',
        name: 'Deutsche Bank',
        type: 'institution',
        agents: 1240,
        gatewayStatus: 'healthy',
        children: [
          { id: 'compliance', name: 'Compliance Department', type: 'department', agents: 180, gatewayStatus: 'healthy' },
        ],
      },
    ],
  },
]

// ─── Per-world detail data ────────────────────────────────────────────────────

const worldDetails: Record<string, {
  breadcrumb: string[]
  overview: { type: string; jurisdiction: string; parent: string; created: string; status: string }
  gateway: { name: string; status: GatewayStatus; health: string; latency: string; connectedWorlds: number; currentConnections: number }
  stats: { agents: number; lockers: number; departments: number; endpoints: number; consents: number; txToday: number }
  agents: AgentData[]
  lockers: LockerData[]
  connections: ConnectionData[]
  transactions: TxData[]
}> = {
  'iiit-bangalore': {
    breadcrumb: ['India', 'IIIT Bangalore'],
    overview: { type: 'Institution', jurisdiction: 'India', parent: 'India (IN-J-001)', created: '2023-04-12', status: 'Active' },
    gateway: { name: 'IIIT Gateway', status: 'healthy', health: '98%', latency: '18ms', connectedWorlds: 4, currentConnections: 7 },
    stats: { agents: 12, lockers: 26, departments: 3, endpoints: 14, consents: 9, txToday: 31 },
    agents: [
      { id: 'a1', name: 'Rahul Sharma', role: 'Citizen', lockers: 2, status: 'online', avatar: 'RS' },
      { id: 'a2', name: 'University Administrator', role: 'Administrator', lockers: 5, status: 'online', avatar: 'UA' },
      { id: 'a3', name: 'AI Verification Agent', role: 'AI Agent', lockers: 1, status: 'running', avatar: 'AI' },
      { id: 'a4', name: 'Priya Menon', role: 'Researcher', lockers: 3, status: 'offline', avatar: 'PM' },
    ],
    lockers: [
      { id: 'l1', name: 'Degree Locker', type: 'Academic', owner: 'Rahul Sharma', endpoint: 'in-iiitb-deg-001', status: 'active', icon: <GraduationCap size={14} color="#2563eb" /> },
      { id: 'l2', name: 'Identity Locker', type: 'Identity', owner: 'Rahul Sharma', endpoint: 'in-iiitb-id-002', status: 'active', icon: <Shield size={14} color="#7c3aed" /> },
      { id: 'l3', name: 'Medical Locker', type: 'Health', owner: 'Priya Menon', endpoint: 'in-iiitb-med-003', status: 'active', icon: <Heart size={14} color="#dc2626" /> },
      { id: 'l4', name: 'Employment Locker', type: 'Professional', owner: 'University Administrator', endpoint: 'in-iiitb-emp-004', status: 'active', icon: <Briefcase size={14} color="#16a34a" /> },
    ],
    connections: [
      { id: 'c1', from: 'India Gateway (IN-GW-01)', to: 'EU Gateway (EU-GW-03)', status: 'established', purpose: 'Employment Verification', since: '2h 14m' },
      { id: 'c2', from: 'India Gateway (IN-GW-01)', to: 'EU Gateway (EU-GW-01)', status: 'established', purpose: 'Degree Verification', since: '4h 02m' },
      { id: 'c3', from: 'India Gateway (IN-GW-02)', to: 'EU Gateway (EU-GW-05)', status: 'pending', purpose: 'Research Data', since: '14m' },
    ],
    transactions: [
      { id: 'TX-8841', type: 'Degree Verification', sender: 'IIIT Bangalore', receiver: 'SAP Germany', gateway: 'IN-GW-01 ↔ EU-GW-03', consent: 'CST-4421', time: '2 min ago', status: 'completed' },
      { id: 'TX-8839', type: 'Identity Verification', sender: 'Aadhaar Authority', receiver: 'Deutsche Bank', gateway: 'IN-GW-01 ↔ EU-GW-02', consent: 'CST-4415', time: '5 min ago', status: 'completed' },
      { id: 'TX-8836', type: 'Medical Record Request', sender: 'AIIMS Delhi', receiver: 'Munich Hospital', gateway: 'IN-GW-02 ↔ EU-GW-01', consent: 'CST-4418', time: '12 min ago', status: 'pending' },
    ],
  },
  'india': {
    breadcrumb: ['India'],
    overview: { type: 'Jurisdiction', jurisdiction: 'India', parent: '— (Root)', created: '2022-11-01', status: 'Active' },
    gateway: { name: 'India National Gateway', status: 'healthy', health: '99.98%', latency: '12ms', connectedWorlds: 18, currentConnections: 42 },
    stats: { agents: 4820, lockers: 9240, departments: 84, endpoints: 312, consents: 1820, txToday: 892 },
    agents: [
      { id: 'a1', name: 'National Registry Admin', role: 'Administrator', lockers: 8, status: 'online', avatar: 'NR' },
      { id: 'a2', name: 'Data Governance Officer', role: 'Officer', lockers: 4, status: 'online', avatar: 'DG' },
    ],
    lockers: [
      { id: 'l1', name: 'National ID Registry', type: 'Identity', owner: 'Gov. of India', endpoint: 'in-nat-id-001', status: 'active', icon: <Shield size={14} color="#7c3aed" /> },
      { id: 'l2', name: 'Academic Records', type: 'Academic', owner: 'UGC', endpoint: 'in-nat-deg-002', status: 'active', icon: <GraduationCap size={14} color="#2563eb" /> },
    ],
    connections: [
      { id: 'c1', from: 'India Gateway (IN-GW-01)', to: 'EU Gateway (EU-GW-03)', status: 'established', purpose: 'Multi-purpose', since: '14h 22m' },
    ],
    transactions: [
      { id: 'TX-8841', type: 'Degree Verification', sender: 'IIIT Bangalore', receiver: 'SAP Germany', gateway: 'IN-GW-01 ↔ EU-GW-03', consent: 'CST-4421', time: '2 min ago', status: 'completed' },
      { id: 'TX-8829', type: 'Tax Certificate', sender: 'Income Tax Dept.', receiver: 'EU Commission', gateway: 'IN-GW-01 ↔ EU-GW-01', consent: 'CST-4400', time: '18 min ago', status: 'completed' },
    ],
  },
  'sap-germany': {
    breadcrumb: ['European Union', 'SAP Germany'],
    overview: { type: 'Institution', jurisdiction: 'European Union', parent: 'European Union (EU-J-001)', created: '2023-06-08', status: 'Active' },
    gateway: { name: 'SAP DE Gateway', status: 'healthy', health: '99.4%', latency: '24ms', connectedWorlds: 6, currentConnections: 11 },
    stats: { agents: 22, lockers: 48, departments: 3, endpoints: 19, consents: 14, txToday: 48 },
    agents: [
      { id: 'a1', name: 'Hans Müller', role: 'HR Manager', lockers: 3, status: 'online', avatar: 'HM' },
      { id: 'a2', name: 'SAP Compliance Bot', role: 'AI Agent', lockers: 2, status: 'running', avatar: 'SC' },
      { id: 'a3', name: 'Elena Weber', role: 'Security Officer', lockers: 4, status: 'online', avatar: 'EW' },
    ],
    lockers: [
      { id: 'l1', name: 'Employment Records', type: 'Professional', owner: 'HR Department', endpoint: 'eu-sap-emp-001', status: 'active', icon: <Briefcase size={14} color="#16a34a" /> },
      { id: 'l2', name: 'Identity Locker', type: 'Identity', owner: 'Hans Müller', endpoint: 'eu-sap-id-002', status: 'active', icon: <Shield size={14} color="#7c3aed" /> },
    ],
    connections: [
      { id: 'c1', from: 'EU Gateway (EU-GW-03)', to: 'India Gateway (IN-GW-01)', status: 'established', purpose: 'Employment Verification', since: '2h 14m' },
      { id: 'c2', from: 'EU Gateway (EU-GW-03)', to: 'US Gateway (US-GW-02)', status: 'established', purpose: 'Payroll Audit', since: '6h 51m' },
    ],
    transactions: [
      { id: 'TX-8841', type: 'Degree Verification', sender: 'IIIT Bangalore', receiver: 'SAP Germany', gateway: 'IN-GW-01 ↔ EU-GW-03', consent: 'CST-4421', time: '2 min ago', status: 'completed' },
      { id: 'TX-8822', type: 'Background Check', sender: 'SAP Germany', receiver: 'Interpol EU', gateway: 'EU-GW-03 ↔ EU-GW-07', consent: 'CST-4398', time: '31 min ago', status: 'completed' },
      { id: 'TX-8810', type: 'Tax Compliance', sender: 'Deutsche Finanzamt', receiver: 'SAP Germany', gateway: 'EU-GW-03 ↔ EU-GW-02', consent: 'CST-4392', time: '1h 12m ago', status: 'failed' },
    ],
  },
}

const defaultDetail = worldDetails['iiit-bangalore']

// ─── Helpers ─────────────────────────────────────────────────────────────────

const gatewayDot: Record<GatewayStatus, string> = { healthy: '#22c55e', degraded: '#f59e0b', offline: '#ef4444' }
const agentStatusColors: Record<AgentStatus, { dot: string; label: string; bg: string; text: string }> = {
  online: { dot: '#22c55e', label: 'Online', bg: '#f0fdf4', text: '#15803d' },
  offline: { dot: '#94a3b8', label: 'Offline', bg: '#f8fafc', text: '#64748b' },
  running: { dot: '#2563eb', label: 'Running', bg: '#eff6ff', text: '#1d4ed8' },
}
const txStatusConfig: Record<TxStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  completed: { label: 'Completed', color: '#15803d', bg: '#dcfce7', icon: <CheckCircle2 size={11} color="#15803d" /> },
  pending: { label: 'Pending', color: '#92400e', bg: '#fef3c7', icon: <Clock size={11} color="#92400e" /> },
  failed: { label: 'Failed', color: '#991b1b', bg: '#fef2f2', icon: <XCircle size={11} color="#991b1b" /> },
}

function nodeTypeLabel(t: NodeType) {
  return t === 'jurisdiction' ? 'Jurisdiction' : t === 'institution' ? 'Institution' : 'Department'
}
function nodeTypeColor(t: NodeType): { color: string; bg: string } {
  if (t === 'jurisdiction') return { color: '#1d4ed8', bg: '#eff6ff' }
  if (t === 'institution') return { color: '#0e7490', bg: '#ecfeff' }
  return { color: '#6d28d9', bg: '#f5f3ff' }
}

// ─── World Tree ───────────────────────────────────────────────────────────────

function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: WorldNode
  depth: number
  selectedId: string
  onSelect: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = node.id === selectedId
  const [hovered, setHovered] = useState(false)
  const tc = nodeTypeColor(node.type)

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => { onSelect(node.id); if (hasChildren) setExpanded(v => !v) }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '7px 10px',
          paddingLeft: 10 + depth * 18,
          borderRadius: 7,
          cursor: 'pointer',
          background: isSelected ? '#eff6ff' : hovered ? '#f8fafc' : 'transparent',
          border: isSelected ? '1px solid #bfdbfe' : '1px solid transparent',
          marginBottom: 1,
          transition: 'all 0.12s ease',
          position: 'relative',
        }}
      >
        {/* Tree line */}
        {depth > 0 && (
          <div
            style={{
              position: 'absolute',
              left: 10 + (depth - 1) * 18 + 8,
              top: 0,
              bottom: 0,
              width: 1,
              background: '#e2e8f0',
            }}
          />
        )}

        {/* Expand toggle */}
        <div
          style={{ width: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={12} color="#94a3b8" /> : <ChevronRight size={12} color="#94a3b8" />
          ) : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e2e8f0', marginLeft: 4 }} />}
        </div>

        {/* Icon */}
        {node.type === 'jurisdiction' ? (
          <Globe size={14} color={isSelected ? '#2563eb' : '#64748b'} />
        ) : node.type === 'institution' ? (
          <Building2 size={14} color={isSelected ? '#2563eb' : '#64748b'} />
        ) : (
          <Users size={14} color={isSelected ? '#2563eb' : '#94a3b8'} />
        )}

        {/* Label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 12,
            fontWeight: isSelected ? 600 : 400,
            color: isSelected ? '#1e40af' : '#0f172a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {node.name}
          </div>
          {depth < 2 && (
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
              {node.agents.toLocaleString()} agents
            </div>
          )}
        </div>

        {/* Gateway dot */}
        <div
          title={node.gatewayStatus}
          style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: gatewayDot[node.gatewayStatus],
            flexShrink: 0,
          }}
        />
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {node.children!.map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      padding: '16px 18px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
      {label}
    </div>
  )
}

// ─── Main WorldExplorer ───────────────────────────────────────────────────────

export default function WorldExplorer() {
  const [selectedId, setSelectedId] = useState('iiit-bangalore')
  const detail = worldDetails[selectedId] ?? defaultDetail

  // Resolve node name from tree
  function findNode(nodes: WorldNode[], id: string): WorldNode | null {
    for (const n of nodes) {
      if (n.id === id) return n
      if (n.children) { const found = findNode(n.children, id); if (found) return found }
    }
    return null
  }
  const selectedNode = findNode(worldTree, selectedId)

  const tc = selectedNode ? nodeTypeColor(selectedNode.type) : nodeTypeColor('institution')

  return (
    <div style={{ display: 'flex', gap: 0, flex: 1, minHeight: 0, overflow: 'hidden' }}>

      {/* ── Left: World Tree ───────────────────────────────────────────────── */}
      <div style={{
        width: 260,
        flexShrink: 0,
        borderRight: '1px solid #e2e8f0',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ padding: '16px 16px 10px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>World Hierarchy</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Explore governance domains</div>
        </div>

        {/* Legend */}
        <div style={{ padding: '0 16px 10px', display: 'flex', gap: 10 }}>
          {(['jurisdiction', 'institution', 'department'] as NodeType[]).map(t => {
            const c = nodeTypeColor(t)
            return (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: c.color }} />
                <span style={{ fontSize: 9, color: '#94a3b8', textTransform: 'capitalize' }}>{t.slice(0, 5)}.</span>
              </div>
            )
          })}
        </div>

        <div style={{ padding: '0 8px 16px', flex: 1 }}>
          {worldTree.map(node => (
            <TreeNode key={node.id} node={node} depth={0} selectedId={selectedId} onSelect={setSelectedId} />
          ))}
        </div>
      </div>

      {/* ── Center: World Detail ───────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '20px 20px 20px 20px', background: '#f8fafc' }}>

        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            {detail.breadcrumb.map((crumb, i) => (
              <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && <ChevronRight size={12} color="#cbd5e1" />}
                <span style={{ fontSize: 12, color: i === detail.breadcrumb.length - 1 ? '#0f172a' : '#94a3b8', fontWeight: i === detail.breadcrumb.length - 1 ? 500 : 400 }}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: tc.bg, border: `1.5px solid ${tc.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selectedNode?.type === 'jurisdiction' ? <Globe size={20} color={tc.color} /> : <Building2 size={20} color={tc.color} />}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {selectedNode?.name ?? 'IIIT Bangalore'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 11, background: tc.bg, color: tc.color, padding: '1px 8px', borderRadius: 99, fontWeight: 600 }}>
                  {selectedNode ? nodeTypeLabel(selectedNode.type) : 'Institution'}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>·</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: gatewayDot[detail.gateway.status] }} />
                  <span style={{ fontSize: 11, color: '#64748b' }}>{detail.gateway.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 1: Overview */}
        <Card title="World Overview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Type', value: detail.overview.type },
              { label: 'Jurisdiction', value: detail.overview.jurisdiction },
              { label: 'Parent World', value: detail.overview.parent },
              { label: 'Created', value: detail.overview.created },
              { label: 'Status', value: detail.overview.status },
            ].map(row => (
              <div key={row.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{row.label}</div>
                <div style={{ fontSize: 12, color: '#0f172a', fontWeight: 500, marginTop: 2 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 2: Gateway */}
        <Card title="Gateway">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#0f172a', borderRadius: 10, marginBottom: 10 }}>
            <Radio size={16} color="#93c5fd" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{detail.gateway.name}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
                Latency: {detail.gateway.latency} · Health: {detail.gateway.health}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: gatewayDot[detail.gateway.status] }} />
              <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{detail.gateway.status}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Connected Worlds', value: detail.gateway.connectedWorlds },
              { label: 'Current Connections', value: detail.gateway.currentConnections },
            ].map(item => (
              <div key={item.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.03em' }}>{item.value}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 3: Stats */}
        <Card title="World Statistics">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { label: 'Agents', value: detail.stats.agents, icon: <Users size={13} color="#2563eb" /> },
              { label: 'Lockers', value: detail.stats.lockers, icon: <Lock size={13} color="#7c3aed" /> },
              { label: 'Departments', value: detail.stats.departments, icon: <Building2 size={13} color="#0891b2" /> },
              { label: 'Endpoints', value: detail.stats.endpoints, icon: <Wifi size={13} color="#16a34a" /> },
              { label: 'Active Consents', value: detail.stats.consents, icon: <ShieldCheck size={13} color="#0d9488" /> },
              { label: 'Tx Today', value: detail.stats.txToday, icon: <FileText size={13} color="#ea580c" /> },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.03em' }}>{s.value.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 4: Agents */}
        <Card title="Agents" action={
          <span style={{ fontSize: 11, background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: 99 }}>
            {detail.agents.length} total
          </span>
        }>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {detail.agents.map(agent => {
              const sc = agentStatusColors[agent.status]
              return (
                <div key={agent.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: 9,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#dbeafe',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#1d4ed8', flexShrink: 0,
                  }}>
                    {agent.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{agent.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
                      {agent.role} · {agent.lockers} Locker{agent.lockers > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      background: sc.bg, color: sc.text,
                      fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 99,
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot }} />
                      {sc.label}
                    </div>
                    <button style={{
                      fontSize: 11, fontWeight: 500, background: '#eff6ff',
                      color: '#2563eb', border: '1px solid #bfdbfe',
                      borderRadius: 6, padding: '3px 10px', cursor: 'pointer',
                    }}>View</button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Card 5: Lockers */}
        <Card title="Lockers" action={
          <span style={{ fontSize: 11, background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: 99 }}>
            {detail.lockers.length} total
          </span>
        }>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {detail.lockers.map(locker => (
              <div key={locker.id} style={{
                padding: '10px 12px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: 9,
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {locker.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{locker.name}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{locker.type}</div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>
                  <span style={{ color: '#94a3b8' }}>Owner:</span> {locker.owner}
                </div>
                <div style={{ fontSize: 10, color: '#2563eb', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
                  {locker.endpoint}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Right: Gateway Activity ────────────────────────────────────────── */}
      <div style={{
        width: 280,
        flexShrink: 0,
        borderLeft: '1px solid #e2e8f0',
        background: '#fff',
        overflowY: 'auto',
        padding: '16px 16px',
      }}>

        {/* Gateway Activity */}
        <div style={{ marginBottom: 18 }}>
          <SectionLabel label="Gateway Activity" />
          <div style={{
            background: '#0f172a',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Activity size={14} color="#93c5fd" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{detail.gateway.name}</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: gatewayDot[detail.gateway.status] }} />
                <span style={{ fontSize: 10, color: '#64748b', textTransform: 'capitalize' }}>{detail.gateway.status}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                { label: 'Incoming', value: '18 req/min' },
                { label: 'Outgoing', value: '12 req/min' },
                { label: 'Latency', value: detail.gateway.latency },
                { label: 'Health', value: detail.gateway.health },
              ].map(m => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '6px 8px' }}>
                  <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginTop: 2 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Uptime bar */}
          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>Uptime (30d)</span>
              <span style={{ fontSize: 10, color: '#15803d', fontWeight: 600 }}>{detail.gateway.health}</span>
            </div>
            <div style={{ height: 4, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: detail.gateway.health, background: '#22c55e', borderRadius: 99 }} />
            </div>
          </div>
        </div>

        {/* Cross-World Connections */}
        <div style={{ marginBottom: 18 }}>
          <SectionLabel label="Cross-World Connections" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {detail.connections.map(conn => (
              <div key={conn.id} style={{
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: 9,
                padding: '10px 12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>From</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conn.from}
                    </div>
                  </div>
                  <ArrowLeftRight size={12} color="#2563eb" style={{ flexShrink: 0, marginTop: 8 }} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>To</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conn.to}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: '#64748b' }}>{conn.purpose}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: conn.status === 'established' ? '#22c55e' : conn.status === 'pending' ? '#f59e0b' : '#ef4444' }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: conn.status === 'established' ? '#15803d' : conn.status === 'pending' ? '#92400e' : '#991b1b', textTransform: 'capitalize' }}>
                      {conn.status}
                    </span>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>· {conn.since}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <SectionLabel label="Recent Transactions" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {detail.transactions.map(tx => {
              const sc = txStatusConfig[tx.status]
              return (
                <div key={tx.id} style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: 9,
                  padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{tx.type}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', marginTop: 1 }}>{tx.id}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: sc.bg, color: sc.color, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 99 }}>
                      {sc.icon}
                      {sc.label}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>
                    {tx.sender} → {tx.receiver}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>{tx.consent}</span>
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>{tx.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
