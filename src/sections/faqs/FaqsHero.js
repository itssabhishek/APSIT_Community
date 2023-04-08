// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
import { getContentFromS3 } from '../../utils/aws';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage: `url(${getContentFromS3('/overlay_1.svg')}),url(${getContentFromS3('/hero.jpg')})`,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 400,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate text="Need" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />
            <Box sx={{ color: 'common.white' }}>
              <TextAnimate text="Any Help?" />
            </Box>
          </div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
