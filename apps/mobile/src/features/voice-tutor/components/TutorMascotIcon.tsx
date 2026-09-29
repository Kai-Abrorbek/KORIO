import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * 튜터 마스코트의 작은 정지 아이콘 — 카드·버튼 아이콘 자리용 (42px 타일 안).
 *
 * TutorMascot 은 둥실·깜빡·후광이 도는 큰 캐릭터라 작은 타일에 넣으면 튀어나오고
 * 목록에서 계속 움직여서 시끄럽다. 모양(진주빛 몸체·어두운 얼굴 화면·노란 눈·
 * 안테나)만 그대로 가져온 정지판이다.
 */
export function TutorMascotIcon({ size = 30 }: { size?: number }) {
  const W = size;
  const H = size * 0.86;
  const eye = size * 0.13;
  return (
    <View style={{ alignItems: "center" }}>
      {/* 안테나 */}
      <View
        style={{
          width: size * 0.13,
          height: size * 0.13,
          borderRadius: size * 0.065,
          backgroundColor: "#FFE36E",
        }}
      />
      <View style={{ width: size * 0.05, height: size * 0.08, backgroundColor: "#CFC9F4" }} />
      <LinearGradient
        colors={["#FFFFFF", "#E4E0FF", "#ABA2F2", "#8278DA"]}
        locations={[0, 0.34, 0.78, 1]}
        start={{ x: 0.15, y: 0.05 }}
        end={{ x: 0.85, y: 1 }}
        style={{
          width: W,
          height: H,
          borderRadius: size * 0.36,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.8)",
        }}
      >
        <View
          style={{
            width: W * 0.76,
            height: H * 0.52,
            marginTop: H * 0.12,
            borderRadius: size * 0.2,
            backgroundColor: "#1D1939",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: eye * 1.1,
          }}
        >
          {[0, 1].map((i) => (
            <View
              key={i}
              style={{
                width: eye,
                height: eye * 1.25,
                borderRadius: eye * 0.5,
                backgroundColor: "#FFE36E",
              }}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}
