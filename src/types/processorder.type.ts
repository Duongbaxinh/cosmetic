export interface ProcessFlowProps {
  id: number;
  label: string;
  icon: any;
  line: boolean;
  status:
    | "pending"
    | "confirmed"
    | "prepared"
    | "shipping"
    | "delivered"
    | "cancelled"
    | "completed"
    | "returned";
}
