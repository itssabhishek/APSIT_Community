import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CardContent, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import Image from '../../../components/Image';
import TextMaxLine from '../../../components/TextMaxLine';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

NewsPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function NewsPostCard({ post, index }) {
  return (
    <Card>
      <PostContent title={post['header']} link={post['link']} index={index} />
      <OverlayStyle />
      <Image alt="cover" src={post['img-src']} sx={{ height: 360 }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.string,
};

export function PostContent({ title, link, index }) {
  return (
    <CardContent
      sx={{
        width: 1,
        pt: 0,
        zIndex: 9,
        bottom: 0,
        position: 'absolute',
        color: 'common.white',
      }}
    >
      <NextLink href={link} passHref>
        <Link color="inherit" target={'_blank'}>
          <TextMaxLine variant={'subtitle2'} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
      </NextLink>
    </CardContent>
  );
}
