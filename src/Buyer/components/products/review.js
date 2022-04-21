const Review = (props) => {
    
    const allData = props.data;

    return( 
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Posted By : {allData.userId}</h5>
                <p className="card-text">{allData.title}</p>
            </div>
        </div>
    )
}

export default Review;