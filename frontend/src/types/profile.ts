export type Profile = {
    id : number;
    displayName: string;
    bio?: string | null;
    goal?: string | null;
    user?: {
    name: string;
  };
};
