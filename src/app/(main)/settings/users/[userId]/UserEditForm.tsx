import {
  Select,
  ListItem,
  Form,
  FormField,
  FormButtons,
  TextField,
  FormSubmitButton,
  PasswordField,
  useToast,
} from '@umami/react-zen';
import { useApi, useLogin, useMessages, useModified } from '@/components/hooks';
import { ROLES } from '@/lib/constants';
import { useContext } from 'react';
import { UserContext } from './UserProvider';

export function UserEditForm({ userId, onSave }: { userId: string; onSave?: () => void }) {
  const { formatMessage, labels, messages, getMessage } = useMessages();
  const { post, useMutation } = useApi();
  const user = useContext(UserContext);
  const { user: login } = useLogin();
  const { toast } = useToast();
  const { touch } = useModified();

  const { mutate, error } = useMutation({
    mutationFn: ({
      username,
      password,
      role,
    }: {
      username: string;
      password: string;
      role: string;
    }) => post(`/users/${userId}`, { username, password, role }),
  });

  const handleSubmit = async (data: any) => {
    mutate(data, {
      onSuccess: async () => {
        toast(formatMessage(messages.saved));
        touch(`user:${user.id}`);
        onSave?.();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit} error={getMessage(error)} values={user} style={{ width: 300 }}>
      <FormField name="username" label={formatMessage(labels.username)}>
        <TextField />
      </FormField>
      <FormField
        name="password"
        label={formatMessage(labels.password)}
        rules={{
          minLength: { value: 8, message: formatMessage(messages.minPasswordLength, { n: 8 }) },
        }}
      >
        <PasswordField autoComplete="new-password" />
      </FormField>

      {user.id !== login.id && (
        <FormField
          name="role"
          label={formatMessage(labels.role)}
          rules={{ required: formatMessage(labels.required) }}
        >
          <Select defaultSelectedKey={user.role}>
            <ListItem id={ROLES.viewOnly}>{formatMessage(labels.viewOnly)}</ListItem>
            <ListItem id={ROLES.user}>{formatMessage(labels.user)}</ListItem>
            <ListItem id={ROLES.admin}>{formatMessage(labels.admin)}</ListItem>
          </Select>
        </FormField>
      )}
      <FormButtons>
        <FormSubmitButton variant="primary">{formatMessage(labels.save)}</FormSubmitButton>
      </FormButtons>
    </Form>
  );
}
