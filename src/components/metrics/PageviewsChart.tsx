import { useMemo } from 'react';
import { useTheme } from '@umami/react-zen';
import { BarChart, BarChartProps } from '@/components/charts/BarChart';
import { useLocale, useMessages } from '@/components/hooks';
import { renderDateLabels } from '@/lib/charts';
import { getThemeColors } from '@/lib/colors';

export interface PageviewsChartProps extends BarChartProps {
  data: {
    pageviews: any[];
    sessions: any[];
    compare?: {
      pageviews: any[];
      sessions: any[];
    };
  };
  unit: string;
  isLoading?: boolean;
  isAllTime?: boolean;
}

export function PageviewsChart({
  data,
  unit,
  isLoading,
  isAllTime,
  ...props
}: PageviewsChartProps) {
  const { formatMessage, labels } = useMessages();
  const { theme } = useTheme();
  const { colors } = getThemeColors(theme);
  const { locale } = useLocale();

  const chartData = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      datasets: [
        {
          label: formatMessage(labels.visitors),
          data: data.sessions,
          borderWidth: 1,
          ...colors.chart.visitors,
          order: 3,
        },
        {
          label: formatMessage(labels.views),
          data: data.pageviews,
          borderWidth: 1,
          ...colors.chart.views,
          order: 4,
        },
        ...(data.compare
          ? [
              {
                type: 'line',
                label: `${formatMessage(labels.views)} (${formatMessage(labels.previous)})`,
                data: data.compare.pageviews,
                borderWidth: 2,
                backgroundColor: '#8601B0',
                borderColor: '#8601B0',
                order: 1,
              },
              {
                type: 'line',
                label: `${formatMessage(labels.visitors)} (${formatMessage(labels.previous)})`,
                data: data.compare.sessions,
                borderWidth: 2,
                backgroundColor: '#f15bb5',
                borderColor: '#f15bb5',
                order: 2,
              },
            ]
          : []),
      ],
    };
  }, [data, locale]);

  return (
    <BarChart
      {...props}
      data={chartData}
      unit={unit}
      isLoading={isLoading}
      isAllTime={isAllTime}
      renderXLabel={renderDateLabels(unit, locale)}
    />
  );
}
