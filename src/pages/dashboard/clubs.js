// @mui
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import * as React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/Image';
import { MotionViewport } from '../../components/animate';
import { getContentFromS3 } from '../../utils/aws';

// ----------------------------------------------------------------------

Clubs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const clubs = [
  {
    icon: '/clubs/nss.jpg',
    club_name: 'National Social Services (NSS)',
    faculty_coordinator_name: 'Prof. Uday A Nikam',
    faculty_coordinator_contact: 9619556081,
  },
  {
    icon: '/clubs/antarang.jpg',
    club_name: 'Antarang',
    faculty_coordinator_name: 'Ms. Darshana Jam',
    faculty_coordinator_contact: 8652769138,
  },
  {
    icon: '/clubs/lakshya.jpg',
    club_name: 'Lakshya',
    faculty_coordinator_name: 'Dr. Suma Sreedhar',
    faculty_coordinator_contact: 9270255606,
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'Expression Club (Soft Skill Training)',
    faculty_coordinator_name: 'Dr. Suma Sreedhar',
    faculty_coordinator_contact: 9270255606,
  },
  {
    icon: '/clubs/mac.jpg',
    club_name: 'Modified Auto Club (MAC)',
    faculty_coordinator_name: 'Prof. Amol Shinde',
    faculty_coordinator_contact: 9730412857,
  },
  {
    icon: '/clubs/robotics.png',
    club_name: 'Robotic Club',
    faculty_coordinator_name: 'Prof. Rahulkumar Singh',
    faculty_coordinator_contact: 8541994216,
  },
  {
    icon: '/clubs/mesa.jpg',
    club_name: 'MESA',
    faculty_coordinator_name: 'Prof. Nikhil Desai',
    faculty_coordinator_contact: 9004487643,
  },
  {
    icon: '/clubs/ishrae.jpg',
    club_name: 'ISHRAE',
    faculty_coordinator_name: 'Prof. Kedar Yeole',
    faculty_coordinator_contact: 8976197340,
  },
  {
    icon: '/clubs/cesa.jpg',
    club_name: 'CESA',
    faculty_coordinator_name: 'Prof. Vishal Misal',
    faculty_coordinator_contact: 8082387212,
  },
  {
    icon: '/clubs/igbc.png',
    club_name: 'IGBC',
    faculty_coordinator_name: 'Prof. Mrunal Joshi',
    faculty_coordinator_contact: 9870095353,
  },
  {
    icon: '/clubs/iete.png',
    club_name: 'IETE',
    faculty_coordinator_name: 'Dr. Mamta Kurve',
    faculty_coordinator_contact: 9819958843,
  },
  {
    icon: '/clubs/itsa.png',
    club_name: 'ITSA',
    faculty_coordinator_name: 'Prof Apeksha Mohite',
    faculty_coordinator_contact: 7350269847,
  },
  {
    icon: '/clubs/ieee.png',
    club_name: 'IEEE',
    faculty_coordinator_name: 'Dr. KB. Deshpande (HOD-IT)',
    // faculty_coordinator_contact: ,
  },
  {
    icon: '/clubs/csi.png',
    club_name: 'CSI',
    faculty_coordinator_name: 'Prof. Rushikesh Nikam',
    faculty_coordinator_contact: 8767415507,
  },
  {
    icon: '/clubs/cyber.png',
    club_name: 'Cyber Security Club',
    faculty_coordinator_name: 'Prof. Sneha Dalvi',
    faculty_coordinator_contact: 7900032616,
  },
  {
    icon: '/clubs/devops.png',
    club_name: 'DevOps Club',
    faculty_coordinator_name: 'Prof. Neha Deshmukh',
    faculty_coordinator_contact: 8454845117,
  },
  {
    icon: '/clubs/aiml.png',
    club_name: 'AIMLSA',
    faculty_coordinator_name: 'Prof. Odilia Gonsalves',
    faculty_coordinator_contact: 8806072147,
  },
  {
    icon: '/clubs/iot.jpg',
    club_name: 'IOT Club',
    faculty_coordinator_name: 'Prof. Sonal Jain & Prof Selvin Furtado ',
    faculty_coordinator_contact: 9967581913,
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'Data Science & Analytics (HOD- Data Science)',
    faculty_coordinator_name: 'Prof. Anagha Aber',
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'Data Science Student Association',
    faculty_coordinator_name: 'Prof. Vaibhav Yawalkar',
    faculty_coordinator_contact: 9967410604,
  },
  {
    icon: '/clubs/app_dev.png',
    club_name: 'Application Development Club',
    faculty_coordinator_name: 'Prof Sachin Malave (HOD COMPS) & Prof. Yamini Patil',
    faculty_coordinator_contact: 8888818292,
  },
  {
    icon: '/clubs/game_dev.jpg',
    club_name: 'Game Development Club',
    faculty_coordinator_name: 'Prof Sachin Malave (HOD COMPS)',
  },
  {
    icon: '/clubs/smart_city.jpg',
    club_name: 'Smart City Club',
    faculty_coordinator_name: 'Prof. Sachin Takmare',
    faculty_coordinator_contact: 9960843406,
  },
  {
    icon: '/clubs/blockchain.jpg',
    club_name: 'Blockchain',
    faculty_coordinator_name: 'Dr. Pravin Adivarekar',
    faculty_coordinator_contact: 9004671265,
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'AI Club - Applications in Civil Engineering',
    faculty_coordinator_name: 'Dr. Pooja Rao',
    faculty_coordinator_contact: 7506170777,
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'Industry Academic Interaction Club',
    faculty_coordinator_name: 'Dr. Madhuri Malay',
    faculty_coordinator_contact: 9820472811,
  },
  {
    icon: '/clubs/photography.png',
    club_name: 'Photography',
    faculty_coordinator_name: 'Prof. Shruti Godbole',
    faculty_coordinator_contact: 9657816359,
    student_coordinator_name: 'Mr. Omkar Tilloo',
    student_coordinator_contact: 9321973464,
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/faqs/ic_account.svg',
    club_name: 'NatyaMandal',
    faculty_coordinator_name: 'Prof. Kiran Thombre',
    faculty_coordinator_contact: 8149694643,
    student_coordinator_name: 'Mr. Suyash Hotkar',
    student_coordinator_contact: 9892508049,
  },
  {
    icon: '/clubs/dance.jpg',
    club_name: 'Dance',
    faculty_coordinator_name: 'Prof. Sonia Aneesh',
    faculty_coordinator_contact: 9820201443,
    student_coordinator_name: 'Ms. Anagha Rai',
    student_coordinator_contact: 7021411280,
  },
  {
    icon: '/clubs/music.png',
    club_name: 'Music (Band+ Singers)',
    faculty_coordinator_name: 'Prof. Aditya Shastri',
    faculty_coordinator_contact: 8007950769,
    student_coordinator_name: 'Mr. Jayesh Chaudhari',
    student_coordinator_contact: 8451974340,
  },
  {
    icon: '/clubs/fashion.jpg',
    club_name: 'Vogue (Fashion Show)',
    faculty_coordinator_name: 'Prof. Tanvi Kapdi',
    faculty_coordinator_contact: 9819959954,
    student_coordinator_name: 'Ms. Janhavi Kulkarni & Mr. Aakash Gaikwad',
    student_coordinator_contact: 9920713779,
  },
];

// ----------------------------------------------------------------------

ClubCard.propTypes = {
  club: PropTypes.shape({
    icon: PropTypes.string,
    club_name: PropTypes.string,
    faculty_coordinator_name: PropTypes.string,
    faculty_coordinator_contact: PropTypes.number,
    student_coordinator_name: PropTypes.string,
    student_coordinator_contact: PropTypes.number,
  }),
};

function ClubCard({ club }) {
  const {
    icon,
    club_name,
    faculty_coordinator_name,
    faculty_coordinator_contact,
    student_coordinator_name,
    student_coordinator_contact,
  } = club;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        height: 260,
        borderRadius: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Image
        alt={icon}
        visibleByDefault
        disabledEffect
        src={getContentFromS3(icon)}
        sx={{ mb: 2, width: 80, height: 80 }}
      />
      <Typography variant="subtitle2">{club_name}</Typography>
      <Typography variant="body1">{faculty_coordinator_name}</Typography>
      <Typography variant="body2">{faculty_coordinator_contact}</Typography>
      <Typography variant="body1">{student_coordinator_name}</Typography>
      <Typography variant="body2">{student_coordinator_contact}</Typography>
    </Paper>
  );
}

export default function Clubs() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Clubs">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Clubs"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Clubs' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              component={MotionViewport}
              sx={{
                mb: 15,
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(5, 1fr)',
                },
              }}
            >
              {clubs.map((club, index) => (
                <ClubCard key={index} club={club} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
