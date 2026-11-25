import noEscapeCursor from "../assets/img/reels/noescapecursor.webp?reel";
import nextTurn from "../assets/img/reels/nextturn.webp?reel";
import firstAvatars from "../assets/img/reels/pierwsze-awatary.webp?reel";

export type Reel = {
  /** Klucz w tłumaczeniach: portfolio:reels.items.<id>.* */
  id: string;
  /** Adres rolki na Instagramie — kafel otwiera go w nowej karcie. */
  url: string;
  /** Pionowa miniatura 9:16 (preset `?reel`). */
  cover: ResponsivePicture;
};

/** Rolki z Instagrama pokazywane na /portfolio (od najnowszej). */
export const reels: Reel[] = [
  {
    id: "first_avatars",
    url: "https://www.instagram.com/p/Dbs_GPkjj0K/",
    cover: firstAvatars,
  },
  {
    id: "nextturn",
    url: "https://www.instagram.com/p/DZsSAy8B-x7/",
    cover: nextTurn,
  },
  {
    id: "noescapecursor",
    url: "https://www.instagram.com/p/DT3omOkAZx-/",
    cover: noEscapeCursor,
  },
];

export const reelTitleKey = (reel: Reel) => `portfolio:reels.items.${reel.id}.title`;
export const reelSummaryKey = (reel: Reel) => `portfolio:reels.items.${reel.id}.summary`;
