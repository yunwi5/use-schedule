import Features from './feature-parts/Features';
import HomeFeedback from './HomeFeedback';
import HomeIntro from './HomeIntro';
import HomeStrengthGrid from './strength/HomeStrengthGrid';

const HomeMain: React.FC = () => {
    return (
        <main className={'bg-slate-50 h-[100%] w-[100%]'}>
            <HomeIntro />
            <HomeStrengthGrid />
            <Features />
            <HomeFeedback />
        </main>
    );
};

export default HomeMain;
