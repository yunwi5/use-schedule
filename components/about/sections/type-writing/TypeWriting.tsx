import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { faRotate } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TypeWriterSection } from '../../../../constants/about-sections';
import { Quote } from '../../../../models/animation-models/Quote';
import { Typewriter } from '../../../../models/animation-models/TypeWriter';
import { QuoteMap, RootQuote } from './writing-scenario';

const boxClass = 'bg-white rounded-sm shadow-md';

const TypeWriting: React.FC = () => {
    const router = useRouter();
    const [typeWriter, setTypeWriter] = useState<Typewriter | null>();
    const [activeQuote, setActiveQuote] = useState<Quote>(RootQuote);
    const [isAnimating, setIsAnimating] = useState(false);

    const placeholderRef = useRef<HTMLDivElement>(null);
    const textEffectRef = useRef<HTMLSpanElement>(null);

    const writeToTypeWriter = async (text: string) => {
        if (!typeWriter) return;
        setIsAnimating(true);
        await typeWriter.replaceString(text, { instant: true, start: true });
        setIsAnimating(false);
    };

    const selectionHandler = async (name: string) => {
        const selectedQuote = QuoteMap[name];
        if (!selectedQuote) {
            alert('Selected quote is not present!');
            return;
        }
        setActiveQuote(selectedQuote);
        await writeToTypeWriter(selectedQuote.text);

        // navigate to this link to guide the user
        if (selectedQuote.link) {
            router.push(`${window.location.pathname}/${selectedQuote.link}`);
        }
    };

    const initializeHandler = async () => {
        if (placeholderRef.current) {
            // always clear the text first.
            placeholderRef.current.textContent = '';
            setActiveQuote(RootQuote);
            const newTypeWriter = new Typewriter(placeholderRef.current, {
                loop: false,
                typingSpeed: 25,
            });
            setTypeWriter(newTypeWriter);
            setIsAnimating(true);
            await newTypeWriter.replaceString(RootQuote.text, { instant: true, start: true });
            setIsAnimating(false);
        }
    };

    // initialize type writer
    // and start toggling text effect
    useEffect(() => {
        initializeHandler();
        if (textEffectRef.current == null) {
            return;
        }
        textEffectRef.current.innerHTML = '';
        let show: boolean = true;
        let interval = setInterval(() => {
            if (textEffectRef.current) {
                textEffectRef.current.textContent = show ? '|' : '';
            }
            show = !show;
        }, 350);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id={TypeWriterSection.id}
            className={
                'min-w-[50vh] max-w-[38rem] lg:max-w-none lg:self-stretch px-4 xl:px-10 py-5 flex flex-col gap-6 bg-slate-50 border-2 border-slate-300 shadow-md rounded-md'
            }
        >
            <h2 className={'text-3xl'}>Ask Us!</h2>
            <div className={'-mt-2 flex flex-col gap-2'}>
                <FontAwesomeIcon
                    onClick={!isAnimating ? initializeHandler : undefined}
                    icon={faRotate}
                    className={'self-end mr-1 text-2xl hover:text-blue-600 cursor-pointer'}
                />
                <div className={'px-3 py-3 text-lg bg-white rounded-sm shadow-md'}>
                    <div className={'placeholder inline'} ref={placeholderRef}></div>
                    <span ref={textEffectRef} className={'ml-[1px]'}>
                        |
                    </span>
                </div>
            </div>
            <div className={'grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3 w-max'}>
                {activeQuote.options.map((option) => (
                    <button
                        key={option}
                        disabled={isAnimating}
                        onClick={() => selectionHandler(option)}
                        className={`lg:max-w-[10rem] px-6 py-2 ${boxClass} hover:bg-slate-700 hover:text-sky-300 hover:shadow-xl`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default TypeWriting;
