
export default function TestLink(props){
    return(
        <h1> 
            <div>{console.log(props)}</div>
            <br/>
            <h>Test name : {props.name}</h>
            <br/>
            <h>Full Link :</h>
            <a href = {props.full}>{props.full}</a>
            <br/>
            <h>Short Link :</h>
            <a href = {`http://localhost:4001/${props.short}`}>{props.short}</a>
            <br/>
            <h>Visits : {props.visits}</h>
            <br/>
        </h1>
    )
}