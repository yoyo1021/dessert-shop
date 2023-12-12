import ReactLoading from 'react-loading';


function Loading({isLoading}){
    return(
        <>
            {isLoading && (
                    <div className="loading">
                        <ReactLoading type='spinningBubbles' color='red' height={60} width={100} />
                    </div>
                )}
        </>
    )
}

export default Loading