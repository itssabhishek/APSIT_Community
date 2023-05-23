// @mui
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// layouts
import Layout from "../../layouts";
// components
import Page from "../../components/Page";
// sections
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../routes/paths";
import InternshipDataGrid from "../../components/InternshipDataGrid";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import axios from "../../utils/axios";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import MainFooter from "../../layouts/main/MainFooter";

// ----------------------------------------------------------------------

Internship.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z"
    />
  </svg>
);

// ----------------------------------------------------------------------
export default function Internship() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState('Computer Science');
  const handleChange = (event) => {
    setDomain(event.target.value);
  };
  const getAllInternships = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post('/internships', {
        domain: domain,
      });

      setData(response.data.internships);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [domain]);
  useEffect(() => {
    getAllInternships();
  }, [getAllInternships, domain]);

  const rows = [...data];

  const columns = [
    { field: 'domain', headerName: 'Domain', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'company', headerName: 'Company Name', width: 200 },
    { field: 'stipend', headerName: 'Stipend', width: 150 },
    { field: 'posted', headerName: 'Posted', width: 150 },
    {
      field: 'link',
      headerName: 'Link',
      width: 120,
      renderCell: (params) => (
        <Button href={params.value} target="_blank" variant="contained" endIcon={<ExternalIcon />}>
          Apply
        </Button>
      ),
    },
  ];
  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Internships"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Internships' }]}
        />
        <Grid container spacing={3}>
          <FormControl
            sx={{
              marginLeft: 'auto',
            }}
          >
            <InputLabel id="domain-label">Domain</InputLabel>
            <Select labelId="domain-label" id="domain-select" value={domain} label="Domain" onChange={handleChange}>
              <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
              <MenuItem value={'Information Technology'}>Information Technology</MenuItem>
              <MenuItem value={'Mechanical Engineering'}>Mechanical Engineering</MenuItem>
              <MenuItem value={'Civil Engineering'}>Civil Engineering</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <InternshipDataGrid loading={loading} columns={columns} rows={rows} />
          </Grid>
        </Grid>
        <MainFooter />
      </Container>
    </Page>
  );
}
