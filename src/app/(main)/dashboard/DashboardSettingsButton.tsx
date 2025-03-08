import { Row, TooltipTrigger, Tooltip, Icon, Text, Button } from '@umami/react-zen';
import { Icons } from '@/components/icons';
import { saveDashboard } from '@/store/dashboard';
import { useMessages } from '@/components/hooks';

export function DashboardSettingsButton() {
  const { formatMessage, labels } = useMessages();

  const handleToggleCharts = () => {
    saveDashboard(state => ({ showCharts: !state.showCharts }));
  };

  const handleEdit = () => {
    saveDashboard({ editing: true });
  };

  return (
    <Row gap="3">
      <TooltipTrigger>
        <Button onPress={handleToggleCharts}>
          <Icon>
            <Icons.BarChart />
          </Icon>
        </Button>
        <Tooltip placement="bottom">{formatMessage(labels.toggleCharts)}</Tooltip>
      </TooltipTrigger>
      <Button onPress={handleEdit}>
        <Icon>
          <Icons.Edit />
        </Icon>
        <Text>{formatMessage(labels.edit)}</Text>
      </Button>
    </Row>
  );
}
