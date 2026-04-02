import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ROLES = ["Produtor", "Gestor Comercial", "SDR", "Closer", "Mentor", "Operações", "Afiliado", "Mentorado"] as const;

interface EditRolePopoverProps {
  userId: string;
  currentRole: string;
  userName: string;
  children: React.ReactNode;
}

export function EditRolePopover({ userId, currentRole, userName, children }: EditRolePopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newRole: string) => {
      const { error } = await supabase
        .from("users_access")
        .update({ role: newRole })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users_access"] });
      toast.success(`Papel de ${userName} atualizado para ${selectedRole}`);
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar papel");
    },
  });

  const handleConfirm = () => {
    if (selectedRole !== currentRole) {
      mutation.mutate(selectedRole);
    } else {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (v) setSelectedRole(currentRole); }}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Alterar papel</Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleConfirm} disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Confirmar"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
