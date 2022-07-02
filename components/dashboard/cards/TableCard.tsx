interface Props {
    className?: string;
}

const TableCard: React.FC<Props> = ({ className, children }) => {
    return (
        <section
            className={`w-full shadow-md rounded-md border-2 border-slate-200 ${
                className || ''
            }`}
        >
            {children}
        </section>
    );
};

export default TableCard;
