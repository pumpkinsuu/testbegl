import React from 'react';
import styled from 'styled-components'
import Table from "./parts/table";
import Search from "./parts/search";
import {GetData} from "./parts/api";
import UpdateButton from "./parts/update";


const StylePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`


function App() {
    const [data, setData] = React.useState([]);
    const [oldData, setOldData] = React.useState([])
    const skipPageResetRef = React.useRef(false)

    React.useEffect(() => {
        GetData().then(users => {
            setData(users);
            setOldData(users);
        });
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Birthdate',
                accessor: 'birthdate',
            },
        ],
        []
    )
    const updateMyData = (rowIndex, columnId, value) => {
        skipPageResetRef.current = true
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }
    React.useEffect(() => {
        skipPageResetRef.current = false
    })

    return (
        <StylePage>
            <Search setData={setData}/>
            {
                data.length !== 0 ?
                <StylePage>
                <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageResetRef={skipPageResetRef}
                />
                <UpdateButton
                data={data}
                setData={setData}
                oldData={oldData}
                setOldData={setOldData}
                />
                </StylePage>
                : <p>No data</p>
            }

        </StylePage>
    );
}

export default App;