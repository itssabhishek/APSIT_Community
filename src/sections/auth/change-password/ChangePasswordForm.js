import * as Yup from 'yup';
import { useState } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { PATH_AUTH } from '../../../routes/paths';
import { router } from 'next/client';

// ----------------------------------------------------------------------

export default function ChangePasswordForm() {
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Length should be more than 8 units'),
  });

  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await router.push(PATH_AUTH.root);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('Invalid Password', { message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.InvalidCredentials && (
          <Alert severity="error">{errors.InvalidCredentials?.message || 'Internal server error.'}</Alert>
        )}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Box sx={{ py: 5 }} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Update
      </LoadingButton>
    </FormProvider>
  );
}
