import {
  Gamepad2,
  History,
  User,
  Brain,
  LogOut,
  FileText,
  ShieldAlert,
  Settings,
} from "lucide-react";
import { T } from "@/models/constant.js";

export function PatientLayout({ active, setActive, children, onLogout }) {
  const nav = [
    { key: "safety", icon: ShieldAlert, label: "Safety Hub" },
    { key: "profile", icon: User, label: "Profile" },
    { key: "games", icon: Gamepad2, label: "Games" },
    { key: "history", icon: History, label: "History" },
    { key: "records", icon: FileText, label: "Records" },
    { key: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: T.canvas }}
    >
      {/* Mobile-only top bar: brand + logout. Nav lives in the bottom bar
          instead, so this stays minimal on small screens. */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-20"
        style={{ background: T.surface, borderBottom: `1px solid ${T.line}` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: T.primary }}
          >
            <Brain size={16} color="#fff" />
          </div>
          <span className="font-bold text-sm" style={{ color: T.ink }}>
            NeuroNest
          </span>
        </div>
        <button onClick={onLogout} className="p-2 cursor-pointer">
          <LogOut size={18} color={T.inkSoft} />
        </button>
      </header>

      {/* Desktop/tablet sidebar - hidden below md, where the bottom tab
          bar takes over navigation instead. */}
      <aside
        className="hidden md:flex w-[248px] shrink-0 flex-col items-stretch px-5 py-7 gap-8"
        style={{ background: T.surface, borderRight: `1px solid ${T.line}` }}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(145deg, #286b62, #4b9280)" }}>
            <Brain size={19} color="#fff" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-base" style={{ color: T.ink }}>NeuroNest</div>
            <div className="text-[11px] tracking-[.12em] uppercase" style={{ color: T.inkSoft }}>Cognitive care</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 mt-2">
          {nav.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className="flex flex-row items-center gap-3 cursor-pointer text-left px-3 py-3 rounded-xl w-full"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: isActive ? T.primarySoft : "transparent",
                  }}
                >
                  <Icon size={18} color={isActive ? T.primary : T.inkSoft} />
                </div>
                <span
                  className="text-sm font-semibold leading-tight"
                  style={{ color: isActive ? T.primary : T.inkSoft }}
                >
                  {n.label}
                </span>
              </button>
            );
          })}
        </nav>
        <button onClick={onLogout} className="mt-auto cursor-pointer self-start px-3 py-3 rounded-xl hover:bg-black/5">
          <LogOut size={16} color={T.inkSoft} />
        </button>
      </aside>

      {/* pb-24 on mobile keeps content clear of the fixed bottom tab bar */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-auto">
        {children}
      </main>

      {/* Mobile-only bottom tab bar - large, thumb-friendly touch targets
          with icon + label together (never icon-only), which also matches
          the dementia-friendly accessibility approach discussed earlier. */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 z-20"
        style={{
          background: T.surface,
          borderTop: `1px solid ${T.line}`,
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
        }}
      >
        {nav.map((n) => {
          const Icon = n.icon;
          const isActive = active === n.key;
          return (
            <button
              key={n.key}
              onClick={() => setActive(n.key)}
              className="flex flex-col items-center gap-1 py-1.5 px-3 min-w-16 cursor-pointer"
            >
              <Icon size={22} color={isActive ? T.primary : T.inkSoft} />
              <span
                className="text-[13px] font-medium leading-tight text-center"
                style={{ color: isActive ? T.primary : T.inkSoft }}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
