export type FollowUp = {
  id: string;
  application_id: string;
  admin_id: string | null;
  note: string;
  follow_up_date: string;
  status: "pending" | "in_progress" | "done";
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type DashboardStats = {
  totalCustomers: number;
  applicationsToday: number;
  bpkbApplications: number;
  newMotorApplications: number;
  activeChats: number;
  needAdmin: number;
  followUps: number;
};
