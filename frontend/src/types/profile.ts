export type Profile = {
    id : number;
    displayName: string;
    bio?: string | null;
    goal?: string | null;
    imageUrl?: string | null;
    user?: {
    name: string;
  };
};
