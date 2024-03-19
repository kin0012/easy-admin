type menuItem = {
  id: number;
  name: string;
  link: string| null;
  icon: string|null;
  children:menuItem[]
};
