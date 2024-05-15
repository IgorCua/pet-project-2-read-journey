import { ButtonBase, TextField } from "@mui/material";
import { lineHeight, maxWidth, minWidth, styled, width } from "@mui/system";
import { FormTextField } from "../materialUI/FormTextField";

export const Form = styled('form')(({theme}) => ({
    marginBottom: '20px',
    
    [theme.breakpoints.up('tablet')]: {
        minWidth: '295px',
        maxWidth: '47.5%',
        fontSize: '14px',
    },
}));

export const FormHeader = styled('h3')(({theme})=>({
    marginLeft: '14px',
    marginBottom:'8px',
    fontSize: '10px',
    color: theme.palette.custom.textMain,

    [theme.breakpoints.up('tablet')]: {
        fontSize: '14px',
        lineHeight: '18px'
    }
}));

export const InputTitle = styled(TextField)(({theme})=>({
    marginBottom: '8px',

    '& div': {
        paddingLeft: '14px',
    },
    '& div::before': {
        content: '"Book title:"',
        minWidth: '93px',
        fontSize: '12px',
        color: theme.palette.custom.textSecondary,
        
        [theme.breakpoints.up('tablet')]: {
            fontSize: '14px',
        },
    },
    '& div input': {
        padding: '14px 14px 14px 10px',
        fontSize: '12px',

        [theme.breakpoints.up('tablet')]: {
            padding: '16px 14px 16px 10px',
            
            fontSize: '14px',
        },
    }
})) as typeof TextField;

export const InputAuthor = styled(TextField)(({theme})=>({
    marginBottom: '20px',
    '& div': {
        paddingLeft: '14px',
        // width: '30px'
    },
    '& div::before': {
        minWidth: '111px',
        content: '"The author:"',
        fontSize: '12px',
        color: theme.palette.custom.textSecondary,
        
        [theme.breakpoints.up('tablet')]: {
            fontSize: '14px',
            width:'112px'
        },
    },
    '& div input': {
        padding: '14px 14px 14px 10px',
        fontSize: '12px',

        [theme.breakpoints.up('tablet')]: {
            padding: '16px 14px 16px 10px',
            
            fontSize: '14px',
        },
    }
})) as typeof TextField;

export const Submit = styled(ButtonBase)(({theme}) => ({
    // width: '91px',
    padding: '10px 20px',
    borderRadius: '30px',
    border: '1px solid rgba(249, 249, 249, 0.20)',

    color: theme.palette.custom.textMain,

    transitionProperty: 'background-color',
    transitionDuration: '250ms',

    '&:hover': {
        backgroundColor: theme.palette.custom.bg2
    },

    [theme.breakpoints.up('tablet')]: {
        padding: '12px 28px',

        fontSize: '16px',
        lineHeight: '18px'
    }
}));

export const WorkoutContainer = styled('div')(({theme}) => ({
    padding: '20px 20px',
    marginTop: '10px',

    backgroundColor: theme.palette.custom.bg2,

    borderRadius: '30px',
}));

export const LinksContainer = styled('div')(({theme}) => ({
    
}));