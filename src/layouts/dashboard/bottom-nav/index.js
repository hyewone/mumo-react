import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

LabelBottomNavigation.propTypes = {
  openBottomNav: PropTypes.bool,
  onCloseBottomNav: PropTypes.func,
  onOpenBottomNav: PropTypes.func,
};

export default function LabelBottomNavigation({openBottomNav, onCloseBottomNav, onOpenBottomNav}) {
  const [value, setValue] = useState('recents');

  // useEffect(() => {
  //   if (!openBottomNav) {
  //     onCloseBottomNav();
  //   }
  // }, [openBottomNav]);

  // const handleNavButtonClick = () => {
  //   if (openNav) {
  //     onCloseNav();
  //   } else {
  //     onOpenNav();
  //   }
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}