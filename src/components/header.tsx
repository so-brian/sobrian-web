import { Avatar, Image, makeStyles, tokens } from "@fluentui/react-components";
import { GuestRegular } from '@fluentui/react-icons';

import Logo from "../../public/logo.png";

const useStyles = makeStyles({
    header: {
        backgroundColor: tokens.colorPaletteSeafoamBackground2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: '50px',
        height: '50px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
    },
    menuContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    menuItem: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '20px',
        marginRight: '20px',
        textDecorationLine: 'none',
        fontWeight: 'bold',
        color: tokens.colorPaletteSeafoamForeground2,
        fontSize: '20px',
    },
    userGroup: {
        flexGrow: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
        fontWeight: 'bold',
        color: tokens.colorPaletteSeafoamForeground2,
        fontSize: '20px',
    }
});

export const SoHeader = (props: Record<'isLoggedIn', boolean>) => {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <div className={classes.menuContainer}>
                <Image className={classes.logo} src={Logo.src} />

                <a className={classes.menuItem} href='/'>Home</a>
                <a className={classes.menuItem} href='/blog'>Blog</a>
                <a className={classes.menuItem} href='/about'>About</a>
            </div>

            <div className={classes.userGroup}>
                {(() => {
                    if (props.isLoggedIn) {
                        return User(classes);
                    } else {
                        return Guest(classes);
                    }
                })()}
            </div>
        </header>
    );
}

const Guest = (classes: Record<"menuItem", string>) => {
    return (
        <>
            <Avatar icon={<GuestRegular />} aria-label="Guest" />
            <a className={classes.menuItem} href='/login'>Login</a>
        </>
    );
}

const User = (classes: any) => {
    return (
        <>
            <Avatar color="colorful" name="Brian Ding" />
            <a className={classes.menuItem} href='/logout'>Logout</a>
        </>
    )
}