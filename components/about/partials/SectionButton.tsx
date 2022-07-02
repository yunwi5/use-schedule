import classes from '../About.module.scss';

// Button locally used only for about section
const SectionButton: React.FC = ({ children }) => {
    return (
        <button className={`self-center !px-8 !rounded-full ${classes.button}`}>
            {children}
        </button>
    );
};

export default SectionButton;
