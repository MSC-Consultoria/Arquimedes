import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-sm uppercase tracking-wide text-purple-300">404</p>
        <h1 className="text-3xl font-bold">Página não encontrada</h1>
        <p className="text-slate-300">
          O caminho que você tentou acessar não existe. Verifique o link ou volte para o painel para continuar sua jornada.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Voltar
          </Button>
          <Button onClick={() => setLocation("/dashboard")}>Ir para o painel</Button>
        </div>
      </div>
    </div>
  );
}
