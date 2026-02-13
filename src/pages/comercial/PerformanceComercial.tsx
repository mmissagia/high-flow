import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Users, Phone, Calendar, CheckCircle, DollarSign, TrendingUp, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";

export default function PerformanceComercial() {
  const { user } = useAuth();

  const { data: salesUsers = [] } = useQuery({
    queryKey: ["sales_users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sales_users").select("*").eq("status", "active");
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

  const { data: deals = [] } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("deals").select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const totalCalls = activities.filter((a: any) => a.activity_type === "CALL" || a.activity_type === "WHATSAPP").length;
  const meetingsScheduled = activities.filter((a: any) => a.activity_type === "MEETING_SCHEDULED").length;
  const meetingsDone = activities.filter((a: any) => a.activity_type === "MEETING_DONE").length;
  const noShows = activities.filter((a: any) => a.activity_type === "NO_SHOW").length;
  const wonDeals = deals.filter((d: any) => d.stage === "won");
  const totalRevenue = wonDeals.reduce((acc: number, d: any) => acc + Number(d.amount_value || 0), 0);
  const avgTicket = wonDeals.length > 0 ? totalRevenue / wonDeals.length : 0;
  const closeRate = meetingsDone > 0 ? ((wonDeals.length / meetingsDone) * 100).toFixed(1) : "0";
  const showRate = meetingsScheduled > 0 ? (((meetingsScheduled - noShows) / meetingsScheduled) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Performance Comercial</h1>
        <p className="text-muted-foreground">KPIs da equipe e individuais</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Contatos" value={totalCalls.toString()} icon={Phone} />
        <MetricCard title="Reuniões Agendadas" value={meetingsScheduled.toString()} icon={Calendar} />
        <MetricCard title="Reuniões Realizadas" value={meetingsDone.toString()} icon={CheckCircle} />
        <MetricCard title="Fechamentos" value={wonDeals.length.toString()} icon={Target} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Receita Gerada" value={`R$ ${(totalRevenue / 1000).toFixed(0)}K`} icon={DollarSign} />
        <MetricCard title="Ticket Médio" value={`R$ ${avgTicket.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`} icon={TrendingUp} />
        <MetricCard title="Taxa Fechamento" value={`${closeRate}%`} icon={TrendingUp} />
        <MetricCard title="Taxa Comparecimento" value={`${showRate}%`} icon={Users} />
      </div>

      <Card>
        <CardHeader><CardTitle>Performance por Profissional</CardTitle></CardHeader>
        <CardContent>
          {salesUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum profissional cadastrado</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Contatos</TableHead>
                  <TableHead>Reuniões</TableHead>
                  <TableHead>Fechamentos</TableHead>
                  <TableHead>Receita</TableHead>
                  <TableHead>Taxa Fech.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesUsers.map((su: any) => {
                  const suActs = activities.filter((a: any) => a.sales_user_id === su.id);
                  const suContacts = suActs.filter((a: any) => a.activity_type === "CALL" || a.activity_type === "WHATSAPP").length;
                  const suMeetings = suActs.filter((a: any) => a.activity_type === "MEETING_DONE").length;
                  const suWon = deals.filter((d: any) => d.closer_id === su.id && d.stage === "won");
                  const suRevenue = suWon.reduce((acc: number, d: any) => acc + Number(d.amount_value || 0), 0);
                  const suRate = suMeetings > 0 ? ((suWon.length / suMeetings) * 100).toFixed(1) : "0";
                  return (
                    <TableRow key={su.id}>
                      <TableCell className="font-medium">{su.name}</TableCell>
                      <TableCell><Badge variant="outline">{su.role}</Badge></TableCell>
                      <TableCell>{suContacts}</TableCell>
                      <TableCell>{suMeetings}</TableCell>
                      <TableCell>{suWon.length}</TableCell>
                      <TableCell className="text-green-500 font-medium">R$ {suRevenue.toLocaleString()}</TableCell>
                      <TableCell>{suRate}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
