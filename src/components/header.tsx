import { Image, makeStyles } from "@fluentui/react-components";

import Logo from "../../public/logo.png";

const useStyles = makeStyles({
    logoContainer: {
        display: 'flex',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    logo: {
        width: '50px',
        height: '50px',
    }
});

export const SoHeader = () => {
    const classes = useStyles();
    return (
        <header style={{
            // flex: '1',
            backgroundColor: 'purple',
        }}>
            <div style={{
            }}>
                <Image src={Logo.src} style={{
                    height: '50px',
                }} />
            </div>

            <div >
                <div style={{
                }}>
                    <h2>Menu1</h2>
                </div>

                <div style={{
                }}>
                    <h2>Menu2</h2>
                </div>
            </div>
        </header>
    );
}