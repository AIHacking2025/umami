import {
  Select,
  ListItem,
  Form,
  FormField,
  FormButtons,
  FormSubmitButton,
  TextField,
  PasswordField,
  Button,
} from '@umami/react-zen';
import { useApi, useMessages } from '@/components/hooks';
import { ROLES } from '@/lib/constants';

export function UserAddForm({ onSave, onClose }) {
  const { post, useMutation } = useApi();
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: any) => post(`/users`, data),
  });
  const { formatMessage, labels } = useMessages();

  const handleSubmit = async (data: any) => {
    mutate(data, {
      onSuccess: async () => {
        onSave(data);
        onClose();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <FormField
        label={formatMessage(labels.username)}
        name="username"
        rules={{ required: formatMessage(labels.required) }}
      >
        <TextField autoComplete="new-username" />
      </FormField>
      <FormField
        label={formatMessage(labels.password)}
        name="password"
        rules={{ required: formatMessage(labels.required) }}
      >
        <PasswordField autoComplete="new-password" />
      </FormField>
      <FormField
        label={formatMessage(labels.role)}
        name="role"
        rules={{ required: formatMessage(labels.required) }}
      >
        <Select>
          <ListItem id={ROLES.viewOnly}>{formatMessage(labels.viewOnly)}</ListItem>
          <ListItem id={ROLES.user}>{formatMessage(labels.user)}</ListItem>
          <ListItem id={ROLES.admin}>{formatMessage(labels.admin)}</ListItem>
        </Select>
      </FormField>
      <FormButtons>
        <FormSubmitButton variant="primary" disabled={false}>
          {formatMessage(labels.save)}
        </FormSubmitButton>
        <Button isDisabled={isPending} onPress={onClose}>
          {formatMessage(labels.cancel)}
        </Button>
      </FormButtons>
    </Form>
  );
}
