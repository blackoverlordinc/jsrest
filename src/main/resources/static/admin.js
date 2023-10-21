const url = 'http://localhost:8080/restAdmin';



async function getAllUsers() {


    setTimeout(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                fillTable(data)
            })
    }, 200)

}


function fillTable(users) {

    let result = '';
    for (let user of users) {
        result +=
            `<tr>
        <th><p>${user.id}</p></th>
        <th><p>${user.username}</p></th>
      <th><p>${user.email}</p></th>
  
        <th><p>${user.roles.map(r => r.name).join(' ')}</p></th>
        <th>
            <button class="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onclick="event.preventDefault(); editModal(${user.id})">
                Edit
            </button>
            </th>
            <th>
            <button class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#delModal"
                    onclick="event.preventDefault(); delModal(${user.id})">
                Delete
            </button>
        </th>
    </tr>`
    }
    document.getElementById('adminTableBody').innerHTML = result;

}


function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById('editId').value = u.id;
            document.getElementById('editUserName').value = u.username;
            document.getElementById('editEmail').value = u.email;
            document.getElementById('editPassword').value = u.password;
            document.getElementById('editRoles').selectedIndex = u.role;
        })
    });
}

async function editUser() {
    const form_ed = document.getElementById('editModalForm');
    let id = document.getElementById("editId").value;
    let userName = document.getElementById("editUserName").value;
    let email = document.getElementById("editEmail").value;
    let password = document.getElementById("editPassword").value;
    let roles = [];
    for (let i = 0; i < form_ed.roles.options.length; i++) {
        if (form_ed.roles.options[i].selected) {
            let tmp = {};
            tmp["id"] = form_ed.roles.options[i].value
            roles.push(tmp);
        }
    }
    let user = {
        id: id,
        username: userName,
        email: email,
        password: password,
        roles: roles
    }
    await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        $('#editModal').modal('hide');
        getAllUsers();
    })
}

function delModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(res => {
            res.json().then(u => {

                document.getElementById('delId').value = u.id;
                document.getElementById('delUserName').value = u.username;
                document.getElementById('delEmail').value = u.email;
                document.getElementById('delPassword').value = u.password;
                document.getElementById('delRoles').selectedIndex = u.role;

            })
        });
}

async function deleteUser() {
    let id = document.getElementById("delId").value;
    let userName = document.getElementById("delUserName").value;
    let email = document.getElementById("delEmail").value;
    let password = document.getElementById("delPassword").value;
    let roles = $('#delRoles').val();

    let user = {
        id: id,
        username: userName,
        email: email,
        password: password,
        roles: roles
    };

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(() => {
        $('#delModal').modal('hide');
        getAllUsers()
    })
}

async function addUser() {
    const form_ed = document.getElementById('addForm');
    let addUserName = document.getElementById("addUserName").value;
    let addEmail = document.getElementById("addEmail").value;
    let addPassword = document.getElementById("addPassword").value;
    let addRoles = [];
    for (let i = 0; i < form_ed.roles.options.length; i++) {
        if (form_ed.roles.options[i].selected) {
            let tmp = {};
            tmp["id"] = form_ed.roles.options[i].value
            addRoles.push(tmp);
        }
    }
    let user = {
        username: addUserName,
        email: addEmail,
        password: addPassword,
        roles: addRoles
    }
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(() => {
        clearAndHideAddForm();
        getAllUsers()
        window.location.reload();
    })
}
function clearAndHideAddForm() {
    document.getElementById("addUserName").value = "";
    document.getElementById("addEmail").value = "";
    document.getElementById("addPassword").value = "";
    document.getElementById("addRoles").value = "option1";
}