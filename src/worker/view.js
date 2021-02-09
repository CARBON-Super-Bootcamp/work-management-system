const tbody = document.querySelector('table>tbody')
const { store$} = require('./store');
const {deleteWorker} = require('./worker-client')


function loadTable(state) {
    tbody.innerHTML = ''
    for (let i = 0; i < state.length; i++) {
        let tRow = document.createElement('tr')
        tRow.innerHTML = `<td>${state[i].name}</td>
                            <td>${state[i].address}</td>
                            <td>${state[i].email}</td>
                            <td>${state[i].phone}</td>
                            <td>${state[i].biografi}</td>`;
        let tData = document.createElement('td');
        let button = document.createElement('button');
        button.innerHTML = "hapus";
        button.onclick = (event) => {
            store$.dispatch(deleteWorker(state[i].id));
        }
        tData.append(button)
        tRow.append(tData);
        tbody.append(tRow);

    }
}

module.exports = { loadTable }
