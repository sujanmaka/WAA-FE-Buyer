import axios from "axios"
import { useEffect, useState } from "react"
import { FETCHPRODUCT } from "../../constant/constants"

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