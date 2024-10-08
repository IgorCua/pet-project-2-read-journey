// interface PropsInterface {
//     startPage: string,
//     startReading: string,
//     finishPage?: number,
//     finishReading?: string,
//     speed?: number,
//     status?: 'active' | 'inactive'
// }

import { useSelector } from "react-redux"
import { selectBookInfo } from "../../redux/books/selectors"
import {
    BackdropContentContainer,
    BackdropHeader,
    BackdropImage,
    BackdropSpan,
    BackdropText,
    CircleContainer,
    Container,
    DataContainer,
    DataTextContainer,
    DiaryList,
    DiaryListItem,
    Header,
    HeaderContainer,
    IconContainer,
    ListContainer,
    ListItemContainer,
    ListItemDate,
    ListItemMins,
    ListItemPagesNum,
    ListItemPagesPerHour,
    ListItemPercent,
    ProgressContainer,
    Square,
    StatisticsDescription
} from "./styled";
import { Box, IconButton, Typography } from "@mui/material";
import { Icon } from "../icon/Icon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { booksDeleteReading } from "../../redux/books/operations";
import { AppDispatch } from "../../redux/store";
import { theme } from "../../styles/themes";
import { CustomBackdrop } from "../Backdrop/CustomBackdrop";

export const Progress = () => {
    const bookInfo = useSelector(selectBookInfo);
    const progressArr = bookInfo ? bookInfo.progress : null;
    const [isDiary, setIsDiary] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const [isReadingFinished, setIsReadingFinished] = useState(false);

    const progressDataArr: any = progressArr && progressArr.map((elem) => {
        let result: any = {};

        const dateStart: any = elem.startPage && new Date(elem.startReading);
        const dateEnd: any = elem.finishReading && new Date(elem.finishReading);
        if (dateStart && dateEnd) {
            result.minutes = (((dateEnd.getTime() - dateStart.getTime()) / 1000) / 60).toFixed(1);

        }
        // result.minutes = (((dateEnd.getTime() - dateStart.getTime()) / 1000) / 60).toFixed(1);
        result.finishedPages = !elem.finishPage ? elem.startPage : elem.finishPage;
        // result.date = elem.startReading.split('T')[0].split('-').reverse().join('.')
        result.date = getFormattedDate(new Date(elem.startReading));

        if (bookInfo) {
            if (elem.finishPage) result.percent = (elem.finishPage / bookInfo.totalPages * 100).toFixed(1);
            if (!elem.finishPage) result.percent = (elem.startPage / bookInfo.totalPages * 100).toFixed(1);
        }

        return result;
    });

    function getFormattedDate(date: any) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return day + '.' + month + '.' + year;
    }

    const handleDeleteDiaryData = (readingId: string) => {
        if (bookInfo?._id) {
            dispatch(booksDeleteReading({ bookId: bookInfo._id, readingId: readingId }));
        }
    }

    const CountReadingPercent = () => {
        let result = 0;
        const lastProgress = bookInfo?.progress[bookInfo.progress.length - 1];
        if (lastProgress) {
            if (lastProgress.finishPage) result = +(lastProgress.finishPage / bookInfo.totalPages * 100).toFixed(2);
            if (!lastProgress.finishPage) result = +(lastProgress.startPage / bookInfo.totalPages * 100).toFixed(2);
        }
        return result;
    }

    const getFinishedPages = () => {
        const lastProgress = bookInfo?.progress[bookInfo.progress.length - 1]
        if (lastProgress?.finishPage) return lastProgress.finishPage;
        if (!lastProgress?.finishPage) return lastProgress?.startPage;
    }

    const ifSameDate = (i: number) => {
        if ((progressDataArr[i - 1])) {
            if (progressDataArr[i - 1].date !== progressDataArr[i].date) {
                return false;
            }
            return true;
        }
    }

    const handlePagesRead = (date: string) => {
        const dayHistory = progressDataArr.filter((obj: {
            minutes: string,
            finishedPages: number,
            date: string,
            percent: string
        }
        ) => {
            return obj.date === date
        });

        return dayHistory[dayHistory.length - 1].finishedPages;
    }

    useEffect(() => {
        if (CountReadingPercent() >= 100) setIsReadingFinished(true);
    })

    return <>
        {/* backdrop called when book is finished */}
        {isReadingFinished && <CustomBackdrop
            isModalOpen={isReadingFinished}
            setIsModalOpen={setIsReadingFinished}
            sx={{

                [theme.breakpoints.up('mobileS')]: {
                    padding: '60px 46px'
                },
                [theme.breakpoints.up('mobileM')]: {
                    padding: '60px 46px'
                },
                [theme.breakpoints.up('tablet')]: {
                    padding: '50px'
                }
            }}
        >
            <BackdropContentContainer>
                <BackdropImage
                    alt="books image"
                    src={`${require('../../assets/images/books-1x.png')}`}
                    srcSet={`
                        ${require("../../assets/images/books-1x.png")} 1x,
                        ${require("../../assets/images/books-2x.png")} 2x
                    `}
                />
                <BackdropHeader>The book is read</BackdropHeader>
                <BackdropText>
                    It was an <BackdropSpan component={'span'}>exciting journey</BackdropSpan>,
                    where each page revealed new horizons,
                    and the characters became inseparable friends.
                </BackdropText>
            </BackdropContentContainer>
        </CustomBackdrop>}

        {/* progress container */}
        <Container component={'div'}>
            <HeaderContainer>
                <Header variant="h2">
                    {isDiary ? 'Diary' : 'Progress'}
                </Header>
                <IconContainer>
                    <IconButton size="small" sx={{ padding: '2px' }} onClick={() => setIsDiary(true)}>
                        <Icon
                            iconName={'#icon-sand-clock'}
                            sx={{
                                width: '16px',
                                height: '16px',
                                opacity: `${isDiary ? 1 : 0.3}`,
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: '1'
                                },
                                [theme.breakpoints.up('tablet')]: {
                                    width: '20px',
                                    height: '20px',
                                }
                            }}
                        />
                    </IconButton>
                    <IconButton size="small" sx={{ padding: '2px' }} onClick={() => setIsDiary(false)}>
                        <Icon
                            iconName={'#icon-pie-chart'}
                            sx={{
                                width: '16px',
                                height: '16px',
                                opacity: `${!isDiary ? 1 : 0.3}`,
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: '1'
                                },
                                [theme.breakpoints.up('tablet')]: {
                                    width: '20px',
                                    height: '20px',
                                }
                            }}
                        />
                    </IconButton>
                </IconContainer>
            </HeaderContainer>

            {/* diary component */}
            {isDiary && <ListContainer>
                
                {/* progress statistics */}
                <DiaryList>
                    {progressArr && progressDataArr && progressArr.map((elem, i) => {
                        return <DiaryListItem key={elem._id} id="listItem">
                            {!ifSameDate(i) && <Icon iconName={'#icon-square'} sx={{
                                position: 'absolute',
                                width: '16px',
                                height: '16px',
                                top: '-3px',
                                left: '-25px',
                                opacity: '0.3',
                                // zIndex: '0',
                                [theme.breakpoints.up('tablet')]: {
                                    width: '20px',
                                    height: '20px',
                                    top: '0px',
                                    left: '-26px',
                                }
                            }} />}
                            <ListItemContainer sx={{ flexGrow: 1 }}>
                                {!ifSameDate(i) && <ListItemDate>{progressDataArr[i].date}</ListItemDate>}
                                <ListItemPercent>{progressDataArr[i].percent}%</ListItemPercent>
                                <ListItemMins>
                                    {progressDataArr[i].minutes ? `${progressDataArr[i].minutes} minutes` : 'active reading'}
                                </ListItemMins>
                            </ListItemContainer>

                            <ListItemContainer>
                                {!ifSameDate(i) && <ListItemPagesNum>{handlePagesRead(progressDataArr[i].date)} pages</ListItemPagesNum>}
                                <Box sx={{ marginBottom: '4px', position: 'relative' }}>
                                    <Icon iconName={'#icon-reading-chart'} sx={{
                                        width: '43px',
                                        height: '18px',
                                        [theme.breakpoints.up('tablet')]: {
                                            width: '59px',
                                            height: '25px',
                                        }
                                    }} />
                                    <IconButton size="small" onClick={() => handleDeleteDiaryData(elem._id)} sx={{
                                        padding: '0px',
                                        position: 'absolute',
                                        right: '0px',
                                        top: '50%',
                                        transform: 'translate(22px, -50%)'
                                    }}>
                                        <Icon iconName={'#icon-trash-bin'} sx={{
                                            width: '14px',
                                            height: '14px',
                                        }} />
                                    </IconButton>
                                </Box>
                                <ListItemPagesPerHour>
                                    {elem.speed ? `${elem.speed} pages per hour` : 'active reading'}
                                </ListItemPagesPerHour>
                            </ListItemContainer>
                        </DiaryListItem>
                    })}
                </DiaryList>
            </ListContainer>}
            {!isDiary && window.innerWidth >= 1280 && <StatisticsDescription>
                Each page, each chapter is a new round of knowledge, a new step towards understanding. By rewriting statistics, we create our own reading history.
            </StatisticsDescription>}

            {/* progress bar component */}
            {!isDiary && <ProgressContainer>
                <CircleContainer>
                    <Icon iconName={'#icon-progress-circle'} sx={{
                        width: '116px',
                        height: '116px',
                        transform: 'rotate(270deg)',
                        // strokeDashoffset: '565.48px'
                        transitionDuration: '350px',
                        transitionProperty: 'stroke-dashoffset',
                        strokeDashoffset: `${710.20 - (710.20 / 100 * CountReadingPercent())}px`,
                        strokeWidth: '18px',
                        // 'circle': {
                        //     strokeWidth: '15px'
                        // },

                        [theme.breakpoints.up('tablet')]: {
                            padding: '0',
                            strokeWidth: '22px',
                            width: '138px',
                            height: '138px',
                        },
                        [theme.breakpoints.up('desktop')]: {
                            // strokeWidth: '22.12px',
                            width: '168px',
                            height: '168px',
                        },
                    }} />
                    <Typography sx={{
                        position: 'absolute',
                        color: theme.palette.custom.textMain,
                        [theme.breakpoints.up('tablet')]: {
                            //line width 12
                            fontSize: '20px',
                            lineHeight: '20px',
                        }
                    }}>
                        {CountReadingPercent()}%
                    </Typography>
                </CircleContainer>
                <DataContainer>
                    <Square />
                    <DataTextContainer>
                        <Typography sx={{
                            marginBottom: '4px',
                            fontSize: '14px',
                            lineHeight: '18px',
                            color: theme.palette.custom.textMain,
                            
                            [theme.breakpoints.up('tablet')]: {
                                marginBottom: '8px',
                                fontSize: '20px',
                                lineHeight: '20px',
                            }
                        }}>{CountReadingPercent()}%</Typography>
                        <Typography sx={{
                            fontSize: '10px',
                            lineHeight: '12px',
                            color: theme.palette.custom.textSecondary,
                            [theme.breakpoints.up('tablet')]: {
                                fontSize: '12px',
                                lineHeight: '14px',
                            }
                        }}>{getFinishedPages()} pages read</Typography>
                    </DataTextContainer>
                </DataContainer>
            </ProgressContainer>}
        </Container>
    </>
}