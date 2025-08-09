import { Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import iconData from "../data/iconData.json";

export default function Icon({ id, size = 24, color }) {
  const icon = iconData.find((i) => i.id === id);
  if (!icon) return null;

  // Falls ein Emoji vorhanden ist, einfach rendern
  if (icon.emoji) {
    return (
      <Text style={{ fontSize: size, lineHeight: size }}>{icon.emoji}</Text>
    );
  }

  return (
    <Svg viewBox={icon.viewBox} width={size} height={size}>
      {icon.paths.map((p, idx) => (
        <Path
          key={idx}
          d={p.d}
          fill={color || p.fill}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
        />
      ))}
    </Svg>
  );
}
