import Main from "../components/main";
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <AnimatedCursor
        innerSize={25}
        outerSize={25}
        color="255, 220, 115"
        outerAlpha={0.2}
        innerScale={1.5}
        outerScale={2}
      />
      <Main />
    </>
  );
}
