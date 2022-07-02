const PlannerTableCard: React.FC = (props) => {
    return (
        <section className="rounded-md border-2 border-slate-200 bg-white/70 mt-8">
            {props.children}
        </section>
    );
};

export default PlannerTableCard;
