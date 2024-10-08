import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Section, Figure, DecorationContainer, Header, IconContainer, IconHeader, Span, LinkButton } from "./styled";
import { Icon } from "../../components/icon/Icon";
import { PhoneImg } from "../../components/PhoneImg/PhoneImg";
import { Form } from "../../components/form/Form";
import { theme } from "../../styles/themes";
import { booksGetUserBooks } from "../../redux/books/operations";
import { userSignin } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "../../redux/store";
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup
        .string()
        .min(3, 'Email must be at least 3 characters')
        .max(64, 'Email must be less than 65 characters')
        .required('Email is a required field')
        .matches(
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 
            'Email is invalid'
        ),
    password: Yup
        .string()
        .min(7, 'Password must be at least 7 characters')
        .max(64, 'Password must be less than 65 characters')
        .required('Password is a required field')
});

const inputsDataArr = [
    {type: 'email', name: 'email', placeholder: 'Email:'},
    {type: 'password', name: 'password', placeholder: 'Password:'}
]

interface InitialValuesInterface {
    email: string,
    password: string
}

const initialValues: InitialValuesInterface = {
    email: '',
    password: ''
}

type FormValues = {
    email: string,
    password: string
}

export type AppDispatch = typeof store.dispatch;

export const LoginPage = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async ( values: FormValues, resetForm: any) => {
        
        await dispatch(userSignin(values)).then((res) => {
            // if(res.meta.requestStatus === 'fulfilled') resetForm();
        });

        dispatch(booksGetUserBooks(null));
    }

    const handleLinkButton = () => {
        navigate('/register', {replace: true});
    }
    
    return (
        <PageWrapper>
            <DecorationContainer>
            <Section>
                <IconContainer>
                    <Icon iconName='#icon-logo' sx={{width: '42px', height: '17px'}}/>
                    <IconHeader>Reading Journey</IconHeader>
                </IconContainer>
                <Header>Expand your mind, reading <Span>a book</Span></Header>

                {/* {!isReading && <Form
                            initialValues={initialValuesStart}
                            validationSchema={schemaStart}
                            handleSubmit={handleSubmit}
                            inputsDataArr={pageStartData}
                            submitName={'Start'}
                            sx={{
                                gap: '20px',
                            }}
                        />} */}
                <Form
                    initialValues={initialValues}
                    validationSchema={schema}
                    inputsDataArr={inputsDataArr}
                    handleSubmit={handleSubmit}
                    submitName="Log In"
                    sx={{
                        '& .MuiBox-root:last-of-type': {
                            marginTop: '75px',
                            gap: '14px',
                            [theme.breakpoints.up('tablet')]: {
                                marginTop: '146px',
                            }
                        },

                        '& button:nth-of-type(1)':{
                            fontWeight: '700',

                            color: theme.palette.custom.textBlack,
                            backgroundColor: theme.palette.custom.bgWhite,

                            '&:hover':{
                                color: theme.palette.custom.textMain,
                                backgroundColor: theme.palette.custom.bg2
                            }
                        },
                        '& .MuiBox-root:nth-last-of-type(n + 3)': {
                            marginBottom: '8px',
                    
                            [theme.breakpoints.up('tablet')]: {
                                marginBottom: '14px',
                            },
                        },
                    }}
                >
                    <LinkButton onClick={handleLinkButton}>Don't have an account?</LinkButton>
                </Form>
            </Section>
            <Figure>
                <PhoneImg/>
            </Figure>
            </DecorationContainer>
        </PageWrapper>
    )
}