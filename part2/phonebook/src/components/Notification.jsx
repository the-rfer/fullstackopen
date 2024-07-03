const Notification = ({ status }) => {
    const customStyles = (type) => {
        if (type === 'error') {
            return { backgroundColor: 'red', color: 'white' };
        }
        if (type === 'success') {
            return { backgroundColor: 'green', color: 'white' };
        }
    };
    return (
        status.display && (
            <div>
                <p className='notification' style={customStyles(status.type)}>
                    {status.message}
                </p>
            </div>
        )
    );
};
export default Notification;
