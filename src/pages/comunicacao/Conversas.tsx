import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, QrCode, Link as LinkIcon, Search, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const conversations = [
  {
    id: 1,
    name: "João Silva",
    lastMessage: "Qual o valor da mentoria?",
    time: "2min",
    unread: 2,
    stage: "Warm",
  },
  {
    id: 2,
    name: "Maria Santos",
    lastMessage: "Recebi o link, vou olhar!",
    time: "15min",
    unread: 0,
    stage: "Follow-up",
  },
  {
    id: 3,
    name: "Pedro Costa",
    lastMessage: "Posso parcelar em quantas vezes?",
    time: "1h",
    unread: 1,
    stage: "Call Agendada",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    lastMessage: "Obrigada pelas informações!",
    time: "2h",
    unread: 0,
    stage: "Engajado",
  },
];

const currentChat = {
  id: 1,
  name: "João Silva",
  phone: "+55 11 99999-9999",
  stage: "Warm",
  messages: [
    { id: 1, sender: "lead", text: "Oi, participei do evento ontem", time: "14:30" },
    { id: 2, sender: "closer", text: "Olá João! Que bom ter você no evento! O que achou?", time: "14:32" },
    { id: 3, sender: "lead", text: "Muito bom! Fiquei interessado na mentoria", time: "14:35" },
    { id: 4, sender: "closer", text: "Excelente escolha! A Mentoria Elite é perfeita para quem quer acelerar resultados. Posso te enviar os detalhes?", time: "14:36" },
    { id: 5, sender: "lead", text: "Qual o valor da mentoria?", time: "14:40" },
  ],
  sunLinks: [
    { type: "Cartão", url: "https://sun.co/mentoria-elite-card" },
    { type: "PIX", url: "https://sun.co/mentoria-elite-pix" },
  ],
};

export default function Conversas() {
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(currentChat);

  const sendMessage = () => {
    if (!message.trim()) return;
    // Aqui seria a lógica de envio
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conversas WhatsApp</h1>
          <p className="text-muted-foreground">Central de atendimento e vendas</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-[calc(100vh-220px)]">
        {/* Lista de Conversas */}
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar conversa..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-340px)]">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation({ ...currentChat, id: conv.id, name: conv.name })}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {conv.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Ativo */}
        <Card className="col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedConversation.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedConversation.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedConversation.stage}</Badge>
                <Link to={`/crm/lead/${selectedConversation.id}`}>
                  <Button variant="ghost" size="sm">Ver Ficha</Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "closer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender === "closer"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "closer" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Ações Rápidas */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Enviar Link SUN</p>
              {selectedConversation.sunLinks.map((link, idx) => (
                <Button key={idx} variant="outline" className="w-full justify-start gap-2" size="sm">
                  <LinkIcon className="h-4 w-4" />
                  {link.type}
                </Button>
              ))}
            </div>

            <Button variant="outline" className="w-full justify-start gap-2">
              <QrCode className="h-4 w-4" />
              Gerar QR Code
            </Button>

            <div className="border-t pt-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Phone className="h-4 w-4" />
                Agendar Call
              </Button>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Sugestão IA</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  "O lead perguntou sobre valor. Responda com benefícios antes do preço e ofereça parcelamento."
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
