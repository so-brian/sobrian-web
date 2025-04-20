const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content py-4 mt-auto">
            <div className="container mx-auto text-center">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
