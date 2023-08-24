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

  const isActive = EndYn !== "Y"

  return (
    <Card>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명한 회색 배경
          zIndex: 1, // 카드 이미지 위에 레이어를 위치시킴
          pointerEvents: 'none', // 레이어로 인해 내용에 접근하지 않도록 함
          opacity: isActive ? 0 : 1, // 활성/비활성 상태에 따라 투명도 조정
        }}
      />
       {!isActive  && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 2, // 이미지 위에 표시되도록 함
                pointerEvents: 'none', // 클릭 이벤트를 가로채지 않도록 함
                color: 'white', // 문구 색상
              }}
            >
              종료된 무대 인사
            </Box>
          )}
    <Link target="_blank" href={Url} color="inherit" 
      underline={isActive ? 'hover' : 'none'} 
      onClick={isActive ? null : (event) => event.preventDefault()} 
      sx={{
        textDecoration: 'none',
        color: isActive ? 'inherit' : 'text.disabled',
      }}
    >
      
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
    </Link>
    </Card>
  );
}
