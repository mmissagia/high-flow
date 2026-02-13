import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  GraduationCap,
  TrendingUp,
  Eye,
  Kanban,
  List,
  UserCircle,
  CalendarDays,
  FileEdit,
  Megaphone,
  Zap,
  PenTool,
  MessageCircle,
  BookOpen,
  Heart,
  UserCog,
  Crown,
  ChevronRight,
  Sparkles,
  LogOut,
  Plug
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuGroups = [
  {
    label: "📊 Performance",
    groups: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        items: [
          { title: "Visão Geral", url: "/", icon: Eye },
        ],
      },
    ],
  },
  {
    label: "👥 Relacionamento",
    groups: [
      {
        title: "CRM",
        icon: Users,
        items: [
          { title: "Pipeline", url: "/crm/pipeline", icon: Kanban },
          { title: "Lista de Leads", url: "/crm/leads", icon: List },
          { title: "Ficha do Lead", url: "/crm/lead", icon: UserCircle },
        ],
      },
      {
        title: "Comunicação",
        icon: MessageSquare,
        items: [
          { title: "Campanhas", url: "/comunicacao/campanhas", icon: Megaphone },
          { title: "Automações", url: "/comunicacao/automacoes", icon: Zap },
          { title: "Editor de Mensagens", url: "/comunicacao/editor", icon: PenTool },
          { title: "Conversas (WhatsApp)", url: "/comunicacao/conversas", icon: MessageCircle },
        ],
      },
    ],
  },
  {
    label: "💰 Monetização",
    groups: [
      {
        title: "Monetização",
        icon: TrendingUp,
        items: [
          { title: "Produtos", url: "/eventos/pitch", icon: FileEdit },
          { title: "Construtor de Estratégias", url: "/eventos/estrategias", icon: Sparkles },
        ],
      },
    ],
  },
  {
    label: "🏛 Experiência",
    groups: [
      {
        title: "Experiência",
        icon: GraduationCap,
        items: [
          { title: "Meus Cursos", url: "/entrega/cursos", icon: BookOpen },
          { title: "Minhas Mentorias", url: "/entrega/mentorias", icon: Heart },
          { title: "Mentorias High Ticket", url: "/entrega/mentorias-ht", icon: Crown },
          { title: "Eventos", url: "/eventos", icon: CalendarDays },
          { title: "Painel do Mentor", url: "/entrega/mentor", icon: UserCog },
          { title: "Painel do Produtor", url: "/entrega/produtor", icon: Crown },
        ],
      },
    ],
  },
  {
    label: "⚙️ Infraestrutura",
    groups: [
      {
        title: "Infraestrutura",
        icon: Plug,
        items: [
          { title: "Integrações", url: "/conexoes", icon: Plug },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut, user } = useAuth();

  const isActiveGroup = (items: { url: string }[]) => {
    return items.some((item) => currentPath === item.url || currentPath.startsWith(item.url + "/"));
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            {state === "expanded" && (
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">HighFlow</h1>
                <p className="text-xs text-sidebar-foreground/60">High-Ticket Platform</p>
              </div>
            )}
          </div>
        </div>

        {menuGroups.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.groups.map((group) => (
                  <Collapsible
                    key={group.title}
                    defaultOpen={isActiveGroup(group.items)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent">
                          <div className="flex items-center gap-2">
                            <group.icon className="h-4 w-4" />
                            {state === "expanded" && <span>{group.title}</span>}
                          </div>
                          {state === "expanded" && (
                            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={item.url}
                                  end
                                  className="hover:bg-sidebar-accent"
                                  activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                                >
                                  <item.icon className="h-3.5 w-3.5" />
                                  {state === "expanded" && <span>{item.title}</span>}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* User & Logout */}
        <div className="mt-auto border-t border-sidebar-border p-4">
          {state === "expanded" && user && (
            <p className="text-xs text-sidebar-foreground/60 mb-2 truncate">
              {user.email}
            </p>
          )}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {state === "expanded" && <span>Sair</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
