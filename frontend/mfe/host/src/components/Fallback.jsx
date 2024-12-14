// eslint-disable-next-line react-refresh/only-export-components
const FallbackComponent = () => <div className='error'>Component is not available!</div>;

const catchCallback = error => {
    console.error(`Error during loading remote: ${error}`);
    return {default: FallbackComponent};
};

export default catchCallback;
