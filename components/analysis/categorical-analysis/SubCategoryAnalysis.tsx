import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { Category, CategoryList } from '../../../models/task-models/Category';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import AppSelect from '../../ui/input/AppSelect';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import ComparisonChart from '../charts/ComparisonChart';
import { ChartSectionContainer, FlexChartContainer } from '../containers';

const SubCategoryAnalysis: React.FC = () => {
    const { analyzer, timeFrame } = useAnalysisContext();
    const [showComparison, setShowComparison] = useState(false);
    const [activeCategory, setActiveCategory] = useState(Category.SCHOOL_UNIVERSITY);

    const currentSubCategoryArray: ChartData[] = useMemo(
        () => analyzer?.generateSubCategoryData(activeCategory) || [],
        [analyzer, activeCategory],
    );
    const previousSubCategoryArray: ChartData[] = useMemo(
        () => analyzer?.generateSubCategoryData(activeCategory, AnalysisOption.PREVIOUS) || [],
        [analyzer, activeCategory],
    );

    return (
        <ChartSectionContainer showComparison={showComparison}>
            <FlexChartContainer>
                <FlexChart
                    chartTitle={
                        <span>
                            Subcategory <span className="sm:hidden">distribution</span>
                        </span>
                    }
                    chartLabel={'Task Subcategory'}
                    chartDataArray={currentSubCategoryArray}
                    additionalSelect={
                        <AppSelect
                            label="Category"
                            value={activeCategory}
                            onChange={(val: string) => setActiveCategory(val as Category)}
                            options={CategoryList}
                            id={`app-select-subcategory`}
                            labelId={`app-select-subcategory-label`}
                            className="ml-11"
                        />
                    }
                />
            </FlexChartContainer>
            {showComparison && (
                <ComparisonChart
                    chartTitle={'Subcategory comparison'}
                    firstDataSet={{
                        label: `Last ${timeFrame}`,
                        data: previousSubCategoryArray,
                    }}
                    secondDataSet={{
                        label: `This ${timeFrame}`,
                        data: currentSubCategoryArray,
                    }}
                />
            )}
            <AnalysisMessage
                currentChartDataArray={currentSubCategoryArray}
                previousChartDataArray={previousSubCategoryArray}
                labelColorCallback={getCategoryBorderColor}
                preposition={'about'}
                showComparison={showComparison}
                onShowComparison={() => setShowComparison((ps) => !ps)}
            />
        </ChartSectionContainer>
    );
};

export default SubCategoryAnalysis;
