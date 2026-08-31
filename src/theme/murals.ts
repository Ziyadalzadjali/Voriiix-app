import { gradientFill } from '@/theme/style';

export const MARKET_MURAL = 'https://akacademy.online/voriix-market-bg.png?v=1';
export const FUN_DEN_MURAL = 'https://akacademy.online/voriix-fun-den-bg.png?v=1';

export const marketOverlay = gradientFill(
  'radial-gradient(640px 280px at 100% 0%, rgba(244,193,90,0.14), transparent 55%), radial-gradient(720px 320px at 0% 100%, rgba(139,92,246,0.20), transparent 58%), linear-gradient(180deg, rgba(5,5,7,0.72) 0%, rgba(5,5,7,0.48) 42%, rgba(5,5,7,0.88) 100%)',
);

export const funDenOverlay = gradientFill(
  'linear-gradient(180deg, rgba(5,5,7,0.78) 0%, rgba(5,5,7,0.58) 45%, rgba(5,5,7,0.88) 100%)',
);
