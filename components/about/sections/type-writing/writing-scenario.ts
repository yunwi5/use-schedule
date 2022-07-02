import { Quote } from '../../../../models/animation-models/Quote';
import {
    CalendarSection,
    DataAnalysisSection,
    ImportExportSection,
    RecurringSection,
} from '../../../../constants/about-sections';

enum RootOption {
    OF_COURSE = 'Of Course!',
    NAH = 'Nah!',
}

const RootOptionList = [RootOption.OF_COURSE, RootOption.NAH];

enum AspectOption {
    JUST_PLANNING = 'Just Planning',
    UTILITIES = 'Utilities',
    VISUALIZATION = 'Visualization',
    MIGRATION = 'Migration',
}

const AspectOptionList = [
    AspectOption.JUST_PLANNING,
    AspectOption.UTILITIES,
    AspectOption.VISUALIZATION,
    AspectOption.MIGRATION,
];

export const RootQuote = {
    name: 'root',
    text: 'Hey there! Do you want to maximise your productivity with us?',
    options: RootOptionList,
};

export const Quotes: Quote[] = [
    RootQuote,
    {
        name: RootOption.OF_COURSE,
        text: 'Great! What aspects or functionalities are you looking for?',
        options: AspectOptionList,
    },
    {
        name: RootOption.NAH,
        text: "That's unfortunate! Hope you change your mind in the future!",
        options: [],
    },
    {
        name: AspectOption.JUST_PLANNING,
        text: 'Great! We suggest you to have a look at calendar or planner sections!',
        options: [],
        link: CalendarSection.link,
    },
    {
        name: AspectOption.UTILITIES,
        text: 'Great! We suggest you to have a look at recurring schedules or template tables sections!',
        options: [],
        link: RecurringSection.link,
    },
    {
        name: AspectOption.VISUALIZATION,
        text: 'Great! We suggest you to have a look at dashboard or data analysis sections!',
        options: [],
        link: DataAnalysisSection.link,
    },
    {
        name: AspectOption.MIGRATION,
        text: 'Great! We suggest you to have a look at import & export sections!',
        options: [],
        link: ImportExportSection.link,
    },
];

export const QuoteMap: { [key: string]: Quote } = {};
Quotes.forEach((quote) => {
    QuoteMap[quote.name] = quote;
});
