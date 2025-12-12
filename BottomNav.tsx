import { cn } from "@/lib/utils";
import { Compass, Home, ListCheck, User } from "lucide-react";
import { useLocation } from "wouter";

const tabs = [
  { label: "Início", icon: Home, path: "/dashboard" },
  { label: "Trilhas", icon: Compass, path: "/tracks" },
  { label: "Progresso", icon: ListCheck, path: "/feed" },
  { label: "Perfil", icon: User, path: "/home" },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-t border-slate-200 shadow-lg md:hidden">
      <div className="max-w-2xl mx-auto grid grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = location === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => setLocation(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 text-xs font-semibold transition-colors",
                active ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <span className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-1",
                active ? "bg-indigo-50" : ""
              )}>
                <Icon className="w-5 h-5" />
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
