export const marhabanImages = {
  arrival: "/images/arrival.webp",
  montreal: "/images/montreal.webp",
  family: "/images/family.webp",
  passport: "/images/passport.webp",
  housing: "/images/housing.webp",
  handshake: "/images/handshake.webp",
  meeting: "/images/meeting.webp",
  map: "/images/map.webp",
  canadaFlag: "/images/canada-flag.webp",
  student: "/images/student.webp"
} as const;

export type MarhabanImageKey = keyof typeof marhabanImages;
