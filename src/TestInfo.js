
export default function TestLink(props){
    return(
        <h>
            <br/>
            <h>Test name : {props.name}</h>
            <br/>
            <h>Test Link : {props.short}</h>
            <br/>
            <h>Visits : {props.visits}</h>
            <br/>
        </h>
    )
}