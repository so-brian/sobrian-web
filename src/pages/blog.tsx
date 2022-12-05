import { NextPage } from "next";

const Blog: NextPage = () => {
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

            </div>

            <div style={{
                flexGrow: '1',
                backgroundColor: 'orange',
            }}>

            </div>
        </div>
    );
};

export default Blog;