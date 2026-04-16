import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Calculator, Info, PlugZap, SunMedium } from 'lucide-react';
import { useMemo, useState } from 'react';

const PSH_LIBERIA = 4.6; // peak sun hours (typical range)
const SYSTEM_LOSS_FACTOR = 0.75; // wiring/inverter/temperature/soiling derate
const BATTERY_USABLE = 0.85; // usable fraction (DoD + efficiency)
const PANEL_WATTS = 550; // common modern panel size

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function roundTo(n, step) {
  return Math.round(n / step) * step;
}

export default function QuoteCalculator() {
  const reduceMotion = useReducedMotion();
  const [systemType, setSystemType] = useState('hybrid');
  const [monthlyKwh, setMonthlyKwh] = useState(300);
  const [backupHours, setBackupHours] = useState(8);

  const results = useMemo(() => {
    const kwhMonth = clamp(Number(monthlyKwh) || 0, 30, 6000);
    const kwhDay = kwhMonth / 30;

    const rawKw = kwhDay / (PSH_LIBERIA * SYSTEM_LOSS_FACTOR);
    const systemKw = clamp(roundTo(rawKw, 0.5), 0.5, 50);

    const panels = Math.max(1, Math.ceil((systemKw * 1000) / PANEL_WATTS));

    const backupFactor = clamp(Number(backupHours) || 0, 0, 24) / 24;
    const rawBattery = (kwhDay * backupFactor) / BATTERY_USABLE;
    const batteryKwh =
      systemType === 'grid'
        ? 0
        : clamp(roundTo(rawBattery, 1), 1, 200);

    const note =
      systemType === 'grid'
        ? 'Grid-tie systems typically don’t require batteries.'
        : systemType === 'offgrid'
          ? 'Off-grid sizing depends heavily on nighttime loads and generator backup.'
          : 'Hybrid systems balance solar, storage, and the grid for uptime.';

    return {
      kwhDay,
      systemKw,
      panels,
      batteryKwh,
      note
    };
  }, [backupHours, monthlyKwh, systemType]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Solar quote estimator
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Fast sizing estimate (not a final quote)
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-400/60 bg-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-800 dark:border-slate-600 dark:bg-slate-700/80 dark:text-slate-200">
          <SunMedium className="h-4 w-4 text-primary" aria-hidden="true" />
          Liberia PSH: ~{PSH_LIBERIA}
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              System type
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Grid / Hybrid / Off-grid
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'grid', label: 'Grid-tie' },
              { id: 'hybrid', label: 'Hybrid' },
              { id: 'offgrid', label: 'Off-grid' }
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setSystemType(o.id)}
                className={[
                  'h-11 rounded-xl border text-sm font-extrabold transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-slate-900',
                  systemType === o.id
                    ? 'border-primary/60 bg-primary/15 text-slate-900 dark:text-slate-100'
                    : 'border-slate-400/60 bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                ].join(' ')}
                aria-pressed={systemType === o.id}
              >
                {o.label}
              </button>
            ))}
          </div>
        </label>

        <label className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              Monthly energy use
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {monthlyKwh} kWh/mo
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={2000}
            step={25}
            value={monthlyKwh}
            onChange={(e) => setMonthlyKwh(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Monthly energy use in kilowatt-hours"
          />
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>50</span>
            <span>2000</span>
          </div>
        </label>

        <label className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-extrabold text-slate-700">
              Desired backup time
            </span>
            <span className="text-xs font-bold text-slate-500">
              {systemType === 'grid' ? '—' : `${backupHours} hrs`}
            </span>
          </div>
          <select
            value={backupHours}
            onChange={(e) => setBackupHours(Number(e.target.value))}
            disabled={systemType === 'grid'}
            className="h-11 rounded-xl border border-slate-400/60 bg-white px-3 text-sm font-extrabold text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
            {[0, 4, 8, 12, 24].map((h) => (
              <option key={h} value={h}>
                {h === 0 ? 'No backup (solar only)' : `${h} hours`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Suggested PV size
            </div>
            <PlugZap className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={results.systemKw}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-2 text-2xl font-extrabold text-slate-950"
            >
              {results.systemKw} kW
            </motion.div>
          </AnimatePresence>
          <div className="mt-1 text-sm font-semibold text-slate-600">
            ~{results.kwhDay.toFixed(1)} kWh/day usage basis
          </div>
        </div>

        <div className="rounded-2xl border border-slate-400/50 bg-slate-200/50 p-4 dark:border-slate-600 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Panels (approx.)
            </div>
            <div className="text-xs font-extrabold text-accent">{PANEL_WATTS}W</div>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={results.panels}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-2 text-2xl font-extrabold text-slate-950"
            >
              {results.panels} panels
            </motion.div>
          </AnimatePresence>
          <div className="mt-1 text-sm font-semibold text-slate-600">
            Final count depends on roof area and layout.
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-slate-400/50 bg-slate-200/50 p-4 dark:border-slate-600 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Battery (if applicable)
          </div>
          <div className="text-sm font-extrabold text-primary">
            {systemType === 'grid' ? 'Not required' : `${results.batteryKwh} kWh`}
          </div>
        </div>
        <div className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-600">
          <Info className="mt-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
          <p>{results.note}</p>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
        This is a quick estimate for UX. Exact sizing requires site survey, load list, inverter/battery
        selection, and installation constraints.
      </p>
    </div>
  );
}

