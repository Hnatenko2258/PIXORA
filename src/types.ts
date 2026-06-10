/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavSection {
  id: string;
  name: string;
  labelEn: string;
  iconName: string;
}

export interface MetricPoint {
  time: string;
  bitrate: number;
  fps: number;
  cpu: number;
  vmaf: number;
}

export interface PipelineStep {
  id: string;
  title: string;
  description: string;
  status: 'idle' | 'processing' | 'done';
}

export interface ColorPreset {
  name: string;
  gamut: string;
  gamma: string;
  brightness: string; // e.g. "1000 nits"
  toneMap: string;
}
