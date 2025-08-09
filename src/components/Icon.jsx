import Svg, { Path } from "react-native-svg";
import iconData from "../data/iconData.json";

export default function Icon({ id, size = 24, color }) {
  const icon = iconData.find((i) => i.id === id);
  if (!icon) return null;

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
