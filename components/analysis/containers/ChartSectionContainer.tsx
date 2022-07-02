interface Props {
    title?: string;
    showComparison?: boolean;
}

const AnalysisSectionWrapper: React.FC<Props> = ({ showComparison, children }) => {
    return (
        <div
            className={`max-w-[100vw] mb-16 flex flex-wrap lg:flex-nowrap ${
                showComparison ? 'lg:!flex-wrap' : 'xl:pr-[8rem]'
            }  gap-6`}
        >
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between flex-wrap w-full">
                {children}
            </div>
        </div>
    );
};

export default AnalysisSectionWrapper;
