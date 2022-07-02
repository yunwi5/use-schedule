import React from 'react';

const TypeWriting: React.FC = () => {
    const boxClass = 'bg-white rounded-sm shadow-md';

    return (
        <section
            className={
                'self-stretch px-4 xl:px-10 py-5 flex flex-col gap-6 bg-slate-50 border-2 border-slate-300 shadow-md rounded-md'
            }
        >
            <h2 className={'text-3xl'}>Ask Us!</h2>
            <div className={'px-3 py-3 bg-white rounded-sm shadow-md'}>
                Hey there! Do you want to maximize your productivity with us?
            </div>
            <div className={'flex gap-5'}>
                <button
                    className={`px-6 py-2 ${boxClass} hover:bg-slate-700 hover:text-sky-300 hover:shadow-xl`}
                >
                    Of Course!
                </button>
                <button
                    className={`px-6 py-2 ${boxClass} hover:bg-slate-700 hover:text-sky-300 hover:shadow-xl`}
                >
                    Nah!
                </button>
            </div>
        </section>
    );
};

export default TypeWriting;
