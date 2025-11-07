
export enum SenderType {
  Customer = 'customer',
  Agent = 'agent',
}

export interface Message {
  id: number;
  senderName: string;
  senderType: SenderType;
  avatar: string;
  content: string;
  timestamp: string;
}
