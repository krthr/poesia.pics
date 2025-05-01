export const MOODS = [
  "default",
  "romantic",
  "erotic",
  "melancholic",
  "fun",
] as const;

interface MoodItem {
  label: string;
  key: string;
  color: string;
  icon: string;
}

export const MOODS_DICT: Record<Mood, MoodItem> = {
  default: {
    label: "La IA elige 🤖",
    key: "default",
    color: "gray-700",
    icon: "ph:robot",
  },
  romantic: {
    label: "Romántico ❤️‍🔥",
    key: "romantic",
    color: "red-500",
    icon: "ph:heart",
  },
  erotic: {
    label: "Erótico 🥵",
    key: "erotic",
    color: "orange-500",
    icon: "ph:fire",
  },
  melancholic: {
    label: "Melancólico 😥",
    key: "melancholic",
    color: "sky-900",
    icon: "ph:mask-sad",
  },
  fun: {
    label: "Divertido 😂",
    key: "fun",
    color: "emerald-500",
    icon: "ph:mask-happy",
  },
} as const;

export const MOODS_LIST = Object.values(MOODS_DICT);

export type Mood = (typeof MOODS)[number];
