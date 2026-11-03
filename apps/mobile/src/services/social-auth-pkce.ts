import * as Crypto from "expo-crypto";
import { Platform } from "react-native";

/**
 * 소셜 로그인(카카오·네이버·텔레그램)용 PKCE.
 *
 * 🔴 `mobile://` 같은 앱 주소는 다른 앱도 같은 이름으로 등록할 수 있다. 예전엔
 *    로그인이 끝나면 그 주소에 토큰을 그대로 실어 와서, 악성 앱이 가로채면
 *    계정이 그대로 넘어갔다. 지금은 서버가 일회용 코드만 싣고, 앱이 이 파일의
 *    비밀 값(verifier)을 같이 보내야 토큰으로 바뀐다. 가로챈 앱은 verifier 가 없다.
 *
 * verifier 는 기기 밖으로 로그인 교환 때 한 번만 나간다. 서버에는 해시(challenge)만
 * 먼저 간다. 앱이 브라우저에 가려진 사이 안드로이드가 앱을 죽였다 살려도
 * 이어지도록 SecureStore 에도 잠깐 둔다 (교환하면 바로 지운다).
 *
 * expo-crypto 는 이미 앱에 들어 있는 네이티브 모듈이라 새 빌드 없이 OTA 로 나간다.
 */
const STORE_KEY = "social_auth_pkce_verifier";

let current: string | null = null;

const store = {
  async set(value: string) {
    if (Platform.OS === "web") return;
    const SecureStore = await import("expo-secure-store");
    await SecureStore.setItemAsync(STORE_KEY, value);
  },
  async get(): Promise<string | null> {
    if (Platform.OS === "web") return null;
    const SecureStore = await import("expo-secure-store");
    return SecureStore.getItemAsync(STORE_KEY);
  },
  async clear() {
    if (Platform.OS === "web") return;
    const SecureStore = await import("expo-secure-store");
    await SecureStore.deleteItemAsync(STORE_KEY);
  },
};

function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (const byte of bytes) hex += byte.toString(16).padStart(2, "0");
  return hex;
}

/** 로그인을 시작할 때 부른다. 돌려준 challenge 를 시작 주소에 싣는다 */
export async function beginSocialAuthPkce(): Promise<string> {
  // 32바이트 = 64자 hex. RFC 7636 이 허용하는 글자·길이(43~128) 안이다
  const verifier = toHex(Crypto.getRandomBytes(32));
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    { encoding: Crypto.CryptoEncoding.BASE64 },
  );
  current = verifier;
  await store.set(verifier).catch(() => undefined);
  // 서버는 base64url(SHA-256(verifier)) 를 기대한다
  return digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** 코드를 토큰으로 바꿀 때 한 번 꺼낸다. 꺼내면 지운다 (재사용 금지) */
export async function takeSocialAuthVerifier(): Promise<string | null> {
  const verifier = current ?? (await store.get().catch(() => null));
  current = null;
  await store.clear().catch(() => undefined);
  return verifier;
}
