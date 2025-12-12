import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Calendar, UserPlus, ShoppingCart, Heart, TrendingDown, MessageCircle } from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Boas-vindas Evento",
    trigger: "Inscrição em evento",
    icon: Calendar,
    enabled: true,
    executions: 1250,
    conversions: 89,
    channels: ["WhatsApp", "Email"],
  },
  {
    id: 2,
    name: "Lead Engajado",
    trigger: "Mudança no CRM para Engajado",
    icon: UserPlus,
    enabled: true,
    executions: 890,
    conversions: 45,
    channels: ["WhatsApp"],
  },
  {
    id: 3,
    name: "Carrinho Abandonado SUN",
    trigger: "Abandono do Checkout SUN",
    icon: ShoppingCart,
    enabled: true,
    executions: 320,
    conversions: 28,
    channels: ["WhatsApp", "SMS"],
  },
  {
    id: 4,
    name: "Follow-up Pitch",
    trigger: "Interesse em pitch",
    icon: Zap,
    enabled: true,
    executions: 560,
    conversions: 38,
    channels: ["WhatsApp"],
  },
  {
    id: 5,
    name: "Onboarding Mentoria",
    trigger: "Entrada em mentoria",
    icon: Heart,
    enabled: true,
    executions: 145,
    conversions: 145,
    channels: ["WhatsApp", "Email"],
  },
  {
    id: 6,
    name: "Reengajamento IEM",
    trigger: "Baixa no IEM (< 50%)",
    icon: TrendingDown,
    enabled: false,
    executions: 78,
    conversions: 12,
    channels: ["WhatsApp"],
  },
];

export default function Automacoes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automações</h1>
          <p className="text-muted-foreground">Configure gatilhos automáticos para engajar leads</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {automations.map((automation) => {
          const Icon = automation.icon;
          return (
            <Card key={automation.id} className={!automation.enabled ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{automation.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{automation.trigger}</p>
                    </div>
                  </div>
                  <Switch checked={automation.enabled} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {automation.channels.map((channel) => (
                      <Badge key={channel} variant="outline">
                        {channel}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold">{automation.executions}</p>
                      <p className="text-xs text-muted-foreground">Execuções</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-2xl font-bold text-green-500">{automation.conversions}</p>
                      <p className="text-xs text-muted-foreground">Conversões</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Editar Automação
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
