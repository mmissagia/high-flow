import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Clock, CheckCircle, Award } from "lucide-react";

const courses = [
  {
    id: 1,
    name: "Fundamentos de Vendas High-Ticket",
    platform: "Nutror",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    lastAccess: "Hoje, 14:30",
    duration: "24h",
    certificate: false,
  },
  {
    id: 2,
    name: "Copywriting para Conversão",
    platform: "Alpaclass",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    lastAccess: "Ontem, 10:00",
    duration: "16h",
    certificate: true,
  },
  {
    id: 3,
    name: "Estratégias de Lançamento",
    platform: "Nutror",
    progress: 30,
    totalModules: 10,
    completedModules: 3,
    lastAccess: "3 dias atrás",
    duration: "20h",
    certificate: false,
  },
  {
    id: 4,
    name: "Mindset do Empreendedor",
    platform: "Alpaclass",
    progress: 0,
    totalModules: 6,
    completedModules: 0,
    lastAccess: "Nunca acessado",
    duration: "12h",
    certificate: false,
  },
];

export default function MeusCursos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Cursos</h1>
          <p className="text-muted-foreground">Acesse seus cursos Nutror/Alpaclass</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Cursos</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
              <p className="text-2xl font-bold">{courses.filter((c) => c.progress === 100).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Certificados</p>
              <p className="text-2xl font-bold">{courses.filter((c) => c.certificate).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="h-2 bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{course.name}</h3>
                    {course.certificate && (
                      <Badge className="bg-yellow-500 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Certificado
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline">{course.platform}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{course.progress}%</p>
                  <p className="text-xs text-muted-foreground">Progresso</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <BookOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {course.completedModules}/{course.totalModules}
                  </p>
                  <p className="text-xs text-muted-foreground">Módulos</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">{course.duration}</p>
                  <p className="text-xs text-muted-foreground">Duração</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Play className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium truncate">{course.lastAccess}</p>
                  <p className="text-xs text-muted-foreground">Último acesso</p>
                </div>
              </div>

              <Button className="w-full">
                {course.progress === 0 ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Curso
                  </>
                ) : course.progress === 100 ? (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    Ver Certificado
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
