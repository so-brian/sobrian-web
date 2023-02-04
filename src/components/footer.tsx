import { Avatar, Image, Link, makeStyles, tokens } from "@fluentui/react-components";
import { GuestRegular } from '@fluentui/react-icons';

import Logo from "../../public/logo.png";

const useStyles = makeStyles({
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopColor: 'gray',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
    },
    logo: {
        width: '20px',
        height: '20px',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '20px',
    },
    linkItem: {
        marginLeft: '20px',
        marginRight: '20px',
        textDecorationLine: 'none',
        color: 'gray',
        fontSize: '15px',
    },
    legalItem: {
        marginLeft: '10px',
        marginRight: '20px',
        color: 'gray',
        fontSize: '12px',
    }

});

export const SoFooter = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Image className={classes.logo} src={Logo.src} alt="" />

            <span className={classes.legalItem}>{`@ ${new Date().getFullYear()}`}</span>

            <Link className={classes.linkItem} href='/'>Home</Link>
            <Link className={classes.linkItem} href='/blog'>Blog</Link>
            <Link className={classes.linkItem} href='/about'>About</Link>
        </footer>
    );
}