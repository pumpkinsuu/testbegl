import {GetData, UpdateData} from "./api";


export default function UpdateButton({data, setData, oldData, setOldData}) {
    const onClick = () => {
        let updateData = [];
        for (let i = 0; i < data.length; ++i) {
            if (JSON.stringify(data[i]) !== JSON.stringify(oldData[i]))
                updateData.push(data[i]);
        }
        if (updateData.length !== 0) {
            UpdateData(updateData).then(res => {
                if (res.message) {
                    alert(res.message);
                } else {
                    alert(JSON.stringify(res));
                }
                GetData().then(users => {
                    setData(users);
                    setOldData(users);
                });
            });
        }
    }
    return (
        <button onClick={onClick}>Click to update users</button>
    );
};