import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAuthStore } from '../stores/authStore';
import { StateScorecard } from '../types';
import { TrendingUp, Activity, ShieldCheck } from 'lucide-react';

interface Props {
  scorecard: StateScorecard;
}

export const StateScoreGauge: React.FC<Props> = ({ scorecard }) => {
  const { language } = useAuthStore();
  const score = scorecard.stateScore;

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '100%',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.7, '#ef4444'],
              [0.85, '#f59e0b'],
              [1, '#10b981'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 12,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: '#eab308',
          },
        },
        axisTick: { length: 8, lineStyle: { color: 'auto', width: 1.5 } },
        splitLine: { length: 14, lineStyle: { color: 'auto', width: 2 } },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 10,
          distance: -35,
          formatter: (value: number) => value.toFixed(0),
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 11,
          color: '#94a3b8',
        },
        detail: {
          fontSize: 34,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: (value: number) => value.toFixed(1),
          color: '#ffffff',
          fontWeight: 'bold',
          fontFamily: 'JetBrains Mono',
        },
        data: [
          {
            value: score,
            name: language === 'ta' ? 'மாநில ஆளுமை குறியீடு' : 'STATE HEALTH INDEX',
          },
        ],
      },
    ],
  };

  const dimensions = [
    { key: 'economic_health', labelEn: 'Economy & Revenue', labelTa: 'பொருளாதாரம் & வரி', val: scorecard.dimensions.economic_health.score, status: 'EXCELLENT' },
    { key: 'public_health', labelEn: 'Public Health', labelTa: 'பொது சுகாதாரம்', val: scorecard.dimensions.public_health.score, status: 'GOOD' },
    { key: 'law_and_order', labelEn: 'Law & Order', labelTa: 'சட்டம் ஒழுங்கு', val: scorecard.dimensions.law_and_order.score, status: 'EXCELLENT' },
    { key: 'scheme_delivery', labelEn: 'Welfare Delivery', labelTa: 'மக்கள் நலத்திட்டங்கள்', val: scorecard.dimensions.scheme_delivery.score, status: 'EXCELLENT' },
    { key: 'water_and_agriculture', labelEn: 'Water & Agriculture', labelTa: 'நீர் & விவசாயம்', val: scorecard.dimensions.water_and_agriculture.score, status: 'ATTENTION' },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            {language === 'ta' ? 'மாநில ஒட்டுமொத்த செயல்திறன்' : 'State Composite Index'}
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <TrendingUp className="w-3 h-3" />
          <span>{scorecard.deltaLastWeek} vs last week</span>
        </div>
      </div>

      {/* Gauge Visual */}
      <div className="h-44 -my-2">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Domain Breakdown Bars */}
      <div className="space-y-2.5 pt-2">
        {dimensions.map((d) => (
          <div key={d.key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">
                {language === 'ta' ? d.labelTa : d.labelEn}
              </span>
              <span className="font-mono font-bold text-slate-100">{d.val.toFixed(1)}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  d.val >= 90 ? 'bg-emerald-500' : d.val >= 85 ? 'bg-cyan-500' : 'bg-amber-500'
                }`}
                style={{ width: `${d.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
