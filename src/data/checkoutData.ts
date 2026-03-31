export type InvoiceStatus = "paga" | "pendente" | "enviada" | "vencida" | "cancelada";
export type PaymentMethod = "pix" | "cartao" | "tmb";

export interface Invoice {
  id: string;
  status: InvoiceStatus;
  clientName: string;
  clientEmail: string;
  value: number;
  description: string;
  paymentMethods: PaymentMethod[];
  closerName: string;
  closerInitials: string;
  dueDate: string;
}

export const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paga: { label: "Paga", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
  pendente: { label: "Pendente", className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  enviada: { label: "Enviada", className: "bg-orange-500/15 text-orange-600 border-orange-500/30" },
  vencida: { label: "Vencida", className: "bg-red-500/15 text-red-600 border-red-500/30" },
  cancelada: { label: "Cancelada", className: "bg-muted text-muted-foreground border-border" },
};

export const paymentIcons: Record<PaymentMethod, { icon: string; label: string }> = {
  pix: { icon: "🟢", label: "Pix" },
  cartao: { icon: "💳", label: "Cartão Z2Pay" },
  tmb: { icon: "📄", label: "TMB" },
};

export const mockInvoicesData: Invoice[] = [
  { id: "INV-001", status: "paga", clientName: "João Silva", clientEmail: "joao@email.com", value: 12000, description: "Mentoria Elite", paymentMethods: ["pix"], closerName: "Ana Ribeiro", closerInitials: "AR", dueDate: "2026-03-15" },
  { id: "INV-002", status: "paga", clientName: "Maria Santos", clientEmail: "maria@email.com", value: 25000, description: "Mastermind Premium", paymentMethods: ["pix", "cartao"], closerName: "Rafael Costa", closerInitials: "RC", dueDate: "2026-03-10" },
  { id: "INV-003", status: "paga", clientName: "Pedro Costa", clientEmail: "pedro@email.com", value: 8500, description: "Consultoria 1:1", paymentMethods: ["cartao"], closerName: "Lucas Martins", closerInitials: "LM", dueDate: "2026-03-12" },
  { id: "INV-004", status: "pendente", clientName: "Ana Oliveira", clientEmail: "ana@email.com", value: 50000, description: "Imersão Presencial", paymentMethods: ["pix", "cartao", "tmb"], closerName: "Ana Ribeiro", closerInitials: "AR", dueDate: "2026-04-01" },
  { id: "INV-005", status: "pendente", clientName: "Carlos Mendes", clientEmail: "carlos@email.com", value: 15000, description: "Mentoria Elite", paymentMethods: ["pix"], closerName: "Rafael Costa", closerInitials: "RC", dueDate: "2026-04-05" },
  { id: "INV-006", status: "pendente", clientName: "Fernanda Lima", clientEmail: "fernanda@email.com", value: 32000, description: "Mastermind Premium", paymentMethods: ["pix", "cartao"], closerName: "Lucas Martins", closerInitials: "LM", dueDate: "2026-04-10" },
  { id: "INV-007", status: "pendente", clientName: "Ricardo Alves", clientEmail: "ricardo@email.com", value: 7500, description: "Consultoria 1:1", paymentMethods: ["cartao"], closerName: "Ana Ribeiro", closerInitials: "AR", dueDate: "2026-04-08" },
  { id: "INV-008", status: "enviada", clientName: "Juliana Rocha", clientEmail: "juliana@email.com", value: 18000, description: "Mentoria Elite", paymentMethods: ["pix", "tmb"], closerName: "Rafael Costa", closerInitials: "RC", dueDate: "2026-04-15" },
  { id: "INV-009", status: "enviada", clientName: "Bruno Ferreira", clientEmail: "bruno@email.com", value: 42000, description: "Imersão Presencial", paymentMethods: ["pix", "cartao", "tmb"], closerName: "Lucas Martins", closerInitials: "LM", dueDate: "2026-04-12" },
  { id: "INV-010", status: "vencida", clientName: "Camila Souza", clientEmail: "camila@email.com", value: 3000, description: "Consultoria 1:1", paymentMethods: ["pix"], closerName: "Ana Ribeiro", closerInitials: "AR", dueDate: "2026-03-01" },
  { id: "INV-011", status: "vencida", clientName: "Diego Nunes", clientEmail: "diego@email.com", value: 20000, description: "Mastermind Premium", paymentMethods: ["cartao", "tmb"], closerName: "Rafael Costa", closerInitials: "RC", dueDate: "2026-02-28" },
  { id: "INV-012", status: "cancelada", clientName: "Patrícia Gomes", clientEmail: "patricia@email.com", value: 10000, description: "Mentoria Elite", paymentMethods: ["pix", "cartao"], closerName: "Lucas Martins", closerInitials: "LM", dueDate: "2026-03-20" },
];

export const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export const formatDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

/** Get financial status for a lead by name */
export function getLeadFinancialStatus(leadName: string, invoices: Invoice[]): "paga" | "pendente" | "vencida" | null {
  const leadInvoices = invoices.filter((i) => i.clientName === leadName && i.status !== "cancelada");
  if (leadInvoices.length === 0) return null;
  if (leadInvoices.some((i) => i.status === "vencida")) return "vencida";
  if (leadInvoices.some((i) => i.status === "paga")) return "paga";
  if (leadInvoices.some((i) => i.status === "pendente" || i.status === "enviada")) return "pendente";
  return null;
}
