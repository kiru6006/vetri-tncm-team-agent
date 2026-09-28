import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAuthStore } from '../stores/authStore';
import { IndianRupee, TrendingUp, AlertTriangle, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const RevenueAnalyticsView: React.FC = () => {
  const { language } = useAuthStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/executive/revenue-analytics')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {});
  }, []);

  const chartOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Target Total', 'Commercial Tax', 'Stamp Duty & Regn', 'Excise'],
      textStyle: { color: '#94a3b8', fontSize: 11 },
      top: 0,
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data ? data.monthly_data.map((m: any) => m.month) : ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      name: '₹ Crores',
      nameTextStyle: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { lineStyle: { color: '#1e293b' } },
      axisLabel: { color: '#94a3b8' },
    },
    series: [
      {
        name: 'Target Total',
        type: 'line',
        data: data ? data.monthly_data.map((m: any) => m.target_total_cr) : [13500, 13800, 14200, 14400, 14600, 14800],
        lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: 'Commercial Tax',
        type: 'bar',
        stack: 'total',
        data: data ? data.monthly_data.map((m: any) => m.commercial_tax_cr) : [11200, 11450, 11800, 11600, 11950, 12200],
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'Stamp Duty & Regn',
        type: 'bar',
        stack: 'total',
        data: data ? data.monthly_data.map((m: any) => m.stamp_duty_cr) : [1650, 1720, 1810, 1790, 1880, 1950],
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Excise',
        type: 'bar',
        stack: 'total',
        data: data ? data.monthly_data.map((m: any) => m.excise_cr) : [1050, 1080, 1120, 1100, 1150, 1180],
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'நடப்பு நிதி ஆண்டு வசூல்' : 'Total Revenue Collected (H1)'}
          </span>
          <div className="text-2xl font-bold font-mono text-white flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-amber-400" />
            ₹87,280 Cr
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+11.4% YoY Growth</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'இலக்கு சாதனை %' : 'Overall Target Achievement'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">102.3%</div>
          <div className="text-xs text-slate-400">Above budgeted fiscal expectations</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'வணிக வரி பங்கு' : 'Commercial Tax Share'}
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400">₹70,200 Cr</div>
          <div className="text-xs text-slate-400">80.4% of Own Tax Revenue (SOTR)</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase">
            {language === 'ta' ? 'AI கண்டறிந்த வரி கசிவு' : 'AI Flagged Revenue Leakage'}
          </span>
          <div className="text-2xl font-bold font-mono text-rose-400">₹60.7 Cr</div>
          <div className="text-xs text-rose-300 font-medium">2 Industrial Clusters under scrutiny</div>
        </div>
      </div>

      {/* Main Chart + Top Districts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'ta' ? 'மாதாந்திர வரி வருவாய் பகுப்பாய்வு' : 'Monthly Tax Revenue Breakdown & Outlay'}
          </h3>
          <div className="h-72">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <div className="lg:col-span-4 glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'ta' ? 'முன்னணி வருவாய் மாவட்டங்கள்' : 'Top 5 Revenue Districts'}
          </h3>
          <div className="space-y-3">
            {[
              { district: 'Chennai', code: 'CHE', collected: '₹28,450 Cr', targetPct: '106.2%' },
              { district: 'Coimbatore', code: 'CBE', collected: '₹14,200 Cr', targetPct: '105.1%' },
              { district: 'Kanchipuram', code: 'KAN', collected: '₹8,950 Cr', targetPct: '103.8%' },
              { district: 'Chengalpattu', code: 'CGL', collected: '₹8,420 Cr', targetPct: '104.5%' },
              { district: 'Salem', code: 'SLM', collected: '₹6,120 Cr', targetPct: '101.4%' },
            ].map((d, i) => (
              <div key={d.code} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{d.district}</div>
                    <div className="text-[10px] text-slate-400">{d.collected}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs">
                  {d.targetPct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
