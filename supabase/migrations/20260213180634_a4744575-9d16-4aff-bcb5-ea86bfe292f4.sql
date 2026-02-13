
-- Sales Users (SDR, Closer, Leader)
CREATE TABLE public.sales_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('SDR', 'CLOSER', 'LEADER')),
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  monthly_goal_value NUMERIC DEFAULT 0,
  commission_type TEXT DEFAULT 'percent' CHECK (commission_type IN ('percent', 'fixed', 'hybrid')),
  commission_percent NUMERIC DEFAULT 0,
  commission_fixed_value NUMERIC DEFAULT 0,
  cost_fixed_monthly NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sales_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sales users" ON public.sales_users FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sales users" ON public.sales_users FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sales users" ON public.sales_users FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sales users" ON public.sales_users FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_sales_users_updated_at BEFORE UPDATE ON public.sales_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lead Assignments
CREATE TABLE public.lead_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lead_id TEXT NOT NULL,
  assigned_to_sales_user_id UUID NOT NULL REFERENCES public.sales_users(id) ON DELETE CASCADE,
  assigned_by_user_id UUID NOT NULL,
  assignment_type TEXT NOT NULL CHECK (assignment_type IN ('SDR', 'CLOSER')),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lead assignments" ON public.lead_assignments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own lead assignments" ON public.lead_assignments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own lead assignments" ON public.lead_assignments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own lead assignments" ON public.lead_assignments FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_lead_assignments_updated_at BEFORE UPDATE ON public.lead_assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Sales Activities
CREATE TABLE public.sales_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lead_id TEXT NOT NULL,
  sales_user_id UUID NOT NULL REFERENCES public.sales_users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('CALL', 'WHATSAPP', 'FOLLOW_UP', 'MEETING_SCHEDULED', 'MEETING_DONE', 'PROPOSAL_SENT', 'DEAL_WON', 'DEAL_LOST', 'NO_SHOW')),
  scheduled_at TIMESTAMPTZ,
  occurred_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'done', 'canceled')),
  outcome TEXT,
  loss_reason TEXT,
  next_step TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sales_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sales activities" ON public.sales_activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sales activities" ON public.sales_activities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sales activities" ON public.sales_activities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sales activities" ON public.sales_activities FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_sales_activities_updated_at BEFORE UPDATE ON public.sales_activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Deals
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lead_id TEXT NOT NULL,
  product_id TEXT,
  event_id TEXT,
  amount_value NUMERIC NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'open' CHECK (stage IN ('open', 'won', 'lost')),
  won_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  closer_id UUID REFERENCES public.sales_users(id),
  sdr_id UUID REFERENCES public.sales_users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own deals" ON public.deals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own deals" ON public.deals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own deals" ON public.deals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own deals" ON public.deals FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Commission Records
CREATE TABLE public.commission_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  sales_user_id UUID NOT NULL REFERENCES public.sales_users(id) ON DELETE CASCADE,
  commission_value NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'estimated' CHECK (status IN ('estimated', 'approved', 'paid')),
  period_month TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.commission_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own commission records" ON public.commission_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own commission records" ON public.commission_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own commission records" ON public.commission_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own commission records" ON public.commission_records FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_commission_records_updated_at BEFORE UPDATE ON public.commission_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
