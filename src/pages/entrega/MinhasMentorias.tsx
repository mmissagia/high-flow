import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Calendar,
  FileText,
  Video,
  CheckSquare,
  MessageCircle,
  TrendingUp,
  Download,
  Play,
} from "lucide-react";

const mentorship = {
  id: 1,
  name: "Mentoria Elite 2024",
  mentor: {
    name: "Carlos Ferreira",
    avatar: "",
    role: "Mentor Principal",
  },
  iem: 78,
  nextSession: {
    date: "28/01/2024",
    time: "14:00",
    topic: "Estratégias de Fechamento",
  },
  schedule: [
    { id: 1, date: "14/01/2024", topic: "Introdução e Alinhamento", status: "Concluído" },
    { id: 2, date: "21/01/2024", topic: "Posicionamento de Mercado", status: "Concluído" },
    { id: 3, date: "28/01/2024", topic: "Estratégias de Fechamento", status: "Próximo" },
    { id: 4, date: "04/02/2024", topic: "Construção de Ofertas", status: "Agendado" },
  ],
  tasks: [
    { id: 1, title: "Definir persona ideal", deadline: "20/01/2024", status: "Entregue", score: 95 },
    { id: 2, title: "Criar script de vendas", deadline: "27/01/2024", status: "Pendente", score: null },
    { id: 3, title: "Gravar vídeo de apresentação", deadline: "03/02/2024", status: "Pendente", score: null },
  ],
  materials: [
    { id: 1, name: "Planilha de Metas", type: "Excel", size: "245 KB" },
    { id: 2, name: "E-book Vendas High-Ticket", type: "PDF", size: "3.2 MB" },
    { id: 3, name: "Template de Proposta", type: "Word", size: "156 KB" },
  ],
  recordings: [
    { id: 1, title: "Sessão 1 - Introdução", date: "14/01/2024", duration: "1h 32min" },
    { id: 2, title: "Sessão 2 - Posicionamento", date: "21/01/2024", duration: "1h 45min" },
  ],
  iemHistory: [
    { week: "Sem 1", value: 65 },
    { week: "Sem 2", value: 72 },
    { week: "Sem 3", value: 78 },
  ],
};

export default function MinhasMentorias() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Mentorias</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso e engajamento</p>
        </div>
      </div>

      {/* Header da Mentoria */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-primary">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{mentorship.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">CF</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">
                    {mentorship.mentor.name} • {mentorship.mentor.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">Seu IEM</span>
              </div>
              <p className="text-4xl font-bold text-purple-500">{mentorship.iem}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próxima Sessão */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Próxima Sessão</p>
                <p className="text-xl font-bold">{mentorship.nextSession.topic}</p>
                <p className="text-sm text-muted-foreground">
                  {mentorship.nextSession.date} às {mentorship.nextSession.time}
                </p>
              </div>
            </div>
            <Button>Entrar na Sessão</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
          <TabsTrigger value="recordings">Gravações</TabsTrigger>
          <TabsTrigger value="iem">Meu IEM</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mentorship.schedule.map((session, idx) => (
                  <div
                    key={session.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      session.status === "Próximo" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      session.status === "Concluído" ? "bg-green-500" :
                      session.status === "Próximo" ? "bg-primary" : "bg-muted"
                    }`}>
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{session.topic}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                    <Badge variant={
                      session.status === "Concluído" ? "default" :
                      session.status === "Próximo" ? "secondary" : "outline"
                    }>
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mentorship.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <CheckSquare className={`h-5 w-5 ${task.status === "Entregue" ? "text-green-500" : "text-muted-foreground"}`} />
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Prazo: {task.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {task.score && (
                        <Badge className="bg-green-500">Nota: {task.score}</Badge>
                      )}
                      <Badge variant={task.status === "Entregue" ? "default" : "secondary"}>
                        {task.status}
                      </Badge>
                      {task.status === "Pendente" && (
                        <Button size="sm">Entregar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mentorship.materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.type} • {material.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mentorship.recordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Video className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{recording.title}</p>
                        <p className="text-sm text-muted-foreground">{recording.date} • {recording.duration}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Assistir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iem">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do IEM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentorship.iemHistory.map((week) => (
                    <div key={week.week} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{week.week}</span>
                        <span className="font-medium text-purple-500">{week.value}%</span>
                      </div>
                      <Progress value={week.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Como melhorar seu IEM</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-green-500" />
                  Entregue tarefas no prazo
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Participe de todas as sessões
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-purple-500" />
                  Interaja na comunidade
                </p>
                <p className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-orange-500" />
                  Assista às gravações
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
