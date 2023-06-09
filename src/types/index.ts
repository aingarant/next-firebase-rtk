export type User = {
  id: string;
  eTransferEmail?: string;
  eTransferName?: string;
  email: string;
  name?: string;
  phone?: string;
  rfdUsername?: string;
  service?: string;
  serviceAdmin?: string;
};

export type Group = {
  id: string;
  name: string;
  users?: User[];
  admins?: User[];
  service?: string;
  members: string[];
}

export type Member = {
  id: string;
  grouId: string;
  userId: string;
  profile: string;
}

export type Members = Array<Member>;
