import Table from "react-bootstrap/Table"

export default function TestLink(props){
    const test = props.test
    return(
        <div>
            <tbody>
                <tr>
                <td>{test.name}</td>
                <td>{test.full}</td>
                <td><a href = {`http://localhost:4001/${test.short}`}>{test.short}</a></td>
                </tr>
            </tbody>
        </div>
    )
}