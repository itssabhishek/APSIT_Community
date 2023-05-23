import { useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// next
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import { Autocomplete, InputAdornment, Link, Popper, Typography } from "@mui/material";
// hooks
// utils
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Iconify from "../../../components/Iconify";
import InputStyle from "../../../components/InputStyle";
import SearchNotFound from "../../../components/SearchNotFound";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array,
};

export default function BlogPostsSearch({ posts }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      const foundedPosts = posts.filter((post) => {
        const regex = new RegExp(value, 'i');
        if (regex.test(post.title)) return post;
      });

      setSearchResults(foundedPosts);
    }
  };

  const handleClick = (postId) => {
    router.push(`${PATH_DASHBOARD.blog.root}/post/${postId}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(post) => post.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Search post..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { _id, title, author } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Link underline="none" onClick={() => handleClick(_id['$oid'])}>
              <Typography key={Math.random() * 87465} color={'warning.main'} variant="subtitle2">
                {author.name}
              </Typography>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
