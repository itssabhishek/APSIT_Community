import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
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
  const { cover, title, view, comment, share, author, createdAt } = post;

  return (
    <Card>
      <PostContent title={title} view={view} comment={comment} share={share} createdAt={createdAt} index={index} />
      <OverlayStyle />
      <Image alt="cover" src={cover} sx={{ height: 360 }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ title, view, comment, share, createdAt, index }) {
  const linkTo = `${PATH_DASHBOARD.news.root}/post/${paramCase(title)}`;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

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
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          opacity: 0.64,
          color: 'common.white',
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine variant={'subtitle2'} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
      </NextLink>
    </CardContent>
  );
}
