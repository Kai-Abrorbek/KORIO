import type { IoniconName } from "../../../shared/ui/mobile-icon";

export interface SettingsItem {
  description: string;
  icon: IoniconName;
  iconBackground: string;
  iconColor: string;
  id: string;
  route?: string;
  title: string;
}

export const SETTINGS_SECTIONS: readonly (readonly SettingsItem[])[] = [
  [
    { id: "display", title: "Ko‘rinish", description: "Tungi rejim, mavzu sozlamalari", icon: "sunny", iconColor: "#45B7D1", iconBackground: "#DBF0FF", route: "/display" },
    { id: "notifications", title: "Bildirishnomalar", description: "O‘qish vaqti va hisobot bildirishnomalari", icon: "notifications", iconColor: "#F4B860", iconBackground: "#FFF4D6", route: "/notifications" },
    { id: "sound", title: "Ovoz va effektlar", description: "Ovoz va effekt sozlamalari", icon: "volume-high", iconColor: "#FF7AAD", iconBackground: "#FFE0EC", route: "/sound" },
    { id: "account", title: "Akkauntni boshqarish", description: "Unikal kod, akkaunt ulanishi, maqsad", icon: "person-circle", iconColor: "#FF9F66", iconBackground: "#FFE5D0", route: "/account" },
  ],
  [
    { id: "help", title: "Yordam markazi", description: "Yordam, sertifikat, e‘lonlar", icon: "help-circle", iconColor: "#A78BFA", iconBackground: "#EBE5FA", route: "/help" },
    { id: "tourReplay", title: "Qo‘llanmani qayta ko‘rish", description: "Bosh sahifadagi tugmalar nima qilishini yana ko‘rsatamiz", icon: "compass", iconColor: "#5F4FD8", iconBackground: "#E7E4FB" },
    { id: "language", title: "Til", description: "Asosiy til sozlamasi", icon: "globe", iconColor: "#45B7D1", iconBackground: "#D5F0F5", route: "/language" },
    { id: "update", title: "Yangilanish tarixi", description: "Ilova versiyasi: 1.2.400", icon: "information-circle", iconColor: "#A8A8B0", iconBackground: "#ECECEE", route: "/update" },
  ],
] as const;
