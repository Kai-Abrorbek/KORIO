"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getMyInvite } from "../api/social";
import type { MyInvite } from "../model/social";
import { FriendSearchScreen } from "./friend-search-screen";
import { shareText } from "./social-parts";
import styles from "./social.module.css";

/**
 * 연락처로 친구 찾기 — 웹엔 연락처 접근이 없어 검색 화면을 쓴다.
 * "Do‘stga yuborish" 는 앱처럼 **내 초대 코드와 링크**를 담아 보낸다 (예전엔 korio.online 만 보내서
 * 받은 사람이 가입해도 초대 보상이 안 붙었다).
 */
export function ContactsFriendsScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const [invite, setInvite] = useState<MyInvite | null>(null);

  useEffect(() => {
    getMyInvite(request).then(setInvite).catch(() => undefined);
  }, [request]);

  const share = () => {
    const message = invite
      ? `Bu ${user?.nickname ?? ""}! KORIO’da birga koreys tilini o‘rganamiz 🇰🇷\nTaklif kodim ${invite.code} — ikkalamiz ${invite.rewardGems} tadan gavhar olamiz.\n${invite.link}`
      : "KORIO’da birga koreys tilini o‘rganamiz 🇰🇷\nhttps://korio.online";
    void shareText("KORIO", message);
  };

  return (
    <div className={styles.contactsShell}>
      <FriendSearchScreen contactsMode />
      <footer className={styles.contactsFooter}>
        <button onClick={() => router.push("/invite")} type="button">Taklif kodini ko‘rish</button>
        <button onClick={share} type="button">Do‘stga yuborish</button>
      </footer>
    </div>
  );
}
