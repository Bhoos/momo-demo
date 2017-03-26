export default function (width, height, angle, size) {
  const a = (width - size) / 2;
  const b = (height - size) / 2;

  const x = a + (a * Math.cos(angle));
  const y = b + (b * Math.sin(angle));

  return { x, y };
}
