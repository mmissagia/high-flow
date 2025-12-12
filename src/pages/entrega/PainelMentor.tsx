import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Upload,
  FileText,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const mentorData = {
  classes: [
    { id: 1, name: "Turma Elite 2024", students: 25, avgIem: 78, nextSession: "28/01/2024" },
    { id: 2, name: "Mastermind VIP", students: 12, avgIem: 85, nextSession: "30/01/2024" },
  ],
  selectedClass: {
    id: 1,
    name: "Turma Elite 2024",
    students: [
      { id: 1, name: "João Silva", iem: 78, attendance: 100, tasksDelivered: 3, totalTasks: 4 },
      { id: 2, name: "Maria Santos", iem: 92, attendance: 100, tasksDelivered: 4, totalTasks: 4 },
      { id: 3, name: "Pedro Costa", iem: 65, attendance: 80, tasksDelivered: 2, totalTasks: 4 },
      { id: 4, name: "Ana Oliveira", iem: 88, attendance: 100, tasksDelivered: 4, totalTasks: 4 },
      { id: 5, name: "Carlos Mendes", iem: 45, attendance: 60, tasksDelivered: 1, totalTasks: 4 },
    ],
    sessions: [
      { id: 1, date: "14/01/2024", topic: "Introdução", attendance: 24 },
      { id: 2, date: "21/01/2024", topic: "Posicionamento", attendance: 22 },
      { id: 3, date: "28/01/2024", topic: "Fechamento", attendance: null },
    ],
    pendingTasks: [
      { id: 1, student: "João Silva", task: "Script de vendas", submittedAt: "26/01/2024" },
      { id: 2, student: "Ana Oliveira", task: "Script de vendas", submittedAt: "26/01/2024" },
    ],
  },
};

export default function PainelMentor() {
  const [selectedClassId, setSelectedClassId] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Mentor</h1>
          <p className="text-muted-foreground">Gerencie suas turmas e mentorados</p>
        </div>
      </div>

      {/* Seleção de Turma */}
      <div className="flex gap-4">
        {mentorData.classes.map((cls) => (
          <Card
            key={cls.id}
            className={`flex-1 cursor-pointer transition-colors ${
              selectedClassId === cls.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedClassId(cls.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">{cls.students} mentorados</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-500">{cls.avgIem}%</p>
                  <p className="text-xs text-muted-foreground">IEM Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Mentorados</TabsTrigger>
          <TabsTrigger value="attendance">Presença</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas Pendentes</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mentorados da Turma</CardTitle>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagem em Massa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorData.selectedClass.students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Presença: {student.attendance}%</span>
                          <span>•</span>
                          <span>Tarefas: {student.tasksDelivered}/{student.totalTasks}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          student.iem >= 70 ? "text-green-500" :
                          student.iem >= 50 ? "text-yellow-500" : "text-red-500"
                        }`}>
                          {student.iem}%
                        </p>
                        <p className="text-xs text-muted-foreground">IEM</p>
                      </div>
                      <Link to={`/crm/lead/${student.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Presença</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorData.selectedClass.sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${session.attendance !== null ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                        <Calendar className={`h-5 w-5 ${session.attendance !== null ? "text-green-500" : "text-yellow-500"}`} />
                      </div>
                      <div>
                        <p className="font-medium">{session.topic}</p>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {session.attendance !== null ? (
                        <>
                          <div className="text-right">
                            <p className="font-bold">{session.attendance}/25</p>
                            <p className="text-xs text-muted-foreground">Presentes</p>
                          </div>
                          <Badge className="bg-green-500">Registrado</Badge>
                        </>
                      ) : (
                        <Button size="sm">Registrar Presença</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas para Avaliar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorData.selectedClass.pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{task.student}</p>
                        <p className="text-sm text-muted-foreground">{task.task}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-muted-foreground">Enviado: {task.submittedAt}</p>
                      <Button size="sm">Avaliar</Button>
                    </div>
                  </div>
                ))}

                {mentorData.selectedClass.pendingTasks.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma tarefa pendente de avaliação
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Materiais da Turma</CardTitle>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Material
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Planilha de Metas</p>
                      <p className="text-sm text-muted-foreground">Excel • 245 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">E-book Vendas High-Ticket</p>
                      <p className="text-sm text-muted-foreground">PDF • 3.2 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
