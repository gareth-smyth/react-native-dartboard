export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function describeArc(
  outerRadius: number,
  radius: number,
  startAngle: number
): string {
  const endAngle = startAngle + 18;

  const start = polarToCartesian(outerRadius, outerRadius, radius, endAngle);
  const end = polarToCartesian(outerRadius, outerRadius, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    largeArcFlag,
    0,
    0,
    end.x,
    end.y,
  ].join(' ');
}
