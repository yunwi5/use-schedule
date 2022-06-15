import { useMemo, useState } from 'react';

import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import { FlexChart } from '../charts';
import ComparisonChart from '../charts/ComparisonChart';
import { ChartSectionContainer } from '../containers';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import SubCategoryAnalysis from './SubCategoryAnalysis';
import { useAnalysisContext } from '../../../store/context/analysis-context';
import Button from '@mui/material/Button';
import CustomMUIButton from '../../ui/buttons/CustomMUIButton';

const CategoryAnalysis: React.FC = () => {
    const { analyzer, timeFrame } = useAnalysisContext();

    const [showComparison, setShowComparison] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(false);

    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer?.generateCategoryData() || [],
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer?.generateCategoryData(AnalysisOption.PREVIOUS) || [],
        [analyzer],
    );

    return (
        <>
            <ChartSectionContainer showComparison={showComparison}>
                <FlexChart
                    chartTitle={'category distribution'}
                    chartLabel={'Task category'}
                    chartDataArray={currentChartDataArray}
                />
                {showComparison && (
                    <ComparisonChart
                        chartTitle={'Category comparison'}
                        firstDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                        secondDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                    />
                )}
                <AnalysisMessage
                    currentChartDataArray={currentChartDataArray}
                    previousChartDataArray={previousChartDataArray}
                    labelColorCallback={getCategoryBorderColor}
                    preposition={'about'}
                    showComparison={showComparison}
                    onShowComparison={() => setShowComparison((ps) => !ps)}
                    additionalButton={
                        <CustomMUIButton onClick={() => setShowSubCategory((ps) => !ps)}>
                            {showSubCategory ? 'Hide Subcategory' : 'Show Subcategory'}
                        </CustomMUIButton>
                    }
                />
            </ChartSectionContainer>
            {showSubCategory && <SubCategoryAnalysis />}
        </>
    );
};

export default CategoryAnalysis;
