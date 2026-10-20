import { MobileIcon, type IoniconName, type MaterialCommunityIconName } from "../../../../shared/ui/mobile-icon";

/**
 * 앱 아이콘 크기와 같게 — MobileIcon 은 32 칸에 30 글자로 그려서 같은 size 면 조금 작다.
 * 앱의 <Ionicons size={n}> 자리에 이걸 쓴다.
 */
type AppIconProps = { size: number; className?: string } & (
  | { family?: "ionicons"; name: IoniconName }
  | { family: "material-community"; name: MaterialCommunityIconName }
);

export function AppIcon({ size, className, ...icon }: AppIconProps) {
  return <MobileIcon className={className} {...icon} size={Math.round((size * 32) / 30)} />;
}
