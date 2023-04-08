import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import PropTypes from 'prop-types';
import useAuth from '../../../hooks/useAuth';
import NextLink from 'next/link';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

BlogPostCommentForm.propType = {
  onComment: PropTypes.func,
};

export default function BlogPostCommentForm({ onComment }) {
  const { user } = useAuth();
  const CommentSchema = Yup.object().shape({
    message: Yup.string().required('Comment is required'),
  });

  const defaultValues = {
    name: user.displayName,
    avatarUrl: user.avatarUrl,
    message: '',
    postedAt: new Date().toISOString(),
    users: [],
    replyComment: [],
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (message) => {
    onComment(message);
    reset();
  };

  return (
    <RootStyles>
      <Typography variant="subtitle1">Add Comment</Typography>
      <Typography variant="body2" sx={{ mb: 3, color: (theme) => theme.palette.warning.dark }}>
        *Your comments will be monitored. Please read our{' '}
        <NextLink href={'/Terms&Conditions.pdf'} passHref>
          <Link color="inherit">terms and conditions</Link>
        </NextLink>
        .
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="message" label="Comment *" multiline rows={3} />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post comment
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyles>
  );
}
