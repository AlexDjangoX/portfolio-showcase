'use client';

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { FlowEdge } from '@/components/portfolio/FlowEdge';

import '@xyflow/react/dist/style.css';

function FlowNode({ data }: NodeProps) {
  const variant = (data.variant as string) || 'default';
  const isError = variant === 'error';

  return (
    <div
      className={`relative box-border max-w-[320px] min-w-55 rounded-xl border-2 px-6 py-4 text-center text-[18px] leading-snug font-bold tracking-tight shadow-lg ${
        isError
          ? 'border-red-400 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-950 dark:text-red-200'
          : 'border-slate-300 bg-white text-slate-900 shadow-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:shadow-none'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="-top-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
      <div className="wrap-break-word">{String(data.label ?? '')}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="-bottom-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
    </div>
  );
}

/** Decision diamond: larger, high-contrast amber */
function DecisionNode({ data }: NodeProps) {
  return (
    <div className="relative flex h-32 w-32 rotate-45 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-50 shadow-lg dark:border-amber-500 dark:bg-amber-950">
      <Handle
        type="target"
        position={Position.Top}
        className="-top-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
      <div className="w-20 -rotate-45 text-center text-[15px] leading-snug font-bold text-amber-900 dark:text-amber-100">
        {String(data.label ?? '')}
      </div>
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="-bottom-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
      <Handle
        id="no"
        type="source"
        position={Position.Left}
        className="-left-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
      <Handle
        id="yes"
        type="source"
        position={Position.Right}
        className="-right-px! h-0.5! w-0.5! border-0! bg-transparent! opacity-0!"
      />
    </div>
  );
}

const nodeTypes = {
  default: FlowNode,
  decision: DecisionNode,
};

const edgeTypes = {
  flow: FlowEdge,
};

export interface FlowDiagramData {
  nodes: Array<{
    id: string;
    label: string;
    position: { x: number; y: number };
    variant?: 'default' | 'decision' | 'error';
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label?: string;
    sourceHandle?: string;
    targetHandle?: string;
  }>;
}

interface FlowDiagramProps {
  data: FlowDiagramData;
}

function FlowDiagramInner({ data }: FlowDiagramProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Use fixed theme until mounted to avoid hydration mismatch. When mounted, follow resolvedTheme (undefined = dark for system preference).
  const isDark = mounted ? resolvedTheme !== 'light' : false;

  const initialNodes: Node[] = data.nodes.map((n) => ({
    id: n.id,
    type: n.variant === 'decision' ? 'decision' : 'default',
    position: n.position,
    data: { label: n.label, variant: n.variant },
  }));

  const edgeColor = isDark ? '#818cf8' : '#4f46e5';
  const edgeLabelText = isDark ? '#f1f5f9' : '#1e293b';
  const edgeLabelBg = isDark ? '#1e293b' : '#ffffff';

  const initialEdges: Edge[] = data.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    type: 'flow',
    markerEnd: 'flow-edge-marker',
    style: {
      stroke: 'url(#flow-edge-gradient)',
      strokeWidth: 2,
      strokeOpacity: 0.75,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    labelStyle: {
      fill: edgeLabelText,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
    labelShowBg: true,
    labelBgStyle: {
      fill: edgeLabelBg,
      stroke: edgeColor,
      strokeWidth: 1.5,
    },
    labelBgPadding: [8, 5] as [number, number],
    labelBgBorderRadius: 6,
  }));

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div
      className={`h-[80vh] min-h-160 w-full overflow-hidden rounded-2xl ${
        isDark ? 'bg-slate-950' : 'bg-slate-100'
      }`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'flow', markerEnd: 'flow-edge-marker' }}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.2}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        className="rounded-2xl"
      >
        <Background
          variant={BackgroundVariant.Dots}
          color={isDark ? 'rgba(148,163,184,0.15)' : 'rgba(100,116,139,0.2)'}
          gap={24}
          size={1.5}
        />
        <svg className="pointer-events-none absolute size-0 overflow-hidden" aria-hidden>
          <defs>
            <linearGradient id="flow-edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>
            <marker
              id="flow-edge-marker"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" fill="none" />
            </marker>
          </defs>
        </svg>
        <Controls
          position="bottom-left"
          showInteractive={false}
          className="rounded-xl! border! border-slate-200! bg-white/90! p-1! shadow-md! backdrop-blur-sm dark:border-slate-700! dark:bg-slate-800/90! [&>button]:rounded-lg! [&>button]:border-0! [&>button]:bg-transparent! [&>button]:text-slate-600! [&>button]:transition-colors dark:[&>button]:text-slate-300! [&>button:hover]:bg-slate-100! [&>button:hover]:text-slate-900! dark:[&>button:hover]:bg-slate-700! dark:[&>button:hover]:text-white!"
        />
      </ReactFlow>
    </div>
  );
}

export function FlowDiagram({ data }: FlowDiagramProps) {
  return (
    <ReactFlowProvider>
      <div className="my-6" aria-label="Architecture diagram">
        <FlowDiagramInner data={data} />
      </div>
    </ReactFlowProvider>
  );
}
