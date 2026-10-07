import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>LEARN KOREAN, LEVEL UP!</p>
        <Image
          className={styles.logo}
          src="/korio-logo.jpg"
          alt="KORIO 캐릭터와 로고"
          width={400}
          height={400}
          priority
        />
        <h1>한국어 공부를 더 재미있게.</h1>
        <p className={styles.description}>
          한 걸음씩 배우고 성장하는 한국어 학습, KORIO와 함께 시작하세요.
        </p>
        <a className={styles.contact} href="mailto:abror0dev@gmail.com">
          문의하기 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <footer className={styles.footer}>
        <span>© KORIO</span>
        <a href="/delete-account">계정 삭제 안내</a>
      </footer>
    </main>
  );
}
