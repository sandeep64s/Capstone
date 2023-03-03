import './nomatch.css';

export const NoMatch = () => {
    return(
        <>
            <div className="no-match-container">
                <h1 id="no-match-heading">Uh Oh! Page not found.</h1>
                <img id='no-match-img' src="https://cdn-icons-png.flaticon.com/512/6134/6134116.png"></img>
            </div>
        </>
    )
}