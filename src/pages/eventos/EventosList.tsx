import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, DollarSign, TrendingUp, Plus, Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/MetricCard";

const mockEvents = [
  {
    id: 1,
    name: "Imersão High-Ticket 2024",
    date: "20/01/2024",
    time: "09:00 - 18:00",
    registrations: 245,
    checkins: 198,
    revenue: 125000,
    pitches: 3,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Workshop Vendas Consultivas",
    date: "25/01/2024",
    time: "14:00 - 17:00",
    registrations: 180,
    checkins: 0,
    revenue: 54000,
    pitches: 2,
    status: "Agendado",
  },
  {
    id: 3,
    name: "Masterclass Copywriting",
    date: "15/01/2024",
    time: "19:00 - 21:00",
    registrations: 320,
    checkins: 298,
    revenue: 89000,
    pitches: 1,
    status: "Concluído",
  },
  {
    id: 4,
    name: "Mentoria Coletiva VIP",
    date: "28/01/2024",
    time: "10:00 - 12:00",
    registrations: 50,
    checkins: 0,
    revenue: 75000,
    pitches: 1,
    status: "Agendado",
  },
];

const statusColors: Record<string, string> = {
  Ativo: "bg-green-500",
  Agendado: "bg-blue-500",
  Concluído: "bg-slate-500",
};

export default function EventosList() {
  const totalRegistrations = mockEvents.reduce((acc, e) => acc + e.registrations, 0);
  const totalRevenue = mockEvents.reduce((acc, e) => acc + e.revenue, 0);
  const avgConversion = 32;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eventos & Pitches</h1>
          <p className="text-muted-foreground">Gerencie eventos Blinket e pitches de vendas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Eventos" value={mockEvents.length.toString()} icon={Calendar} />
        <MetricCard title="Total Inscritos" value={totalRegistrations.toString()} icon={Users} trend={{ value: 18, isPositive: true }} />
        <MetricCard title="Receita Total" value={`R$ ${(totalRevenue / 1000).toFixed(0)}K`} icon={DollarSign} trend={{ value: 25, isPositive: true }} />
        <MetricCard title="Conversão Média" value={`${avgConversion}%`} icon={TrendingUp} trend={{ value: 5, isPositive: true }} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Eventos</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar evento..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <Link key={event.id} to={`/eventos/detalhe/${event.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{event.name}</h3>
                            <Badge className={`${statusColors[event.status]} text-white`}>
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{event.registrations}</p>
                          <p className="text-xs text-muted-foreground">Inscritos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{event.checkins}</p>
                          <p className="text-xs text-muted-foreground">Check-ins</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-500">
                            R$ {(event.revenue / 1000).toFixed(0)}K
                          </p>
                          <p className="text-xs text-muted-foreground">Receita</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{event.pitches}</p>
                          <p className="text-xs text-muted-foreground">Pitches</p>
                        </div>

                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
