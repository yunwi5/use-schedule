const PlannerCard: React.FC<{ className?: string; style?: object }> = ({
    className,
    children,
    style,
}) => {
    return (
        <main
            className={`px-3 pt-5 pb-10 flex flex-col transition-all ${className || ''}`}
            style={style}
        >
            {children}
        </main>
    );
};

export default PlannerCard;
