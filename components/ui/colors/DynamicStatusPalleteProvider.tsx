const DynamicPalleteProvider = () => {
    return (
        <>
            <div
                className={`absolute bg-emerald-100  hover:bg-emerald-200 border-emerald-500 `}
            />
            <div className={`absolute bg-sky-100 hover:bg-sky-200 border-sky-500`} />
            <div className={`absolute bg-rose-100 hover:bg-rose-200 border-rose-500`} />
            <div className={`absolute bg-indigo-100 hover:bg-indigo-200 border-indigo-500`} />
            <div className={`absolute bg-gray-100 hover:bg-gray-200 border-gray-500`} />
        </>
    );
};

export default DynamicPalleteProvider;
