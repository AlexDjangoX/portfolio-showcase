'use client';

import { EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

/**
 * Custom edge matching the exemplar: Bezier path with gradient stroke.
 * Uses the straight-line hack so gradient is visible on colinear points.
 */
export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  style = {},
  markerEnd,
}: EdgeProps) {
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: xEqual ? sourceX + 0.0001 : sourceX,
    sourceY: yEqual ? sourceY + 0.0001 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {label != null && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="nodrag nopan rounded bg-white px-2 py-0.5 text-[13px] font-bold tracking-tight shadow-sm dark:bg-slate-800 dark:text-slate-100"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
