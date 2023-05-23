// @mui
import { Container, Grid } from "@mui/material";
// layouts
import Layout from "../../layouts";
// components
import Page from "../../components/Page";
// sections
import { FaqsHero } from "../../sections/faqs";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../routes/paths";
import MainFooter from "../../layouts/main/MainFooter";
import useSettings from "../../hooks/useSettings";
import { ContactForm } from "../../sections/contact";

// ----------------------------------------------------------------------

Help.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Help() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Help">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ py: 0 }}>
        <HeaderBreadcrumbs
          heading="Help"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Help' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FaqsHero />
            <Container sx={{ mt: 15, mb: 10 }}>
              {/*<Typography variant="h3" sx={{ mb: 5 }}>*/}
              {/*  Contact details*/}
              {/*</Typography>*/}
              {/*<FaqsCategory />*/}
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <ContactForm />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <MainFooter />
      </Container>
    </Page>
  );
}
