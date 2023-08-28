
import {
    FormatListBulleted
} from '@mui/icons-material';
import {
    Button, Divider, List,
    ListItem, ListItemText, Slide, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { stubFalse } from 'lodash-es';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';

const data = [
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
    {
        title: '콘크리트 유토피아',
        distance: '500m',
        theater: '메가박스 강동점',
        showDate: '2023-08-28(수)',
        showTime: '15:00~17:00 상영전',
        participant: '박서준, 박보영, 이병헌, 아무개',
    },
];

BottomSheet.propTypes = {
    sgList: PropTypes.array.isRequired,
    isDesktop: PropTypes.bool,
    isSideOpen: PropTypes.bool,
    setSideOpen: PropTypes.func,
};

const StyledMoreButton = styled(Button)(() => ({
    borderRadius: '20px',
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    bottom: '60px',
    left: '40%',
    zIndex: 9,
}));



export default function BottomSheet({ sgList, isDesktop, isSideOpen, setSideOpen, ...other }) {

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [sgDetail, setSgDetail] = useState({});
    const [sgDayList, setSgDayList] = useState([]);
    const [isThroughList, setIsThroughList] = useState(false);

    // const handleDetailMoreButtonClick = () => {
    //     setIsDetailOpen(true)
    // }

    const handleOnCloseDetail = () => {
        setIsDetailOpen(false)
        if (isThroughList) {
            setIsListOpen(true)
            setIsThroughList(false);
        }
    }

    const handleListMoreButtonClick = () => {
        setIsListOpen(true)
    }

    const handleOnCloseList = () => {
        setIsListOpen(false)
    }

    const handleListRowClick = (item, index) => {
        console.log("handleListRowClick")
        const movieDetails = {}
        setSgDetail(movieDetails);
        setIsListOpen(false);
        setIsDetailOpen(true);
        setIsThroughList(true);
    }

    return (
        <>
            {!isDesktop && (
                <>
                    {/* <Slide direction="up" in={!isDetailOpen}>
                        <StyledMoreButton variant="outlined" color="primary"
                            startIcon={<FormatListBulleted />} onClick={handleDetailMoreButtonClick}
                            sx={{
                            }}>
                            상세보기
                        </StyledMoreButton>
                    </Slide> */}

                    <Slide direction="up" in={!isListOpen}>
                        <StyledMoreButton variant="outlined" color="primary"
                            startIcon={<FormatListBulleted />} onClick={handleListMoreButtonClick}
                            sx={{
                            }}>
                            목록보기
                        </StyledMoreButton>
                    </Slide>

                    <Sheet isOpen={isDetailOpen} onClose={() => handleOnCloseDetail()} detent="content-height">
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>
                                This is Detail Sheet
                            </Sheet.Content>
                        </Sheet.Container>
                        <Sheet.Backdrop overlay={false} />
                    </Sheet>

                    <Sheet isOpen={isListOpen} onClose={() => handleOnCloseList()} detent="content-height">
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>
                                <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto'}}>
                                    {data.map((item, index) => (
                                        <>
                                        {/* <div key={index} onClick={() => handleRowClick(item)} > */}
                                            
                                            <ListItem alignItems="flex-start" onClick={() => handleListRowClick(item, index)} style={{ cursor: 'pointer' }}>
                                                {/* <ListItemAvatar>
                      <Avatar alt={item.title} src={`/static/images/avatar/${index + 1}.jpg`} />
                    </ListItemAvatar> */}
                                                <ListItemText
                                                    primary={item.title}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {item.distance} | {item.theater}
                                                            </Typography>
                                                            <br />
                                                            {item.showDate} {item.showTime}
                                                            <br />
                                                            {item.participant}
                                                        </>
                                                    }
                                                />
                                                <Button variant="contained" color="primary" style={{ margin: 'auto' }}> {/* 오른쪽으로 붙이기 */}
                                                    예매하기
                                                </Button>
                                            </ListItem>
                                        {/* </div> */}
                                            {index !== data.length - 1 && <Divider variant="inset" component="li" />}
                                        </>
                                    ))}
                                </List>
                            </Sheet.Content>
                        </Sheet.Container>
                        <Sheet.Backdrop overlay={false} />
                    </Sheet>
                </>
            )}
        </>
    )
}