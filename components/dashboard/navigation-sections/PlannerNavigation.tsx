import Link from 'next/link';
import useAppLinks from '../../../hooks/useAppLinks';
import TableCard from '../cards/TableCard';

function getPlannerLinksStyled(links: Array<{ name: string; link: string }>) {
    const linksWithStyle = links.map((link) => {
        if (link.link.toLowerCase().includes('week')) {
            return {
                ...link,
                className:
                    'border-2 border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-slate-50',
            };
        } else if (link.link.toLowerCase().includes('month')) {
            return {
                ...link,
                className:
                    'border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-sky-50',
            };
        }
        return {
            ...link,
            className:
                'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-blue-50',
        };
    });
    return linksWithStyle;
}

function getAnalysisLinksStyled(analysisLinks: Array<{ name: string; link: string }>) {
    return analysisLinks.map((link) => {
        const linkPath = link.link.toLowerCase();
        if (linkPath.includes('week')) {
            return {
                ...link,
                className:
                    'border-2 border-slate-300 text-slate-50 bg-slate-500/90 hover:bg-slate-700/90 hover:text-yellow-100',
            };
        } else if (linkPath.includes('month')) {
            return {
                ...link,
                className:
                    'border-2 border-sky-300 text-sky-50 bg-sky-500/90 hover:bg-sky-700/90 hover:text-yellow-100',
            };
        }
        return {
            ...link,
            className:
                'border-2 border-blue-300 text-blue-50 bg-blue-500/90 hover:bg-blue-700/90 hover:text-yellow-100',
        };
    });
}

const linksContainerClass = `col-span-2 sm:col-span-1 flex flex-col gap-3`;

const PlannerNavigation: React.FC = () => {
    // name, link, colorStyle
    const { plannerLinks, dataAnalysisLinks } = useAppLinks();

    const plannerLinkStyled = getPlannerLinksStyled(plannerLinks);
    const analysisLinkStyled = getAnalysisLinksStyled(dataAnalysisLinks);

    return (
        <TableCard className={`lg:w-fit flex-1 py-2 px-3 grid grid-cols-2 gap-y-2 gap-x-3`}>
            <h3 className="text-xl col-span-2 capitalize">Planners & Detailed Analysis</h3>
            <div className={linksContainerClass}>
                {plannerLinkStyled.map((plannerLink) => (
                    <Link key={plannerLink.name} href={plannerLink.link}>
                        <a
                            className={`px-2 py-2 whitespace-nowrap overflow-hidden rounded-sm shadow-sm hover:shadow-lg text-lg transition-all hover:-translate-y-1 ${plannerLink.className}`}
                        >
                            {plannerLink.name}
                        </a>
                    </Link>
                ))}
            </div>
            <div className={linksContainerClass}>
                {analysisLinkStyled.map((link) => (
                    <Link key={link.name} href={link.link}>
                        <a
                            className={`px-2 py-2 whitespace-nowrap overflow-hidden rounded-sm shadow-sm hover:shadow-lg text-lg transition-all hover:-translate-y-1 ${link.className}`}
                        >
                            {link.name}
                        </a>
                    </Link>
                ))}
            </div>
        </TableCard>
    );
};

export default PlannerNavigation;
