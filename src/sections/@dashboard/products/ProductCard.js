import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {

  const { ID, MovieID, MovieNm, CinemaType, Title, Url, Image, EndYn, CreatedAt, UpdatedAt } = product;

  return (
    <Card>
      <Box sx={{ pt: '60%', position: 'relative', width: '100%' }}>
      {/* <Box sx={{ pt: '100%', position: 'relative' }}> */}
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'hot' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status} 
          </Label>
        )} */}
        <StyledProductImg alt={Title} src={Image} />
      </Box>

      <Stack spacing={2} sx={{ pt: '40%', p: 2 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
              {/* {age}  세 */}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            {Title}
            {/* &nbsp;
            {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
