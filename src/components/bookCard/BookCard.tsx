// import { useSelector } from "react-redux";
import { 
    AddToLibraryBtn, 
    Author, 
    BackdropCardContainer, 
    BackdropContainer, 
    BackdropDescrContainer, 
    Container, 
    DescriptionContainer, 
    Header, 
    Image, 
    Pages, 
    StartReadingBtn,
    TitleContainer
} from "./styled";
// import { selectRecommendedBooks } from "../../redux/books/selectors";
import { Icon } from "../icon/Icon";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
// import { theme } from "../../styles/themes";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
// import { userAddBookByID } from "../../redux/auth/operations";
import { CustomBackdrop } from "../Backdrop/CustomBackdrop";
import { booksAddById, booksGetBookInfo, booksRemoveBook } from "../../redux/books/operations";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBooksError, selectBooksIsError, selectUserBooksIDsArr, selectUserBooksTitlesArr } from "../../redux/books/selectors";
import { ErrorModal } from "../errorModal/ErrorModal";
import { theme } from "../../styles/themes";

type Props = {
    id: string,
    cardType: 'recommended' | 'myReading' | 'library',
    url: string,
    title: string,
    author: string,
    pages?: number | string,
    isModal?: boolean
    sx?: {}
    // handleClick?: (title: any) => void
}

type BackdropProps = {
    url: string,
    title: string,
    author: string,
    pages?: number,
}

type AppDispatch = typeof store.dispatch;

export const BookCard = ({id, cardType, url, title, author, pages, isModal, sx}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    // const bookError = useSelector(selectBooksError);
    // const isBookError = useSelector(selectBooksIsError);
    // const userBooksIdArr = useSelector(selectUserBooksIDsArr);
    const userBooksTitlesArr = useSelector(selectUserBooksTitlesArr);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
        if(event.target instanceof Element){ 
            if(
                event.target.localName !== "button" 
                && event.target.localName !== "svg" 
                && event.target.localName !== "use"
            ){
                // console.log('current target', event.currentTarget.localName);
                if(event.target !== event.currentTarget)setIsModalOpen(!isModalOpen);
                return;
            }

            if(event.currentTarget.localName === 'button'){
                dispatch(booksRemoveBook(id));
            }
        }
    }

    const handleAddToLibrary = () => {
        if(userBooksTitlesArr){
            if(userBooksTitlesArr.includes(title) === true){
                setIsError(true);
                setIsModalOpen(false);
                return;
            }
            if(userBooksTitlesArr.includes(title) === false) {
                dispatch(booksAddById(id));
                setIsModalOpen(false);
                return;
            }
        }
    }

    const handleStartReading = () => {
        // console.log('Start reading click');
        dispatch(booksGetBookInfo(id));
        navigate('/reading');
    }

    const handleButtonRender = () => {
        if(userBooksTitlesArr){
            if(userBooksTitlesArr.includes(title) === true){
                return true;
            }
            if(userBooksTitlesArr.includes(title) === false) {
                return false;
            }
        }
    }
    return <>
        <ErrorModal
            type="booksError"
            isModalOpen={isError}
            setIsModalOpen={setIsError}
            erorrCode="400"
            errorMessage="Book already added."
        />
        <Container sx={sx} onClick={handleCardClick}>
            <Image src={url}/>
            <DescriptionContainer>
                <TitleContainer>
                    <Header variant="h3" noWrap>{title}</Header>
                    <Author noWrap>{author}</Author>
                </TitleContainer>
                {cardType === 'library' && 
                    <IconButton size="small" 
                        onClick={handleCardClick} 
                        sx={{marginLeft: '14px', 
                        padding: '0px'
                    }}>
                    <Icon 
                        // onClick={handleDeleteBook}
                        iconName={'#icon-trash-bin-red'} 
                        sx={{
                            padding: '5px 4px',
                            
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignSelf: 'center',
                            transitionDuration: '250ms',
                            transitionProperty:'background-color, border',

                            backgroundColor: 'rgba(232, 80, 80, 0.1)',
                            border: '1px solid rgba(232, 80, 80, 0.2)',
                            borderRadius: '50%',

                            cursor: 'pointer',
                            // zIndex: '',
                            '&:hover':{
                                backgroundColor: 'rgba(232, 80, 80, 0.3)',
                                border: '1px solid rgba(232, 80, 80, 0.5)',
                                borderRadius: '50%',
                            }
                        }}
                    />
                    </IconButton>
                }
            </DescriptionContainer>
        </Container>
        { isModal !== null && isModal !== false && 
            isModalOpen && <CustomBackdrop isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <BackdropContainer>
                    <BackdropCardContainer>
                        <Image src={url} sx={{ 
                            marginBottom: '16px',
                            width: '100%',
                            height: '208px',
                            // maxHeight: '208px'
                            borderRadius: '8px',
                            cursor: 'auto',
                            [theme.breakpoints.up('tablet')]: {
                                maxWidth: '153px',
                                height: '233px'
                            }
                        }}/>
                        <BackdropDescrContainer sx={{textAlign: 'center'}}>
                            <Header variant="h3" noWrap sx={{
                                marginBottom: '2px',
                                width: '100%',
                            }}>{title}</Header>
                            <Author noWrap sx={{
                                marginBottom: '4px',
                            }}>{author}</Author>
                            <Pages>{pages} pages</Pages>
                        </BackdropDescrContainer>
                    </BackdropCardContainer>

                    {!handleButtonRender() && 
                        <AddToLibraryBtn onClick={handleAddToLibrary}>Add to library</AddToLibraryBtn>
                    }
                    {handleButtonRender() && 
                        <StartReadingBtn onClick={handleStartReading}>Start reading</StartReadingBtn>
                    }
                </BackdropContainer>
            </CustomBackdrop>
        }
    </>
}