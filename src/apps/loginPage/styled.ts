import { Button } from "@mui/material";
import { display, height, maxWidth, styled, width } from "@mui/system";

export const DecorationContainer = styled('div')(({theme}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    gap: '10px',

    [theme.breakpoints.up('tablet')]: {
        maxWidth: '770px',
    },
    
    [theme.breakpoints.up('laptop')]: {
        
        flexDirection: 'row',
    },

    [theme.breakpoints.up('desktop')]: {
        maxWidth: '100%',
        gap: '16px'
    }
}));

export const IconContainer = styled('div')(({theme}) => ({
    width: '182px',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',

    [theme.breakpoints.up('tablet')]: {
        marginBottom: '157.5px'
    },

    [theme.breakpoints.up('tablet')]: {
        marginBottom: '107.5px'
    }
}));

export const IconHeader = styled('h2')(({theme}) => ({
    display: 'none',
    
    color: theme.palette.custom.textMain,
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '18px', /* 100% */
    letterSpacing: '0.36px',
    textTransform: 'uppercase',

    [theme.breakpoints.up("tablet")]: {
        display: 'block'
    }
}));

export const Header = styled('h1')(({theme}) => ({
    marginBottom: '20px',

    color: theme.palette.custom.textMain,
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '32px', /* 100% */
    letterSpacing: '0.64px',

    [theme.breakpoints.up('tablet')]: {
        width: '444px',
        marginBottom: '40px',

        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '60px', /* 93.75% */
        letterSpacing: '1.28px',
    }
}));

export const Span = styled('span')(({theme}) => ({
    color: theme.palette.custom.textSecondary
}));

export const Section = styled('div')(({theme}) => ({
    padding: '20px 20px',
    width: '100%',
    backgroundColor: theme.palette.custom.bg3,

    borderRadius: '30px',

    [theme.breakpoints.up("tablet")]: {
        padding: '40px 64px'
    },
    [theme.breakpoints.up("desktop")]: {
        width: '600px'
    },
}));

export const Figure = styled('figure')(({theme}) => ({
    height: '351px',
    width: '100%',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: theme.palette.custom.bg3,

    borderRadius: '30px',

    [theme.breakpoints.up("tablet")]: {
        // paddingTop: '20px',
        // paddingLeft: '40px',
        // paddingRight: '40px'
        display: 'none'
    },
    [theme.breakpoints.up('desktop')]: {
        width:'600px',
        height: '100%',
        // paddingTop: '20px',
        // paddingLeft: '40px',
        // paddingRight: '40px'
        display: 'block'
    }
}));