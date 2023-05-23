// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Typography } from '@mui/material';
// guards
import PasswordResetGuard from '../../guards/PasswordResetGuard';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ChangePasswordForm } from '../../sections/auth/change-password';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ChangePassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------


export default function ChangePassword() {
  return (
    <PasswordResetGuard>
      <Page title="Change Password" sx={{ height: 1 }}>
        <RootStyle>
          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Change your password
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter new password below.</Typography>
                </Box>
              </Stack>
              <ChangePasswordForm />
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </PasswordResetGuard>
  );
}
