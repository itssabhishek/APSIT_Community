import PropTypes from "prop-types";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import axios from "../../../utils/axios";
import { router } from "next/client";
import { PATH_AUTH } from "../../../routes/paths";

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'example@mail.com' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (email) => {
    await router.push(PATH_AUTH.verify);
    try {
      const resetPassword = async () => {
        const response = await axios.post('/reset-password', email);
        console.log(response.data);
      };
      if (isMountedRef.current) {
        onSent();
        onGetEmail(email.email);
        await resetPassword();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Continue
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
