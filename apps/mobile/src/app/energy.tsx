import { useRouter } from "expo-router";
import EnergyScreen from "@/components/energy/EnergyScreen";

export default function EnergyRoute() {
  const router = useRouter();
  return (
    <EnergyScreen
      onClose={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
    />
  );
}
