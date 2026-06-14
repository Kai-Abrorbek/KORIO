const AVATAR_PALETTE = [
  "#4FCB60",
  "#3AB8E0",
  "#776ee2",
  "#FF7AAD",
  "#F4B860",
  "#FF5C5C",
  "#1D9E75",
  "#A78BFA",
  "#5C9CE5",
  "#E89F4E",
];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}
