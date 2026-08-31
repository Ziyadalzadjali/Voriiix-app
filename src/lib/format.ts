export function formatXp(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return 'Schedule pending';
  }
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function greetingFor(now = new Date()): string {
  const hour = now.getHours();
  if (hour < 5) return 'NIGHT SHIFT';
  if (hour < 12) return 'GOOD MORNING';
  if (hour < 17) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}
