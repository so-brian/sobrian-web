import { NextPage } from "next";
import { Card, CardFooter, CardHeader, CardPreview } from '@fluentui/react-components/unstable';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import { Body1, Caption1, Button, makeStyles, shorthands } from "@fluentui/react-components";

const useStyles = makeStyles({
    card: {
        ...shorthands.margin('auto'),
        width: '720px',
        maxWidth: '100%'
    }
});

const Blog: NextPage = () => {
    const styles = useStyles();
    return (
        <div style={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                flexGrow: '2',
                backgroundColor: 'green',
            }}>
                <Card className={styles.card}>
                    <CardHeader
                        image={
                            <img src='https://ts1.cn.mm.bing.net/th/id/R-C.f55aa038bb67c75d84d5445050f76239?rik=EUpLueK%2bQk6yRA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fFCDgjHU.jpg&ehk=CKI50JeZ6WVUnmhfZKi70pjBJ%2f3fg1VS34l5vg2nppY%3d&risl=&pid=ImgRaw&r=0'
                                alt="Face of a person"
                                style={{
                                    width: '50px',
                                }} />
                        }
                        header={
                            <Body1>
                                <b>Elvia Atkins</b> mentioned you
                            </Body1>
                        }
                        description={<Caption1>5h ago · About us - Overview</Caption1>}
                    />

                    <CardPreview logo={
                        <img src='https://ts1.cn.mm.bing.net/th/id/R-C.f55aa038bb67c75d84d5445050f76239?rik=EUpLueK%2bQk6yRA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fFCDgjHU.jpg&ehk=CKI50JeZ6WVUnmhfZKi70pjBJ%2f3fg1VS34l5vg2nppY%3d&risl=&pid=ImgRaw&r=0'
                            alt="Microsoft Word logo"
                            style={{
                                width: '20px',
                            }}
                        />
                    }>
                        <img src='https://ts1.cn.mm.bing.net/th/id/R-C.f55aa038bb67c75d84d5445050f76239?rik=EUpLueK%2bQk6yRA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fFCDgjHU.jpg&ehk=CKI50JeZ6WVUnmhfZKi70pjBJ%2f3fg1VS34l5vg2nppY%3d&risl=&pid=ImgRaw&r=0'
                            alt="Preview of a Word document "
                            style={{
                                width: '500px',
                            }} />
                    </CardPreview>

                    <CardFooter>
                        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
                        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
                    </CardFooter>
                </Card>
            </div>

            <div style={{
                flexGrow: '1',
                backgroundColor: 'orange',
            }}>

            </div>
        </div >
    );
};

export default Blog;