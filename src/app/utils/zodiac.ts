export const ZODIACS = [
  { id: 0, name: '猴', emoji: '🐵', slug: 'monkey', position: { x: '25%', y: '100%' } }, // 1,1
  { id: 1, name: '雞', emoji: '🐔', slug: 'rooster', position: { x: '100%', y: '0%' } }, // Map to Goat (4,0) as fallback or maybe (3,1) Dog? Let's use Goat for now.
  { id: 2, name: '狗', emoji: '🐶', slug: 'dog', position: { x: '75%', y: '100%' } }, // 3,1
  { id: 3, name: '豬', emoji: '🐷', slug: 'pig', position: { x: '100%', y: '100%' } }, // 4,1
  { id: 4, name: '鼠', emoji: '🐭', slug: 'rat', position: { x: '0%', y: '0%' } }, // 0,0
  { id: 5, name: '牛', emoji: '🐮', slug: 'ox', position: { x: '25%', y: '0%' } }, // 1,0
  { id: 6, name: '虎', emoji: '🐯', slug: 'tiger', position: { x: '50%', y: '0%' } }, // 2,0
  { id: 7, name: '兔', emoji: '🐰', slug: 'rabbit', position: { x: '75%', y: '0%' } }, // 3,0
  { id: 8, name: '龍', emoji: '🐲', slug: 'dragon', position: { x: '0%', y: '100%' } }, // 0,1
  { id: 9, name: '蛇', emoji: '🐍', slug: 'snake', position: { x: '25%', y: '100%' } }, // 1,1
  { id: 10, name: '馬', emoji: '🐴', slug: 'horse', position: { x: '50%', y: '100%' } }, // 2,1
  { id: 11, name: '羊', emoji: '🐏', slug: 'goat', position: { x: '100%', y: '0%' } }, // 4,0
];

export function getZodiac(dateString: string) {
  if (!dateString) return null;
  const year = new Date(dateString).getFullYear();
  if (isNaN(year)) return null;
  const index = year % 12;
  return ZODIACS[index];
}
