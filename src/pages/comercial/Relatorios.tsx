import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DollarSign, TrendingDown, XCircle, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function Relatorios() {
  const { user } = useAuth();

  const { data: salesUsers = [] } = useQuery({
    queryKey: ["sales_users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sales_users").select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: deals = [] } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("deals").select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: activities = [] } = useQuery({
    queryKey: ["sales_activities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sales_activities").select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Revenue by closer
  const closerRevenue = salesUsers.map((su: any) => {
    const won = deals.filter((d: any) => d.closer_id === su.id && d.stage === "won");
    return { name: su.name, role: su.role, revenue: won.reduce((a: number, d: any) => a + Number(d.amount_value || 0), 0), deals: won.length, cost: Number(su.cost_fixed_monthly || 0) };
  }).filter((r) => r.revenue > 0 || r.cost > 0);

  // Loss reasons
  const lostActivities = activities.filter((a: any) => a.activity_type === "DEAL_LOST" && a.loss_reason);
  const lossReasons = lostActivities.reduce((acc: Record<string, number>, a: any) => {
    acc[a.loss_reason] = (acc[a.loss_reason] || 0) + 1;
    return acc;
  }, {});

  // No-show rate
  const scheduled = activities.filter((a: any) => a.activity_type === "MEETING_SCHEDULED").length;
  const noShows = activities.filter((a: any) => a.activity_type === "NO_SHOW").length;
  const noShowRate = scheduled > 0 ? ((noShows / scheduled) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios Comerciais</h1>
        <p className="text-muted-foreground">Análises consolidadas da operação comercial</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-4"><div className="p-3 rounded-lg bg-red-500/10"><XCircle className="h-6 w-6 text-red-500" /></div><div><p className="text-sm text-muted-foreground">Taxa No-show</p><p className="text-2xl font-bold">{noShowRate}%</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4"><div className="p-3 rounded-lg bg-primary/10"><BarChart3 className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Deals Perdidos</p><p className="text-2xl font-bold">{deals.filter((d: any) => d.stage === "lost").length}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4"><div className="p-3 rounded-lg bg-green-500/10"><DollarSign className="h-6 w-6 text-green-500" /></div><div><p className="text-sm text-muted-foreground">Receita Total</p><p className="text-2xl font-bold text-green-500">R$ {deals.filter((d: any) => d.stage === "won").reduce((a: number, d: any) => a + Number(d.amount_value || 0), 0).toLocaleString()}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Receita por Profissional</CardTitle></CardHeader>
        <CardContent>
          {closerRevenue.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Sem dados para exibir</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Deals</TableHead>
                  <TableHead>Receita</TableHead>
                  <TableHead>Custo Fixo</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {closerRevenue.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell><Badge variant="outline">{r.role}</Badge></TableCell>
                    <TableCell>{r.deals}</TableCell>
                    <TableCell className="text-green-500 font-medium">R$ {r.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">R$ {r.cost.toLocaleString()}</TableCell>
                    <TableCell className={r.revenue - r.cost >= 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                      R$ {(r.revenue - r.cost).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {Object.keys(lossReasons).length > 0 && (
        <Card>
          <CardHeader><CardTitle>Motivos de Perda</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(lossReasons).sort(([, a], [, b]) => b - a).map(([reason, count]) => (
              <div key={reason} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="font-medium">{reason}</span>
                <Badge variant="secondary">{count}x</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
