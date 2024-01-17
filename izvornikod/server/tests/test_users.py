def test_create_admin_missing_field(login_admin, client):
    create_admin_input = {
        "firstname": "Test",
        "lastname": "Admin",
        "password": "pass",
    }

    resp = client.post("/api/users/create-admin", json=create_admin_input)

    assert resp.status_code == 400


def test_edit_password(login_student, client, revert_student_password_change):
    edit_password_input = {
        "newPassword": "nova loznika",
        "email": "ucenik@ucenik.com",
    }

    resp = client.put("/api/users/edit-password", json=edit_password_input)

    assert resp.status_code == 200
    assert resp.json["email"] == edit_password_input["email"]
