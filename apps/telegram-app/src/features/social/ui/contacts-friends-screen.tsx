"use client";

import { useRouter } from "next/navigation";

import { FriendSearchScreen } from "./friend-search-screen";
import { shareText } from "./social-parts";
import styles from "./social.module.css";

export function ContactsFriendsScreen() {
  const router = useRouter();
  return <div className={styles.contactsShell}><FriendSearchScreen contactsMode /><footer className={styles.contactsFooter}><button onClick={() => router.push("/invite")} type="button">Taklif kodini ko‘rish</button><button onClick={() => void shareText("KORIO", "KORIO’da birga koreys tilini o‘rganamiz 🇰🇷\nhttps://korio.online")} type="button">Do‘stga yuborish</button></footer></div>;
}
