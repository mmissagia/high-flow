import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Users,
  TrendingUp,
  DollarSign,
  Heart,
  BookOpen,
  BarChart,
  Calendar,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Link } from "react-router-dom";

const produtorData = {
  overview: {
    activeMentorships: 3,
    totalMentees: 62,
    avgIem: 76,
    totalRevenue: 744000,
    activeCourses: 5,
    totalStudents: 1250,
  },
  mentorships: [
    {
      id: 1,
      name: "Mentoria Elite 2024",
      mentor: "Carlos Ferreira",
      mentees: 25,
      avgIem: 78,
      revenue: 300000,
      nextSession: "28/01/2024",
    },
    {
      id: 2,
      name: "Mastermind VIP",
      mentor: "Ana Paula",
      mentees: 12,
      avgIem: 85,
      revenue: 300000,
      nextSession: "30/01/2024",
    },
    {
      id: 3,
      name: "Grupo Iniciantes",
      mentor: "Roberto Lima",
      mentees: 25,
      avgIem: 65,
      revenue: 144000,
      nextSession: "01/02/2024",
    },
  ],
  iemDistribution: [
    { range: "90-100%", count: 8, color: "bg-green-500" },
    { range: "70-89%", count: 28, color: "bg-blue-500" },
    { range: "50-69%", count: 18, color: "bg-yellow-500" },
    { range: "< 50%", count: 8, color: "bg-red-500" },
  ],
};

export default function PainelProdutor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Produtor</h1>
          <p className="text-muted-foreground">Visão executiva de cursos e mentorias</p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-6 gap-4">
        <MetricCard title="Mentorias Ativas" value={produtorData.overview.activeMentorships.toString()} icon={Heart} />
        <MetricCard title="Total Mentorados" value={produtorData.overview.totalMentees.toString()} icon={Users} />
        <MetricCard title="IEM Médio" value={`${produtorData.overview.avgIem}%`} icon={TrendingUp} trend={{ value: 5, isPositive: true }} />
        <MetricCard title="Receita Mentorias" value={`R$ ${(produtorData.overview.totalRevenue / 1000).toFixed(0)}K`} icon={DollarSign} />
        <MetricCard title="Cursos Ativos" value={produtorData.overview.activeCourses.toString()} icon={BookOpen} />
        <MetricCard title="Total Alunos" value={produtorData.overview.totalStudents.toLocaleString()} icon={Users} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Mentorias */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Programas de Mentoria
                </CardTitle>
                <Button variant="outline" size="sm">+ Nova Mentoria</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {produtorData.mentorships.map((mentorship) => (
                  <Card key={mentorship.id} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{mentorship.name}</h3>
                            <Badge variant="outline">Mentor: {mentorship.mentor}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {mentorship.mentees} mentorados
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Próxima: {mentorship.nextSession}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className={`text-xl font-bold ${
                              mentorship.avgIem >= 70 ? "text-green-500" :
                              mentorship.avgIem >= 50 ? "text-yellow-500" : "text-red-500"
                            }`}>
                              {mentorship.avgIem}%
                            </p>
                            <p className="text-xs text-muted-foreground">IEM Médio</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-primary">
                              R$ {(mentorship.revenue / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-muted-foreground">Receita</p>
                          </div>
                          <Link to={`/entrega/mentor`}>
                            <Button variant="ghost" size="sm">Ver Detalhes</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribuição IEM */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Distribuição do IEM
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {produtorData.iemDistribution.map((item) => (
                <div key={item.range} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.range}</span>
                    <span className="font-medium">{item.count} mentorados</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / produtorData.overview.totalMentees) * 100}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Resumo</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <p className="text-lg font-bold text-green-500">58%</p>
                    <p className="text-xs text-muted-foreground">Acima de 70%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <p className="text-lg font-bold text-red-500">13%</p>
                    <p className="text-xs text-muted-foreground">Em risco</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Criar Nova Mentoria
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Adicionar Curso
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Gerenciar Mentores
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
